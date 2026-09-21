// Coinsurance penalty math (ISO CP 00 10 order of operations). Pure functions,
// no React, no I/O.
//
// The clause: carry less than the coinsurance percentage of replacement cost
// and every covered loss gets cut by the same ratio — not just a total loss.
// ISO's order of operations is what owners get wrong: the ratio applies to the
// LOSS first, then the deductible comes out, then the whole thing is capped at
// the limit. Do the subtraction before the ratio and the number is wrong.

import { coinsuranceRequiredLimit, coinsuranceRatio, DEFAULT_COINSURANCE } from "./calc";

export const DEFAULT_COINSURANCE_PCT = DEFAULT_COINSURANCE;
export const COINSURANCE_PRESETS = [80, 90, 100];

export type CoinsuranceInput = {
  /** What it would cost to rebuild today — the figure the coinsurance percentage runs against. */
  replacementCost: number;
  /** The limit actually carried. */
  limit: number;
  coinsurancePct: number;
  deductible: number;
  loss: number;
};

export type CoinsuranceResult = {
  /** Limit required to satisfy the clause: RC × coinsurance%. */
  required: number;
  /** Limit carried ÷ limit required, capped at 1. What the clause actually pays. */
  ratio: number;
  /** What the policy pays on the entered loss, ISO order: ratio × loss, minus
   *  deductible, capped at the limit. */
  payout: number;
  /** What the same loss would have paid with no coinsurance penalty (ratio = 1). */
  noPenaltyPayout: number;
  /** The dollars the penalty costs on this loss. */
  penalty: number;
  /** What the owner is left holding: loss minus what the policy paid. */
  ownerRetains: number;
  /** Additional limit needed to cure the penalty entirely. */
  shortfall: number;
  hasPenalty: boolean;
};

export function coinsuranceResult(i: CoinsuranceInput): CoinsuranceResult {
  const required = coinsuranceRequiredLimit(i.replacementCost, i.coinsurancePct);
  const ratio = coinsuranceRatio(i.limit, required);
  const limit = Math.max(0, i.limit);
  const loss = Math.max(0, i.loss);
  const deductible = Math.max(0, i.deductible);

  const payout = Math.min(limit, Math.max(0, loss * ratio - deductible));
  const noPenaltyPayout = Math.min(limit, Math.max(0, loss - deductible));
  const penalty = noPenaltyPayout - payout;

  return {
    required,
    ratio,
    payout,
    noPenaltyPayout,
    penalty,
    ownerRetains: loss - payout,
    shortfall: Math.max(0, required - limit),
    hasPenalty: ratio < 1 && required > 0,
  };
}

export type PenaltyLadderRow = {
  /** The loss size this row prices, as a percent of replacement cost. */
  lossPctOfRc: number;
  loss: number;
  payout: number;
  noPenaltyPayout: number;
  penalty: number;
};

/** The same penalty at every loss size, because the clause bites a partial loss
 *  exactly as hard as a total one — which is the thing owners don't expect. */
export function penaltyLadder(i: CoinsuranceInput, lossPercents: number[]): PenaltyLadderRow[] {
  return lossPercents.map((lossPctOfRc) => {
    const loss = i.replacementCost > 0 ? i.replacementCost * (lossPctOfRc / 100) : 0;
    const r = coinsuranceResult({ ...i, loss });
    return {
      lossPctOfRc,
      loss,
      payout: r.payout,
      noPenaltyPayout: r.noPenaltyPayout,
      penalty: r.penalty,
    };
  });
}

// ---------------------------------------------------------------- margin clause

export const MARGIN_PRESETS = [105, 110, 125];
export const DEFAULT_MARGIN_PCT = 110;

export type MarginClauseInput = {
  /** Scheduled (SOV) value for one location in a blanket program. */
  scheduledValue: number;
  marginPct: number;
  /** What it would cost to rebuild that location today. */
  replacementCostToday: number;
};

export type MarginClauseResult = {
  /** SOV × margin% — the hard ceiling on what that location can recover, no matter the loss. */
  cap: number;
  /** What a total loss actually recovers, capped at the margin. */
  totalLossRecovery: number;
  /** What a total loss leaves unfunded. */
  totalLossGap: number;
  hasGap: boolean;
  /** SOV that would need to be on the schedule for the margin to cover today's RC. */
  sovNeeded: number;
  sovShortfall: number;
};

/** A margin clause caps recovery at scheduled value × margin, full stop — it
 *  doesn't test the ratio the way coinsurance does, it just sets a ceiling. */
export function marginClauseResult(i: MarginClauseInput): MarginClauseResult {
  const cap = i.scheduledValue > 0 && i.marginPct > 0 ? i.scheduledValue * (i.marginPct / 100) : 0;
  const rc = Math.max(0, i.replacementCostToday);
  const totalLossRecovery = Math.min(cap, rc);
  const totalLossGap = Math.max(0, rc - cap);
  const sovNeeded = i.marginPct > 0 ? rc / (i.marginPct / 100) : 0;

  return {
    cap,
    totalLossRecovery,
    totalLossGap,
    hasGap: totalLossGap > 0,
    sovNeeded,
    sovShortfall: Math.max(0, sovNeeded - i.scheduledValue),
  };
}

/** Recovery on a loss smaller than a total loss, still held to the margin cap. */
export function marginClauseRecovery(cap: number, loss: number): number {
  return Math.min(Math.max(0, cap), Math.max(0, loss));
}

// ------------------------------------------------------------- stale valuation

/** Not a sourced index — an assumption the user should replace with their own
 *  view of local construction cost trend. */
export const DEFAULT_TREND_PCT = 5;

/** Compounds a last-known value forward at a flat annual trend, to estimate
 *  what replacement cost is today. */
export function trendedReplacementCost(
  lastValue: number,
  yearsSince: number,
  annualTrendPct: number,
): number {
  if (lastValue <= 0) return 0;
  const years = Math.max(0, yearsSince);
  return lastValue * Math.pow(1 + annualTrendPct / 100, years);
}

// ---------------------------------------------------------------- cost to cure

/** Rough extra annual premium to raise the limit from what's carried to what's
 *  required, at a flat property rate per $100 of TIV. A ballpark for comparing
 *  against the penalty, not a quote. */
export function costToCure(shortfall: number, ratePer100Tiv: number): number {
  if (shortfall <= 0 || ratePer100Tiv <= 0) return 0;
  return (shortfall / 100) * ratePer100Tiv;
}
