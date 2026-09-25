import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { CoinsuranceCalculator } from "@/components/calculator/CoinsuranceCalculator";
import { BRAND_NAME, DOMAIN, PHONE_E164 } from "@/lib/site";

const TITLE = "Coinsurance Penalty Calculator | Insurance-to-Value Gap";
const DESCRIPTION =
  "See what a coinsurance clause actually pays on your loss — total or partial — and what it takes to cure the gap. Free calculator, no email required.";
const PATH = "/coinsurance-penalty-calculator";

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
    q: "What is a coinsurance clause?",
    a: "It's the requirement, on almost every commercial property policy, that you carry a limit equal to at least a set percentage of replacement cost — typically 80%, 90%, or 100%. Fall short and the clause doesn't just deny the gap: it cuts every covered claim by the same ratio, total loss or not. It exists so owners can't insure a $10 million building for $2 million and pay a bargain premium for full-limit protection.",
  },
  {
    q: "How is a coinsurance penalty calculated?",
    a: "Required limit = replacement cost × coinsurance percentage. Payout ratio = limit carried ÷ required limit, capped at 1. The policy pays: loss × ratio, minus the deductible, capped at the limit. On the standard ISO CP 00 10 worked example — $10 million replacement cost, 90% coinsurance, a $6.3 million limit, a $2 million loss, and a $25,000 deductible — the ratio is 0.7 and the payout is $1,375,000, not the $1,975,000 it would have paid at full value.",
  },
  {
    q: "Does the coinsurance penalty apply to a partial loss?",
    a: "Yes, and this is the part owners miss. The ratio applies to whatever the loss is, not just a total loss. A $200,000 roof claim gets cut to 70% just like a $10 million total loss would, because the clause tests your insurance-to-value at the moment of loss, not the size of the loss itself. Most claims are partial, which is exactly why this deserves more attention than it gets.",
  },
  {
    q: "What is an agreed value endorsement, and does it remove coinsurance?",
    a: "An agreed value endorsement suspends the coinsurance clause for the policy period, based on a replacement cost value the carrier and you agree to up front — usually from an appraisal or a stated-value worksheet. It removes the ratio test entirely, but only for the values agreed to. If replacement cost moves and the value on file doesn't get updated at the next renewal, the endorsement lapses back to coinsurance or the agreed value itself becomes the gap.",
  },
  {
    q: "What's the difference between a margin clause and coinsurance on a blanket policy?",
    a: "Coinsurance tests a ratio: carry less than required and every claim gets cut by that ratio, however large or small. A margin clause, common on blanket and agreed-value programs, doesn't test a ratio — it just puts a hard ceiling on what one scheduled location can recover, set at that location's scheduled value times the margin (often 105-125%). Owners who moved to a blanket program to escape coinsurance often haven't escaped the exposure, just changed its shape: the margin clause still bites if the schedule of values is stale.",
  },
  {
    q: "How often should I update my property values to avoid the penalty?",
    a: "At every renewal, at minimum, and sooner if there's been a major capital improvement or a jump in local construction costs. Replacement cost is a moving number — material and labor costs, not market value — and a schedule of values that hasn't been revisited in three or four years is a common way a well-run program ends up underinsured without anyone deciding to be.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${DOMAIN}${PATH}#app`,
      name: "Coinsurance Penalty Calculator",
      url: `${DOMAIN}${PATH}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      description: DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: {
        "@type": "Organization",
        "@id": `${DOMAIN}/#org`,
        name: BRAND_NAME,
        url: DOMAIN,
        telephone: PHONE_E164,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}${PATH}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        {
          "@type": "ListItem",
          position: 2,
          name: "Real Estate Portfolio & High-TIV Master Programs",
          item: `${DOMAIN}/real-estate-portfolio-insurance`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Coinsurance Penalty Calculator",
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

export default function CoinsurancePenaltyCalculatorPage() {
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
            90%
          </span>
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/real-estate-portfolio-insurance"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
            >
              Real Estate Portfolio &amp; High-TIV Master Programs <ArrowRight className="h-3 w-3" />
            </Link>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Coinsurance penalty calculator: what the clause actually costs you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Carry less than the required percentage of replacement cost and the clause cuts every
              claim by the same ratio — not just a total loss. Put your numbers in and see what your
              policy pays versus what it should.
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                "The exact payout on your loss, ISO order of operations",
                "What the same claim pays with no penalty at all",
                "The penalty across loss sizes, not just a total loss",
                "The limit — or the SOV — that cures the gap",
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
              Run your numbers <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-slate">
              No email required to see your results. Nothing is transmitted until you ask.
            </p>
          </div>
        </section>

        <CoinsuranceCalculator />

        {/* ---------------------------------------------- SEO / context copy */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              The clause that punishes a claim you already have
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              <p>
                Owners think about insurance-to-value as a total-loss problem: burn the building
                down, find out the limit was short, argue with the adjuster. Coinsurance doesn&apos;t
                wait for that. It tests the ratio between what you carry and what the clause requires
                on every claim, and if the ratio comes up short, every payout comes up short with it —
                a roof, a pipe break, a kitchen fire, all cut by the same percentage a total loss
                would be.
              </p>
              <p>
                The mechanics matter because the order of operations is not intuitive. The clause
                applies its ratio to the loss first, then the deductible comes out, then the whole
                thing is capped at the limit. Do the subtraction before the ratio — a mistake even
                some adjusters make on a first pass — and the number comes out wrong, usually in the
                carrier&apos;s favor.
              </p>
              <p>
                What makes it worse is how it gets there. Replacement cost rises with construction
                costs, not with what the building last appraised for, and a schedule of values that
                hasn&apos;t been revisited in three or four years routinely falls behind. Roughly
                three-quarters of commercial properties are underinsured by 40% or more against
                today&apos;s replacement cost — nobody set out to underinsure the asset, the number
                just drifted.
              </p>
              <p>
                Moving to an agreed-value endorsement or a blanket program doesn&apos;t make the
                question go away, either. Agreed value suspends coinsurance for the values on file,
                which is only as good as how current those values are. A blanket program usually
                trades coinsurance for a margin clause, which caps what one location can recover at
                its scheduled value rather than testing a ratio — a different mechanism, the same
                underlying exposure to a stale schedule of values. The optional sections in the
                calculator above price both.
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

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Own apartments or a portfolio?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  See the same coinsurance gap alongside NOI, value at your cap rate, DSCR, and the
                  wind deductible sitting behind the premium.
                </p>
                <Link
                  href="/multifamily-insurance-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Multifamily insurance calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Carrying a percentage wind deductible too?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  It applies to each affected location&apos;s insured value, so one storm applies
                  several. Size what you actually retain across the schedule.
                </p>
                <Link
                  href="/wind-deductible-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Wind &amp; hail deductible calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6 sm:col-span-2">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Looking for the program, not the math?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Master and schedule property programs for portfolios with $100M to $2B+ in total
                  insured value, built with valuations that survive a coinsurance or margin-clause
                  test at claim time.
                </p>
                <Link
                  href="/real-estate-portfolio-insurance"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Real estate portfolio &amp; high-TIV programs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection
          source="coinsurance-calculator"
          heading="Have someone check the valuation behind the policy"
          sub="The calculator prices the clause. It can't tell you whether your schedule of values is current or whether an agreed-value endorsement would actually help — that takes the appraisal, the SOV, and what today's construction costs look like against it. Send the schedule over, or just the renewal date."
        />
      </main>

      <SiteFooter />
    </>
  );
}
