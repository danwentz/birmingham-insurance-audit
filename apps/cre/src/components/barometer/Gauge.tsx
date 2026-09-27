import { pt, gaugeArc } from "./geometry";
import { ZONES, ZONE_COLOR } from "./colors";

const TICKS = [-10, 0, 10, 20];

/** Semicircular -10%..+20% gauge with a needle. Pure presentational; the
 *  needle rotation is driven by a CSS transform so it eases when the caller
 *  swaps `value` (e.g. switching lines), matching the dashboard's needle
 *  animation but respecting reduced-motion. */
export function Gauge({ value, title }: { value: number | null; title: string }) {
  const c = Math.max(-10, Math.min(20, value ?? 0));
  const deg = ((c + 10) / 30) * 180;

  return (
    <svg viewBox="0 0 200 118" aria-hidden="true" role="img" className="w-full max-w-[190px]">
      <title>{title}</title>
      {ZONES.map((z) => (
        <path
          key={z.key}
          d={gaugeArc(80, z.a, z.b)}
          fill="none"
          stroke={ZONE_COLOR[z.key]}
          strokeWidth={13}
          opacity={0.9}
        />
      ))}
      {TICKS.map((t) => {
        const d = 180 - ((t + 10) / 30) * 180;
        const [x1, y1] = pt(66, d);
        const [x2, y2] = pt(58, d);
        const [lx, ly] = pt(46, d);
        return (
          <g key={t}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-slate)" strokeWidth={1.5} />
            <text
              x={lx}
              y={ly + 4}
              fontSize={10}
              textAnchor="middle"
              fill="var(--color-slate)"
              fontFamily="var(--font-body)"
            >
              {t > 0 ? "+" : ""}
              {t}
            </text>
          </g>
        );
      })}
      {value !== null && (
        <g
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
          style={{ transformOrigin: "100px 100px", transform: `rotate(${deg}deg)` }}
        >
          <line
            x1={100}
            y1={100}
            x2={28}
            y2={100}
            stroke="var(--color-obsidian)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      )}
      <circle cx={100} cy={100} r={6} fill="var(--color-obsidian)" />
    </svg>
  );
}
