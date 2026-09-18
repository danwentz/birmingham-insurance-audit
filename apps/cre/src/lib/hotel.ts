// Hotel insurance-impact math. Pure functions, no React, no I/O.
//
// Hotels underwrite per available room, so that is the unit everything here
// reduces to. Under USALI, insurance is a fixed charge below gross operating
// profit — it never touches GOP, it comes straight out of EBITDA. That is why
// a premium increase is an asset-value event rather than an operating one.

export type HotelInput = {
  keys: number;
  adr: number;
  occupancyPct: number; // 0-100
  totalOpexAnnual: number; // INCLUDING insurance
  annualPremium: number;
  capRatePct: number; // 0-100
  otherRevenueAnnual?: number; // F&B, parking, spa, resort fees

  // Advanced (each one unlocks a section; all optional)
  annualDebtService?: number;
  dscrCovenant?: number; // defaults to 1.40 — hotels carry a tighter covenant
  /** Cost that only exists because a room got sold: housekeeping, amenities,
   *  laundry, commissions. Unlocks break-even occupancy and real flow-through. */
  variableCostPerOccupiedRoom?: number;
  businessIncomeLimit?: number;
  indemnityMonths?: number;
  /** Share of annual revenue earned in the peak months. Unlocks seasonality. */
  peakShareOfRevenuePct?: number;
  peakMonths?: number; // defaults to 3
};

export const DEFAULT_CAP_RATE = 8.5;
export const DEFAULT_DSCR_COVENANT = 1.4;
export const DEFAULT_PEAK_MONTHS = 3;

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : null);

export type HotelBaseline = {
  roomsAvailable: number;
  occupiedRooms: number;
  revpar: number;
  roomsRevenue: number;
  totalRevenue: number;
  /** Total revenue per available room — TRevPAR, as the flags report it. */
  trevpar: number;
  ebitda: number;
  value: number | null;
  valuePerKey: number | null;
  insurancePerKey: number | null;
  insurancePerOccupiedRoom: number | null;
  /** The signature figure: dollars of RevPAR that go to insurance and nothing
   *  else. Directly comparable to the RevPAR number above it. */
  insurancePerAvailableRoom: number | null;
  insurancePctOfTotalRevenue: number | null;
  insurancePctOfOpex: number | null;
  /** Premium ÷ cap rate: the slice of asset value tied up in one expense line. */
  capitalizedInsurance: number | null;
  valuePerPremiumDollar: number | null;
  dscr: number | null;
  cashFlowAfterDebt: number | null;
};

export function baseline(i: HotelInput): HotelBaseline {
  const cap = i.capRatePct / 100;
  const roomsAvailable = i.keys * 365;
  const occupiedRooms = roomsAvailable * (i.occupancyPct / 100);
  const revpar = i.adr * (i.occupancyPct / 100);
  const roomsRevenue = i.adr * occupiedRooms;
  const totalRevenue = roomsRevenue + (i.otherRevenueAnnual ?? 0);
  const ebitda = totalRevenue - i.totalOpexAnnual;
  const ads = i.annualDebtService;
  const value = cap > 0 ? ebitda / cap : null;

  return {
    roomsAvailable,
    occupiedRooms,
    revpar,
    roomsRevenue,
    totalRevenue,
    trevpar: roomsAvailable > 0 ? totalRevenue / roomsAvailable : 0,
    ebitda,
    value,
    valuePerKey: value !== null && i.keys > 0 ? value / i.keys : null,
    insurancePerKey: safeDiv(i.annualPremium, i.keys),
    insurancePerOccupiedRoom: safeDiv(i.annualPremium, occupiedRooms),
    insurancePerAvailableRoom: safeDiv(i.annualPremium, roomsAvailable),
    insurancePctOfTotalRevenue: safeDiv(i.annualPremium, totalRevenue),
    insurancePctOfOpex: safeDiv(i.annualPremium, i.totalOpexAnnual),
    capitalizedInsurance: cap > 0 ? i.annualPremium / cap : null,
    valuePerPremiumDollar: cap > 0 ? 1 / cap : null,
    dscr: ads && ads > 0 ? ebitda / ads : null,
    cashFlowAfterDebt: ads && ads > 0 ? ebitda - ads : null,
  };
}

