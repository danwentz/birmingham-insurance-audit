// Commercial insurance rate barometer: model math ported as-is from the
// standalone dashboard (rate-barometer.html) so the numbers on the site match
// the dashboard's preview exactly. Pure functions, no React, no I/O.
//
// The model: each driver is standardized against its own history since 2019
// (z-score), the driver z-scores for a line are combined into a weighted
// "pressure index," and next quarter's CIAB renewal rate change is estimated
// from that index plus the current quarter's CIAB rate (a lagged term, so the
// forecast anchors on where rates already are, not just where pressure points).

export type DriverKey =
  | "catbond"
  | "catloss"
  | "ppi"
  | "scs"
  | "es"
  | "verdicts"
  | "medcpi"
  | "reserves";

export type LineKey = "property" | "gl" | "umb";

export type BarometerData = {
  quarters: string[];
  drivers: Record<DriverKey, (number | null)[]>;
  rates: Record<LineKey, { ciab: (number | null)[] }>;
};

export type LineMeta = {
  name: string;
  weights: Partial<Record<DriverKey, number>>;
};

export const LINES: Record<LineKey, LineMeta> = {
  property: {
    name: "Property",
    weights: { catbond: 1, catloss: 0.8, ppi: 0.6, scs: 0.5, es: 0.5 },
  },
  gl: {
    name: "General liability",
    weights: { verdicts: 1, medcpi: 0.5, reserves: 0.8 },
  },
  umb: {
    name: "Umbrella and excess",
    weights: { verdicts: 1, reserves: 1, es: 0.4 },
  },
};

export type DriverMeta = {
  name: string;
  unit: string;
  src: string;
  dp: number;
};

// Source labels as currently cited (see PROGRESS.md / HANDOFF.md in the dashboard repo).
export const DRIVERS: Record<DriverKey, DriverMeta> = {
  catbond: {
    name: "Cat bond spread over expected loss",
    unit: "%",
    src: "Artemis quarterly ILS reports, Plenum Investments",
    dp: 2,
  },
  catloss: {
    name: "Insured cat losses vs 10-year average",
    unit: "%",
    src: "Munich Re NatCatSERVICE (H1 and full-year releases)",
    dp: 0,
  },
  ppi: {
    name: "Construction input prices, YoY",
    unit: "%",
    src: "BLS PPI via FRED",
    dp: 1,
  },
  scs: {
    name: "U.S. hail and tornado reports, YoY",
    unit: "%",
    src: "NOAA NCEI Storm Events Database",
    dp: 0,
  },
  es: {
    name: "E&S premium growth, YoY",
    unit: "%",
    src: "WSIA 15-state stamping office reports",
    dp: 1,
  },
  verdicts: {
    name: "Nuclear verdicts, trailing year",
    unit: "",
    src: "Marathon Strategies",
    dp: 0,
  },
  medcpi: {
    name: "Medical care CPI, YoY",
    unit: "%",
    src: "BLS CPI via FRED",
    dp: 1,
  },
  reserves: {
    name: "Casualty reserve charges, trailing year",
    unit: " $bn",
    src: "The Hartford and CNA 10-Q/10-K prior-year development: GL, umbrella/excess, commercial auto",
    dp: 1,
  },
};

export function valid(v: unknown): v is number {
  return v !== null && v !== undefined && v !== ("" as unknown) && typeof v === "number" && isFinite(v);
}

export function stats(arr: (number | null)[]): { m: number; sd: number } {
  const v = arr.filter(valid).map(Number);
  if (!v.length) return { m: 0, sd: 1 };
  const m = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, v.length - 1)) || 1;
  return { m, sd };
}

export function lastValid(arr: (number | null)[]): { v: number; i: number } | null {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (valid(arr[i])) return { v: Number(arr[i]), i };
  }
  return null;
}

/** Weighted average of each driver's z-score, for one line, one quarter at a time. */
export function indexSeries(data: BarometerData, line: LineKey): (number | null)[] {
  const w = LINES[line].weights;
  const st: Partial<Record<DriverKey, { m: number; sd: number }>> = {};
  for (const d of Object.keys(w) as DriverKey[]) st[d] = stats(data.drivers[d] || []);
  return data.quarters.map((_, t) => {
    let s = 0;
    let ws = 0;
    for (const d of Object.keys(w) as DriverKey[]) {
      const v = (data.drivers[d] || [])[t];
      if (!valid(v)) continue;
      const wt = w[d] as number;
      const stat = st[d]!;
      s += wt * (v - stat.m) / stat.sd;
      ws += wt;
    }
    return ws ? s / ws : null;
  });
}

export type Ols2Result = { a: number; b1: number; b2: number; sd: number; r2: number };

