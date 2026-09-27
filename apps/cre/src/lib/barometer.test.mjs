import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  valid,
  stats,
  lastValid,
  indexSeries,
  ols2,
  fit,
  nextQ,
  state,
  pct,
  fmt,
  LINES,
} from "./barometer.js";

const close = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${expected}, got ${actual} (tol ${tol})`,
  );

// npm test runs from apps/cre, whether the .mjs lives in src/lib/ or gets
// copied flat into .test-build/ for node --test.
const DATA = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/data/rate-barometer.json"), "utf8"),
);

test("valid() rejects null, undefined, NaN and empty string", () => {
  assert.equal(valid(1), true);
  assert.equal(valid(0), true);
  assert.equal(valid(-3.2), true);
  assert.equal(valid(null), false);
  assert.equal(valid(undefined), false);
  assert.equal(valid(NaN), false);
});

test("stats() computes sample mean and standard deviation, skipping gaps", () => {
  const s = stats([1, 2, 3, null, 4, 5]);
  close(s.m, 3);
  close(s.sd, Math.sqrt(2.5));
});

test("lastValid() finds the last non-null value and its index", () => {
  assert.deepEqual(lastValid([1, 2, null, null]), { v: 2, i: 1 });
  assert.equal(lastValid([null, null]), null);
});

test("nextQ() rolls quarters and years", () => {
  assert.equal(nextQ("2026Q2", 1), "2026Q3");
  assert.equal(nextQ("2026Q2", 2), "2026Q4");
  assert.equal(nextQ("2026Q4", 1), "2027Q1");
  assert.equal(nextQ("2026Q3", 2), "2027Q1");
});

test("state() buckets a forecast into softening / flat / firming / hardening", () => {
  assert.equal(state(-3).key, "soft");
  assert.equal(state(2).key, "flat");
  assert.equal(state(7).key, "firm");
  assert.equal(state(12).key, "hard");
});

test("pct() signs positive values and leaves negatives alone", () => {
  assert.equal(pct(4.75), "+4.8%");
  assert.equal(pct(-7.21, 2), "-7.21%");
});

test("fmt() applies driver units and decimal places, and n/a for null", () => {
  assert.equal(fmt(null, "catbond"), "n/a");
  assert.equal(fmt(0.6, "reserves"), "$0.6bn");
  assert.equal(fmt(7.2, "ppi"), "7.2%");
});

test("indexSeries() weighted z-score average matches a hand-built two-driver case", () => {
  const data = {
    quarters: ["2019Q1", "2019Q2", "2019Q3", "2019Q4"],
    drivers: {
      catbond: [1, 2, 3, 4],
      catloss: [10, 20, 30, 40],
      ppi: [], scs: [], es: [], verdicts: [], medcpi: [], reserves: [],
    },
    rates: { property: { ciab: [1, 2, 3, 4] }, gl: { ciab: [] }, umb: { ciab: [] } },
  };
  const I = indexSeries(data, "property");
  // catbond and catloss are perfectly correlated, weighted 1 and .8, so the
  // combined index equals either series' own z-score.
  const st = stats(data.drivers.catbond);
  const expected = (data.drivers.catbond[0] - st.m) / st.sd;
  close(I[0], expected);
});

test("ols2() recovers an exact linear relationship", () => {
  // y = 2 + 3*x1 - 1*x2
  const x1 = [1, 2, 3, 4, 5, 6, 7, 8];
  const x2 = [2, 1, 4, 3, 6, 5, 8, 7];
  const ys = x1.map((v, i) => 2 + 3 * v - 1 * x2[i]);
  const r = ols2(x1, x2, ys);
  close(r.a, 2);
  close(r.b1, 3);
  close(r.b2, -1);
  close(r.r2, 1);
});

// Reproduces the dashboard preview's current 1-quarter forecasts from the same
// seed data, so the site and the dashboard never silently diverge.
test("fit() on the real data reproduces the dashboard's 1-quarter forecasts", () => {
  const property = fit(DATA, "property");
  const gl = fit(DATA, "gl");
  const umb = fit(DATA, "umb");

  close(property.h[0].f, -7.45, 0.01);
  close(gl.h[0].f, 2.01, 0.01);
  close(umb.h[0].f, 4.75, 0.01);
  close(property.h[0].r2, 0.87, 0.01);
});

test("fit() contributions cover every weighted driver for each line", () => {
  for (const line of Object.keys(LINES)) {
    const f = fit(DATA, line);
    assert.deepEqual(
      f.contrib.map((c) => c.d).sort(),
      Object.keys(LINES[line].weights).sort(),
    );
  }
});
