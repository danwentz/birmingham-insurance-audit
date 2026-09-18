import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { MultifamilyCalculator } from "@/components/calculator/MultifamilyCalculator";
import { BRAND_NAME, DOMAIN } from "@/lib/site";

const TITLE = "Multifamily Insurance Calculator | NOI, Cap Rate & Value";
const DESCRIPTION =
  "See what your premium costs in NOI, value at your cap rate, DSCR, and cost per unit. Free multifamily insurance calculator — no email required.";
const PATH = "/multifamily-insurance-calculator";

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
    q: "How does insurance affect NOI and property value?",
    a: "Insurance is an operating expense, so every dollar of premium reduces net operating income by a dollar. Under direct capitalization, value is NOI divided by the cap rate — so a dollar of annual premium carries roughly $14.29 of asset value at a 7% cap, or $16.67 at 6%. A $100,000 premium reduction on a portfolio valued at a 7% cap adds about $1.43 million of value.",
  },
  {
    q: "What is a normal insurance cost per unit for multifamily?",
    a: "Insurance cost per unit per year is the metric carriers, buyers, and asset managers all quote, and it rose sharply between 2019 and 2024 as habitational capacity left the market. The right benchmark depends on construction type, roof age, catastrophe exposure, loss history, and state, so a single national average is close to useless. What matters more is whether your number moved because the market moved or because your program stopped being marketed.",
  },
  {
    q: "How do I calculate the value impact of an insurance premium increase?",
    a: "Divide the annual premium increase by your cap rate. A $60,000 renewal increase at a 7% cap is roughly $857,000 of value destroyed, because the higher expense permanently lowers the NOI a buyer will capitalize. This is why a renewal is an asset-value event, not just a budget line.",
  },
  {
    q: "How does insurance affect DSCR and my loan covenants?",
    a: "Premium comes out of NOI, and DSCR is NOI divided by annual debt service, so a premium increase lowers DSCR directly. On a leveraged deal the covenant headroom can be smaller than owners expect: the calculator above solves for the exact premium increase that drops you to your covenant, which is often well inside the range this asset class has been renewing at.",
  },
  {
    q: "What is a percentage wind or hail deductible actually worth?",
    a: "It is retained risk, priced at zero on your statements. A 5% wind deductible applies to the insured value of each affected building, not the portfolio — so a $30 million building carries a $1.5 million deductible you fund yourself before the policy responds. Sizing that against monthly NOI usually changes how an owner thinks about a deductible buy-down.",
  },
  {
    q: "Why does insurance-to-value matter if I never have a total loss?",
    a: "Because a coinsurance or margin clause tests your limit against replacement cost on every claim, not just total losses. If you carry 85% of what the clause requires, covered losses pay at 85%. Replacement costs rose faster than most schedules of value were updated, which quietly created this gap on a lot of otherwise well-run programs.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${DOMAIN}${PATH}#app`,
      name: "Multifamily Insurance Impact Calculator",
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
          name: "Multifamily & Apartment Insurance",
          item: `${DOMAIN}/multifamily-apartment-insurance`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Insurance Impact Calculator",
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

export default function CalculatorPage() {
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
            NOI
          </span>
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/multifamily-apartment-insurance"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
            >
              Multifamily & Apartment Insurance <ArrowRight className="h-3 w-3" />
            </Link>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              What your insurance program is doing to NOI, value, and DSCR.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Insurance is the fastest-moving line on a multifamily operating statement and the only
              one you can materially change in sixty days. It is also the one owners size in dollars
              instead of in cap-rate value. Put your numbers in and see both.
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                "Cost per unit, % of EGI, and % of opex",
                "Value created or destroyed at your cap rate",
                "DSCR and the premium increase that trips your covenant",
                "Wind deductible, coinsurance, and loss-of-rents exposure",
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
              Run the numbers <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-slate">
              No email required to see your results. Nothing is transmitted until you ask.
            </p>
          </div>
        </section>

        <MultifamilyCalculator />

        {/* ---------------------------------------------- SEO / context copy */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Why operators underprice their own insurance decisions
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              <p>
                Ask an owner what a $75,000 premium increase costs and you&apos;ll get the right answer in
                cash and the wrong answer in value. The cash answer is $75,000 a year. The value
                answer, on a portfolio underwritten at a 7% cap, is about $1.07 million — because
                the expense is permanent, it lowers the NOI a buyer capitalizes, and it shows up in
                every appraisal, refinance, and sale from that point forward.
              </p>
              <p>
                That asymmetry is why insurance gets managed like a bill and not like an asset.
                Renewal season is short, the increase looks survivable against a budget, and the
                decision to roll over with the incumbent carrier costs nothing today. Priced against
                value, the same decision is frequently the largest single move available on the
                property that year — larger than a rent bump the market won&apos;t support or a capex
                project that takes eighteen months to earn back.
              </p>
              <p>
                No property class got repriced harder than multifamily. Premiums rose sharply between
                2019 and 2024, standard carriers retreated from habitational general liability, and
                renewals started arriving with percentage wind and hail deductibles and
                assault-and-battery sublimits attached. Plenty of owners are still paying hard-market
                pricing on programs that were never re-marketed once the market softened.
              </p>
              <p>
                The calculator above is built to make that comparison in the terms you already
                underwrite in. It also sizes the parts of a program that don&apos;t appear in the premium
                at all — the retained deductible, the coinsurance haircut, the loss-of-rents limit
                that runs out before the building is rebuilt — because those are usually where a
                cheap-looking renewal turns expensive.
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

            <div className="mt-14 border-l-2 border-gold bg-ivory p-6">
              <p className="font-display text-lg font-semibold text-obsidian">
                Looking for the program, not the math?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Habitational property, general liability, and umbrella for owners and operators of 50
                to 10,000+ units.
              </p>
              <Link
                href="/multifamily-apartment-insurance"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
              >
                Multifamily &amp; apartment insurance <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <ContactSection
          source="multifamily-calculator"
          heading="Have someone read the program behind these numbers"
          sub="The calculator prices the premium. It can't tell you whether that premium is right for the risk — that takes your loss runs, your schedule of values, and what the habitational market is charging accounts like yours this quarter. Send the program over, or just the renewal date."
        />
      </main>

      <SiteFooter />
    </>
  );
}
