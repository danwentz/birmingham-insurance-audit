"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Printer, Link2, Check, ArrowRight } from "lucide-react";
import {
  baseline,
  scenario,
  sensitivityGrid,
  premiumIncreaseToBreachDscr,
  windDeductibleExposure,
  itvGap,
  lossOfRentsCheck,
  DEFAULT_DSCR_COVENANT,
  DEFAULT_COINSURANCE,
  type CalcInput,
} from "@/lib/calc";
import {
  usd,
  usdCompact,
  signedUsd,
  signedUsdCompact,
  pct,
  signedPct,
  ratio,
  months,
  article,
  groupDigits,
  parseNum,
} from "@/lib/format";
import { PER_UNIT_BAND, PER_UNIT_SOURCE, hasBenchmark } from "@/lib/benchmarks";
import { NumberField, Tile, SectionHeading, Finding } from "@/components/calculator/fields";

// Short URL keys so a shared link stays readable.
const URL_KEYS = {
  units: "u",
  premium: "p",
  rent: "r",
  occ: "o",
  opex: "x",
  cap: "c",
  other: "oi",
  ads: "ds",
  covenant: "cv",
  bldgTiv: "bt",
  windPct: "wd",
  insured: "iv",
  rc: "rc",
  coins: "ci",
  lorLimit: "lr",
  indemnity: "im",
} as const;

type FieldKey = keyof typeof URL_KEYS;

/** Scenario slider. Kept out of URL_KEYS because that map is text fields only. */
const URL_PREMIUM_CHANGE = "pc";

/** Prefilled so the page is alive on arrival. Labelled as an example in the UI
 *  and cleared by one button. Advanced fields start empty on purpose: a DSCR
 *  built from someone else's debt service would read as if it were theirs. */
const EXAMPLE: Record<FieldKey, string> = {
  units: "250",
  premium: "150,000",
  rent: "1,350",
  occ: "94",
  opex: "1,400,000",
  cap: "5.5",
  other: "",
  ads: "",
  covenant: "",
  bldgTiv: "",
  windPct: "",
  insured: "",
  rc: "",
  coins: "",
  lorLimit: "",
  indemnity: "",
};

const EMPTY = Object.fromEntries(Object.keys(EXAMPLE).map((k) => [k, ""])) as Record<FieldKey, string>;

/** Slider bound, as whole percent. Renewals in this class have moved further than
 *  ±40%, so the slider needs to reach where the market actually went. */
const SLIDER_MAX_PCT = 50;

const clampSliderPct = (pct: number) =>
  Math.max(-SLIDER_MAX_PCT, Math.min(SLIDER_MAX_PCT, Math.round(pct)));

const SCENARIOS = [-0.2, -0.1, 0, 0.1, 0.2];

