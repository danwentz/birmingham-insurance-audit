// Percentage wind/hail deductible math. Pure functions, no React, no I/O.
//
// The whole point of this module is the thing owners get wrong: a percentage
// deductible is a percentage of the affected property's INSURED VALUE, not of
// the loss and not of the schedule. One storm across four buildings applies
// four deductibles. That is why the retained number is so much larger than the
// "5%" on the declarations page suggests.

export type WindInput = {
  /** Insured values, one per location, in schedule order. */
  locationValues: number[];
  /** Deductible as a percent of each affected location's insured value. */
  deductiblePct: number;
  /** Dollar floor the deductible can't fall below, per location. */
  minimumPerLocation?: number;
  /** Ceiling on what one occurrence can retain, if the program bought one. */
  occurrenceCap?: number;
  /** Ceiling on what a policy year can retain, if the program bought one. */
  annualAggregate?: number;
  /** Locations a single storm touches. Clamped to the schedule. */
  locationsHit: number;

  /** Flat per-occurrence deductible to price a buy-down against. */
  flatDeductible?: number;
  /** The owner's own view of how often a storm hits. Defaults to DEFAULT_EVENT_PROBABILITY. */
  eventProbability?: number;

  // Translation into operator terms — each is optional and unlocks one figure.
  annualNoi?: number;
  annualPremium?: number;
  units?: number;
};

export const DEFAULT_DEDUCTIBLE_PCT = 5;
export const DEFAULT_LOCATIONS_HIT = 1;

/** Odds a named storm or hail event hits the schedule in a given year. Used only
 *  for the buy-down breakeven, where the owner supplies their own view. */
export const DEFAULT_EVENT_PROBABILITY = 0.15;

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : null);

/** Annual cost at which a deductible buy-down stops paying for itself, given a
 *  probability the deductible gets hit in any year. Lives here rather than in
 *  calc.ts because the buy-down question only ever comes up about this number. */
export function buyDownBreakeven(
  deductibleDollars: number,
  newDeductibleDollars: number,
  annualProbability: number,
): number {
  return Math.max(0, (deductibleDollars - newDeductibleDollars) * annualProbability);
}

export type LocationLine = {
  index: number;
  label: string;
  insuredValue: number;
  deductible: number;
  /** True when the dollar minimum bound, not the percentage. */
  minimumApplied: boolean;
  /** What the deductible actually works out to as a share of insured value. */
  effectivePct: number;
};

/** A deductible can't exceed the value it applies to, and a dollar minimum on a
 *  small location routinely would. */
export function locationDeductible(
  insuredValue: number,
  deductiblePct: number,
  minimumPerLocation = 0,
): { deductible: number; minimumApplied: boolean } {
  if (insuredValue <= 0 || deductiblePct <= 0) return { deductible: 0, minimumApplied: false };
  const fromPct = insuredValue * (deductiblePct / 100);
  const floored = Math.max(fromPct, minimumPerLocation);
  return {
    deductible: Math.min(floored, insuredValue),
    minimumApplied: minimumPerLocation > fromPct,
  };
}

export type EventRetention = {
  locationsHit: number;
  lines: LocationLine[];
  /** Sum of the affected locations' deductibles, before any occurrence cap. */
  grossRetention: number;
  capApplied: boolean;
  retention: number;
  monthsOfNoi: number | null;
  pctOfAnnualPremium: number | null;
  perUnit: number | null;
};

export type FlatComparison = {
  flatDeductible: number;
  /** A buy-down replaces the per-location percentage with one flat retention. */
  flatRetention: number;
  extraRetained: number;
  /** Annual buy-down premium at which the trade stops paying for itself. */
  breakEvenAnnualCost: number;
  eventProbability: number;
};

export type WindResult = {
  lines: LocationLine[];
  totalInsuredValue: number;
  /** Largest single-location deductible — the number owners came here for. */
  worst: LocationLine | null;
  /** What that location actually retains: one building is still one occurrence,
   *  so an occurrence cap binds here too. */
  worstRetained: number;
  /** Every location hit at once: the schedule's theoretical maximum. */
  scheduleWide: number;
  /** scheduleWide after any occurrence cap — the real ceiling on one event. */
  maxSingleEvent: number;
  /** True when an occurrence cap was bought at all, whether or not it binds. */
  hasOccurrenceCap: boolean;
  event: EventRetention;
  flat: FlatComparison | null;
};

