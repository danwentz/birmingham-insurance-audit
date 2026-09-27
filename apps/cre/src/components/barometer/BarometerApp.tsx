"use client";

import { useState } from "react";
import {
  LINES,
  lastValid,
  nextQ,
  pct,
  valid,
  state as barometerState,
  type LineKey,
  type Fit,
  type BarometerData,
  type StateKey,
} from "@/lib/barometer";
import { Gauge } from "./Gauge";
import { Chart } from "./Chart";
import { DriverTable } from "./DriverTable";
import { ZONE_COLOR } from "./colors";

const LINE_ORDER: LineKey[] = ["property", "gl", "umb"];

export function BarometerApp({
  data,
  fits,
  defaultLine = "property",
}: {
  data: BarometerData;
  fits: Record<LineKey, Fit>;
  defaultLine?: LineKey;
}) {
  const [sel, setSel] = useState<LineKey>(defaultLine);

  return (
    <>
      <div role="group" aria-label="Choose a line of coverage" className="mt-10 grid gap-3 sm:grid-cols-3">
        {LINE_ORDER.map((l) => {
          const h1 = fits[l].h[0];
          const selected = l === sel;
          const st = h1 ? barometerState(h1.f) : null;
          return (
            <button
              key={l}
              type="button"
              aria-pressed={selected}
              onClick={() => setSel(l)}
              className={`flex flex-col items-center gap-1 rounded-md border bg-white px-4 py-4 text-center transition-colors sm:flex-row sm:gap-4 sm:text-left ${
                selected ? "border-obsidian shadow-[inset_0_0_0_1px_theme(colors.obsidian)]" : "border-gold/25 hover:border-gold/50"
              }`}
            >
              <div className="w-full max-w-[130px] flex-none sm:max-w-[110px]">
                <Gauge value={h1 ? h1.f : null} title={`${LINES[l].name} gauge`} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold text-obsidian">{LINES[l].name}</div>
                {h1 && st ? (
                  <>
                    <div className="font-mono text-2xl font-bold tabular-nums text-obsidian">{pct(h1.f)}</div>
                    <div className="text-sm font-semibold" style={{ color: ZONE_COLOR[st.key as StateKey] }}>
                      {st.label}
                    </div>
                    <div className="text-xs text-slate">
                      {pct(h1.lo, 0)} to {pct(h1.hi, 0)} next quarter
                    </div>
                  </>
                ) : (
                  <div className="mt-1 text-xs text-slate">Needs 8+ quarters with CIAB rates and drivers.</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <LineDetail line={sel} data={data} fit={fits[sel]} />
    </>
  );
}

function LineDetail({ line, data, fit }: { line: LineKey; data: BarometerData; fit: Fit }) {
  const y = data.rates[line].ciab;
  const q = data.quarters;
  const lastQ = q[q.length - 1];
  const ly = lastValid(y);

  const rows = q.map((qq, i) => ({ q: qq, v: valid(y[i]) ? pct(Number(y[i])) : "n/a" }));
  fit.h.forEach((h, k) => {
    if (h) rows.push({ q: `${nextQ(lastQ, k + 1)} (forecast)`, v: `${pct(h.f)} (${pct(h.lo, 0)} to ${pct(h.hi, 0)})` });
  });

  return (
    <section className="mt-6 rounded-md border border-gold/20 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian">{LINES[line].name}</h2>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
        <Stat label={`CIAB, ${ly ? q[ly.i] : "n/a"}`} value={ly ? pct(ly.v) : "n/a"} />
        {fit.h.map((h, k) =>
          h ? (
            <Stat
              key={k}
              label={`${nextQ(lastQ, k + 1)} forecast`}
              value={pct(h.f)}
              sub={`${pct(h.lo, 0)} to ${pct(h.hi, 0)}`}
            />
          ) : null,
        )}
        {fit.h[0] && <Stat label="Model fit (R², 1 qtr)" value={fit.h[0].r2.toFixed(2)} sub={`${fit.h[0].n} quarters`} />}
      </div>

      <Chart quarters={q} series={y} fit={fit} lineName={LINES[line].name} />

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-0 w-4 border-t-[2.5px] border-obsidian align-middle" />
          CIAB renewal change
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-4 rounded-[1px] bg-gold/25 align-middle" />
          Forecast, 80% range
        </span>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-[13px] font-semibold text-slate">Show data</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[24rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gold/30 text-left">
                <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Quarter</th>
                <th className="py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                  CIAB renewal change
                </th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {rows.map((r) => (
                <tr key={r.q} className="border-b border-gold/15">
                  <td className="py-2 pr-4 font-sans text-obsidian">{r.q}</td>
                  <td className="py-2 text-obsidian">{r.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <h3 className="mt-8 font-display text-xl font-semibold text-obsidian">What&apos;s pushing it</h3>
      <DriverTable contrib={fit.contrib} />
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-[120px]">
      <span className="block text-xs text-slate">{label}</span>
      <b className="block font-mono text-xl font-bold tabular-nums text-obsidian">{value}</b>
      {sub && <span className="block text-xs text-slate">{sub}</span>}
    </div>
  );
}
