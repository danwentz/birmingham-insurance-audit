import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { WindDeductibleCalculator } from "@/components/calculator/WindDeductibleCalculator";
import { BRAND_NAME, DOMAIN } from "@/lib/site";

const TITLE = "Wind & Hail Deductible Calculator | Percentage Deductibles";
const DESCRIPTION =
  "See what a 5% wind or hail deductible really retains across your schedule — per location, per storm, per season. Free calculator, no email required.";
const PATH = "/wind-deductible-calculator";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}${PATH}`,
    siteName: BRAND_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    q: "How does a percentage wind deductible work?",
    a: "It is a percentage of the insured value of the property that was damaged, not a percentage of the loss. A 5% wind deductible on a building insured for $30 million is a $1.5 million deductible, whether the storm caused $2 million of damage or $200,000. That is why a percentage deductible can turn a real claim into no recovery at all: any loss below the deductible is entirely retained.",
  },
  {
    q: "Does the wind deductible apply per building or per occurrence?",
    a: "On almost every commercial property form it applies per location, or per unit of insurance, which means one named storm across four buildings applies four separate deductibles. Owners routinely budget for one. The calculator above adds them the way the policy does, so the retained number matches what a storm would actually cost.",
  },
  {
    q: "How do I calculate a 5% wind deductible?",
    a: "Multiply each affected location's insured value — building, business personal property, and loss of rents as the policy schedules it — by 5%, then apply any dollar minimum, then add the affected locations together. On a $30 million, $18.5 million, and $12 million schedule, a storm across the two largest locations retains $2.425 million before the policy responds.",
  },
  {
    q: "What does a minimum per location mean on a wind deductible?",
    a: "It is a dollar floor the deductible cannot fall below. A 5% deductible with a $250,000 minimum on a $4 million building is $250,000, not $200,000 — an effective rate of 6.25%. The minimum is what makes small locations disproportionately expensive to retain, and it is the clause most often missed when owners price the schedule themselves.",
  },
  {
    q: "What is the difference between a named storm, hurricane, and wind/hail deductible?",
    a: "A wind/hail deductible triggers on any wind or hail damage. A named storm deductible triggers only once the National Hurricane Center names the system, and a hurricane deductible usually requires a declared hurricane category at landfall. The narrower the trigger, the more losses fall under the smaller all-other-perils deductible instead — which is why the trigger language is worth as much negotiation as the percentage.",
  },
  {
    q: "Is a wind deductible buy-down worth buying?",
    a: "It depends on what it costs against the risk it removes. A buy-down replaces the per-location percentage with one flat retention, so the value is the difference between the two, weighted by how often you expect a damaging event. If a buy-down removes $2.1 million of retention and you believe a storm finds the schedule roughly one year in seven, the trade is worth up to about $300,000 a year. The calculator above prices that line at whatever odds you set.",
  },
  {
    q: "Why did my wind deductible go from 2% to 5%?",
    a: "Catastrophe capacity repriced sharply after the 2017-2024 storm and hail years, and carriers moved retention onto owners rather than raise rate alone. A deductible change is a quieter concession than a premium increase and often passes through a renewal unnegotiated, even though moving a $64 million schedule from 2% to 5% can more than double what a single storm retains.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${DOMAIN}${PATH}#app`,
      name: "Wind & Hail Deductible Calculator",
      url: `${DOMAIN}${PATH}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      description: DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@id": `${DOMAIN}/#org` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}${PATH}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        {
          "@type": "ListItem",
          position: 2,
          name: "Catastrophe, Coastal & Wind/Hail Property Insurance",
          item: `${DOMAIN}/catastrophe-coastal-property-insurance`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Wind Deductible Calculator",
          item: `${DOMAIN}${PATH}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${DOMAIN}${PATH}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function WindDeductibleCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-2%] -translate-y-1/2 select-none font-display text-[30vw] font-bold leading-none tracking-tight text-gold opacity-[0.04]"
          >
            5%
          </span>
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/catastrophe-coastal-property-insurance"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
            >
              Catastrophe &amp; Wind/Hail Property Insurance <ArrowRight className="h-3 w-3" />
            </Link>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              What a 5% wind deductible actually costs you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              It is not 5% of the loss. It is 5% of the insured value of every location the storm
              touches — added together, subject to a dollar minimum, with no occurrence cap unless
              you bought one. Put your schedule in and see the real retained number.
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                "Deductible per location, after the dollar minimum",
                "What one storm across several locations retains",
                "Retention in months of NOI and multiples of premium",
                "What a buy-down is worth at your own odds",
              ].map((item) => (
                <li key={item} className="border-l-2 border-gold pl-3 text-slate">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#calculator"
              className="mt-9 inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
            >
              Run your schedule <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-slate">
              No email required to see your results. Nothing is transmitted until you ask.
            </p>
          </div>
        </section>

        <WindDeductibleCalculator />

        {/* ---------------------------------------------- SEO / context copy */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              The deductible is the part of the program nobody prices
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              <p>
                Every owner can tell you their premium. Far fewer can tell you what they retain
                before that premium buys them anything, and almost nobody has added it up across a
                schedule. A percentage wind deductible is retained risk carried at a stated value of
                zero — it appears on no statement, accrues to no reserve, and shows up for the first
                time in the week after a storm.
              </p>
              <p>
                The mechanics are where it gets expensive. The percentage applies to the insured
                value of the damaged property, not to the size of the loss, so a $400,000 roof claim
                on a building carrying a $1.5 million deductible is not a partial recovery — it is no
                recovery. And on nearly every commercial form the deductible applies per location, so
                a named storm that tracks across four assets applies four deductibles. Owners budget
                for one.
              </p>
              <p>
                That structure is also the quietest way a renewal gets worse. Moving a schedule from
                a 2% deductible to 5% is a larger transfer of risk than most rate increases, costs
                the carrier nothing to ask for, and arrives inside a quote that looks flat or better
                on premium. Deductible minimums do the same thing from the other direction: a
                $250,000 per-location minimum makes every building under $5 million retain more than
                its stated percentage, which is why portfolios with a long tail of small assets get
                hit hardest by a term that reads like a rounding detail.
              </p>
              <p>
                The buy-down question follows directly. A buy-down replaces the per-location
                percentage with one flat retention, and it is worth buying whenever it costs less
                than the risk it removes. That calculation needs a view on how often a damaging event
                actually finds your schedule, which is a judgment, not a fact — so the calculator
                above puts that assumption on a slider rather than burying it. What usually matters
                is not the precise number but whether the quoted buy-down sits near the break-even
                line or nowhere near it.
              </p>
            </div>

            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Common questions
            </h2>
            <div className="mt-6 space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.q} className="border-b border-gold/20 pb-4">
                  <summary className="cursor-pointer font-display font-semibold text-obsidian">
                    {faq.q}
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate">{faq.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Own apartments?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Size the whole program — premium against NOI, value at your cap rate, DSCR
                  headroom, and this deductible alongside it.
                </p>
                <Link
                  href="/multifamily-insurance-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Multifamily insurance calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">Own hotels?</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Price the premium in RevPAR, see the ADR move a renewal implies, and check whether
                  business income funds a peak-season closure.
                </p>
                <Link
                  href="/hotel-insurance-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Hotel insurance calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Looking for the program, not the math?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Named storm and hail capacity, deductible buy-downs, and parametric structures for
                  coastal and hail-belt schedules.
                </p>
                <Link
                  href="/catastrophe-coastal-property-insurance"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Catastrophe &amp; coastal property insurance <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection
          source="wind-deductible-calculator"
          heading="Have someone price the buy-down against the market"
          sub="The calculator sizes what you retain. Whether that retention is worth buying down depends on your loss history, your construction and roof ages, and what catastrophe capacity is charging for accounts like yours this quarter. Send the schedule over, or just the renewal date."
        />
      </main>

      <SiteFooter />
    </>
  );
}
