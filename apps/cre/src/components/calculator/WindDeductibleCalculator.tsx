"use client";

import { useEffect, useMemo, useState } from "react";
import { Printer, Link2, Check, ArrowRight, Plus, X } from "lucide-react";
import {
  windResult,
  seasonRetention,
  deductibleLadder,
  DEFAULT_DEDUCTIBLE_PCT,
  DEFAULT_EVENT_PROBABILITY,
  type WindInput,
} from "@/lib/wind";
import { usd, usdCompact, pct, months, int, groupDigits, parseNum } from "@/lib/format";
import { NumberField, Tile, SectionHeading, Finding } from "@/components/calculator/fields";
import { CalculatorDisclaimer } from "@/components/Disclaimers";

// Short URL keys so a shared link stays readable. `v` carries the whole
// schedule, hyphen-joined, because a query string with one key per building
// stops being a link anyone will paste.
const URL_VALUES = "v";
const URL_KEYS = {
  ded: "d",
  min: "m",
  hit: "n",
  occCap: "oc",
  agg: "ag",
  flat: "fd",
  noi: "noi",
  premium: "pr",
  units: "un",
} as const;

type FieldKey = keyof typeof URL_KEYS;

/** Buy-down probability. Kept out of URL_KEYS because that map is text fields only. */
const URL_PROBABILITY = "pb";

/** Most schedules people paste in are under a dozen locations, and past that the
 *  URL stops being shareable — which is the whole point of the URL. */
const MAX_LOCATIONS = 12;

const EXAMPLE_VALUES = ["30,000,000", "18,500,000", "12,000,000"];

/** Terms come prefilled because 5% / $250k minimum is what the Gulf and hail-belt
 *  market is actually quoting. The NOI, premium and unit fields stay empty: a
 *  months-of-NOI figure built from someone else's NOI reads as if it were yours. */
const EXAMPLE: Record<FieldKey, string> = {
  ded: String(DEFAULT_DEDUCTIBLE_PCT),
  min: "250,000",
  hit: "2",
  occCap: "",
  agg: "",
  flat: "250,000",
  noi: "",
  premium: "",
  units: "",
};

const EMPTY = Object.fromEntries(Object.keys(EXAMPLE).map((k) => [k, ""])) as Record<FieldKey, string>;

const LADDER_PCTS = [1, 2, 3, 5, 10];
const SEASON_EVENTS = [1, 2, 3];

const clampProbability = (p: number) => Math.max(1, Math.min(60, Math.round(p)));

