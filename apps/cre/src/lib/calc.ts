// Multifamily insurance-impact math. Pure functions, no React, no I/O.
// Every number the calculator page shows comes from here so the page can
// stay dumb and the math stays testable.

export type CalcInput = {
  units: number;
  annualPremium: number;
  avgRentMonthly: number;
  occupancyPct: number; // 0-100
  totalOpexAnnual: number; // INCLUDING insurance
  capRatePct: number; // 0-100
  otherIncomeAnnual?: number;

  // Advanced (each one unlocks a section; all optional)
  annualDebtService?: number;
  dscrCovenant?: number; // defaults to 1.20
  largestBuildingTiv?: number;
  windDeductiblePct?: number; // % of that building's insured value
  insuredValue?: number; // what the policy carries
  replacementCost?: number; // what it would actually cost to rebuild
  coinsurancePct?: number; // defaults to 90
  lossOfRentsLimit?: number;
  indemnityMonths?: number;
};

export const DEFAULT_CAP_RATE = 7;
export const DEFAULT_DSCR_COVENANT = 1.2;
export const DEFAULT_COINSURANCE = 90;

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : null);

/** Gross potential rent, effective gross income, NOI, value, and the ratios
 *  an operator already tracks. */
export type Baseline = {
  grossPotentialRent: number;
  egi: number;
  noi: number;
  value: number | null;
  insurancePerUnit: number | null;
  insurancePctOfEgi: number | null;
  insurancePctOfOpex: number | null;
  opexRatio: number | null;
  /** Premium ÷ cap rate: the slice of asset value tied up in one expense line. */
  capitalizedInsurance: number | null;
  /** Asset value created per $1 of annual premium removed. */
  valuePerPremiumDollar: number | null;
  dscr: number | null;
  cashFlowAfterDebt: number | null;
  breakEvenOccupancyPct: number | null;
};

export function baseline(i: CalcInput): Baseline {
  const cap = i.capRatePct / 100;
  const grossPotentialRent = i.units * i.avgRentMonthly * 12;
  const egi = grossPotentialRent * (i.occupancyPct / 100) + (i.otherIncomeAnnual ?? 0);
  const noi = egi - i.totalOpexAnnual;
  const ads = i.annualDebtService;

  return {
    grossPotentialRent,
    egi,
    noi,
    value: cap > 0 ? noi / cap : null,
    insurancePerUnit: safeDiv(i.annualPremium, i.units),
    insurancePctOfEgi: safeDiv(i.annualPremium, egi),
    insurancePctOfOpex: safeDiv(i.annualPremium, i.totalOpexAnnual),
    opexRatio: safeDiv(i.totalOpexAnnual, egi),
    capitalizedInsurance: cap > 0 ? i.annualPremium / cap : null,
    valuePerPremiumDollar: cap > 0 ? 1 / cap : null,
    dscr: ads && ads > 0 ? noi / ads : null,
    cashFlowAfterDebt: ads && ads > 0 ? noi - ads : null,
    breakEvenOccupancyPct:
      grossPotentialRent > 0
        ? ((i.totalOpexAnnual + (ads ?? 0)) / grossPotentialRent) * 100
        : null,
  };
}

export type Scenario = {
  /** Fractional change in premium: -0.15 is a 15% reduction. */
  premiumChange: number;
  newPremium: number;
  premiumDelta: number;
  newNoi: number;
  newValue: number | null;
  valueDelta: number | null;
  valueDeltaPerUnit: number | null;
  newDscr: number | null;
  newCashFlowAfterDebt: number | null;
};

/** A premium change flows straight to NOI dollar-for-dollar, and NOI
 *  capitalizes — which is the whole point of the page. */
export function scenario(i: CalcInput, premiumChange: number): Scenario {
  const cap = i.capRatePct / 100;
  const b = baseline(i);
  const newPremium = i.annualPremium * (1 + premiumChange);
  const premiumDelta = newPremium - i.annualPremium;
  const newNoi = b.noi - premiumDelta;
  const ads = i.annualDebtService;

  return {
    premiumChange,
    newPremium,
    premiumDelta,
    newNoi,
    newValue: cap > 0 ? newNoi / cap : null,
    valueDelta: cap > 0 ? -premiumDelta / cap : null,
    valueDeltaPerUnit: cap > 0 && i.units > 0 ? -premiumDelta / cap / i.units : null,
    newDscr: ads && ads > 0 ? newNoi / ads : null,
    newCashFlowAfterDebt: ads && ads > 0 ? newNoi - ads : null,
  };
}

