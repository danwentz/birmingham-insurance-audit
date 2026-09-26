"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Printer, Link2, Check, ArrowRight } from "lucide-react";
import {
  coinsuranceResult,
  penaltyLadder,
  marginClauseResult,
  marginClauseRecovery,
  trendedReplacementCost,
  costToCure,
  COINSURANCE_PRESETS,
  DEFAULT_COINSURANCE_PCT,
  MARGIN_PRESETS,
  DEFAULT_MARGIN_PCT,
  DEFAULT_TREND_PCT,
  type CoinsuranceInput,
} from "@/lib/coinsurance";
import { usd, usdCompact, pct, groupDigits, parseNum } from "@/lib/format";
import { NumberField, Tile, SectionHeading, Finding } from "@/components/calculator/fields";
import { CalculatorDisclaimer } from "@/components/Disclaimers";

// Short URL keys so a shared link stays readable.
const URL_KEYS = {
  rc: "rc",
  limit: "lim",
  coins: "cp",
  deductible: "ded",
  loss: "ls",
  sov: "sv",
  margin: "mg",
  lastValue: "lv",
  yearsSince: "yr",
  trendPct: "tr",
  ratePer100: "rt",
} as const;

type FieldKey = keyof typeof URL_KEYS;

/** Prefilled with the ISO CP 00 10 worked example, so the page is alive on
 *  arrival and doubles as a check on the math itself. Labelled as an example
 *  in the UI and cleared by one button. Margin, stale-valuation, and
 *  cost-to-cure fields start empty on purpose: each unlocks its own section. */
const EXAMPLE: Record<FieldKey, string> = {
  rc: "10,000,000",
  limit: "6,300,000",
  coins: String(DEFAULT_COINSURANCE_PCT),
  deductible: "25,000",
  loss: "2,000,000",
  sov: "",
  margin: "",
  lastValue: "",
  yearsSince: "",
  trendPct: "",
  ratePer100: "",
};

const EMPTY = Object.fromEntries(Object.keys(EXAMPLE).map((k) => [k, ""])) as Record<FieldKey, string>;

const MARGIN_FIELDS: FieldKey[] = ["sov", "margin"];
const STALE_FIELDS: FieldKey[] = ["lastValue", "yearsSince", "trendPct"];
const CURE_FIELDS: FieldKey[] = ["ratePer100"];

const LADDER_PCTS = [5, 10, 25, 50, 100];