export function WindDeductibleCalculator() {
  const [values, setValues] = useState<string[]>(EXAMPLE_VALUES);
  const [f, setF] = useState<Record<FieldKey, string>>(EXAMPLE);
  const [prefilled, setPrefilled] = useState(true);
  const [probability, setProbability] = useState(DEFAULT_EVENT_PROBABILITY);

  const set = (key: FieldKey) => (next: string) => {
    setPrefilled(false);
    setF((prev) => ({ ...prev, [key]: next }));
  };

  const setValue = (index: number) => (next: string) => {
    setPrefilled(false);
    setValues((prev) => prev.map((v, i) => (i === index ? next : v)));
  };

  const addLocation = () => {
    setPrefilled(false);
    setValues((prev) => (prev.length >= MAX_LOCATIONS ? prev : [...prev, ""]));
  };

  const removeLocation = (index: number) => {
    setPrefilled(false);
    setValues((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  // Read a shared link on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length === 0) return;
    let found = false;

    const rawValues = params.get(URL_VALUES);
    if (rawValues) {
      const parsed = rawValues
        .split("-")
        .filter((v) => v !== "")
        .slice(0, MAX_LOCATIONS)
        .map(groupDigits);
      if (parsed.length > 0) {
        setValues(parsed);
        found = true;
      }
    }

    const next = { ...EMPTY };
    for (const [field, key] of Object.entries(URL_KEYS) as [FieldKey, string][]) {
      const raw = params.get(key);
      if (raw !== null && raw !== "") {
        next[field] = groupDigits(raw);
        found = true;
      }
    }

    const rawProb = params.get(URL_PROBABILITY);
    if (rawProb !== null && rawProb !== "") {
      const parsed = Number(rawProb);
      if (Number.isFinite(parsed)) setProbability(clampProbability(parsed) / 100);
    }

    if (found) {
      setF(next);
      setPrefilled(false);
    }
  }, []);

  const input: WindInput = useMemo(
    () => ({
      locationValues: values.map(parseNum),
      deductiblePct: parseNum(f.ded),
      minimumPerLocation: f.min ? parseNum(f.min) : undefined,
      occurrenceCap: f.occCap ? parseNum(f.occCap) : undefined,
      annualAggregate: f.agg ? parseNum(f.agg) : undefined,
      locationsHit: parseNum(f.hit) || 1,
      flatDeductible: f.flat ? parseNum(f.flat) : undefined,
      eventProbability: probability,
      annualNoi: f.noi ? parseNum(f.noi) : undefined,
      annualPremium: f.premium ? parseNum(f.premium) : undefined,
      units: f.units ? parseNum(f.units) : undefined,
    }),
    [values, f, probability],
  );

  // Keep the URL in step so results are shareable and returnable.
  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    const joined = values.map((v) => v.replace(/,/g, "")).filter((v) => v !== "");
    if (joined.length) params.set(URL_VALUES, joined.join("-"));
    for (const [field, key] of Object.entries(URL_KEYS) as [FieldKey, string][]) {
      const raw = f[field].replace(/,/g, "");
      if (raw) params.set(key, raw);
    }
    params.set(URL_PROBABILITY, String(Math.round(probability * 100)));
    return params.toString();
  }, [values, f, probability]);

  useEffect(() => {
    if (prefilled) return;
    // Debounced: browsers rate-limit replaceState, and this fires on every keystroke.
    const id = window.setTimeout(() => {
      window.history.replaceState(null, "", `${window.location.pathname}?${shareUrl}`);
    }, 300);
    return () => window.clearTimeout(id);
  }, [shareUrl, prefilled]);

  const r = windResult(input);
  const ladder = deductibleLadder(input, LADDER_PCTS);
  const seasons = SEASON_EVENTS.map((n) =>
    seasonRetention(r.event.retention, n, input.annualAggregate),
  );
  const aggregateBites = seasons.some((s) => s.capApplied);
  const ready = r.lines.length > 0 && input.deductiblePct > 0;
  const worst = r.worst;

  return (
    <>
      {/* ------------------------------------------------ inputs */}
      <section id="calculator" className="print:hidden bg-white px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Step one" title="Your schedule of values">
            <p>
              Insured value per location, as the policy schedules it — building, contents, and loss
              of rents, since that&apos;s the figure the percentage runs against. Nothing leaves your
              browser: there is no account, and nothing is submitted anywhere until you ask for it
              further down.
            </p>
          </SectionHeading>

          {prefilled && (
            <p className="mt-6 inline-block border-l-2 border-gold bg-ivory px-4 py-2 text-sm text-slate">
              Prefilled with an example schedule, not a benchmark.{" "}
              <button
                type="button"
                onClick={() => {
                  setValues([""]);
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
            {values.map((v, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                  <NumberField
                    label={`Location ${i + 1}`}
                    value={v}
                    onChange={setValue(i)}
                    prefix="$"
                    placeholder="18,500,000"
                  />
                </div>
                {values.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLocation(i)}
                    aria-label={`Remove location ${i + 1}`}
                    className="mb-2 shrink-0 rounded-sm border border-gold/30 p-1.5 text-slate transition-colors hover:border-gold hover:text-obsidian"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {values.length < MAX_LOCATIONS && (
            <button
              type="button"
              onClick={addLocation}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
            >
              <Plus className="h-4 w-4" /> Add a location
            </button>
          )}

          <div className="mt-12">
            <SectionHeading eyebrow="Step two" title="Your deductible terms">
              <p>
                Straight off the declarations page. The minimum is the dollar floor the deductible
                can&apos;t drop below — it&apos;s what makes a small location cost more than its percentage.
              </p>
            </SectionHeading>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField
                label="Wind / hail deductible"
                value={f.ded}
                onChange={set("ded")}
                suffix="%"
                grouped={false}
                placeholder="5"
                hint="Of each affected location's insured value."
              />
              <NumberField
                label="Minimum per location"
                value={f.min}
                onChange={set("min")}
                prefix="$"
                hint="Leave blank if the policy has none."
              />
              <NumberField
                label="Locations hit in one storm"
                value={f.hit}
                onChange={set("hit")}
                grouped={false}
                hint="A named storm rarely finds one building."
              />
              <NumberField
                label="Occurrence cap"
                value={f.occCap}
                onChange={set("occCap")}
                prefix="$"
                hint="Optional. Most programs don't carry one."
              />
              <NumberField
                label="Annual aggregate"
                value={f.agg}
                onChange={set("agg")}
                prefix="$"
                hint="Optional. Caps the whole policy year."
              />
              <NumberField
                label="Flat deductible to compare"
                value={f.flat}
                onChange={set("flat")}
                prefix="$"
                hint="What a buy-down would replace it with."
              />
            </div>
          </div>

          <div className="mt-12">
            <SectionHeading eyebrow="Step three — optional" title="Translate it into your statement">
              <p>
                Retained risk in dollars is abstract. In months of NOI it isn&apos;t. Every field here is
                optional and each one unlocks one figure.
              </p>
            </SectionHeading>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField label="Annual NOI" value={f.noi} onChange={set("noi")} prefix="$" />
              <NumberField
                label="Annual insurance premium"
                value={f.premium}
                onChange={set("premium")}
                prefix="$"
                hint="Property, GL, and umbrella combined."
              />
              <NumberField label="Units" value={f.units} onChange={set("units")} placeholder="1,400" />
            </div>
          </div>
        </div>
      </section>

      {!ready && (
        <section className="bg-ivory px-5 py-14">
          <div className="mx-auto max-w-5xl border-l-2 border-gold bg-white p-6">
            <p className="font-display text-lg font-semibold text-obsidian">
              Add at least one insured value and a deductible percentage.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Everything below calculates from the schedule above.
            </p>
          </div>
        </section>
      )}

      {ready && worst && (
        <>
          {/* ------------------------------------------------ headline */}
          <section className="gold-rule-top bg-obsidian px-5 py-14 text-champagne">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="What you retain" title="Before the policy pays a dollar">
                <p className="text-slate">
                  A {pct(input.deductiblePct / 100, 1)} deductible is {pct(input.deductiblePct / 100, 1)} of
                  each affected location&apos;s insured value — not of the loss, and not of the schedule.
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile
                  tone="dark"
                  emphasis
                  label="Largest single location"
                  value={usd(r.worstRetained)}
                  formula={
                    r.worstRetained < worst.deductible
                      ? `${usd(worst.deductible)} deductible, held to your occurrence cap`
                      : `${usdCompact(worst.insuredValue)} insured × ${worst.effectivePct.toFixed(2)}%${
                          worst.minimumApplied ? " (minimum applied)" : ""
                        }`
                  }
                />
                <Tile
                  tone="dark"
                  emphasis
                  label={`One storm, ${int(r.event.locationsHit)} location${r.event.locationsHit === 1 ? "" : "s"}`}
                  value={usd(r.event.retention)}
                  formula={
                    r.event.capApplied
                      ? `${usd(r.event.grossRetention)} of deductibles, capped at your occurrence cap`
                      : `${int(r.event.locationsHit)} deductible${r.event.locationsHit === 1 ? "" : "s"}, added together`
                  }
                />
                <Tile
                  tone="dark"
                  label="Months of NOI"
                  value={r.event.monthsOfNoi !== null ? months(r.event.monthsOfNoi) : "—"}
                  formula={
                    r.event.monthsOfNoi !== null
                      ? "Retention ÷ monthly NOI"
                      : "Add annual NOI above"
                  }
                />
                <Tile
                  tone="dark"
                  label="Times your annual premium"
                  value={
                    r.event.pctOfAnnualPremium !== null
                      ? `${r.event.pctOfAnnualPremium.toFixed(2)}x`
                      : "—"
                  }
                  formula={
                    r.event.pctOfAnnualPremium !== null
                      ? "Retention ÷ annual premium"
                      : "Add annual premium above"
                  }
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border-l-2 border-gold bg-obsidian/40 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
                    The part nobody prices
                  </p>
                  <p className="mt-2 font-mono text-xl tabular-nums text-white">
                    {usd(r.worstRetained)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    A loss at your largest location has to exceed {usd(r.worstRetained)} before the
                    policy pays anything at all. A {usdCompact(r.worstRetained * 0.4)} roof claim on
                    that building is entirely yours — not underinsured, not disputed, just below the
                    deductible.
                  </p>
                </div>
                <div className="border-l-2 border-gold bg-obsidian/40 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
                    If the whole schedule is hit
                  </p>
                  <p className="mt-2 font-mono text-xl tabular-nums text-white">
                    {usd(r.maxSingleEvent)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {int(r.lines.length)} locations, {usdCompact(r.totalInsuredValue)} insured, and{" "}
                    {int(r.lines.length)} separate deductibles.{" "}
                    {r.hasOccurrenceCap
                      ? r.maxSingleEvent < r.scheduleWide
                        ? `Your occurrence cap holds that to ${usd(r.maxSingleEvent)} — it is doing real work.`
                        : `Your occurrence cap sits above that, so it never binds on a single event.`
                      : "With no occurrence cap, that is the ceiling on a single event."}
                  </p>
                </div>
              </div>

              <CalculatorDisclaimer tone="dark" />
            </div>
          </section>

          {/* ------------------------------------------------ schedule table */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Location by location" title="Where the retention sits">
                <p>
                  Sorted by deductible, not by value — because the dollar minimum can put a small
                  building ahead of a larger one.
                </p>
              </SectionHeading>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gold/30 text-left">
                      <th className="py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Location
                      </th>
                      <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Insured value
                      </th>
                      <th className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Deductible
                      </th>
                      <th className="py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Effective
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-mono tabular-nums">
                    {r.lines.map((l, i) => {
                      const inEvent = i < r.event.locationsHit;
                      return (
                        <tr
                          key={l.index}
                          className={`border-b border-gold/15 ${inEvent ? "bg-ivory" : ""}`}
                        >
                          <td className="py-3 pr-4 font-sans text-obsidian">
                            {l.label}
                            {inEvent && (
                              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-gold">
                                in the storm
                              </span>
                            )}
                          </td>
                          <td className="py-3 pr-4 text-right text-slate">{usd(l.insuredValue)}</td>
                          <td className="py-3 pr-4 text-right text-obsidian">{usd(l.deductible)}</td>
                          <td className="py-3 text-right text-slate">
                            {l.effectivePct.toFixed(2)}%
                            {l.minimumApplied && (
                              <span className="ml-1 font-sans text-[10px] uppercase tracking-wide text-gold">
                                min
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gold/40">
                      <td className="py-3 pr-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Whole schedule
                      </td>
                      <td className="py-3 pr-4 text-right font-mono tabular-nums text-slate">
                        {usd(r.totalInsuredValue)}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono tabular-nums font-semibold text-obsidian">
                        {usd(r.scheduleWide)}
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-slate">
                        {r.totalInsuredValue > 0
                          ? `${((r.scheduleWide / r.totalInsuredValue) * 100).toFixed(2)}%`
                          : "—"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------ season + ladder */}
          <section className="bg-ivory px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Two ways it gets worse" title="A season, and a renewal">
                <p>
                  A deductible is an annual exposure, not a one-time one — and the percentage on your
                  declarations page is the number most likely to move at renewal.
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                    Retained across a season
                  </p>
                  <table className="mt-4 w-full border-collapse text-sm">
                    <tbody className="font-mono tabular-nums">
                      {seasons.map((s) => (
                        <tr key={s.events} className="border-b border-gold/20">
                          <td className="py-3 pr-4 font-sans text-slate">
                            {s.events} event{s.events === 1 ? "" : "s"}
                          </td>
                          <td className="py-3 text-right text-obsidian">
                            {usd(s.retention)}
                            {s.capApplied && (
                              <span className="ml-2 font-sans text-[10px] uppercase tracking-wide text-gold">
                                aggregate
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs leading-relaxed text-slate">
                    {aggregateBites
                      ? "Your annual aggregate caps the year, which is exactly what it is there to do."
                      : "With no annual aggregate, a second storm costs the same as the first. Gulf and hail-belt schedules see repeat years."}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                    The same schedule at other deductibles
                  </p>
                  <table className="mt-4 w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gold/30 text-left">
                        <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                          Deductible
                        </th>
                        <th className="py-2 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                          Largest
                        </th>
                        <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                          One storm
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-mono tabular-nums">
                      {ladder.map((row) => {
                        const current = row.deductiblePct === input.deductiblePct;
                        return (
                          <tr
                            key={row.deductiblePct}
                            className={`border-b border-gold/20 ${current ? "bg-white" : ""}`}
                          >
                            <td className="py-3 pr-4 font-sans text-slate">
                              {row.deductiblePct}%
                              {current && (
                                <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-gold">
                                  yours
                                </span>
                              )}
                            </td>
                            <td className="py-3 pr-4 text-right text-slate">
                              {usdCompact(row.worstLocation)}
                            </td>
                            <td className="py-3 text-right text-obsidian">
                              {usdCompact(row.eventRetention)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs leading-relaxed text-slate">
                    Moving from 2% to 5% is not a small concession. It is usually the largest change
                    on a renewal nobody negotiated.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------ buy-down */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="What a buy-down is worth" title="Price the trade before you take it">
                <p>
                  A buy-down replaces the per-location percentage with one flat retention. It is worth
                  buying when it costs less than the risk it removes — which depends on how often you
                  think a storm actually finds the schedule.
                </p>
              </SectionHeading>

              {r.flat ? (
                <>
                  <div className="print:hidden mt-8 max-w-xl">
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                      Chance of a damaging event in any year
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={60}
                      step={1}
                      value={Math.round(probability * 100)}
                      onChange={(e) => {
                        setPrefilled(false);
                        setProbability(clampProbability(Number(e.target.value)) / 100);
                      }}
                      className="mt-3 w-full accent-gold"
                      aria-label="Chance of a damaging event in any year"
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate">
                      <span>1%</span>
                      <span className="font-mono text-sm text-obsidian">
                        {Math.round(probability * 100)}% a year
                      </span>
                      <span>60%</span>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-3">
                    <Tile
                      label="Retained today"
                      value={usd(r.event.retention)}
                      formula="One storm, percentage deductible"
                    />
                    <Tile
                      label="Retained after buy-down"
                      value={usd(r.flat.flatRetention)}
                      formula="One flat deductible per occurrence"
                    />
                    <Tile
                      emphasis
                      label="Worth up to"
                      value={`${usd(r.flat.breakEvenAnnualCost)}/yr`}
                      formula={`${usdCompact(r.flat.extraRetained)} removed × ${Math.round(
                        probability * 100,
                      )}% odds`}
                    />
                  </div>

                  <div className="mt-8">
                    <Finding
                      title="Read it this way"
                      headline={`${usd(r.flat.extraRetained)} of risk moved off your balance sheet`}
                      body={`If a broker can buy your ${pct(
                        input.deductiblePct / 100,
                        1,
                      )} deductible down to ${usd(
                        r.flat.flatDeductible,
                      )} flat for less than ${usd(
                        r.flat.breakEvenAnnualCost,
                      )} a year, the trade pays for itself at the odds you just set. Above that, you are better off retaining and funding it. The number moves a lot with the slider, which is the honest part: nobody knows the odds, so the question is whether the quote is close to the line or nowhere near it.`}
                    />
                  </div>
                </>
              ) : (
                <div className="mt-8 border-l-2 border-gold/30 bg-ivory p-5">
                  <p className="text-sm leading-relaxed text-slate">
                    Enter a flat deductible above to price a buy-down against this schedule.
                  </p>
                </div>
              )}
            </div>
          </section>

          <SaveShare shareQuery={shareUrl} />
        </>
      )}
    </>
  );
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
            Take it into the renewal meeting.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Print it, or copy the link — it reopens this page with the whole schedule filled in.
            Nothing was sent anywhere to produce any of this.
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
