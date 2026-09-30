// Compliance copy shared across guides, calculators and CAT pages. Edit the
// wording here only, so every page stays in sync with what compliance approved.

type Tone = "light" | "dark";

// slate fails AA contrast on light backgrounds, so light sections get obsidian/70.
const toneClass = (tone: Tone) => (tone === "dark" ? "text-slate" : "text-obsidian/70");

// Smallest text on any page, italic, one paragraph.
const base = "text-[11px] italic leading-snug";

export function GuideDisclaimerTop({ asOf, tone = "dark" }: { asOf: string; tone?: Tone }) {
  return (
    <p className={`mt-4 max-w-3xl ${base} ${toneClass(tone)}`}>
      General information, not legal, tax, or coverage advice. What&apos;s covered depends on your
      specific policy wording, and the policy controls. Current as of {asOf}.
    </p>
  );
}

export function GuideDisclaimerBottom({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-10 ${base} ${toneClass(tone)}`}>
      This article is for general educational purposes only. It isn&apos;t legal, tax, accounting, or
      lending advice and doesn&apos;t create a producer–client relationship. Policy terms, exclusions,
      and availability vary by carrier, state, and property. Only the policy actually issued
      determines coverage. Regulatory and lender requirements change; confirm current rules with
      your attorney, lender, or servicer before relying on anything here.
    </p>
  );
}

// Goes at the top of any section that summarizes case law or statutes, in addition to the guide disclaimers.
// Pass `state` for a single-state page; omit it on multi-state pages.
export function LegalInfoDisclaimer({ asOf, state, tone = "light" }: { asOf: string; state?: string; tone?: Tone }) {
  return (
    <p className={`mt-4 max-w-3xl ${base} ${toneClass(tone)}`}>
      We are insurance brokers, not attorneys. This summary of {state ? `${state} law` : "the law"} is
      general information, not legal advice, and reading it doesn&apos;t create an attorney–client
      relationship. Court decisions and statutes change, and how they apply depends on the facts of
      each case. Current as of {asOf}. If you face a claim or a lawsuit, talk to{" "}
      {state ? `a licensed ${state} attorney` : "an attorney licensed in your state"}.
    </p>
  );
}

export function CalculatorDisclaimer({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-4 ${base} ${toneClass(tone)}`}>
      Illustrative estimate only, based solely on the numbers you entered. This is not a quote, rate
      indication, coverage recommendation, or offer of insurance. Actual premiums, deductibles, and
      settlements depend on underwriting and policy wording.
    </p>
  );
}

export function BarometerDisclaimer({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-4 max-w-3xl ${base} ${toneClass(tone)}`}>
      These forecasts are a statistical estimate from historical market data, not a quote, rate
      indication, or coverage recommendation. Actual renewal outcomes depend on your own loss
      history, exposures, and underwriting, and can differ from the market-wide trend shown here.
    </p>
  );
}

export function SurplusLinesNote({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-6 ${base} ${toneClass(tone)}`}>
      Surplus lines insurers are not licensed (&ldquo;admitted&rdquo;) in Alabama, and policies they
      issue are not protected by the Alabama Insurance Guaranty Association if the insurer becomes
      insolvent. Surplus lines placements are generally made only after admitted markets have been
      considered, as state law requires.
    </p>
  );
}
