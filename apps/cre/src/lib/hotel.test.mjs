import test from "node:test";
import assert from "node:assert/strict";
import {
  baseline,
  scenario,
  premiumIncreaseToBreachDscr,
  breakEvenOccupancy,
  seasonality,
  monthsFundedFromPeak,
  revenueOverPeakWindow,
  businessIncomeCheck,
  sensitivityGrid,
} from "./hotel.js";

const close = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${expected}, got ${actual} (tol ${tol})`,
  );

// 180 keys at $210 ADR, 72% occupancy, $3.2M other revenue, $9.8M opex,
// $420k premium, 8.5% cap, $2.2M debt service.
const hotel = {
  keys: 180,
  adr: 210,
  occupancyPct: 72,
  otherRevenueAnnual: 3_200_000,
  totalOpexAnnual: 9_800_000,
  annualPremium: 420_000,
  capRatePct: 8.5,
  annualDebtService: 2_200_000,
};

test("RevPAR is ADR times occupancy, and rooms revenue follows", () => {
  const b = baseline(hotel);
  close(b.roomsAvailable, 65_700); // 180 keys x 365
  close(b.occupiedRooms, 47_304);
  close(b.revpar, 151.2);
  close(b.roomsRevenue, 9_933_840);
  close(b.totalRevenue, 13_133_840);
  close(b.trevpar, 199.906, 0.001);
});

test("insurance is a fixed charge, so it lands on EBITDA and value", () => {
  const b = baseline(hotel);
  close(b.ebitda, 3_333_840);
  close(b.value, 39_221_647.06, 0.5);
  close(b.valuePerKey, 217_898.04, 0.5);
  close(b.capitalizedInsurance, 4_941_176.47, 0.5);
  close(b.valuePerPremiumDollar, 11.7647, 0.0001);
});

test("premium reduces to the per-available-room unit hotels already use", () => {
  const b = baseline(hotel);
  close(b.insurancePerKey, 2_333.33);
  close(b.insurancePerAvailableRoom, 6.3927, 0.0001); // against $151.20 RevPAR
  close(b.insurancePerOccupiedRoom, 8.8787, 0.0001);
  close(b.insurancePctOfTotalRevenue, 0.031979, 0.000001);
  close(b.insurancePctOfOpex, 0.042857, 0.000001);
});

test("DSCR runs off EBITDA, not gross operating profit", () => {
  const b = baseline(hotel);
  close(b.dscr, 1.5154, 0.0001);
  close(b.cashFlowAfterDebt, 1_133_840);
});

test("no debt service means no DSCR rather than a divide by zero", () => {
  const b = baseline({ ...hotel, annualDebtService: undefined });
  assert.equal(b.dscr, null);
  assert.equal(b.cashFlowAfterDebt, null);
});

test("a premium increase capitalizes straight into value per key", () => {
  const s = scenario(hotel, 0.2);
  close(s.premiumDelta, 84_000);
  close(s.newEbitda, 3_249_840);
  close(s.valueDelta, -988_235.29, 0.5);
  close(s.valueDeltaPerKey, -5_490.2, 0.1);
  close(s.newDscr, 1.4772, 0.0001);
});

test("the ADR needed to offset is the premium change per occupied room", () => {
  const s = scenario(hotel, 0.2);
  close(s.adrToOffset, 1.7757, 0.0001); // $84,000 over 47,304 room nights
});

test("occupancy offset uses contribution, not rate", () => {
  // With no variable cost supplied, every dollar of rate flows through.
  close(scenario(hotel, 0.2).occupancyPointsToOffset, 0.6088, 0.0001);
  // At $45 a room night it takes more occupancy to cover the same dollars.
  const real = scenario({ ...hotel, variableCostPerOccupiedRoom: 45 }, 0.2);
  close(real.occupancyPointsToOffset, 0.7749, 0.0001);
});

test("a premium cut runs the same arithmetic backwards", () => {
  const s = scenario(hotel, -0.1);
  close(s.premiumDelta, -42_000);
  close(s.valueDelta, 494_117.65, 0.5);
  close(s.adrToOffset, -0.8879, 0.0001);
});

test("the covenant breach is solved in premium terms", () => {
  close(premiumIncreaseToBreachDscr(hotel), 0.60438, 0.00001);
  assert.equal(premiumIncreaseToBreachDscr({ ...hotel, annualDebtService: 0 }), null);
});

test("break-even occupancy needs the variable cost to exist", () => {
  assert.equal(breakEvenOccupancy(hotel), null);
  // A contribution of zero or less has no break-even.
  assert.equal(breakEvenOccupancy({ ...hotel, variableCostPerOccupiedRoom: 250 }), null);
});

test("break-even occupancy covers the fixed block, insurance included", () => {
  const be = breakEvenOccupancy({ ...hotel, variableCostPerOccupiedRoom: 45 });
  close(be.contributionPerOccupiedRoom, 165);
  close(be.fixedCostAnnual, 7_671_320);
  close(be.ebitdaBreakEvenPct, 41.2464, 0.0001);
  close(be.cashBreakEvenPct, 61.5407, 0.0001);
  close(be.headroomPoints, 30.7536, 0.0001);
});

test("seasonality needs a share strictly between 0 and 100", () => {
  assert.equal(seasonality(hotel), null);
  assert.equal(seasonality({ ...hotel, peakShareOfRevenuePct: 0 }), null);
  assert.equal(seasonality({ ...hotel, peakShareOfRevenuePct: 100 }), null);
  assert.equal(seasonality({ ...hotel, peakShareOfRevenuePct: 42, peakMonths: 12 }), null);
});

test("a peak month is worth more than an average one", () => {
  const s = seasonality({ ...hotel, peakShareOfRevenuePct: 42 });
  close(s.peakMonths, 3);
  close(s.averageMonthlyRevenue, 1_094_486.67);
  close(s.peakMonthlyRevenue, 1_838_737.6);
  close(s.offPeakMonthlyRevenue, 846_403.02);
  close(s.peakMultiple, 1.68, 0.0001); // 42% over 3 months vs 25% over 3
});

test("a limit drains faster when the closure starts in peak season", () => {
  const s = seasonality({ ...hotel, peakShareOfRevenuePct: 42 });
  close(monthsFundedFromPeak(9_000_000, s), 7.116, 0.001);
  // A limit inside the peak window never reaches the off-peak rate.
  close(monthsFundedFromPeak(3_000_000, s), 1.6316, 0.0001);
  close(monthsFundedFromPeak(0, s), 0);
});

test("a whole year is a whole year whenever it starts", () => {
  const s = seasonality({ ...hotel, peakShareOfRevenuePct: 42 });
  close(revenueOverPeakWindow(12, s), 13_133_840, 1);
  close(revenueOverPeakWindow(6, s), 8_055_421.87, 1); // vs $6.57M on average months
  close(revenueOverPeakWindow(18, s), 21_189_261.87, 1);
});

test("business income needs both a limit and an indemnity period", () => {
  assert.equal(businessIncomeCheck(hotel), null);
  assert.equal(businessIncomeCheck({ ...hotel, businessIncomeLimit: 9_000_000 }), null);
  assert.equal(businessIncomeCheck({ ...hotel, indemnityMonths: 12 }), null);
});

test("business income compares the average-month limit to a peak-season loss", () => {
  const bi = businessIncomeCheck({
    ...hotel,
    businessIncomeLimit: 9_000_000,
    indemnityMonths: 12,
    peakShareOfRevenuePct: 42,
  });
  close(bi.requiredOnAverage, 13_133_840);
  close(bi.gapOnAverage, 4_133_840);
  close(bi.monthsFundedOnAverage, 8.223, 0.001);
  close(bi.monthsFundedFromPeak, 7.116, 0.001);
  close(bi.requiredFromPeak, 13_133_840, 1);
});

test("without a seasonality input the peak columns stay null", () => {
  const bi = businessIncomeCheck({
    ...hotel,
    businessIncomeLimit: 9_000_000,
    indemnityMonths: 6,
  });
  close(bi.requiredOnAverage, 6_566_920);
  close(bi.gapOnAverage, 0); // $9M limit covers six average months
  assert.equal(bi.requiredFromPeak, null);
  assert.equal(bi.monthsFundedFromPeak, null);
});

test("a six-month closure starting in peak outruns a limit that looked adequate", () => {
  const bi = businessIncomeCheck({
    ...hotel,
    businessIncomeLimit: 9_000_000,
    indemnityMonths: 6,
    peakShareOfRevenuePct: 42,
  });
  close(bi.gapOnAverage, 0);
  close(bi.requiredFromPeak, 8_055_421.87, 1);
  close(bi.gapFromPeak, 0); // still inside, but only just
});

test("the sensitivity grid prices premium change against exit cap", () => {
  const grid = sensitivityGrid(hotel, [-0.1, 0.1], [8, 8.5]);
  close(grid[0][0].valueDelta, 525_000); // +$42k of NOI at an 8 cap
  close(grid[0][1].valueDelta, 494_117.65, 0.5);
  close(grid[1][0].valueDelta, -525_000);
  close(grid[1][1].valueDelta, -494_117.65, 0.5);
});