export type HotelScenario = {
  /** Fractional change in premium: -0.15 is a 15% reduction. */
  premiumChange: number;
  newPremium: number;
  premiumDelta: number;
  newEbitda: number;
  newValue: number | null;
  valueDelta: number | null;
  valueDeltaPerKey: number | null;
  newDscr: number | null;
  /** ADR move that holds EBITDA flat. Identical to the premium change per
   *  occupied room night, because selling the same room at a higher rate
   *  carries no extra cost. */
  adrToOffset: number | null;
  /** Occupancy points that hold EBITDA flat, at the contribution each extra
   *  room night actually earns. */
  occupancyPointsToOffset: number | null;
};

export function scenario(i: HotelInput, premiumChange: number): HotelScenario {
  const cap = i.capRatePct / 100;
  const b = baseline(i);
  const newPremium = i.annualPremium * (1 + premiumChange);
  const premiumDelta = newPremium - i.annualPremium;
  const newEbitda = b.ebitda - premiumDelta;
  const ads = i.annualDebtService;
  const contribution = i.adr - (i.variableCostPerOccupiedRoom ?? 0);

  return {
    premiumChange,
    newPremium,
    premiumDelta,
    newEbitda,
    newValue: cap > 0 ? newEbitda / cap : null,
    valueDelta: cap > 0 ? -premiumDelta / cap : null,
    valueDeltaPerKey: cap > 0 && i.keys > 0 ? -premiumDelta / cap / i.keys : null,
    newDscr: ads && ads > 0 ? newEbitda / ads : null,
    adrToOffset: safeDiv(premiumDelta, b.occupiedRooms),
    occupancyPointsToOffset:
      contribution > 0 && b.roomsAvailable > 0
        ? (premiumDelta / (b.roomsAvailable * contribution)) * 100
        : null,
  };
}

/** Premium change (as a fraction) that drags DSCR down to the covenant.
 *  null when there's no debt; negative when the covenant is already breached. */
export function premiumIncreaseToBreachDscr(i: HotelInput): number | null {
  const ads = i.annualDebtService;
  if (!ads || ads <= 0 || i.annualPremium <= 0) return null;
  const covenant = i.dscrCovenant ?? DEFAULT_DSCR_COVENANT;
  return (baseline(i).ebitda - covenant * ads) / i.annualPremium;
}

export type BreakEven = {
  fixedCostAnnual: number;
  contributionPerOccupiedRoom: number;
  /** Occupancy at which EBITDA is zero. */
  ebitdaBreakEvenPct: number;
  /** Occupancy at which cash flow after debt service is zero. */
  cashBreakEvenPct: number | null;
  /** Occupancy points between today and the EBITDA break-even. */
  headroomPoints: number;
};

/** Hotels run on operating leverage, so the occupancy that covers the fixed
 *  block — insurance included — is the number that decides a bad year. */
export function breakEvenOccupancy(i: HotelInput): BreakEven | null {
  const variable = i.variableCostPerOccupiedRoom;
  if (variable === undefined || variable < 0) return null;
  const contribution = i.adr - variable;
  const b = baseline(i);
  if (contribution <= 0 || b.roomsAvailable <= 0) return null;

  const fixedCostAnnual = i.totalOpexAnnual - variable * b.occupiedRooms;
  const other = i.otherRevenueAnnual ?? 0;
  const ads = i.annualDebtService;
  const denominator = b.roomsAvailable * contribution;

  return {
    fixedCostAnnual,
    contributionPerOccupiedRoom: contribution,
    ebitdaBreakEvenPct: ((fixedCostAnnual - other) / denominator) * 100,
    cashBreakEvenPct:
      ads && ads > 0 ? ((fixedCostAnnual + ads - other) / denominator) * 100 : null,
    headroomPoints: i.occupancyPct - ((fixedCostAnnual - other) / denominator) * 100,
  };
}

export type Seasonality = {
  peakMonths: number;
  averageMonthlyRevenue: number;
  peakMonthlyRevenue: number;
  offPeakMonthlyRevenue: number;
  /** How many average months one peak month is worth. */
  peakMultiple: number;
};

