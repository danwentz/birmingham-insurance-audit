"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lastValid, nextQ, pct, valid, type Fit } from "@/lib/barometer";
import { linePath, bridgePath, edgeDots, spreadLabels, runsOf, type Label } from "./geometry";

const H = 280;
const MARGIN = { L: 46, R: 54, T: 14, B: 34 };

type TooltipRow = { label: string; color: string; value: string; extra?: string; dash?: boolean };

/** Renewal-rate-change history + 2-quarter forecast, with a shared hover
 *  crosshair (pointer or keyboard) and a floating tooltip. Client-only: it
 *  measures its own container width with ResizeObserver so the chart draws
 *  at real width on narrow screens instead of assuming viewport width. */
export function Chart({
  quarters,
  series,
  fit,
  lineName,
}: {
  quarters: string[];
  series: (number | null)[];
  fit: Fit;
  lineName: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(640);
  const [hoverI, setHoverI] = useState<number | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w < 560 ? Math.max(300, w) : Math.min(640, w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = quarters.length;
  const narrow = width < 560;
  const W = narrow ? Math.max(300, width) : 640;

  const geo = useMemo(() => {
    const fc = fit.h.filter((h): h is NonNullable<typeof h> => !!h);
    const all: number[] = series.filter(valid).map(Number);
    fc.forEach((f) => all.push(f.lo, f.hi));
    let mn = Math.min(0, ...all);
    let mx = Math.max(0, ...all);
    mn = Math.floor(mn / 5) * 5;
    mx = Math.ceil(mx / 5) * 5;
    if (mx === mn) mx += 5;
    const hasFc = !!(fit.h[0] && fit.h[1]);
    const lv = lastValid(series);
    const { L, R, T, B } = MARGIN;
    const X = (i: number) => L + (i * (W - L - R)) / (n + 1);
    const Y = (v: number) => T + ((mx - v) * (H - T - B)) / (mx - mn);
    const invX = (xu: number) => ((xu - L) * (n + 1)) / (W - L - R);
    const maxIdx = hasFc ? n + 1 : lv ? lv.i : 0;
    return { mn, mx, hasFc, lv, X, Y, invX, maxIdx };
  }, [series, fit, n, W]);

  const { mn, mx, hasFc, lv, X, Y, invX, maxIdx } = geo;

  const paint = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const xu = vb.x + ((clientX - r.left) / r.width) * vb.width;
    const i = Math.max(0, Math.min(maxIdx, Math.round(invX(xu))));
    setHoverI(i);
    const px = r.left + ((X(i) - vb.x) / vb.width) * r.width;
    const py = r.top + (((MARGIN.T + H - MARGIN.B) / 2 - vb.y) / vb.height) * r.height;
    setTip({ x: px, y: py });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let i = hoverI ?? maxIdx;
    if (e.key === "ArrowLeft") i = Math.max(0, i - 1);
    else if (e.key === "ArrowRight") i = Math.min(maxIdx, i + 1);
    else return;
    e.preventDefault();
    setHoverI(i);
    const px = X(i);
    const py = (MARGIN.T + H - MARGIN.B) / 2;
    const svg = svgRef.current;
    if (svg) {
      const r = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      setTip({
        x: r.left + ((px - vb.x) / vb.width) * r.width,
        y: r.top + ((py - vb.y) / vb.height) * r.height,
      });
    }
  };

  const rows: TooltipRow[] | null = useMemo(() => {
    if (hoverI === null) return null;
    if (hoverI < n) {
      return [
        {
          label: "CIAB renewal change",
          color: "var(--color-obsidian)",
          value: valid(series[hoverI]) ? pct(Number(series[hoverI])) : "no data",
        },
      ];
    }
    const h = hoverI === n ? fit.h[0] : fit.h[1];
    if (!h) return [{ label: "Forecast", color: "var(--color-obsidian)", dash: true, value: "n/a" }];
    return [
      {
        label: "Forecast",
        color: "var(--color-obsidian)",
        dash: true,
        value: pct(h.f),
        extra: `80% range: ${pct(h.lo, 0)} to ${pct(h.hi, 0)}`,
      },
    ];
  }, [hoverI, n, series, fit]);

  const tipLabel = hoverI === null ? "" : hoverI < n ? quarters[hoverI] : nextQ(quarters[n - 1], hoverI - n + 1);

  const runs = runsOf(series);
  const labels: Label[] = [];
  if (hasFc && lv && fit.h[0] && fit.h[1]) {
    labels.push(
      { x: X(n) + 8, y: Y(fit.h[0].f), t: pct(fit.h[0].f), anchor: "start" },
      { x: X(n + 1) + 8, y: Y(fit.h[1].f), t: pct(fit.h[1].f), anchor: "start" },
    );
  }
  if (lv) labels.push({ x: X(lv.i) - 8, y: Y(lv.v), t: pct(lv.v), anchor: "end" });
  const placedLabels = spreadLabels(labels, 13);

  return (
    <div ref={wrapRef} className="mt-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${lineName} renewal rate change history and forecast`}
        className="block w-full"
      >
        {/* grid */}
        {Array.from({ length: Math.round((mx - mn) / 5) + 1 }, (_, k) => mn + k * 5).map((v) => (
          <g key={v}>
            <line
              x1={MARGIN.L}
              x2={W - MARGIN.R}
              y1={Y(v)}
              y2={Y(v)}
              stroke={v === 0 ? "var(--color-slate)" : "#e4dfd2"}
              strokeWidth={v === 0 ? 1.6 : 1}
            />
            <text x={MARGIN.L - 8} y={Y(v) + 4} fontSize={11} textAnchor="end" fill="var(--color-slate)">
              {v > 0 ? "+" : ""}
              {v}%
            </text>
          </g>
        ))}

        {/* year labels */}
        {(() => {
          let yc = 0;
          return quarters.map((q, i) => {
            if (!q.endsWith("Q1")) return null;
            yc++;
            if (narrow && yc % 2 !== 1) return null;
            return (
              <text key={q} x={X(i)} y={H - 12} fontSize={11} textAnchor="middle" fill="var(--color-slate)">
                {q.slice(0, 4)}
              </text>
            );
          });
        })()}

        {/* historical series */}
        {runs.map((r, k) => (
          <path
            key={k}
            d={linePath(r, series, X, Y)}
            fill="none"
            stroke="var(--color-obsidian)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {runs.slice(1).map((r, k) => {
          const prevRun = runs[k];
          return (
            <path
              key={`bridge-${k}`}
              d={bridgePath(prevRun[prevRun.length - 1], r[0], series, X, Y)}
              fill="none"
              stroke="var(--color-obsidian)"
              strokeWidth={1.3}
              strokeDasharray="1.5 3.5"
              opacity={0.55}
            />
          );
        })}
        {edgeDots(series, X, Y, lv ? lv.i : null).map((d) => (
          <circle key={d.i} cx={d.x} cy={d.y} r={2.4} fill="var(--color-obsidian)" stroke="#fff" strokeWidth={1.2} />
        ))}

        {/* forecast band + line */}
        {hasFc && lv && fit.h[0] && fit.h[1] && (
          <>
            <polygon
              points={`${X(lv.i)},${Y(lv.v)} ${X(n)},${Y(fit.h[0].hi)} ${X(n + 1)},${Y(fit.h[1].hi)} ${X(
                n + 1,
              )},${Y(fit.h[1].lo)} ${X(n)},${Y(fit.h[0].lo)}`}
              fill="rgba(191,164,106,0.22)"
            />
            <path
              d={`M${X(lv.i)} ${Y(lv.v)} L${X(n)} ${Y(fit.h[0].f)} L${X(n + 1)} ${Y(fit.h[1].f)}`}
              fill="none"
              stroke="var(--color-obsidian)"
              strokeWidth={2}
              strokeDasharray="2 5"
              strokeLinecap="round"
            />
            {[fit.h[0], fit.h[1]].map((h, k) => (
              <circle
                key={k}
                cx={X(n + k)}
                cy={Y(h.f)}
                r={4}
                fill="#fff"
                stroke="var(--color-obsidian)"
                strokeWidth={2}
              />
            ))}
          </>
        )}

        {lv && <circle cx={X(lv.i)} cy={Y(lv.v)} r={4} fill="var(--color-obsidian)" stroke="#fff" strokeWidth={1.5} />}

        {placedLabels.map((lb, k) => (
          <text
            key={k}
            x={lb.x}
            y={lb.y + 4}
            fontSize={11}
            textAnchor={lb.anchor}
            fontWeight={600}
            fontFamily="var(--font-mono)"
            fill="var(--color-obsidian)"
          >
            {lb.t}
          </text>
        ))}

        <line
          x1={hoverI !== null ? X(hoverI) : 0}
          x2={hoverI !== null ? X(hoverI) : 0}
          y1={MARGIN.T}
          y2={H - MARGIN.B}
          stroke="var(--color-slate)"
          strokeWidth={1}
          opacity={hoverI !== null ? 1 : 0}
        />

        <rect
          x={MARGIN.L}
          y={MARGIN.T}
          width={W - MARGIN.L - MARGIN.R}
          height={H - MARGIN.T - MARGIN.B}
          fill="transparent"
          className="cursor-crosshair focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[-2px]"
          tabIndex={0}
          role="img"
          aria-label={`Hover, or focus and use arrow keys, to inspect ${lineName} values by quarter`}
          onPointerMove={(e) => paint(e.clientX)}
          onPointerDown={(e) => paint(e.clientX)}
          onPointerLeave={() => {
            setHoverI(null);
            setTip(null);
          }}
          onFocus={() => {
            const r = svgRef.current?.getBoundingClientRect();
            const vb = svgRef.current?.viewBox.baseVal;
            if (!r || !vb) return;
            paint(r.left + ((X(maxIdx) - vb.x) / vb.width) * r.width);
          }}
          onBlur={() => {
            setHoverI(null);
            setTip(null);
          }}
          onKeyDown={onKeyDown}
        />
      </svg>

      {hoverI !== null && rows && tip && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed z-50 max-w-[230px] rounded-sm border border-gold/30 bg-white px-3 py-2 text-[13px] leading-snug shadow-lg"
          style={{ left: Math.min(tip.x + 14, window.innerWidth - 240), top: Math.max(8, tip.y - 40) }}
        >
          <div className="mb-1 font-display font-semibold text-obsidian">{tipLabel}</div>
          {rows.map((r, k) => (
            <div key={k}>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="inline-block h-0 w-3 flex-none"
                  style={{ borderTop: `2px ${r.dash ? "dashed" : "solid"} ${r.color}` }}
                />
                <span className="mr-auto text-slate">{r.label}</span>
                <span className="font-mono font-bold tabular-nums text-obsidian">{r.value}</span>
              </div>
              {r.extra && <div className="pl-[18px] text-xs text-slate">{r.extra}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
