// Display formatting only. Keep rounding decisions here, not in calc.ts.

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Two decimals — for per-room-night figures, where the cents are the story.
 *  RevPAR of $151.20 rounded to $151 loses the comparison it exists to make. */
export const usdCents = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const signedUsdCents = (n: number) => (n > 0 ? `+${usdCents(n)}` : usdCents(n));

/** $2.7M / $980K / $700 — for headline figures where precision is noise. */
export function usdCompact(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2)}M`;
  if (abs >= 1_000)
    return `${sign}$${abs >= 10_000 ? Math.round(abs / 1_000) : (abs / 1_000).toFixed(1)}K`;
  return `${sign}$${Math.round(abs)}`;
}

export const signedUsd = (n: number) => (n > 0 ? `+${usd(n)}` : usd(n));

export const signedUsdCompact = (n: number) => (n > 0 ? `+${usdCompact(n)}` : usdCompact(n));

/** Takes a fraction (0.0448) and returns "4.5%". */
export const pct = (fraction: number, digits = 1) => `${(fraction * 100).toFixed(digits)}%`;

export const signedPct = (fraction: number, digits = 1) =>
  `${fraction > 0 ? "+" : ""}${(fraction * 100).toFixed(digits)}%`;

export const ratio = (n: number) => `${n.toFixed(2)}x`;

export const int = (n: number) => Math.round(n).toLocaleString("en-US");

/** "a" or "an" for a spoken number — 8, 11 and 18 take "an". The article follows
 *  the first sound, so it reads the integer part: 8.5 is "an eight point five",
 *  while 7.5 is "a seven point five". Indemnity periods and cap rates only run to
 *  a few dozen, so the small cases are the whole domain. */
export const article = (n: number) => ([8, 11, 18].includes(Math.floor(n)) ? "an" : "a");

export const months = (n: number) => `${n.toFixed(1)} ${n === 1 ? "month" : "months"}`;

/** Digit grouping for text inputs, so operators can type 980,000. */
export function groupDigits(raw: string) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return rest.length ? `${grouped}.${rest.join("")}` : grouped;
}

export const parseNum = (raw: string) => {
  const n = Number(raw.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