export function MultifamilyCalculator() {
  const [f, setF] = useState<Record<FieldKey, string>>(EXAMPLE);
  const [prefilled, setPrefilled] = useState(true);
  const [premiumChange, setPremiumChange] = useState(-0.15);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const advancedRef = useRef<HTMLDetailsElement>(null);

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
    const rawChange = params.get(URL_PREMIUM_CHANGE);
    if (rawChange !== null && rawChange !== "") {
      const parsed = Number(rawChange);
      if (Number.isFinite(parsed)) {
        setPremiumChange(clampSliderPct(parsed) / 100);
      }
    }
    if (found) {
      setF(next);
      setPrefilled(false);
      if (Object.entries(URL_KEYS).some(([field]) => ADVANCED.includes(field as FieldKey) && next[field as FieldKey])) {
        setAdvancedOpen(true);
      }
    }
  }, []);

  const input: CalcInput = useMemo(
    () => ({
      units: parseNum(f.units),
      annualPremium: parseNum(f.premium),
      avgRentMonthly: parseNum(f.rent),
      occupancyPct: parseNum(f.occ),
      totalOpexAnnual: parseNum(f.opex),
      capRatePct: parseNum(f.cap),
      otherIncomeAnnual: f.other ? parseNum(f.other) : undefined,
      annualDebtService: f.ads ? parseNum(f.ads) : undefined,
      dscrCovenant: f.covenant ? parseNum(f.covenant) : undefined,
      largestBuildingTiv: f.bldgTiv ? parseNum(f.bldgTiv) : undefined,
      windDeductiblePct: f.windPct ? parseNum(f.windPct) : undefined,
      insuredValue: f.insured ? parseNum(f.insured) : undefined,
      replacementCost: f.rc ? parseNum(f.rc) : undefined,
      coinsurancePct: f.coins ? parseNum(f.coins) : undefined,
      lossOfRentsLimit: f.lorLimit ? parseNum(f.lorLimit) : undefined,
      indemnityMonths: f.indemnity ? parseNum(f.indemnity) : undefined,
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
    params.set(URL_PREMIUM_CHANGE, String(Math.round(premiumChange * 100)));
    return params.toString();
  }, [f, premiumChange]);

  useEffect(() => {
    if (prefilled) return;
    // Debounced: browsers rate-limit replaceState, and this fires on every keystroke.
    const id = window.setTimeout(() => {
      window.history.replaceState(null, "", `${window.location.pathname}?${shareUrl}`);
    }, 300);
    return () => window.clearTimeout(id);
  }, [shareUrl, prefilled]);

  const b = baseline(input);
  const s = scenario(input, premiumChange);
  const cap = input.capRatePct;
  const capColumns = [cap - 0.5, cap, cap + 0.5, cap + 1].filter((c) => c > 0);
  const grid = sensitivityGrid(input, SCENARIOS, capColumns);
  const breach = premiumIncreaseToBreachDscr(input);
  const wind = windDeductibleExposure(input);
  const itv = itvGap(input);
  const lor = lossOfRentsCheck(input);
  const covenant = input.dscrCovenant ?? DEFAULT_DSCR_COVENANT;

  const ready = input.units > 0 && input.annualPremium > 0 && b.noi > 0 && cap > 0;

  const openAdvanced = () => {
    setAdvancedOpen(true);
    advancedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ------------------------------------------------ inputs */}
      <section id="calculator" className="print:hidden bg-white px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Step one" title="Your portfolio">
            <p>
              Six numbers off your last operating statement. Nothing leaves your browser — there is no
              account, and nothing is submitted anywhere until you ask for it further down.
            </p>
          </SectionHeading>

          {prefilled && (
            <p className="mt-6 inline-block border-l-2 border-gold bg-ivory px-4 py-2 text-sm text-slate">
              Prefilled with an example portfolio, not a benchmark.{" "}
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
            <NumberField label="Units" value={f.units} onChange={set("units")} placeholder="250" />
            <NumberField
              label="Annual insurance premium"
              value={f.premium}
              onChange={set("premium")}
              prefix="$"
              hint="Property, GL, and umbrella combined."
            />
            <NumberField
              label="Average rent"
              value={f.rent}
              onChange={set("rent")}
              prefix="$"
              suffix="/unit/mo"
            />
            <NumberField label="Economic occupancy" value={f.occ} onChange={set("occ")} suffix="%" grouped={false} />
            <NumberField
              label="Total operating expenses"
              value={f.opex}
              onChange={set("opex")}
              prefix="$"
              hint="Annual, including the insurance premium above."
            />
            <NumberField
              label="Cap rate"
              value={f.cap}
              onChange={set("cap")}
              suffix="%"
              grouped={false}
              hint="Your market's, or your last appraisal's."
            />
          </div>

          <details
            ref={advancedRef}
            open={advancedOpen}
            onToggle={(e) => setAdvancedOpen(e.currentTarget.open)}
            className="mt-10 border-t border-gold/25 pt-6"
          >
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Advanced — debt, deductibles, valuation (optional)
            </summary>
            <p className="mt-3 max-w-2xl text-sm text-slate">
              Each of these unlocks a section below. Leave anything blank and that section stays
              hidden rather than guessing at a number for you.
            </p>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField label="Other income" value={f.other} onChange={set("other")} prefix="$" hint="Annual: fees, RUBS, parking." />
              <NumberField label="Annual debt service" value={f.ads} onChange={set("ads")} prefix="$" hint="Principal and interest, all loans." />
              <NumberField label="DSCR covenant" value={f.covenant} onChange={set("covenant")} grouped={false} suffix="x" hint={`Defaults to ${covenant.toFixed(2)}x.`} />
              <NumberField label="Largest building — insured value" value={f.bldgTiv} onChange={set("bldgTiv")} prefix="$" />
              <NumberField label="Wind / hail deductible" value={f.windPct} onChange={set("windPct")} suffix="%" grouped={false} hint="Percentage deductibles only." />
              <NumberField label="Total insured value carried" value={f.insured} onChange={set("insured")} prefix="$" />
              <NumberField label="Full replacement cost" value={f.rc} onChange={set("rc")} prefix="$" hint="What it would cost to rebuild today." />
              <NumberField label="Coinsurance" value={f.coins} onChange={set("coins")} suffix="%" grouped={false} hint={`Defaults to ${DEFAULT_COINSURANCE}%.`} />
              <NumberField label="Loss of rents limit" value={f.lorLimit} onChange={set("lorLimit")} prefix="$" />
              <NumberField label="Rebuild / indemnity period" value={f.indemnity} onChange={set("indemnity")} suffix="months" grouped={false} />
            </div>
          </details>
        </div>
      </section>

      {!ready ? (
        <section className="px-5 py-14">
          <div className="mx-auto max-w-5xl border-l-2 border-gold bg-white p-6">
            <p className="font-display text-lg font-semibold text-obsidian">Waiting on a few numbers.</p>
            <p className="mt-2 text-sm text-slate">
              Units, premium, rent, occupancy, operating expenses, and a cap rate — with operating
              expenses below effective gross income, so there is positive NOI to work with.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* ------------------------------------------------ where you stand */}
          <section className="px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Step two" title="Where you stand">
                <p>The ratios an underwriter, a lender, and your asset manager all look at first.</p>
              </SectionHeading>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile
                  label="Insurance per unit"
                  value={b.insurancePerUnit !== null ? usd(b.insurancePerUnit) : "—"}
                  formula={
                    hasBenchmark() && PER_UNIT_BAND
                      ? `Premium ÷ units. Peer range ${usd(PER_UNIT_BAND.low)}–${usd(PER_UNIT_BAND.high)} (${PER_UNIT_SOURCE}).`
                      : "Premium ÷ units. The number carriers and buyers quote back at you."
                  }
                  emphasis
                />
                <Tile
                  label="Insurance % of EGI"
                  value={b.insurancePctOfEgi !== null ? pct(b.insurancePctOfEgi) : "—"}
                  formula="Premium ÷ effective gross income."
                />
                <Tile
                  label="Insurance % of opex"
                  value={b.insurancePctOfOpex !== null ? pct(b.insurancePctOfOpex) : "—"}
                  formula="Premium ÷ total operating expenses."
                />
                <Tile
                  label="Operating expense ratio"
                  value={b.opexRatio !== null ? pct(b.opexRatio) : "—"}
                  formula="Total opex ÷ EGI."
                />
              </div>

              <div className="mt-px grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile label="Effective gross income" value={usdCompact(b.egi)} formula="Gross potential rent × occupancy, plus other income." />
                <Tile label="Net operating income" value={usdCompact(b.noi)} formula="EGI − total operating expenses." />
                <Tile
                  label={`Implied value at ${cap}%`}
                  value={b.value !== null ? usdCompact(b.value) : "—"}
                  formula="NOI ÷ cap rate."
                />
                <Tile
                  label="Break-even occupancy"
                  value={b.breakEvenOccupancyPct !== null ? pct(b.breakEvenOccupancyPct / 100) : "—"}
                  formula={f.ads ? "(Opex + debt service) ÷ gross potential rent." : "Opex ÷ gross potential rent. Add debt service for the levered figure."}
                />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------ the capitalized premium */}
          <section className="gold-rule-top bg-obsidian px-5 py-16 text-champagne">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                What most operators never calculate
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Your insurance program is capitalized at{" "}
                <span className="font-mono tabular-nums text-gold">
                  {b.capitalizedInsurance !== null ? usdCompact(b.capitalizedInsurance) : "—"}
                </span>
                .
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-slate">
                Insurance is an operating expense, so every dollar of it comes straight out of NOI —
                and NOI is what gets capitalized into value. At a {cap}% cap rate, one dollar of
                annual premium carries{" "}
                <span className="font-mono text-champagne">
                  {b.valuePerPremiumDollar !== null ? `$${b.valuePerPremiumDollar.toFixed(2)}` : "—"}
                </span>{" "}
                of asset value. Your {usd(input.annualPremium)} premium is holding{" "}
                {b.capitalizedInsurance !== null ? usdCompact(b.capitalizedInsurance) : "—"} of it
                off your balance sheet, or{" "}
                {b.capitalizedInsurance !== null && input.units > 0
                  ? usd(b.capitalizedInsurance / input.units)
                  : "—"}{" "}
                per unit.
              </p>
              <p className="mt-4 max-w-2xl text-sm text-slate">
                Premium ÷ cap rate. The same arithmetic your buyer will run.
              </p>
            </div>
          </section>

          {/* ------------------------------------------------ the lever */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Step three" title="What a renewal is worth">
                <p>
                  Move the premium and watch NOI, value, and coverage move with it. Both directions —
                  a renewal increase destroys value exactly as fast as a reduction creates it.
                </p>
              </SectionHeading>

              <div className="print:hidden mt-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label htmlFor="premium-change" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                    Premium change at renewal
                  </label>
                  <span className="font-mono text-2xl tabular-nums text-obsidian">
                    {signedPct(premiumChange, 0)}
                  </span>
                </div>
                <input
                  id="premium-change"
                  type="range"
                  min={-SLIDER_MAX_PCT}
                  max={SLIDER_MAX_PCT}
                  step={1}
                  value={Math.round(premiumChange * 100)}
                  onChange={(e) => setPremiumChange(Number(e.target.value) / 100)}
                  className="mt-3 w-full accent-[color:var(--color-gold)]"
                />
                <div className="mt-1 flex justify-between font-mono text-xs text-slate">
                  <span>−{SLIDER_MAX_PCT}%</span>
                  <span>0</span>
                  <span>+{SLIDER_MAX_PCT}%</span>
                </div>
              </div>

              <p className="mt-8 max-w-3xl font-display text-xl font-semibold leading-snug text-obsidian sm:text-2xl">
                {premiumChange === 0 ? (
                  <>Hold the premium flat and nothing moves. Drag the slider either way.</>
                ) : premiumChange < 0 ? (
                  <>
                    Cutting the premium {pct(-premiumChange, 0)} saves{" "}
                    {usd(Math.abs(s.premiumDelta))} a year and adds{" "}
                    <span className="text-gold">{usdCompact(s.valueDelta ?? 0)}</span> of value —{" "}
                    {s.valueDeltaPerUnit !== null ? usd(s.valueDeltaPerUnit) : "—"} per unit.
                  </>
                ) : (
                  <>
                    A {pct(premiumChange, 0)} increase costs {usd(s.premiumDelta)} a year and takes{" "}
                    <span className="text-gold">{usdCompact(Math.abs(s.valueDelta ?? 0))}</span> off
                    the value — {s.valueDeltaPerUnit !== null ? usd(Math.abs(s.valueDeltaPerUnit)) : "—"}{" "}
                    per unit.
                  </>
                )}
              </p>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile label="Premium at renewal" value={usd(s.newPremium)} formula={`Current premium × ${(1 + premiumChange).toFixed(2)}.`} />
                <Tile label="NOI" value={usdCompact(s.newNoi)} formula="Premium change flows to NOI dollar-for-dollar." />
                <Tile
                  label="Change in value"
                  value={s.valueDelta !== null ? signedUsdCompact(s.valueDelta) : "—"}
                  formula="−Premium change ÷ cap rate."
                  emphasis
                />
                <Tile
                  label="Per unit"
                  value={s.valueDeltaPerUnit !== null ? signedUsd(s.valueDeltaPerUnit) : "—"}
                  formula="Change in value ÷ units."
                />
              </div>

              {b.dscr !== null && (
                <div className="mt-px grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                  <Tile label="DSCR today" value={ratio(b.dscr)} formula="NOI ÷ annual debt service." />
                  <Tile label="DSCR at renewal" value={s.newDscr !== null ? ratio(s.newDscr) : "—"} formula="Post-change NOI ÷ annual debt service." />
                  <Tile label="Cash flow today" value={b.cashFlowAfterDebt !== null ? usdCompact(b.cashFlowAfterDebt) : "—"} formula="NOI − debt service." />
                  <Tile label="Cash flow at renewal" value={s.newCashFlowAfterDebt !== null ? usdCompact(s.newCashFlowAfterDebt) : "—"} formula="Post-change NOI − debt service." />
                </div>
              )}
            </div>
          </section>

          {/* ------------------------------------------------ sensitivity grid */}
          <section className="px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Step four" title="Against the exit cap">
                <p>
                  The same premium change is worth more the tighter the cap rate. Value impact of each
                  premium move, across cap rates around yours.
                </p>
              </SectionHeading>

              <div className="mt-8 overflow-x-auto border-t border-gold/30 bg-white">
                <table className="w-full min-w-[34rem] border-collapse text-right font-mono text-sm tabular-nums">
                  <thead>
                    <tr className="border-b border-gold/25">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        Premium
                      </th>
                      {capColumns.map((c) => (
                        <th key={c} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                          {c.toFixed(1)}% cap
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grid.map((row, i) => (
                      <tr key={SCENARIOS[i]} className={SCENARIOS[i] === 0 ? "bg-ivory" : ""}>
                        <td className="border-b border-gold/10 px-4 py-3 text-left text-obsidian">
                          {signedPct(SCENARIOS[i], 0)}
                        </td>
                        {row.map((cell) => (
                          <td
                            key={cell.capRatePct}
                            className={`border-b border-gold/10 px-4 py-3 ${
                              cell.valueDelta > 0
                                ? "text-obsidian"
                                : cell.valueDelta < 0
                                  ? "text-slate"
                                  : "text-slate"
                            }`}
                          >
                            {cell.valueDelta === 0 ? "—" : signedUsdCompact(cell.valueDelta)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate">
                Each cell: −(premium × change) ÷ cap rate. Your cap rate column is {cap}%.
              </p>
            </div>
          </section>

          {/* ------------------------------------------------ retained risk */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Step five" title="What the premium doesn't cover">
                <p>
                  Cost of risk is not just premium. These are the exposures that sit behind a program
                  and only show up at claim time — sized against this portfolio.
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {wind ? (
                  <Finding
                    title="Percentage wind / hail deductible"
                    headline={`${usd(wind.deductibleDollars)} out of pocket`}
                    body={`A ${input.windDeductiblePct}% deductible on a ${usdCompact(input.largestBuildingTiv ?? 0)} building is ${usd(wind.deductibleDollars)} you fund before the policy pays — ${
                      wind.monthsOfNoi !== null ? months(wind.monthsOfNoi) : "—"
                    } of portfolio NOI, and ${
                      wind.pctOfAnnualPremium !== null ? `${wind.pctOfAnnualPremium.toFixed(1)}x` : "—"
                    } your entire annual premium. Percentage deductibles are per building, not per portfolio.`}
                  />
                ) : (
                  <Unlock
                    title="Percentage wind / hail deductible"
                    body="Add your largest building's insured value and its wind/hail deductible percentage to see the dollars you're actually retaining, in months of NOI."
                    onOpen={openAdvanced}
                  />
                )}

                {itv ? (
                  itv.payoutRatio < 1 ? (
                    <Finding
                      title="Coinsurance / insurance-to-value"
                      headline={`${pct(itv.payoutRatio)} of any claim`}
                      body={`At ${input.coinsurancePct ?? DEFAULT_COINSURANCE}% coinsurance on ${usdCompact(itv.replacementCost)} of replacement cost, the policy needs ${usdCompact(itv.requiredLimit)} of limit. You carry ${usdCompact(itv.insuredValue)} — ${usdCompact(itv.shortfall)} short. The clause cuts every covered loss to ${pct(itv.payoutRatio)}, which is ${usdCompact(itv.haircutOnFullLoss)} out of your pocket on a total loss.`}
                    />
                  ) : (
                    <Finding
                      title="Coinsurance / insurance-to-value"
                      headline="No coinsurance penalty"
                      body={`You carry ${usdCompact(itv.insuredValue)} against a ${usdCompact(itv.requiredLimit)} requirement, so claims pay in full. Worth re-testing every year — replacement costs moved faster than most schedules of value did.`}
                    />
                  )
                ) : (
                  <Unlock
                    title="Coinsurance / insurance-to-value"
                    body="Add the insured value you carry and today's full replacement cost to test whether a coinsurance or margin clause would cut your claim check."
                    onOpen={openAdvanced}
                  />
                )}

                {lor ? (
                  <Finding
                    title="Loss of rents"
                    headline={
                      lor.gap > 0
                        ? `${usdCompact(lor.gap)} short`
                        : `${lor.monthsCovered !== null ? months(lor.monthsCovered) : "—"} covered`
                    }
                    body={
                      lor.gap > 0
                        ? `${article(lor.indemnityMonths) === "an" ? "An" : "A"} ${lor.indemnityMonths}-month rebuild costs ${usdCompact(lor.requiredLimit)} in lost rents at ${usdCompact(lor.monthlyEgi)} a month. Your limit is ${usdCompact(lor.carriedLimit)} — it runs out after ${lor.monthsCovered !== null ? months(lor.monthsCovered) : "—"}, and the rest is unfunded.`
                        : `Your ${usdCompact(lor.carriedLimit)} limit covers ${lor.monthsCovered !== null ? months(lor.monthsCovered) : "—"} at ${usdCompact(lor.monthlyEgi)} a month, against ${article(lor.indemnityMonths)} ${lor.indemnityMonths}-month rebuild. Check the indemnity period wording too, not just the limit.`
                    }
                  />
                ) : (
                  <Unlock
                    title="Loss of rents"
                    body="Add your loss-of-rents limit and a realistic rebuild period to see how many months of income the limit actually funds."
                    onOpen={openAdvanced}
                  />
                )}

                {breach !== null ? (
                  <Finding
                    title="Lender covenant headroom"
                    headline={
                      breach <= 0
                        ? `Already below ${ratio(covenant)}`
                        : breach > 3
                          ? "Comfortable"
                          : `+${pct(breach, 0)} premium`
                    }
                    body={
                      breach <= 0
                        ? `At ${ratio(b.dscr ?? 0)}, this portfolio is already under a ${ratio(covenant)} covenant before any renewal increase. Insurance is the fastest line to move.`
                        : breach > 3
                          ? `DSCR is ${ratio(b.dscr ?? 0)}. Premium would have to more than triple to reach a ${ratio(covenant)} covenant, so insurance is a value question here, not a compliance one.`
                          : `DSCR is ${ratio(b.dscr ?? 0)} today. A ${pct(breach, 0)} premium increase — ${usd(input.annualPremium * breach)} — takes you to your ${ratio(covenant)} covenant. That is inside the range this class has been renewing at.`
                    }
                  />
                ) : (
                  <Unlock
                    title="Lender covenant headroom"
                    body="Add annual debt service to see how large a premium increase your DSCR covenant can absorb before you trip it."
                    onOpen={openAdvanced}
                  />
                )}
              </div>
            </div>
          </section>

          <SaveShare shareQuery={shareUrl} />

          {/* ------------------------------------------------ methodology */}
          <section className="px-5 py-14">
            <div className="mx-auto max-w-3xl">
              <SectionHeading eyebrow="Methodology" title="Every formula on this page" />
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["Gross potential rent", "Units × average monthly rent × 12."],
                  ["Effective gross income", "Gross potential rent × economic occupancy + other income."],
                  ["Net operating income", "EGI − total operating expenses (insurance included)."],
                  ["Value", "NOI ÷ cap rate. Direct capitalization, no growth or reversion assumptions."],
                  ["Capitalized insurance", "Annual premium ÷ cap rate."],
                  ["Value per premium dollar", "1 ÷ cap rate."],
                  ["Change in value", "−(premium × premium change) ÷ cap rate."],
                  ["DSCR", "NOI ÷ annual debt service."],
                  ["Covenant breach point", "(NOI − covenant × debt service) ÷ premium, as a fraction of current premium."],
                  ["Wind deductible", "Building insured value × deductible percentage."],
                  ["Coinsurance payout ratio", "Insured value ÷ (replacement cost × coinsurance percentage), capped at 1."],
                  ["Loss of rents required", "(EGI ÷ 12) × indemnity months."],
                ].map(([term, def]) => (
                  <div key={term} className="border-b border-gold/15 pb-4">
                    <dt className="font-display font-semibold text-obsidian">{term}</dt>
                    <dd className="mt-1 font-mono text-slate">{def}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-slate">
                Direct capitalization is a screening tool, not an appraisal. It assumes the premium
                change is permanent and that nothing else in the operating statement moves. Real
                renewals arrive with deductible, sublimit, and valuation changes attached, which is
                why the sections above matter as much as the premium line.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}

const ADVANCED: FieldKey[] = [
  "other",
  "ads",
  "covenant",
  "bldgTiv",
  "windPct",
  "insured",
  "rc",
  "coins",
  "lorLimit",
  "indemnity",
];

function Unlock({ title, body, onOpen }: { title: string; body: string; onOpen: () => void }) {
  return (
    <div className="border-l-2 border-gold/30 bg-ivory p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate">{body}</p>
      <button
        type="button"
        onClick={onOpen}
        className="print:hidden mt-3 text-sm font-semibold text-obsidian underline hover:text-gold"
      >
        Add those inputs →
      </button>
    </div>
  );
}

/** The one gate on the page: the takeaway memo, not the numbers. */

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
            Take it with you.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Print it for the asset management meeting, or copy the link — it reopens this page with
            every input filled in. Nothing was sent anywhere to produce any of this.
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
