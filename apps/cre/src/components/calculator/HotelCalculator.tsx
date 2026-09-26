"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Printer, Link2, Check, ArrowRight } from "lucide-react";
import {
  baseline,
  scenario,
  sensitivityGrid,
  premiumIncreaseToBreachDscr,
  breakEvenOccupancy,
  seasonality,
  businessIncomeCheck,
  DEFAULT_DSCR_COVENANT,
  DEFAULT_PEAK_MONTHS,
  type HotelInput,
} from "@/lib/hotel";
import {
  usd,
  usdCents,
  usdCompact,
  signedUsd,
  signedUsdCents,
  signedUsdCompact,
  pct,
  signedPct,
  ratio,
  months,
  article,
  int,
  groupDigits,
  parseNum,
} from "@/lib/format";
import { NumberField, Tile, SectionHeading, Finding } from "@/components/calculator/fields";
import { CalculatorDisclaimer } from "@/components/Disclaimers";

// Short URL keys so a shared link stays readable.
const URL_KEYS = {
  keys: "k",
  adr: "a",
  occ: "o",
  other: "or",
  opex: "x",
  premium: "p",
  cap: "c",
  ads: "ds",
  covenant: "cv",
  varCost: "vc",
  biLimit: "bi",
  indemnity: "im",
  peakShare: "pk",
  peakMonths: "pm",
} as const;

type FieldKey = keyof typeof URL_KEYS;

/** Scenario slider. Kept out of URL_KEYS because that map is text fields only. */
const URL_PREMIUM_CHANGE = "pc";

/** Prefilled so the page is alive on arrival. Labelled as an example in the UI
 *  and cleared by one button. Advanced fields start empty on purpose: a DSCR or
 *  a break-even built from someone else's debt would read as if it were theirs. */
const EXAMPLE: Record<FieldKey, string> = {
  keys: "180",
  adr: "210",
  occ: "72",
  other: "3,200,000",
  opex: "9,800,000",
  premium: "420,000",
  cap: "8.5",
  ads: "",
  covenant: "",
  varCost: "",
  biLimit: "",
  indemnity: "",
  peakShare: "",
  peakMonths: "",
};

const EMPTY = Object.fromEntries(Object.keys(EXAMPLE).map((k) => [k, ""])) as Record<FieldKey, string>;

const ADVANCED: FieldKey[] = [
  "ads",
  "covenant",
  "varCost",
  "biLimit",
  "indemnity",
  "peakShare",
  "peakMonths",
];

/** Slider bound, as whole percent. Hospitality renewals have moved further than
 *  ±40%, so the slider needs to reach where the market actually went. */
const SLIDER_MAX_PCT = 50;

const clampSliderPct = (p: number) =>
  Math.max(-SLIDER_MAX_PCT, Math.min(SLIDER_MAX_PCT, Math.round(p)));

const SCENARIOS = [-0.2, -0.1, 0, 0.1, 0.2];

