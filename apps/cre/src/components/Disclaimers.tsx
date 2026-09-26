// Compliance copy shared across guides, calculators and CAT pages. Edit the
// wording here only, so every page stays in sync with what compliance approved.

type Tone = "light" | "dark";

// slate fails AA contrast on light backgrounds, so light sections get obsidian/70.
const toneClass = (tone: Tone) => (tone === "dark" ? "text-slate" : "text-obsidian/70");

export function GuideDisclaimerTop({ asOf, tone = "dark" }: { asOf: string; tone?: Tone }) {
  return (
    <p className={`mt-4 max-w-3xl text-xs ${toneClass(tone)}`}>
      General information, not legal, tax, or coverage advice. What&apos;s covered depends on your
      specific policy wording, and the policy controls. Current as of {asOf}.
    </p>
  );
}

export function GuideDisclaimerBottom({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-10 text-sm ${toneClass(tone)}`}>
      This article is for general educational purposes only. It isn&apos;t legal, tax, accounting, or
      lending advice and doesn&apos;t create a producer–client relationship. Policy terms, exclusions,
      and availability vary by carrier, state, and property. Only the policy actually issued
      determines coverage. Regulatory and lender requirements change; confirm current rules with
      your attorney, lender, or servicer before relying on anything here.
    </p>
  );
}

export function CalculatorDisclaimer({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-4 text-xs ${toneClass(tone)}`}>
      Illustrative estimate only, based solely on the numbers you entered. This is not a quote, rate
      indication, coverage recommendation, or offer of insurance. Actual premiums, deductibles, and
      settlements depend on underwriting and policy wording.
    </p>
  );
}

export function SurplusLinesNote({ tone = "light" }: { tone?: Tone }) {
  return (
    <p className={`mt-6 border-l-2 border-gold pl-4 text-sm ${toneClass(tone)}`}>
      Surplus lines insurers are not licensed (&ldquo;admitted&rdquo;) in Alabama, and policies they
      issue are not protected by the Alabama Insurance Guaranty Association if the insurer becomes
      insolvent. Surplus lines placements are generally made only after admitted markets have been
      considered, as state law requires.
    </p>
  );
}
