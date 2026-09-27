import { DRIVERS, fmt, type Contrib } from "@/lib/barometer";
import { Sparkline } from "./Sparkline";

/** Horizontal push bar: how much this driver adds to (right, hard/red) or
 *  subtracts from (left, soft/green) the pressure index, scaled to the
 *  largest contribution among this line's drivers. */
function PushBar({ c, maxAbs }: { c: number; maxAbs: number }) {
  const w = (Math.abs(c) / maxAbs) * 50;
  const up = c >= 0;
  const left = up ? 50 : 50 - w;
  return (
    <div
      className="relative h-3.5 w-full max-w-[160px] rounded-sm bg-ivory"
      title={up ? "Pushing rates up" : "Holding rates down"}
    >
      <div className="absolute inset-y-[-2px] left-1/2 border-l border-slate/50" aria-hidden="true" />
      <span
        className="absolute top-[2px] h-2.5 rounded-[1px]"
        style={{ left: `${left}%`, width: `${w}%`, background: up ? "#a5233a" : "#0e8a58" }}
      />
    </div>
  );
}

export function DriverTable({ contrib }: { contrib: Contrib[] }) {
  const sorted = [...contrib].sort((a, b) => Math.abs(b.c) - Math.abs(a.c));
  const maxAbs = Math.max(0.5, ...contrib.map((x) => Math.abs(x.c)));

  return (
    <div className="mt-4">
      {/* Desktop / tablet: table */}
      <table className="hidden w-full border-collapse text-sm sm:table">
        <thead>
          <tr className="border-b border-gold/30 text-left">
            <th className="py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
              Driver
            </th>
            <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
              Latest
            </th>
            <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
              A year earlier
            </th>
            <th className="py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
              Trend
            </th>
            <th className="py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
              Push on rate
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((x) => {
            const D = DRIVERS[x.d];
            return (
              <tr key={x.d} className="border-b border-gold/15 align-middle">
                <td className="py-3 pr-4 text-obsidian">
                  {D.name}
                  <div className="text-xs text-slate">{D.src}</div>
                </td>
                <td className="py-3 pr-4 text-right font-mono tabular-nums text-obsidian">
                  {fmt(x.latest, x.d)}
                </td>
                <td className="py-3 pr-4 text-right font-mono tabular-nums text-slate">
                  {fmt(x.prev, x.d)}
                </td>
                <td className="py-3 pr-4">
                  <Sparkline series={x.series} />
                </td>
                <td className="py-3">
                  <PushBar c={x.c} maxAbs={maxAbs} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile: stacked cards */}
      <div className="space-y-4 sm:hidden">
        {sorted.map((x) => {
          const D = DRIVERS[x.d];
          return (
            <div key={x.d} className="border-b border-gold/15 pb-4">
              <p className="text-obsidian">{D.name}</p>
              <p className="text-xs text-slate">{D.src}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="font-mono tabular-nums text-obsidian">
                  Latest: {fmt(x.latest, x.d)}
                </span>
                <span className="font-mono tabular-nums text-slate">
                  A year earlier: {fmt(x.prev, x.d)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <Sparkline series={x.series} />
                <PushBar c={x.c} maxAbs={maxAbs} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
