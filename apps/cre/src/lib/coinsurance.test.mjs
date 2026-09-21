import test from "node:test";
import assert from "node:assert/strict";
import {
  coinsuranceResult,
  penaltyLadder,
  marginClauseResult,
  marginClauseRecovery,
  trendedReplacementCost,
  costToCure,
  DEFAULT_COINSURANCE_PCT,
} from "./coinsurance.js";

const close = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${expected}, got ${actual} (tol ${tol})`,
  );

// ISO-style worked example: $10M RC, 90% coinsurance, $6.3M limit, $2M loss,
// $25k deductible -> 0.7 ratio, $1,375,000 payout.
const iso = {
  replacementCost: 10_000_000,
  limit: 6_300_000,
  coinsurancePct: 90,
  deductible: 25_000,
  loss: 2_000_000,
};

test("default coinsurance matches the site default", () => {
  assert.equal(DEFAULT_COINSURANCE_PCT, 90);
});

test("the ISO worked example: 0.7 ratio, $1,375,000 payout", () => {
  const r = coinsuranceResult(iso);
  close(r.required, 9_000_000);
  close(r.ratio, 0.7);
  close(r.payout, 1_375_000);
  assert.equal(r.hasPenalty, true);
});

test("penalty is the gap between the no-penalty payout and the actual payout", () => {
  const r = coinsuranceResult(iso);
  close(r.noPenaltyPayout, 1_975_000); // 2M - 25k, no ratio applied
  close(r.penalty, 600_000); // 1.975M - 1.375M
});

test("owner retains the loss minus what the policy paid", () => {
  const r = coinsuranceResult(iso);
  close(r.ownerRetains, 625_000); // 2M - 1.375M
});

test("shortfall is the limit still needed to cure the penalty", () => {
  const r = coinsuranceResult(iso);
  close(r.shortfall, 2_700_000); // 9M required - 6.3M carried
});

test("carrying the required limit removes the penalty entirely", () => {
  const r = coinsuranceResult({ ...iso, limit: 9_000_000 });
  close(r.ratio, 1);
  close(r.payout, r.noPenaltyPayout);
  close(r.penalty, 0);
  close(r.shortfall, 0);
  assert.equal(r.hasPenalty, false);
});

test("a limit above the requirement gives no penalty, not a bonus", () => {
  const r = coinsuranceResult({ ...iso, limit: 12_000_000 });
  close(r.ratio, 1);
  assert.equal(r.hasPenalty, false);
  close(r.shortfall, 0);
});

test("a deductible larger than the loss pays zero, not negative", () => {
  const r = coinsuranceResult({ ...iso, loss: 10_000, deductible: 25_000 });
  close(r.payout, 0);
  close(r.noPenaltyPayout, 0);
  close(r.penalty, 0);
});

test("payout never exceeds the limit even on a catastrophic loss", () => {
  const r = coinsuranceResult({ ...iso, loss: 20_000_000 });
  close(r.payout, iso.limit);
  close(r.noPenaltyPayout, iso.limit);
});

test("zero replacement cost has no coinsurance requirement and no penalty", () => {
  const r = coinsuranceResult({ ...iso, replacementCost: 0 });
  close(r.required, 0);
  close(r.ratio, 1);
  assert.equal(r.hasPenalty, false);
});

test("zero loss pays zero without dividing by zero anywhere", () => {
  const r = coinsuranceResult({ ...iso, loss: 0 });
  close(r.payout, 0);
  close(r.ownerRetains, 0);
});

test("a partial loss is penalized just as hard as a total one", () => {
  // 25% of RC = $2.5M loss, same schedule as the ISO example (no deductible).
  const partial = coinsuranceResult({ ...iso, loss: 2_500_000, deductible: 0 });
  close(partial.ratio, 0.7);
  close(partial.payout, 1_750_000); // 2.5M x 0.7
  close(partial.penalty, 750_000); // 2.5M - 1.75M
});

test("the penalty ladder prices the same ratio across loss sizes", () => {
  const rows = penaltyLadder({ ...iso, deductible: 0 }, [5, 10, 25, 50, 100]);
  assert.equal(rows.length, 5);
  close(rows[0].loss, 500_000);
  close(rows[0].payout, 350_000); // 500k x 0.7
  close(rows[0].penalty, 150_000); // 500k - 350k
  close(rows[3].loss, 5_000_000);
  close(rows[3].payout, 3_500_000); // 5M x 0.7, still under the limit
  close(rows[3].penalty, 1_500_000); // 5M - 3.5M
});

test("the penalty converges to zero once the limit caps both sides", () => {
  // At a loss large enough, the ratio-adjusted payout and the no-penalty payout
  // both hit the policy limit, so the gap between them disappears even though
  // the loss is uninsured well beyond the limit either way.
  const r = coinsuranceResult({ ...iso, deductible: 0, loss: 10_000_000 });
  close(r.payout, 6_300_000); // capped at the limit, not 7M
  close(r.noPenaltyPayout, 6_300_000); // capped at the limit too
  close(r.penalty, 0);
});

test("ladder rows scale with a zero replacement cost instead of throwing", () => {
  const rows = penaltyLadder({ ...iso, replacementCost: 0 }, [10, 50]);
  close(rows[0].loss, 0);
  close(rows[0].payout, 0);
});

// ------------------------------------------------------------- margin clause

const margin = { scheduledValue: 10_000_000, marginPct: 110, replacementCostToday: 10_500_000 };

test("margin clause caps recovery at SOV x margin", () => {
  const m = marginClauseResult(margin);
  close(m.cap, 11_000_000);
  close(m.totalLossRecovery, 10_500_000); // RC is under the cap
  close(m.totalLossGap, 0);
  assert.equal(m.hasGap, false);
});

test("a margin clause gap shows up once RC clears the cap", () => {
  const m = marginClauseResult({ ...margin, replacementCostToday: 12_000_000 });
  close(m.cap, 11_000_000);
  close(m.totalLossRecovery, 11_000_000);
  close(m.totalLossGap, 1_000_000);
  assert.equal(m.hasGap, true);
});

test("SOV needed so the margin covers today's RC, and the shortfall against it", () => {
  const m = marginClauseResult({ ...margin, replacementCostToday: 12_000_000 });
  close(m.sovNeeded, 12_000_000 / 1.1);
  close(m.sovShortfall, 12_000_000 / 1.1 - 10_000_000);
});

test("margin recovery on a partial loss is held to the cap", () => {
  close(marginClauseRecovery(11_000_000, 5_000_000), 5_000_000);
  close(marginClauseRecovery(11_000_000, 15_000_000), 11_000_000);
});

test("zero SOV or zero margin percent produces a zero cap, not NaN", () => {
  close(marginClauseResult({ ...margin, scheduledValue: 0 }).cap, 0);
  close(marginClauseResult({ ...margin, marginPct: 0 }).cap, 0);
});

// ------------------------------------------------------------ stale valuation

test("trended replacement cost compounds the last known value forward", () => {
  close(trendedReplacementCost(8_000_000, 5, 5), 8_000_000 * Math.pow(1.05, 5));
});

test("zero years since the appraisal returns the appraisal value unchanged", () => {
  close(trendedReplacementCost(8_000_000, 0, 5), 8_000_000);
});

test("a zero or blank last value trends to zero instead of NaN", () => {
  close(trendedReplacementCost(0, 5, 5), 0);
});

// -------------------------------------------------------------- cost to cure

test("cost to cure prices the shortfall at the given rate per $100 of TIV", () => {
  close(costToCure(2_700_000, 0.45), 12_150); // 27,000 units of $100 x $0.45
});

test("no shortfall or no rate means no cost to cure", () => {
  close(costToCure(0, 0.45), 0);
  close(costToCure(2_700_000, 0), 0);
});
