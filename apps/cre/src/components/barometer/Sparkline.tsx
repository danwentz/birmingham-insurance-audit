import { sparkPath } from "./geometry";

/** Trailing-12-quarter trend line for one driver, used in the driver table. */
export function Sparkline({ series }: { series: (number | null)[] }) {
  const { d, end } = sparkPath(series);
  if (!d) return null;
  return (
    <svg width={80} height={22} viewBox="0 0 80 22" aria-hidden="true">
      <path d={d} fill="none" stroke="var(--color-slate)" strokeWidth={1.6} strokeLinecap="round" />
      {end && <circle cx={end[0]} cy={end[1]} r={2} fill="var(--color-slate)" />}
    </svg>
  );
}