/** Sorted biggest-deductible-first, because that's the order a storm scenario
 *  reads in and the order the "N locations hit" slice needs. */
export function scheduleLines(i: WindInput): LocationLine[] {
  return i.locationValues
    .map((insuredValue, index) => {
      const { deductible, minimumApplied } = locationDeductible(
        insuredValue,
        i.deductiblePct,
        i.minimumPerLocation,
      );
      return {
        index,
        label: `Location ${index + 1}`,
        insuredValue,
        deductible,
        minimumApplied,
        effectivePct: insuredValue > 0 ? (deductible / insuredValue) * 100 : 0,
      };
    })
    .filter((l) => l.insuredValue > 0)
    .sort((a, b) => b.deductible - a.deductible);
}

export function windResult(i: WindInput): WindResult {
  const lines = scheduleLines(i);
  const totalInsuredValue = lines.reduce((sum, l) => sum + l.insuredValue, 0);
  const scheduleWide = lines.reduce((sum, l) => sum + l.deductible, 0);

  const hit = Math.max(1, Math.min(Math.round(i.locationsHit) || 1, lines.length));
  const affected = lines.slice(0, hit);
  const grossRetention = affected.reduce((sum, l) => sum + l.deductible, 0);
  const cap = i.occurrenceCap;
  const capApplied = cap !== undefined && cap > 0 && cap < grossRetention;
  const retention = capApplied ? cap : grossRetention;

  const noi = i.annualNoi;
  const event: EventRetention = {
    locationsHit: lines.length === 0 ? 0 : hit,
    lines: affected,
    grossRetention,
    capApplied,
    retention,
    monthsOfNoi: noi && noi > 0 ? retention / (noi / 12) : null,
    pctOfAnnualPremium: i.annualPremium ? safeDiv(retention, i.annualPremium) : null,
    perUnit: i.units ? safeDiv(retention, i.units) : null,
  };

  const hasOccurrenceCap = cap !== undefined && cap > 0;
  const underCap = (amount: number) => (hasOccurrenceCap ? Math.min(amount, cap) : amount);

  return {
    lines,
    totalInsuredValue,
    worst: lines[0] ?? null,
    worstRetained: underCap(lines[0]?.deductible ?? 0),
    scheduleWide,
    maxSingleEvent: underCap(scheduleWide),
    hasOccurrenceCap,
    event,
    flat: flatComparison(retention, i.flatDeductible, i.eventProbability ?? DEFAULT_EVENT_PROBABILITY),
  };
}

export function flatComparison(
  retention: number,
  flatDeductible: number | undefined,
  eventProbability: number,
): FlatComparison | null {
  if (flatDeductible === undefined || flatDeductible < 0) return null;
  return {
    flatDeductible,
    flatRetention: flatDeductible,
    extraRetained: Math.max(0, retention - flatDeductible),
    breakEvenAnnualCost: buyDownBreakeven(retention, flatDeductible, eventProbability),
    eventProbability,
  };
}

/** What a policy year retains across repeat events, which is the Gulf reality
 *  the single-occurrence number hides. Capped by the annual aggregate if bought. */
export function seasonRetention(
  eventRetention: number,
  events: number,
  annualAggregate?: number,
): { events: number; retention: number; capApplied: boolean } {
  const gross = eventRetention * events;
  const capped = annualAggregate !== undefined && annualAggregate > 0 && annualAggregate < gross;
  return { events, retention: capped ? annualAggregate : gross, capApplied: capped };
}

export type LadderRow = {
  deductiblePct: number;
  worstLocation: number;
  eventRetention: number;
  monthsOfNoi: number | null;
};

/** The same schedule at every deductible the market is quoting, so the slope
 *  between 2% and 5% is visible instead of theoretical. */
export function deductibleLadder(i: WindInput, percents: number[]): LadderRow[] {
  return percents.map((deductiblePct) => {
    const r = windResult({ ...i, deductiblePct });
    return {
      deductiblePct,
      worstLocation: r.worstRetained,
      eventRetention: r.event.retention,
      monthsOfNoi: r.event.monthsOfNoi,
    };
  });
}
