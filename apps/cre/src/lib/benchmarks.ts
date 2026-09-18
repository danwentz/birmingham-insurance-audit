// Peer benchmark band for multifamily insurance cost per unit per year.
//
// DELIBERATELY EMPTY. The comparison only renders once SOURCE is set, so the
// page can never show a peer band we can't attribute. Fill both from a source
// you can defend to an underwriter or an asset manager (your own book, the
// NMHC/NAA operating-expense survey, a carrier's habitational data), then the
// "vs. peers" line appears on the calculator automatically.
export const PER_UNIT_SOURCE = "";

export type BenchmarkBand = { low: number; high: number };

/** Annual insurance cost per unit. Null until PER_UNIT_SOURCE is filled in. */
export const PER_UNIT_BAND: BenchmarkBand | null = null;

export const hasBenchmark = () => PER_UNIT_SOURCE !== "" && PER_UNIT_BAND !== null;