export function CoinsuranceCalculator() {
  const [f, setF] = useState<Record<FieldKey, string>>(EXAMPLE);
  const [prefilled, setPrefilled] = useState(true);
  const [marginOpen, setMarginOpen] = useState(false);
  const [staleOpen, setStaleOpen] = useState(false);
  const [cureOpen, setCureOpen] = useState(false);
  const marginRef = useRef<HTMLDetailsElement>(null);
  const staleRef = useRef<HTMLDetailsElement>(null);
  const cureRef = useRef<HTMLDetailsElement>(null);

  const set = (key: FieldKey) => (next: string) => {
    setPrefilled(false);
    setF((prev) => ({ ...prev, [key]: next }));
  };

  // Read a shared link on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length === 0) return;
    const next = { ...EMPTY };
    let found = false;
    for (const [field, key] of Object.entries(URL_KEYS) as [FieldKey, string][]) {
      const raw = params.get(key);
      if (raw !== null && raw !== "") {
        next[field] = groupDigits(raw);
        found = true;
      }
    }
    if (found) {
      setF(next);
      setPrefilled(false);
      if (MARGIN_FIELDS.some((field) => next[field])) setMarginOpen(true);
      if (STALE_FIELDS.some((field) => next[field])) setStaleOpen(true);
      if (CURE_FIELDS.some((field) => next[field])) setCureOpen(true);
    }
  }, []);

  const input: CoinsuranceInput = useMemo(
    () => ({
      replacementCost: parseNum(f.rc),
      limit: parseNum(f.limit),
      coinsurancePct: parseNum(f.coins),
      deductible: parseNum(f.deductible),
      loss: parseNum(f.loss),
    }),
    [f],
  );

  // Keep the URL in step so results are shareable and returnable.
  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    for (const [field, key] of Object.entries(URL_KEYS) as [FieldKey, string][]) {
      const raw = f[field].replace(/,/g, "");
      if (raw) params.set(key, raw);
    }
    return params.toString();
  }, [f]);

  useEffect(() => {
    if (prefilled) return;
    // Debounced: browsers rate-limit replaceState, and this fires on every keystroke.
    const id = window.setTimeout(() => {
      window.history.replaceState(null, "", `${window.location.pathname}?${shareUrl}`);
    }, 300);
    return () => window.clearTimeout(id);
  }, [shareUrl, prefilled]);

  const r = coinsuranceResult(input);
  const ladder = penaltyLadder(input, LADDER_PCTS);

  const marginInput = {
    scheduledValue: parseNum(f.sov),
    marginPct: f.margin ? parseNum(f.margin) : DEFAULT_MARGIN_PCT,
    replacementCostToday: input.replacementCost,
  };
  const margin = marginClauseResult(marginInput);
  const marginReady = marginInput.scheduledValue > 0 && input.replacementCost > 0;

  const trendPct = f.trendPct ? parseNum(f.trendPct) : DEFAULT_TREND_PCT;
  const trendedRc = trendedReplacementCost(parseNum(f.lastValue), parseNum(f.yearsSince), trendPct);
  const staleReady = parseNum(f.lastValue) > 0 && parseNum(f.yearsSince) > 0;

  const cure = costToCure(r.shortfall, parseNum(f.ratePer100));
  const cureReady = parseNum(f.ratePer100) > 0 && r.shortfall > 0;

  const ready = input.replacementCost > 0 && input.limit > 0 && input.coinsurancePct > 0;

  return (
    <>
      {/* ------------------------------------------------ inputs */}
      <section id="calculator" className="print:hidden bg-white px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Step one" title="Your policy and your loss">
            <p>
              Five numbers off the declarations page and the claim you want to test. Nothing leaves
              your browser — there is no account, and nothing is submitted anywhere until you ask for
              it further down.
            </p>
          </SectionHeading>

          {prefilled && (
            <p className="mt-6 inline-block border-l-2 border-gold bg-ivory px-4 py-2 text-sm text-slate">
              Prefilled with the standard ISO worked example, not a benchmark.{" "}
              <button
                type="button"
                onClick={() => {
                  setF(EMPTY);
                  setPrefilled(false);
                }}
                className="font-semibold text-obsidian underline hover:text-gold"
              >
                Clear it
              </button>{" "}
              and enter yours.
            </p>
          )}

          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <NumberField
              label="Replacement cost today"
              value={f.rc}
              onChange={set("rc")}
              prefix="$"
              hint="What it costs to rebuild the property right now, not what it's insured for."
            />
            <NumberField
              label="Limit carried"
              value={f.limit}
              onChange={set("limit")}
              prefix="$"
              hint="The property limit on the declarations page."
            />
            <div>
              <NumberField
                label="Coinsurance percentage"
                value={f.coins}
                onChange={set("coins")}
                suffix="%"
                grouped={false}
                hint={`Defaults to ${DEFAULT_COINSURANCE_PCT}%.`}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {COINSURANCE_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set("coins")(String(p))}
                    className={`rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      Number(f.coins) === p
                        ? "border-gold bg-gold text-obsidian"
                        : "border-gold/30 text-slate hover:border-gold hover:text-obsidian"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>
            <NumberField
              label="Deductible"
              value={f.deductible}
              onChange={set("deductible")}
              prefix="$"
              hint="Applied after the coinsurance ratio, per ISO CP 00 10."
            />
            <NumberField
              label="Loss amount"
              value={f.loss}
              onChange={set("loss")}
              prefix="$"
              hint="The claim you want to test, total or partial."
            />
          </div>
        </div>
      </section>

      {!ready && (
        <section className="bg-ivory px-5 py-14">
          <div className="mx-auto max-w-5xl border-l-2 border-gold bg-white p-6">
            <p className="font-display text-lg font-semibold text-obsidian">
              Add replacement cost, the limit carried, and a coinsurance percentage.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Everything below calculates from those three numbers, plus the deductible and loss you
              want to test.
            </p>
          </div>
        </section>
      )}

      {ready && (
        <>
          {/* ------------------------------------------------ headline */}
          <section className="gold-rule-top bg-obsidian px-5 py-14 text-champagne">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="What the clause does to this loss" title="Before you dispute the number">
                <p className="text-slate">
                  {r.hasPenalty
                    ? `Carrying ${usdCompact(input.limit)} against a ${usdCompact(r.required)} requirement pays claims at ${pct(r.ratio, 1)} on the dollar — on this loss and every other one, total or partial.`
                    : `${usdCompact(input.limit)} carried meets the ${usdCompact(r.required)} the clause requires. No penalty applies to this loss.`}
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile
                  tone="dark"
                  emphasis
                  label="Payout on this loss"
                  value={usd(r.payout)}
                  formula={
                    r.hasPenalty
                      ? `${usd(input.loss)} × ${pct(r.ratio, 1)} ratio, minus ${usd(input.deductible)} deductible`
                      : `${usd(input.loss)} loss, minus ${usd(input.deductible)} deductible`
                  }
                />
                <Tile
                  tone="dark"
                  emphasis
                  label="Coinsurance penalty"
                  value={usd(r.penalty)}
                  formula={
                    r.hasPenalty
                      ? `${usd(r.noPenaltyPayout)} it would have paid, minus ${usd(r.payout)} it actually pays`
                      : "No gap between what it pays and what it should pay"
                  }
                />
                <Tile
                  tone="dark"
                  label="Payout ratio"
                  value={pct(r.ratio, 1)}
                  formula={`${usdCompact(input.limit)} carried ÷ ${usdCompact(r.required)} required`}
                />
                <Tile
                  tone="dark"
                  label="Limit needed to cure it"
                  value={r.shortfall > 0 ? usd(r.shortfall) : "$0"}
                  formula={
                    r.shortfall > 0
                      ? `${usdCompact(r.required)} required, minus ${usdCompact(input.limit)} carried`
                      : "Already at or above the required limit"
                  }
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {r.hasPenalty ? (
                  <>
                    <div className="border-l-2 border-gold bg-obsidian/40 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
                        What you retain because of the clause
                      </p>
                      <p className="mt-2 font-mono text-xl tabular-nums text-white">{usd(r.ownerRetains)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate">
                        On a {usdCompact(input.loss)} loss, the policy pays {usd(r.payout)}. The rest —{" "}
                        {usd(r.ownerRetains)} — comes out of your pocket, and {usd(r.penalty)} of that is
                        the coinsurance penalty alone, on top of the deductible.
                      </p>
                    </div>
                    <div className="border-l-2 border-gold bg-obsidian/40 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
                        It is not just for a total loss
                      </p>
                      <p className="mt-2 font-mono text-xl tabular-nums text-white">{pct(r.ratio, 1)} on every claim</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate">
                        The ratio applies to whatever the loss is, not just a burn-to-the-ground claim.
                        A small roof or water loss gets cut the same {pct(r.ratio, 1)} as a total loss —
                        see the table below.
                      </p>
                    </div>
                  </>
                ) : (
                  <Finding
                    title="No coinsurance penalty"
                    headline={usd(r.payout)}
                    body={`${usdCompact(input.limit)} carried against a ${usdCompact(r.required)} requirement is enough to satisfy the clause. The policy pays this loss without a coinsurance haircut — the deductible is the only reduction.`}
                  />
                )}
              </div>

              <CalculatorDisclaimer tone="dark" />
            </div>
          </section>

          {/* ------------------------------------------------ penalty ladder */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Partial losses are penalized too" title="The same ratio at every loss size">
                <p>
                  Most claims are not total losses. The coinsurance ratio doesn&apos;t know the
                  difference — it cuts a small claim exactly as hard as a large one.
                </p>
              </SectionHeading>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gold/30 text-left">
                      <th className="py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Loss
                      </th>
                      <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Pays with penalty
                      </th>
                      <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Pays without penalty
                      </th>
                      <th className="py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Penalty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-mono tabular-nums">
                    {ladder.map((row) => (
                      <tr key={row.lossPctOfRc} className="border-b border-gold/15">
                        <td className="py-3 pr-4 font-sans text-obsidian">
                          {row.lossPctOfRc}% of RC
                          <span className="ml-2 font-sans text-xs text-slate">{usdCompact(row.loss)}</span>
                        </td>
                        <td className="py-3 pr-4 text-right text-obsidian">{usdCompact(row.payout)}</td>
                        <td className="py-3 pr-4 text-right text-slate">{usdCompact(row.noPenaltyPayout)}</td>
                        <td className="py-3 text-right text-obsidian">{usdCompact(row.penalty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate">
                Deductible left out of this table so the ratio&apos;s slope is easy to read. Your
                deductible still applies on top, the way it does above.
              </p>
            </div>
          </section>

          {/* ------------------------------------------------ margin clause (optional) */}
          <section className="bg-ivory px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <details
                ref={marginRef}
                open={marginOpen}
                onToggle={(e) => setMarginOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Optional — on a blanket program: the margin clause
                </summary>
                <p className="mt-4 max-w-3xl text-slate">
                  Agreed-value and blanket programs often drop coinsurance entirely. Plenty of owners
                  read that as the exposure going away. It doesn&apos;t — a margin clause replaces it,
                  and it works differently: instead of testing a ratio, it puts a hard ceiling on what
                  one location can recover, set at its scheduled value times the margin.
                </p>

                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    label="Scheduled (SOV) value, this location"
                    value={f.sov}
                    onChange={set("sov")}
                    prefix="$"
                    hint="What the schedule of values lists for this building."
                  />
                  <div>
                    <NumberField
                      label="Margin"
                      value={f.margin}
                      onChange={set("margin")}
                      suffix="%"
                      grouped={false}
                      placeholder={String(DEFAULT_MARGIN_PCT)}
                      hint={`Defaults to ${DEFAULT_MARGIN_PCT}%.`}
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {MARGIN_PRESETS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => set("margin")(String(p))}
                          className={`rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                            (f.margin ? Number(f.margin) : DEFAULT_MARGIN_PCT) === p
                              ? "border-gold bg-gold text-obsidian"
                              : "border-gold/30 text-slate hover:border-gold hover:text-obsidian"
                          }`}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {marginReady ? (
                  <>
                    <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                      <Tile
                        label="Margin cap"
                        value={usd(margin.cap)}
                        formula={`${usdCompact(marginInput.scheduledValue)} SOV × ${marginInput.marginPct}%`}
                      />
                      <Tile
                        label="Recovers on a total loss"
                        value={usd(margin.totalLossRecovery)}
                        formula={
                          margin.hasGap
                            ? `Held to the cap — ${usdCompact(input.replacementCost)} RC exceeds it`
                            : "Covers today's full replacement cost"
                        }
                      />
                      <Tile
                        emphasis={margin.hasGap}
                        label="Gap on a total loss"
                        value={usd(margin.totalLossGap)}
                        formula={margin.hasGap ? "RC today minus the margin cap" : "No gap at today's RC"}
                      />
                      <Tile
                        label="Recovers on your entered loss"
                        value={usd(marginClauseRecovery(margin.cap, input.loss))}
                        formula={`min(${usdCompact(margin.cap)} cap, ${usdCompact(input.loss)} loss)`}
                      />
                    </div>
                    <div className="mt-8">
                      <Finding
                        title="What the SOV needs to be"
                        headline={usd(margin.sovNeeded)}
                        body={
                          margin.sovShortfall > 0
                            ? `To cover today's ${usdCompact(input.replacementCost)} replacement cost at a ${marginInput.marginPct}% margin, the schedule needs to carry ${usd(margin.sovNeeded)} for this location — ${usd(margin.sovShortfall)} more than the ${usd(marginInput.scheduledValue)} it currently shows. A stale SOV is what turns a "we don't have coinsurance" program into an uncovered gap.`
                            : `The ${usd(marginInput.scheduledValue)} on the schedule already covers today's replacement cost at a ${marginInput.marginPct}% margin. Worth checking again after the next appraisal.`
                        }
                      />
                    </div>
                  </>
                ) : (
                  <p className="mt-8 border-l-2 border-gold/30 bg-white p-5 text-sm leading-relaxed text-slate">
                    Add a scheduled value above (and replacement cost today, in step one) to test the
                    margin cap.
                  </p>
                )}
              </details>
            </div>
          </section>

          {/* ------------------------------------------------ stale valuation (optional) */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <details
                ref={staleRef}
                open={staleOpen}
                onToggle={(e) => setStaleOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Optional — how stale is your valuation?
                </summary>
                <p className="mt-4 max-w-3xl text-slate">
                  Both clauses above test the limit against replacement cost <em>today</em>, and most
                  schedules of value only get updated at renewal or after an appraisal. If it&apos;s
                  been a few years, this estimates what replacement cost has become since, so you can
                  test the real gap instead of the one on file.
                </p>

                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    label="Value on the last appraisal or SOV"
                    value={f.lastValue}
                    onChange={set("lastValue")}
                    prefix="$"
                  />
                  <NumberField
                    label="Years since"
                    value={f.yearsSince}
                    onChange={set("yearsSince")}
                    grouped={false}
                  />
                  <NumberField
                    label="Annual construction cost trend"
                    value={f.trendPct}
                    onChange={set("trendPct")}
                    suffix="%"
                    grouped={false}
                    placeholder={String(DEFAULT_TREND_PCT)}
                    hint={`An assumption, not a sourced index. Defaults to ${DEFAULT_TREND_PCT}% — replace it with your own view of local costs.`}
                  />
                </div>

                {staleReady ? (
                  <div className="mt-8">
                    <Finding
                      title="Estimated replacement cost today"
                      headline={usd(trendedRc)}
                      body={`${usd(parseNum(f.lastValue))} trended forward ${parseNum(f.yearsSince)} year${
                        parseNum(f.yearsSince) === 1 ? "" : "s"
                      } at ${trendPct}% a year. That's ${signedDelta(
                        trendedRc,
                        parseNum(f.lastValue),
                      )} more than the value on file — worth running back through step one if it moves the required limit.`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        set("rc")(groupDigits(String(Math.round(trendedRc))));
                      }}
                      className="print:hidden mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                    >
                      Use this as replacement cost above <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <p className="mt-8 border-l-2 border-gold/30 bg-ivory p-5 text-sm leading-relaxed text-slate">
                    Add a last-known value and years since to estimate today&apos;s replacement cost.
                  </p>
                )}
              </details>
            </div>
          </section>

          {/* ------------------------------------------------ cost to cure (optional) */}
          <section className="bg-ivory px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <details
                ref={cureRef}
                open={cureOpen}
                onToggle={(e) => setCureOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Optional — what does curing it cost?
                </summary>
                <p className="mt-4 max-w-3xl text-slate">
                  Raising the limit to the required amount removes the penalty for good. This prices
                  that against the penalty on the single loss above, at a flat property rate — a
                  ballpark for the conversation, not a quote.
                </p>

                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    label="Property rate per $100 of TIV"
                    value={f.ratePer100}
                    onChange={set("ratePer100")}
                    prefix="$"
                    grouped={false}
                    hint="What the market is charging per $100 of insured value."
                  />
                </div>

                {r.shortfall <= 0 ? (
                  <p className="mt-8 border-l-2 border-gold/30 bg-white p-5 text-sm leading-relaxed text-slate">
                    No shortfall to cure — the limit already meets the coinsurance requirement.
                  </p>
                ) : cureReady ? (
                  <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-3">
                    <Tile
                      label="Limit needed to cure"
                      value={usd(r.shortfall)}
                      formula="Required limit minus limit carried"
                    />
                    <Tile
                      label="Estimated extra annual premium"
                      value={usd(cure)}
                      formula={`${usdCompact(r.shortfall)} ÷ $100 × ${f.ratePer100} rate`}
                    />
                    <Tile
                      emphasis
                      label="Penalty on this loss alone"
                      value={usd(r.penalty)}
                      formula={
                        cure > 0
                          ? cure < r.penalty
                            ? "Curing costs less than one penalized loss like this one"
                            : "One loss this size doesn't cover a year of the extra premium"
                          : "What the clause costs you on the loss above"
                      }
                    />
                  </div>
                ) : (
                  <p className="mt-8 border-l-2 border-gold/30 bg-white p-5 text-sm leading-relaxed text-slate">
                    Add a property rate to estimate the extra premium.
                  </p>
                )}
              </details>
            </div>
          </section>

          <SaveShare shareQuery={shareUrl} />

          {/* ------------------------------------------------ methodology */}
          <section className="px-5 py-14">
            <div className="mx-auto max-w-3xl">
              <SectionHeading eyebrow="Methodology" title="Every formula on this page" />
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["Required limit", "Replacement cost × coinsurance percentage."],
                  ["Payout ratio", "Limit carried ÷ required limit, capped at 1."],
                  ["Payout", "min(limit, max(0, loss × ratio − deductible)) — ISO CP 00 10 order: ratio first, then the deductible, then the limit."],
                  ["No-penalty payout", "min(limit, max(0, loss − deductible)) — what the same claim pays at a 100% ratio."],
                  ["Coinsurance penalty", "No-penalty payout minus actual payout."],
                  ["Owner retains", "Loss minus actual payout."],
                  ["Shortfall to cure", "Required limit minus limit carried, floored at zero."],
                  ["Margin clause cap", "Scheduled (SOV) value × margin percentage."],
                  ["SOV needed", "Replacement cost today ÷ margin percentage."],
                  ["Trended replacement cost", "Last known value × (1 + annual trend)^years since."],
                  ["Cost to cure", "(Shortfall ÷ 100) × property rate per $100 of TIV."],
                ].map(([term, def]) => (
                  <div key={term} className="border-b border-gold/15 pb-4">
                    <dt className="font-display font-semibold text-obsidian">{term}</dt>
                    <dd className="mt-1 font-mono text-slate">{def}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-slate">
                This prices what the clause does mechanically. It doesn&apos;t replace a public
                adjuster or your broker&apos;s read of the actual policy language, which varies by
                form and by carrier.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function signedDelta(next: number, prior: number): string {
  const delta = next - prior;
  return delta >= 0 ? `+${usd(delta)}` : usd(delta);
}

/** No gate: the numbers and the printable view are free. The only ask is the
 *  site's standard contact form further down the page. */
function SaveShare({ shareQuery }: { shareQuery: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}?${shareQuery}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — select it instead.
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="print:hidden gold-rule-top bg-obsidian px-5 py-14 text-champagne">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Keep this</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Take it into the renewal or the claim.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Print it, or copy the link — it reopens this page with everything filled in. Nothing was
            sent anywhere to produce any of this.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
          >
            <Printer className="h-4 w-4" /> Save as PDF
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-champagne transition-colors hover:border-gold hover:text-gold"
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-champagne transition-colors hover:border-gold hover:text-gold"
          >
            Have it reviewed <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
