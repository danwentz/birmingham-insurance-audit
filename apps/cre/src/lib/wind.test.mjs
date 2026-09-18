import test from "node:test";
import assert from "node:assert/strict";
import {
  locationDeductible,
  scheduleLines,
  windResult,
  seasonRetention,
  deductibleLadder,
  buyDownBreakeven,
} from "./wind.js";

const close = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${expected}, got ${actual} (tol ${tol})`,
  );

// Four-location Gulf schedule, 5% wind with a $250k per-location minimum.
// $64.5M insured, $4.8M NOI, $980k premium, 1,400 units.
const schedule = {
  locationValues: [30_000_000, 18_500_000, 12_000_000, 4_000_000],
  deductiblePct: 5,
  minimumPerLocation: 250_000,
  locationsHit: 2,
  flatDeductible: 250_000,
  annualNoi: 4_800_000,
  annualPremium: 980_000,
  units: 1400,
};

test("percentage deductible is a share of insured value", () => {
  const { deductible, minimumApplied } = locationDeductible(30_000_000, 5);
  close(deductible, 1_500_000);
  assert.equal(minimumApplied, false);
});

test("the dollar minimum binds on small locations", () => {
  const { deductible, minimumApplied } = locationDeductible(4_000_000, 5, 250_000);
  close(deductible, 250_000); // 5% would be $200k
  assert.equal(minimumApplied, true);
});

test("a deductible can never exceed the value it applies to", () => {
  const { deductible } = locationDeductible(100_000, 5, 250_000);
  close(deductible, 100_000);
});

test("zero percent or zero value retains nothing", () => {
  close(locationDeductible(30_000_000, 0).deductible, 0);
  close(locationDeductible(0, 5, 250_000).deductible, 0);
});

test("schedule sorts biggest deductible first and drops empty rows", () => {
  const lines = scheduleLines({ ...schedule, locationValues: [12_000_000, 0, 30_000_000] });
  assert.equal(lines.length, 2);
  close(lines[0].deductible, 1_500_000);
  close(lines[1].deductible, 600_000);
});

test("effective percent reflects the minimum, not the quoted percent", () => {
  const lines = scheduleLines(schedule);
  const small = lines[lines.length - 1];
  close(small.deductible, 250_000);
  close(small.effectivePct, 6.25);
});

test("one storm across two locations applies two deductibles", () => {
  const r = windResult(schedule);
  close(r.totalInsuredValue, 64_500_000);
  close(r.worst.deductible, 1_500_000);
  close(r.scheduleWide, 3_275_000);
  close(r.event.grossRetention, 2_425_000); // 1.5M + 925k
  close(r.event.retention, 2_425_000);
  assert.equal(r.event.capApplied, false);
});

test("retention translates into NOI, premium, and per-unit terms", () => {
  const { event } = windResult(schedule);
  close(event.monthsOfNoi, 6.0625);
  close(event.pctOfAnnualPremium, 2.4745, 0.0001);
  close(event.perUnit, 1732.14);
});

test("an occurrence cap limits what one storm retains", () => {
  const r = windResult({ ...schedule, occurrenceCap: 2_000_000 });
  close(r.event.grossRetention, 2_425_000);
  close(r.event.retention, 2_000_000);
  assert.equal(r.event.capApplied, true);
});

test("a cap above the gross retention does nothing", () => {
  const r = windResult({ ...schedule, occurrenceCap: 9_000_000 });
  close(r.event.retention, 2_425_000);
  assert.equal(r.event.capApplied, false);
});

test("locations hit is clamped to the schedule", () => {
  close(windResult({ ...schedule, locationsHit: 99 }).event.retention, 3_275_000);
  close(windResult({ ...schedule, locationsHit: 0 }).event.retention, 1_500_000);
});

test("the flat buy-down prices the retained difference", () => {
  const { flat } = windResult(schedule);
  close(flat.extraRetained, 2_175_000);
  close(flat.breakEvenAnnualCost, 326_250); // 2.175M x 15%
});

test("no flat deductible means no comparison", () => {
  assert.equal(windResult({ ...schedule, flatDeductible: undefined }).flat, null);
});

test("a flat deductible above the retention retains nothing extra", () => {
  const { flat } = windResult({ ...schedule, flatDeductible: 3_000_000 });
  close(flat.extraRetained, 0);
  close(flat.breakEvenAnnualCost, 0);
});

test("a two-storm season doubles retention until the aggregate caps it", () => {
  close(seasonRetention(2_425_000, 1, 3_000_000).retention, 2_425_000);
  const two = seasonRetention(2_425_000, 2, 3_000_000);
  close(two.retention, 3_000_000);
  assert.equal(two.capApplied, true);
  close(seasonRetention(2_425_000, 2).retention, 4_850_000);
});

test("the ladder shows the slope between quoted deductibles", () => {
  const rows = deductibleLadder(schedule, [1, 2, 5, 10]);
  close(rows[0].worstLocation, 300_000);
  close(rows[0].eventRetention, 550_000); // minimum binds on three of four
  close(rows[1].eventRetention, 970_000);
  close(rows[2].eventRetention, 2_425_000);
  close(rows[3].worstLocation, 3_000_000);
  close(rows[3].eventRetention, 4_850_000);
});

test("an empty schedule stays defined instead of throwing", () => {
  const r = windResult({ ...schedule, locationValues: [] });
  assert.equal(r.worst, null);
  close(r.scheduleWide, 0);
  assert.equal(r.event.locationsHit, 0);
});

test("a buy-down is worth its expected saving, never less than zero", () => {
  close(buyDownBreakeven(1_500_000, 250_000, 0.08), 100_000);
  close(buyDownBreakeven(250_000, 1_500_000, 0.08), 0);
});

test("the owner's own event probability drives the buy-down breakeven", () => {
  const { flat } = windResult({ ...schedule, eventProbability: 0.3 });
  close(flat.breakEvenAnnualCost, 652_500); // 2.175M x 30%
});

test("the occurrence cap is the real ceiling on one event", () => {
  const uncapped = windResult(schedule);
  assert.equal(uncapped.hasOccurrenceCap, false);
  close(uncapped.maxSingleEvent, 3_275_000); // the whole schedule

  // A cap above the event retention still binds the whole-schedule ceiling.
  const capped = windResult({ ...schedule, occurrenceCap: 3_000_000 });
  assert.equal(capped.hasOccurrenceCap, true);
  assert.equal(capped.event.capApplied, false); // 2.425M is under the cap
  close(capped.maxSingleEvent, 3_000_000);
});

test("an occurrence cap binds a single-location loss too", () => {
  const capped = windResult({ ...schedule, occurrenceCap: 1_000_000 });
  close(capped.worst.deductible, 1_500_000); // the clause
  close(capped.worstRetained, 1_000_000); // what you actually fund

  // And the ladder reports retention, not the uncapped clause.
  const rows = deductibleLadder({ ...schedule, occurrenceCap: 1_000_000 }, [5, 10]);
  close(rows[0].worstLocation, 1_000_000);
  close(rows[1].worstLocation, 1_000_000);
});