export function seasonality(i: HotelInput): Seasonality | null {
  const share = i.peakShareOfRevenuePct;
  if (share === undefined || share <= 0 || share >= 100) return null;
  const peakMonths = i.peakMonths ?? DEFAULT_PEAK_MONTHS;
  if (peakMonths <= 0 || peakMonths >= 12) return null;

  const { totalRevenue } = baseline(i);
  const averageMonthlyRevenue = totalRevenue / 12;
  const peakMonthlyRevenue = (totalRevenue * (share / 100)) / peakMonths;
  const offPeakMonthlyRevenue = (totalRevenue * (1 - share / 100)) / (12 - peakMonths);

  return {
    peakMonths,
    averageMonthlyRevenue,
    peakMonthlyRevenue,
    offPeakMonthlyRevenue,
    peakMultiple: averageMonthlyRevenue > 0 ? peakMonthlyRevenue / averageMonthlyRevenue : 0,
  };
}

/** Months a limit funds when the closure starts at the top of peak season:
 *  it burns at the peak rate first, then at the off-peak rate. */
export function monthsFundedFromPeak(limit: number, s: Seasonality): number {
  if (limit <= 0) return 0;
  const peakCapacity = s.peakMonthlyRevenue * s.peakMonths;
  if (limit <= peakCapacity) {
    return s.peakMonthlyRevenue > 0 ? limit / s.peakMonthlyRevenue : 0;
  }
  const remainder = limit - peakCapacity;
  const offMonths = s.offPeakMonthlyRevenue > 0 ? remainder / s.offPeakMonthlyRevenue : 0;
  return s.peakMonths + offMonths;
}

/** Revenue lost over an indemnity period that begins at the top of peak season.
 *  Whole years are just annual revenue; the stub is peak-weighted. */
export function revenueOverPeakWindow(indemnityMonths: number, s: Seasonality): number {
  const annual = s.averageMonthlyRevenue * 12;
  const wholeYears = Math.floor(indemnityMonths / 12);
  const stub = indemnityMonths - wholeYears * 12;
  const peakPart = Math.min(stub, s.peakMonths) * s.peakMonthlyRevenue;
  const offPart = Math.max(0, stub - s.peakMonths) * s.offPeakMonthlyRevenue;
  return wholeYears * annual + peakPart + offPart;
}

export type BusinessIncomeCheck = {
  indemnityMonths: number;
  carriedLimit: number;
  averageMonthlyRevenue: number;
  /** Sized on the average month, which is how most limits get set. */
  requiredOnAverage: number;
  gapOnAverage: number;
  monthsFundedOnAverage: number | null;
  /** Sized on a closure that starts in peak season. Null without seasonality. */
  requiredFromPeak: number | null;
  gapFromPeak: number | null;
  monthsFundedFromPeak: number | null;
};

/** Business income pays lost income plus continuing expenses, so revenue is the
 *  ceiling rather than the exact need — deliberately the conservative read. */
export function businessIncomeCheck(i: HotelInput): BusinessIncomeCheck | null {
  const limit = i.businessIncomeLimit;
  const indemnityMonths = i.indemnityMonths;
  if (limit === undefined || limit < 0 || !indemnityMonths || indemnityMonths <= 0) return null;

  const averageMonthlyRevenue = baseline(i).totalRevenue / 12;
  const requiredOnAverage = averageMonthlyRevenue * indemnityMonths;
  const s = seasonality(i);
  const requiredFromPeak = s ? revenueOverPeakWindow(indemnityMonths, s) : null;

  return {
    indemnityMonths,
    carriedLimit: limit,
    averageMonthlyRevenue,
    requiredOnAverage,
    gapOnAverage: Math.max(0, requiredOnAverage - limit),
    monthsFundedOnAverage:
      averageMonthlyRevenue > 0 ? limit / averageMonthlyRevenue : null,
    requiredFromPeak,
    gapFromPeak: requiredFromPeak !== null ? Math.max(0, requiredFromPeak - limit) : null,
    monthsFundedFromPeak: s ? monthsFundedFromPeak(limit, s) : null,
  };
}

export type SensitivityCell = { capRatePct: number; premiumChange: number; valueDelta: number };

/** The grid hotel owners underwrite in: premium change × exit cap. */
export function sensitivityGrid(
  i: HotelInput,
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