export function HotelCalculator() {
  const [f, setF] = useState<Record<FieldKey, string>>(EXAMPLE);
  const [prefilled, setPrefilled] = useState(true);
  const [premiumChange, setPremiumChange] = useState(0.15);
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
      if (Number.isFinite(parsed)) setPremiumChange(clampSliderPct(parsed) / 100);
    }
    if (found) {
      setF(next);
      setPrefilled(false);
      if (ADVANCED.some((field) => next[field])) setAdvancedOpen(true);
    }
  }, []);

  const input: HotelInput = useMemo(
    () => ({
      keys: parseNum(f.keys),
      adr: parseNum(f.adr),
      occupancyPct: parseNum(f.occ),
      totalOpexAnnual: parseNum(f.opex),
      annualPremium: parseNum(f.premium),
      capRatePct: parseNum(f.cap),
      otherRevenueAnnual: f.other ? parseNum(f.other) : undefined,
      annualDebtService: f.ads ? parseNum(f.ads) : undefined,
      dscrCovenant: f.covenant ? parseNum(f.covenant) : undefined,
      variableCostPerOccupiedRoom: f.varCost ? parseNum(f.varCost) : undefined,
      businessIncomeLimit: f.biLimit ? parseNum(f.biLimit) : undefined,
      indemnityMonths: f.indemnity ? parseNum(f.indemnity) : undefined,
      peakShareOfRevenuePct: f.peakShare ? parseNum(f.peakShare) : undefined,
      peakMonths: f.peakMonths ? parseNum(f.peakMonths) : undefined,
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
  const be = breakEvenOccupancy(input);
  const season = seasonality(input);
  const bi = businessIncomeCheck(input);
  const covenant = input.dscrCovenant ?? DEFAULT_DSCR_COVENANT;

  const ready = input.keys > 0 && input.annualPremium > 0 && b.ebitda > 0 && cap > 0;

  const openAdvanced = () => {
    setAdvancedOpen(true);
    advancedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ------------------------------------------------ inputs */}
      <section id="calculator" className="print:hidden bg-white px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Step one" title="Your hotel">
            <p>
              Seven numbers off your last STR report and operating statement. Nothing leaves your
              browser — there is no account, and nothing is submitted anywhere until you ask for it
              further down.
            </p>
          </SectionHeading>

          {prefilled && (
            <p className="mt-6 inline-block border-l-2 border-gold bg-ivory px-4 py-2 text-sm text-slate">
              Prefilled with an example hotel, not a benchmark.{" "}
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
            <NumberField label="Keys" value={f.keys} onChange={set("keys")} placeholder="180" />
            <NumberField
              label="ADR"
              value={f.adr}
              onChange={set("adr")}
              prefix="$"
              hint="Average daily rate."
            />
            <NumberField
              label="Occupancy"
              value={f.occ}
              onChange={set("occ")}
              suffix="%"
              grouped={false}
              hint="ADR × occupancy gives your RevPAR."
            />
            <NumberField
              label="Other revenue"
              value={f.other}
              onChange={set("other")}
              prefix="$"
              hint="F&B, parking, spa, resort fees — annual."
            />
            <NumberField
              label="Total operating expenses"
              value={f.opex}
              onChange={set("opex")}
              prefix="$"
              hint="Annual, including insurance."
            />
            <NumberField
              label="Annual insurance premium"
              value={f.premium}
              onChange={set("premium")}
              prefix="$"
              hint="Property, GL, liquor, and umbrella combined."
            />
            <NumberField
              label="Cap rate"
              value={f.cap}
              onChange={set("cap")}
              suffix="%"
              grouped={false}
              hint="What the asset trades at."
            />
          </div>

          <details
            ref={advancedRef}
            open={advancedOpen}
            onToggle={(e) => setAdvancedOpen((e.target as HTMLDetailsElement).open)}
            className="mt-12 border-t border-gold/25 pt-8"
          >
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Step two — optional: debt, break-even, and business income
            </summary>
            <p className="mt-4 max-w-3xl text-slate">
              Every field here is optional and each one unlocks a section below. Leave anything blank
              and that section simply doesn&apos;t appear.
            </p>
            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField
                label="Annual debt service"
                value={f.ads}
                onChange={set("ads")}
                prefix="$"
                hint="Principal and interest. Unlocks DSCR."
              />
              <NumberField
                label="DSCR covenant"
                value={f.covenant}
                onChange={set("covenant")}
                grouped={false}
                hint={`Defaults to ${DEFAULT_DSCR_COVENANT.toFixed(2)}x.`}
              />
              <NumberField
                label="Variable cost per occupied room"
                value={f.varCost}
                onChange={set("varCost")}
                prefix="$"
                hint="Housekeeping, amenities, commissions. Unlocks break-even."
              />
              <NumberField
                label="Business income limit"
                value={f.biLimit}
                onChange={set("biLimit")}
                prefix="$"
                hint="What the policy carries for lost income."
              />
              <NumberField
                label="Indemnity period"
                value={f.indemnity}
                onChange={set("indemnity")}
                suffix="months"
                grouped={false}
                hint="How long the policy pays."
              />
              <NumberField
                label="Peak-season share of revenue"
                value={f.peakShare}
                onChange={set("peakShare")}
                suffix="%"
                grouped={false}
                hint="Share earned in your busiest months."
              />
              <NumberField
                label="Peak months"
                value={f.peakMonths}
                onChange={set("peakMonths")}
                grouped={false}
                hint={`Defaults to ${DEFAULT_PEAK_MONTHS}.`}
              />
            </div>
          </details>
        </div>
      </section>

      {!ready && (
        <section className="bg-ivory px-5 py-14">
          <div className="mx-auto max-w-5xl border-l-2 border-gold bg-white p-6">
            <p className="font-display text-lg font-semibold text-obsidian">
              Fill in keys, ADR, occupancy, expenses, premium, and a cap rate.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Everything below calculates from those. EBITDA has to be positive for the value math to
              mean anything.
            </p>
          </div>
        </section>
      )}

      {ready && (
        <>
          {/* ------------------------------------------------ RevPAR headline */}
          <section className="gold-rule-top bg-obsidian px-5 py-14 text-champagne">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Per available room" title="What insurance costs in RevPAR">
                <p className="text-slate">
                  Hotels price everything per available room, so that is where a premium belongs too.
                  Your rooms sell {int(b.roomsAvailable)} nights a year whether or not anyone stays in
                  them, and the premium is spread across every one of them.
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile
                  tone="dark"
                  emphasis
                  label="RevPAR"
                  value={usdCents(b.revpar)}
                  formula={`${usdCents(input.adr)} ADR × ${input.occupancyPct}% occupancy`}
                />
                <Tile
                  tone="dark"
                  emphasis
                  label="Insurance per available room"
                  value={b.insurancePerAvailableRoom !== null ? usdCents(b.insurancePerAvailableRoom) : "—"}
                  formula={`${usdCompact(input.annualPremium)} ÷ ${int(b.roomsAvailable)} room nights`}
                />
                <Tile
                  tone="dark"
                  label="Insurance per key"
                  value={b.insurancePerKey !== null ? usd(b.insurancePerKey) : "—"}
                  formula="Per key, per year"
                />
                <Tile
                  tone="dark"
                  label="% of total revenue"
                  value={b.insurancePctOfTotalRevenue !== null ? pct(b.insurancePctOfTotalRevenue, 2) : "—"}
                  formula={`${usdCompact(b.totalRevenue)} total revenue`}
                />
              </div>

              {b.insurancePerAvailableRoom !== null && b.revpar > 0 && (
                <div className="mt-8 border-l-2 border-gold bg-obsidian/40 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
                    Read it this way
                  </p>
                  <p className="mt-2 font-mono text-xl tabular-nums text-white">
                    {pct(b.insurancePerAvailableRoom / b.revpar, 1)} of RevPAR
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Of the {usdCents(b.revpar)} of RevPAR you earn, {usdCents(b.insurancePerAvailableRoom)} goes
                    to insurance before anything else does. Put differently: your rate has to clear{" "}
                    {usdCents(b.insurancePerOccupiedRoom ?? 0)} on every occupied room night just to pay the
                    premium — and under USALI that charge sits below gross operating profit, so no
                    amount of departmental performance moves it.
                  </p>
                </div>
              )}

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile tone="dark" label="Total revenue" value={usdCompact(b.totalRevenue)} formula={`${usdCents(b.trevpar)} TRevPAR`} />
                <Tile tone="dark" label="EBITDA" value={usdCompact(b.ebitda)} formula="Total revenue − operating expenses" />
                <Tile
                  tone="dark"
                  label="Value at your cap"
                  value={b.value !== null ? usdCompact(b.value) : "—"}
                  formula={`EBITDA ÷ ${cap}%`}
                />
                <Tile
                  tone="dark"
                  label="Value per key"
                  value={b.valuePerKey !== null ? usdCompact(b.valuePerKey) : "—"}
                  formula={`${int(input.keys)} keys`}
                />
              </div>

              <CalculatorDisclaimer tone="dark" />
            </div>
          </section>

          {/* ------------------------------------------------ renewal scenario */}
          <section className="bg-white px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="The renewal" title="What a premium move is worth">
                <p>
                  Insurance is a fixed charge, so a premium change moves EBITDA dollar for dollar and
                  capitalizes into value. Drag the slider to whatever your renewal is doing.
                </p>
              </SectionHeading>

              <div className="print:hidden mt-8 max-w-xl">
                <input
                  type="range"
                  min={-SLIDER_MAX_PCT}
                  max={SLIDER_MAX_PCT}
                  step={1}
                  value={Math.round(premiumChange * 100)}
                  onChange={(e) => {
                    setPrefilled(false);
                    setPremiumChange(clampSliderPct(Number(e.target.value)) / 100);
                  }}
                  className="w-full accent-gold"
                  aria-label="Premium change at renewal"
                />
                <div className="mt-1 flex justify-between text-xs text-slate">
                  <span>−{SLIDER_MAX_PCT}%</span>
                  <span className="font-mono text-sm text-obsidian">
                    {signedPct(premiumChange, 0)} premium
                  </span>
                  <span>+{SLIDER_MAX_PCT}%</span>
                </div>
              </div>

              <div className="mt-8 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                <Tile
                  label="New premium"
                  value={usd(s.newPremium)}
                  formula={`${signedUsd(s.premiumDelta)} against today`}
                />
                <Tile
                  emphasis
                  label="Value created or destroyed"
                  value={s.valueDelta !== null ? signedUsdCompact(s.valueDelta) : "—"}
                  formula={`${signedUsd(-s.premiumDelta)} of EBITDA ÷ ${cap}%`}
                />
                <Tile
                  label="Per key"
                  value={s.valueDeltaPerKey !== null ? signedUsd(s.valueDeltaPerKey) : "—"}
                  formula="Value change ÷ keys"
                />
                <Tile
                  label="New EBITDA"
                  value={usdCompact(s.newEbitda)}
                  formula={`From ${usdCompact(b.ebitda)}`}
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Finding
                  title="To hold EBITDA flat on rate"
                  headline={
                    s.adrToOffset !== null
                      ? `${signedUsdCents(s.adrToOffset)} of ADR`
                      : "—"
                  }
                  body={
                    s.adrToOffset !== null
                      ? `That is the whole premium change spread over ${int(
                          b.occupiedRooms,
                        )} occupied room nights. Against an ADR of ${usdCents(
                          input.adr,
                        )} it is a ${pct(Math.abs(s.adrToOffset) / input.adr, 1)} move in rate — worth knowing before you decide the renewal is survivable.`
                      : "Add occupancy and ADR to see the rate move this premium change implies."
                  }
                />
                <Finding
                  title="Or on occupancy"
                  headline={
                    s.occupancyPointsToOffset !== null
                      ? `${s.occupancyPointsToOffset > 0 ? "+" : ""}${s.occupancyPointsToOffset.toFixed(2)} points`
                      : "—"
                  }
                  body={
                    input.variableCostPerOccupiedRoom !== undefined
                      ? `At ${usdCents(
                          input.adr - input.variableCostPerOccupiedRoom,
                        )} of contribution per occupied room, after the ${usdCents(
                          input.variableCostPerOccupiedRoom,
                        )} it costs to sell one.`
                      : "At full flow-through, which overstates the case — every occupied room costs something to sell. Add a variable cost per occupied room in step two for the real number."
                  }
                />
              </div>

              {/* sensitivity grid */}
              <div className="mt-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                  Value change by premium move and exit cap
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gold/30">
                        <th className="py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                          Premium
                        </th>
                        {capColumns.map((c) => (
                          <th
                            key={c}
                            className="py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate"
                          >
                            {c.toFixed(1)}% cap
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="font-mono tabular-nums">
                      {grid.map((row, i) => (
                        <tr key={SCENARIOS[i]} className="border-b border-gold/15">
                          <td className="py-3 pr-4 font-sans text-slate">
                            {signedPct(SCENARIOS[i], 0)}
                          </td>
                          {row.map((cell) => (
                            <td
                              key={cell.capRatePct}
                              className={`py-3 pr-4 text-right ${
                                cell.valueDelta > 0
                                  ? "text-obsidian"
                                  : cell.valueDelta < 0
                                    ? "text-slate"
                                    : "text-slate/60"
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
                <p className="mt-3 text-xs leading-relaxed text-slate">
                  Every dollar of annual premium carries {usdCents(b.valuePerPremiumDollar ?? 0)} of asset
                  value at {article(cap)} {cap}% cap. Your current premium is {usdCompact(b.capitalizedInsurance ?? 0)} of
                  capitalized expense.
                </p>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------ leverage + exposures */}
          <section className="bg-ivory px-5 py-14">
            <div className="mx-auto max-w-5xl">
              <SectionHeading eyebrow="Where it bites" title="Leverage, operating leverage, and the loss you don't budget for">
                <p>
                  Three things a premium touches that the premium line doesn&apos;t show: your covenant,
                  the occupancy you need to break even, and whether business income actually funds a
                  closure.
                </p>
              </SectionHeading>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {/* DSCR */}
                {b.dscr !== null && breach !== null ? (
                  <Finding
                    title="DSCR"
                    headline={`${ratio(b.dscr)} today, ${ratio(s.newDscr ?? 0)} at this renewal`}
                    body={`Your covenant is ${ratio(covenant)}. A premium increase of ${
                      breach > 0 ? pct(breach, 0) : "zero"
                    }${
                      breach > 0
                        ? ` — about ${usd(input.annualPremium * breach)} — drops you to it.`
                        : " is already required: the covenant is breached at today's premium."
                    } Hotel NOI moves with RevPAR, so covenant headroom that looks comfortable in a strong year is the first thing a soft one takes.`}
                  />
                ) : (
                  <Unlock
                    title="DSCR"
                    body="Add annual debt service in step two to see your coverage today, at this renewal, and the exact premium increase that drops you to your covenant."
                    onOpen={openAdvanced}
                  />
                )}

                {/* break-even occupancy */}
                {be ? (
                  <Finding
                    title="Break-even occupancy"
                    headline={`${be.ebitdaBreakEvenPct.toFixed(1)}% to cover the fixed block`}
                    body={`Your fixed costs run ${usdCompact(
                      be.fixedCostAnnual,
                    )} a year with insurance inside them, against ${usdCents(
                      be.contributionPerOccupiedRoom,
                    )} of contribution per occupied room. That leaves ${be.headroomPoints.toFixed(
                      1,
                    )} points of headroom from today's ${input.occupancyPct}%.${
                      be.cashBreakEvenPct !== null
                        ? ` Covering debt service too takes ${be.cashBreakEvenPct.toFixed(1)}%.`
                        : ""
                    } Every premium dollar is fixed, so it raises this line directly.`}
                  />
                ) : (
                  <Unlock
                    title="Break-even occupancy"
                    body="Add a variable cost per occupied room in step two — housekeeping, amenities, commissions — to see the occupancy that covers your fixed block, insurance included."
                    onOpen={openAdvanced}
                  />
                )}
              </div>

              {/* business income */}
              <div className="mt-4">
                {bi ? (
                  <Finding
                    title="Business income"
                    headline={
                      bi.monthsFundedOnAverage !== null
                        ? `${months(bi.monthsFundedOnAverage)} funded of ${bi.indemnityMonths} bought`
                        : "—"
                    }
                    body={`${usdCompact(bi.carriedLimit)} of limit against ${usdCompact(
                      bi.averageMonthlyRevenue,
                    )} of revenue a month. A ${bi.indemnityMonths}-month closure costs ${usdCompact(
                      bi.requiredOnAverage,
                    )} on average months${
                      bi.gapOnAverage > 0
                        ? `, leaving ${usdCompact(bi.gapOnAverage)} unfunded`
                        : ", which the limit covers"
                    }. Business income pays lost income plus continuing expenses, so revenue is the ceiling rather than the exact need — but a hotel that is closed for rebuild is closed to every department at once.`}
                  />
                ) : (
                  <Unlock
                    title="Business income"
                    body="Add your business income limit and indemnity period in step two to see how much of a closure the policy actually funds."
                    onOpen={openAdvanced}
                  />
                )}
              </div>

              {/* seasonality — the hospitality-specific one */}
              <div className="mt-4">
                {season && bi && bi.monthsFundedFromPeak !== null && bi.monthsFundedOnAverage !== null ? (
                  <Finding
                    title="Seasonality"
                    headline={`${months(bi.monthsFundedFromPeak)} if the closure starts in peak season`}
                    body={`You earn ${input.peakShareOfRevenuePct}% of revenue in ${
                      season.peakMonths
                    } months, so a peak month is worth ${season.peakMultiple.toFixed(
                      2,
                    )}× an average one — ${usdCompact(season.peakMonthlyRevenue)} against ${usdCompact(
                      season.averageMonthlyRevenue,
                    )}. Your limit funds ${months(
                      bi.monthsFundedOnAverage,
                    )} of an average-month closure but only ${months(
                      bi.monthsFundedFromPeak,
                    )} of one that begins at the top of the season — and storms arrive on the season's schedule, not yours. Limits get sized on an average month almost every time.`}
                  />
                ) : (
                  <Unlock
                    title="Seasonality"
                    body="Add your business income limit, indemnity period, and the share of revenue you earn in peak months. Most limits are sized on an average month — but a hurricane doesn't pick an average month."
                    onOpen={openAdvanced}
                  />
                )}
              </div>
            </div>
          </section>

          <SaveShare shareQuery={shareUrl} />
        </>
      )}
    </>
  );
}

function Unlock({ title, body, onOpen }: { title: string; body: string; onOpen: () => void }) {
  return (
    <div className="border-l-2 border-gold/30 bg-white p-5">
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
            Take it to the owner&apos;s meeting.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Print it, or copy the link — it reopens this page with every input filled in. Nothing was
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
