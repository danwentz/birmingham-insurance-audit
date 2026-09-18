import test from "node:test";
import assert from "node:assert/strict";
import {
  baseline,
  scenario,
  premiumIncreaseToBreachDscr,
  sensitivityGrid,
  windDeductibleExposure,
  itvGap,
  lossOfRentsCheck,
  buyDownBreakeven,
} from "./calc.js";

const close = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${expected}, got ${actual} (tol ${tol})`,
  );

// 1,400 units at $1,400/mo, 93% occupancy, $980k premium, $10M opex, 5.5% cap.
const portfolio = {
  units: 1400,
  annualPremium: 980_000,
  avgRentMonthly: 1400,
  occupancyPct: 93,
  totalOpexAnnual: 10_000_000,
  capRatePct: 5.5,
  annualDebtService: 9_000_000,
  largestBuildingTiv: 30_000_000,
  windDeductiblePct: 5,
  insuredValue: 200_000_000,
  replacementCost: 260_000_000,
  lossOfRentsLimit: 3_000_000,
  indemnityMonths: 12,
};

test("baseline rolls rent into EGI, NOI, and value", () => {
  const b = baseline(portfolio);
  close(b.grossPotentialRent, 23_520_000);
  close(b.egi, 21_873_600);
  close(b.noi, 11_873_600);
  close(b.value, 215_883_636.36, 1);
  close(b.opexRatio, 0.4572, 0.0001);
});

test("insurance ratios are the benchmarks operators already track", () => {
  const b = baseline(portfolio);
  close(b.insurancePerUnit, 700);
  close(b.insurancePctOfEgi, 0.0448, 0.0001);
  close(b.insurancePctOfOpex, 0.098, 0.0001);
});

test("premium capitalizes: $980k at a 5.5% cap is $17.8M of value", () => {
  const b = baseline(portfolio);
  close(b.capitalizedInsurance, 17_818_181.82, 1);
  close(b.valuePerPremiumDollar, 18.1818, 0.0001);
});

test("a 15% premium cut adds NOI dollar-for-dollar and value at the cap", () => {
  const s = scenario(portfolio, -0.15);
  close(s.newPremium, 833_000);
  close(s.premiumDelta, -147_000);
  close(s.newNoi, 12_020_600);
  close(s.valueDelta, 2_672_727.27, 1);
  close(s.valueDeltaPerUnit, 1909.09, 0.01);
});

test("a premium increase destroys value symmetrically", () => {
  const up = scenario(portfolio, 0.2);
  close(up.premiumDelta, 196_000);
  close(up.valueDelta, -3_563_636.36, 1);
  close(up.newDscr, (11_873_600 - 196_000) / 9_000_000, 0.0001);
});

test("a zero premium change is a no-op", () => {
  const s = scenario(portfolio, 0);
  const b = baseline(portfolio);
  close(s.newNoi, b.noi);
  close(s.valueDelta, 0);
});

test("DSCR and the distance to a covenant breach", () => {
  const b = baseline(portfolio);
  close(b.dscr, 1.31929, 0.00001);
  close(b.cashFlowAfterDebt, 2_873_600);
  // (NOI - 1.20 x ADS) / premium
  close(premiumIncreaseToBreachDscr(portfolio), 1.09551, 0.00001);
});

test("a thinner deal breaches on a plausible increase", () => {
  const levered = { ...portfolio, annualDebtService: 9_600_000 };
  close(premiumIncreaseToBreachDscr(levered), 0.360816, 0.000001);
  // Sanity: applying exactly that increase lands on the covenant.
  const atBreach = scenario(levered, premiumIncreaseToBreachDscr(levered));
  close(atBreach.newDscr, 1.2, 0.0001);
});

test("no debt means no DSCR and no breach point", () => {
  const unlevered = { ...portfolio, annualDebtService: undefined };
  assert.equal(baseline(unlevered).dscr, null);
  assert.equal(baseline(unlevered).cashFlowAfterDebt, null);
  assert.equal(premiumIncreaseToBreachDscr(unlevered), null);
});

test("sensitivity grid: value delta widens as the cap rate compresses", () => {
  const grid = sensitivityGrid(portfolio, [-0.1, 0.1], [5, 6]);
  close(grid[0][0].valueDelta, 98_000 / 0.05, 1); // -10% premium, 5% cap
  close(grid[0][1].valueDelta, 98_000 / 0.06, 1);
  close(grid[1][0].valueDelta, -98_000 / 0.05, 1);
  assert.ok(grid[0][0].valueDelta > grid[0][1].valueDelta);
});

test("percentage wind deductible in dollars and months of NOI", () => {
  const w = windDeductibleExposure(portfolio);
  close(w.deductibleDollars, 1_500_000);
  close(w.monthsOfNoi, 1.51596, 0.00001);
  close(w.pctOfAnnualPremium, 1.53061, 0.00001);
});

test("no wind inputs, no wind section", () => {
  assert.equal(windDeductibleExposure({ ...portfolio, windDeductiblePct: 0 }), null);
  assert.equal(windDeductibleExposure({ ...portfolio, largestBuildingTiv: undefined }), null);
});

test("coinsurance cuts the claim when insured value trails replacement cost", () => {
  const g = itvGap(portfolio);
  close(g.requiredLimit, 234_000_000);
  close(g.shortfall, 34_000_000);
  close(g.payoutRatio, 0.854700, 0.000001);
  close(g.haircutOnFullLoss, 29_059_829.06, 1);
});

test("insuring to the coinsurance requirement removes the haircut", () => {
  const g = itvGap({ ...portfolio, insuredValue: 234_000_000 });
  assert.equal(g.payoutRatio, 1);
  close(g.shortfall, 0);
  close(g.haircutOnFullLoss, 0);
});

test("loss of rents limit against the real indemnity period", () => {
  const l = lossOfRentsCheck(portfolio);
  close(l.monthlyEgi, 1_822_800);
  close(l.requiredLimit, 21_873_600);
  close(l.gap, 18_873_600);
  close(l.monthsCovered, 1.645820, 0.000001);
});

test("buy-down breakeven is expected retained loss", () => {
  close(buyDownBreakeven(1_500_000, 250_000, 0.08), 100_000);
  close(buyDownBreakeven(250_000, 1_500_000, 0.08), 0);
});

test("a zero cap rate nulls the valuation instead of returning Infinity", () => {
  const b = baseline({ ...portfolio, capRatePct: 0 });
  assert.equal(b.value, null);
  assert.equal(b.capitalizedInsurance, null);
  assert.equal(b.valuePerPremiumDollar, null);
  assert.equal(scenario({ ...portfolio, capRatePct: 0 }, -0.1).valueDelta, null);
});

test("zero units nulls per-unit figures instead of dividing by zero", () => {
  const b = baseline({ ...portfolio, units: 0 });
  assert.equal(b.insurancePerUnit, null);
  assert.equal(scenario({ ...portfolio, units: 0 }, -0.1).valueDeltaPerUnit, null);
});

test("other income lifts EGI and therefore NOI", () => {
  const withOther = baseline({ ...portfolio, otherIncomeAnnual: 500_000 });
  close(withOther.egi, 22_373_600);
  close(withOther.noi, 12_373_600);
});

test("break-even occupancy covers opex plus debt service", () => {
  const b = baseline(portfolio);
  close(b.breakEvenOccupancyPct, (19_000_000 / 23_520_000) * 100, 0.0001);
});
