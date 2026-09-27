// Pure SVG-geometry helpers shared by the gauge and the line chart. No React,
// no DOM — just numbers and path strings, so they're trivial to unit-test and
// safe to call during server render.

/** Point on a circle of radius r centered at (100,100), degrees measured from
 *  the positive x-axis, matching the gauge's semicircle layout. */
export function pt(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [100 + r * Math.cos(a), 100 - r * Math.sin(a)];
}

/** Arc path for the gauge's -10..+20 scale, mapped onto a 180deg sweep. */
export function gaugeArc(r: number, v1: number, v2: number): string {
  const d1 = 180 - ((v1 + 10) / 30) * 180;
  const d2 = 180 - ((v2 + 10) / 30) * 180;
  const [x1, y1] = pt(r, d1);
  const [x2, y2] = pt(r, d2);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/** Runs of consecutive non-null indices, so a gap in the data breaks the line
 *  instead of interpolating across it. */
export function runsOf(arr: (number | null)[]): number[][] {
  const rs: number[][] = [];
  let cur: number[] = [];
  arr.forEach((v, i) => {
    if (v !== null && v !== undefined && isFinite(v)) cur.push(i);
    else {
      if (cur.length) rs.push(cur);
      cur = [];
    }
  });
  if (cur.length) rs.push(cur);
  return rs;
}

export function linePath(
  run: number[],
  arr: (number | null)[],
  X: (i: number) => number,
  Y: (v: number) => number,
): string {
  return run
    .map((i, k) => `${k === 0 ? "M" : "L"}${X(i).toFixed(1)} ${Y(Number(arr[i])).toFixed(1)}`)
    .join(" ");
}

export function bridgePath(
  iA: number,
  iB: number,
  arr: (number | null)[],
  X: (i: number) => number,
  Y: (v: number) => number,
): string {
  return `M${X(iA).toFixed(1)} ${Y(Number(arr[iA])).toFixed(1)} L${X(iB).toFixed(1)} ${Y(
    Number(arr[iB]),
  ).toFixed(1)}`;
}

export type Dot = { i: number; x: number; y: number };

/** Small dots at the edges of each run (start/end), skipping one index that
 *  gets its own bigger marker (the current-value point). */
export function edgeDots(
  arr: (number | null)[],
  X: (i: number) => number,
  Y: (v: number) => number,
  skip: number | null,
): Dot[] {
  const rs = runsOf(arr);
  const dots: Dot[] = [];
  rs.forEach((r) => {
    const idxs = r[0] === r[r.length - 1] ? [r[0]] : [r[0], r[r.length - 1]];
    idxs.forEach((i) => {
      if (skip !== null && skip === i) return;
      dots.push({ i, x: X(i), y: Y(Number(arr[i])) });
    });
  });
  return dots;
}

export type Label = { x: number; y: number; t: string; anchor: "start" | "end" };

/** Greedy vertical de-collision for direct labels that land close together. */
export function spreadLabels(labels: Label[], minGap: number): Label[] {
  const sorted = [...labels].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].y - sorted[i - 1].y < minGap) sorted[i] = { ...sorted[i], y: sorted[i - 1].y + minGap };
  }
  return sorted;
}

/** 0..80 x 0..22 sparkline path for the last 12 points of a driver series. */
export function sparkPath(arr: (number | null)[]): { d: string; end: [number, number] | null } {
  const v = arr.slice(-12);
  const nums = v.filter((x): x is number => x !== null && x !== undefined && isFinite(x));
  if (nums.length < 2) return { d: "", end: null };
  const mn = Math.min(...nums);
  const mx = Math.max(...nums);
  const r = mx - mn || 1;
  let d = "";
  let pen = false;
  let end: [number, number] | null = null;
  v.forEach((x, i) => {
    if (x === null || x === undefined || !isFinite(x)) {
      pen = false;
      return;
    }
    const px = (i * 80) / (v.length - 1);
    const py = 20 - ((x - mn) / r) * 18;
    d += `${pen ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)} `;
    pen = true;
    end = [px, py];
  });
  return { d, end };
}