// y = a + b1*x1 + b2*x2 via centered normal equations; null if x1, x2 are collinear.
export function ols2(x1: number[], x2: number[], ys: number[]): Ols2Result | null {
  const n = ys.length;
  const m = (a: number[]) => a.reduce((s, v) => s + v, 0) / n;
  const m1 = m(x1),
    m2 = m(x2),
    my = m(ys);
  let s11 = 0,
    s12 = 0,
    s22 = 0,
    s1y = 0,
    s2y = 0,
    syy = 0;
  for (let i = 0; i < n; i++) {
    const a = x1[i] - m1,
      b = x2[i] - m2,
      c = ys[i] - my;
    s11 += a * a;
    s12 += a * b;
    s22 += b * b;
    s1y += a * c;
    s2y += b * c;
    syy += c * c;
  }
  const det = s11 * s22 - s12 * s12;
  if (Math.abs(det) < 1e-9) return null;
  const b1 = (s22 * s1y - s12 * s2y) / det;
  const b2 = (s11 * s2y - s12 * s1y) / det;
  const a = my - b1 * m1 - b2 * m2;
  let sse = 0;
  for (let i = 0; i < n; i++) sse += (ys[i] - a - b1 * x1[i] - b2 * x2[i]) ** 2;
  return { a, b1, b2, sd: Math.sqrt(sse / Math.max(1, n - 3)), r2: syy ? 1 - sse / syy : 0 };
}

export type Horizon = { f: number; lo: number; hi: number; n: number; r2: number };

export type Contrib = {
  d: DriverKey;
  latest: number | null;
  prev: number | null;
  z: number;
  c: number;
  series: (number | null)[];
};

export type Fit = {
  I: (number | null)[];
  /** [1-quarter-ahead, 2-quarter-ahead], null when there isn't enough history. */
  h: (Horizon | null)[];
  contrib: Contrib[];
};

export function fit(data: BarometerData, line: LineKey): Fit {
  const I = indexSeries(data, line);
  const y = data.rates[line].ciab;
  // Forecast origin: latest quarter with both the index and a CIAB rate.
  let o = -1;
  for (let t = y.length - 1; t >= 0; t--) {
    if (valid(I[t]) && valid(y[t])) {
      o = t;
      break;
    }
  }
  const h = [1, 2].map((h): Horizon | null => {
    const x1: number[] = [],
      x2: number[] = [],
      ys: number[] = [];
    for (let t = 0; t + h < y.length; t++) {
      if (valid(I[t]) && valid(y[t]) && valid(y[t + h])) {
        x1.push(I[t] as number);
        x2.push(Number(y[t]));
        ys.push(Number(y[t + h]));
      }
    }
    if (ys.length < 8 || o < 0) return null;
    const r = ols2(x1, x2, ys);
    if (!r) return null;
    const f = r.a + r.b1 * (I[o] as number) + r.b2 * Number(y[o]);
    return { f, lo: f - 1.28 * r.sd, hi: f + 1.28 * r.sd, n: ys.length, r2: r.r2 };
  });

  const w = LINES[line].weights;
  let ws = 0;
  for (const d of Object.keys(w) as DriverKey[]) ws += w[d] as number;
  const contrib: Contrib[] = (Object.keys(w) as DriverKey[]).map((d) => {
    const arr = data.drivers[d] || [];
    const lv = lastValid(arr);
    const st = stats(arr);
    if (!lv) return { d, latest: null, z: 0, c: 0, prev: null, series: arr };
    const prev = valid(arr[lv.i - 4]) ? Number(arr[lv.i - 4]) : null;
    const z = (lv.v - st.m) / st.sd;
    return { d, latest: lv.v, prev, z, c: (w[d] as number) * z / ws, series: arr };
  });

  return { I, h, contrib };
}

/** "2026Q2" + 1 -> "2026Q3"; rolls into the next year past Q4. */
export function nextQ(q: string, k: number): string {
  let y = +q.slice(0, 4);
  let n = +q.slice(5) + k;
  while (n > 4) {
    n -= 4;
    y++;
  }
  return y + "Q" + n;
}

export type StateKey = "soft" | "flat" | "firm" | "hard";

export function state(f: number): { label: string; key: StateKey } {
  if (f < 0) return { label: "Softening", key: "soft" };
  if (f < 5) return { label: "Flat to modest", key: "flat" };
  if (f < 10) return { label: "Firming", key: "firm" };
  return { label: "Hardening", key: "hard" };
}

export function pct(v: number, dp = 1): string {
  return (v > 0 ? "+" : "") + v.toFixed(dp) + "%";
}

export function fmt(v: number | null, d: DriverKey): string {
  const D = DRIVERS[d];
  if (v == null) return "n/a";
  if (D.unit === " $bn") return "$" + v.toFixed(D.dp) + "bn";
  return v.toLocaleString(undefined, { minimumFractionDigits: D.dp, maximumFractionDigits: D.dp }) + D.unit;
}