/** Premium change (as a fraction) that drags DSCR down to the covenant.
 *  null when there's no debt; negative when the covenant is already breached. */
export function premiumIncreaseToBreachDscr(i: CalcInput): number | null {
  const ads = i.annualDebtService;
  if (!ads || ads <= 0 || i.annualPremium <= 0) return null;
  const covenant = i.dscrCovenant ?? DEFAULT_DSCR_COVENANT;
  const { noi } = baseline(i);
  return (noi - covenant * ads) / i.annualPremium;
}

export type SensitivityCell = { capRatePct: number; premiumChange: number; valueDelta: number };

/** The grid operators actually underwrite in: premium change × exit cap. */
export function sensitivityGrid(
  i: CalcInput,
  premiumChanges: number[],
  capRates: number[],
): SensitivityCell[][] {
  return premiumChanges.map((premiumChange) =>
    capRates.map((capRatePct) => ({
      capRatePct,
      premiumChange,
      valueDelta:
        capRatePct > 0 ? (-i.annualPremium * premiumChange) / (capRatePct / 100) : 0,
    })),
  );
}

export type WindExposure = {
  deductibleDollars: number;
  monthsOfNoi: number | null;
  pctOfAnnualPremium: number | null;
};

/** A percentage wind/hail deductible is retained risk nobody has priced. */
export function windDeductibleExposure(i: CalcInput): WindExposure | null {
  const tiv = i.largestBuildingTiv;
  const pct = i.windDeductiblePct;
  if (!tiv || tiv <= 0 || !pct || pct <= 0) return null;
  const deductibleDollars = tiv * (pct / 100);
  const { noi } = baseline(i);
  return {
    deductibleDollars,
    monthsOfNoi: noi > 0 ? deductibleDollars / (noi / 12) : null,
    pctOfAnnualPremium: safeDiv(deductibleDollars, i.annualPremium),
  };
}

export type ItvGap = {
  insuredValue: number;
  replacementCost: number;
  requiredLimit: number;
  shortfall: number;
  /** Fraction of a covered loss the coinsurance clause will actually pay. */
  payoutRatio: number;
  /** Dollars lost on a total loss of the insured value. */
  haircutOnFullLoss: number;
};

export function itvGap(i: CalcInput): ItvGap | null {
  const insured = i.insuredValue;
  const rc = i.replacementCost;
  if (!insured || insured <= 0 || !rc || rc <= 0) return null;
  const coins = (i.coinsurancePct ?? DEFAULT_COINSURANCE) / 100;
  const requiredLimit = rc * coins;
  const payoutRatio = Math.min(1, insured / requiredLimit);
  return {
    insuredValue: insured,
    replacementCost: rc,
    requiredLimit,
    shortfall: Math.max(0, requiredLimit - insured),
    payoutRatio,
    haircutOnFullLoss: insured * (1 - payoutRatio),
  };
}

export type LossOfRentsCheck = {
  monthlyEgi: number;
  indemnityMonths: number;
  requiredLimit: number;
  carriedLimit: number;
  gap: number;
  monthsCovered: number | null;
};

export function lossOfRentsCheck(i: CalcInput): LossOfRentsCheck | null {
  const limit = i.lossOfRentsLimit;
  const months = i.indemnityMonths;
  if (limit === undefined || limit < 0 || !months || months <= 0) return null;
  const monthlyEgi = baseline(i).egi / 12;
  const requiredLimit = monthlyEgi * months;
  return {
    monthlyEgi,
    indemnityMonths: months,
    requiredLimit,
    carriedLimit: limit,
    gap: Math.max(0, requiredLimit - limit),
    monthsCovered: monthlyEgi > 0 ? limit / monthlyEgi : null,
  };
}
