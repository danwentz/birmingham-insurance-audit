import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { HotelCalculator } from "@/components/calculator/HotelCalculator";
import { BRAND_NAME, DOMAIN } from "@/lib/site";

const TITLE = "Hotel Insurance Calculator | Cost Per Key, RevPAR & Value";
const DESCRIPTION =
  "See what your hotel's premium costs in RevPAR, per key, EBITDA, and value at your cap rate. Free hospitality insurance calculator — no email required.";
const PATH = "/hotel-insurance-calculator";

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
    q: "How much does hotel insurance cost per key?",
    a: "Insurance cost per key per year is the figure hotel owners, brands, and buyers all quote, and it moved sharply between 2019 and 2024 as catastrophe and hospitality liability capacity contracted. The right number depends on construction, roof age, coastal exposure, F&B and liquor operations, pool and amenity risk, brand tier, and loss history, so a single national average is close to useless. What matters more is whether your number moved because the market moved or because the program stopped being marketed.",
  },
  {
    q: "What percentage of hotel revenue should insurance be?",
    a: "Insurance is tracked as a percentage of total revenue under the Uniform System of Accounts for the Lodging Industry, alongside property taxes and ground rent in fixed charges. Historically it ran well under 2% of total revenue for most full-service assets; coastal and older properties have seen it push several times higher. Comparing your own figure across years is more useful than comparing it to a national average, because the drivers are so property-specific.",
  },
  {
    q: "How does insurance affect hotel EBITDA and value?",
    a: "Insurance is a fixed charge, which means it sits below gross operating profit in the USALI structure — no amount of departmental performance moves it. Every dollar of premium comes straight out of EBITDA, and EBITDA capitalizes. At an 8.5% cap rate, a dollar of annual premium carries about $11.76 of asset value, so a $60,000 renewal increase is roughly $706,000 of value destroyed on the next appraisal, refinance, or sale.",
  },
  {
    q: "How much do I need to raise ADR to cover an insurance increase?",
    a: "Divide the premium increase by your occupied room nights. On a 180-key hotel running 72% occupancy — about 47,300 occupied room nights a year — an $84,000 premium increase takes $1.78 of ADR to offset. That is useful precisely because it is small enough to sound manageable and large enough to be a real pricing decision in a competitive set.",
  },
  {
    q: "How much business income coverage does a hotel need?",
    a: "Enough to carry total revenue, not just rooms revenue, for however long the property is out of service — and hotel rebuilds run long. A closure takes F&B, banquet, parking, and spa revenue down with the rooms, and business income responds to lost income plus continuing expenses. The common failure is sizing the limit on an average month when the indemnity period is the part that actually runs short.",
  },
  {
    q: "Why does seasonality matter for hotel business interruption?",
    a: "Because limits get sized on an average month and storms do not arrive in an average month. A resort earning 42% of its revenue in three peak months earns about 1.68 times as much in one of those months as in an average one, so a closure starting at the top of the season burns through the limit far faster than the arithmetic suggests. The same limit that funds eight months of an average-month closure may fund only seven of a peak-season one.",
  },
  {
    q: "How does insurance affect a hotel loan covenant?",
    a: "Premium comes out of EBITDA, and DSCR is EBITDA over annual debt service, so a premium increase lowers coverage directly. Hotel loans commonly carry tighter covenants than other commercial real estate because revenue reprices nightly, and hotel NOI swings with RevPAR — so covenant headroom that looks comfortable in a strong year is the first thing a soft one takes. The calculator above solves for the exact premium increase that drops you to your covenant.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${DOMAIN}${PATH}#app`,
      name: "Hotel Insurance Impact Calculator",
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
          name: "Hospitality & Hotel Insurance",
          item: `${DOMAIN}/hospitality-hotel-insurance`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Hotel Insurance Calculator",
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

export default function HotelCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-2%] -translate-y-1/2 select-none font-display text-[22vw] font-bold leading-none tracking-tight text-gold opacity-[0.04]"
          >
            RevPAR
          </span>
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/hospitality-hotel-insurance"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
            >
              Hospitality &amp; Hotel Insurance <ArrowRight className="h-3 w-3" />
            </Link>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              What your insurance costs in RevPAR.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Insurance is a fixed charge. It sits below gross operating profit, so no amount of
              departmental performance moves it — it comes straight out of EBITDA and capitalizes into
              value. Put your numbers in and see it in the units you already run the hotel in.
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                "Insurance per available room, per key, and per occupied night",
                "The ADR or occupancy move that offsets a renewal",
                "Value and value per key at your cap rate",
                "DSCR, break-even occupancy, and business income adequacy",
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

        <HotelCalculator />

        {/* ---------------------------------------------- SEO / context copy */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              The one line on a hotel P&amp;L that operations can&apos;t fix
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              <p>
                Almost everything on a hotel operating statement responds to how well the hotel is
                run. Rooms profit moves with rate and mix. F&amp;B moves with covers and cost of
                sales. Labor moves with scheduling. Insurance does none of that. Under the Uniform
                System of Accounts it is a fixed charge, booked below gross operating profit
                alongside property taxes and ground rent, which means a general manager can run a
                flawless year and the premium lands exactly where the carrier put it.
              </p>
              <p>
                That placement is also what makes a renewal an asset-value event. Because insurance
                sits below GOP, every dollar of it comes out of EBITDA, and EBITDA is what a buyer
                capitalizes. At an 8.5% cap, a dollar of annual premium carries about $11.76 of asset
                value — so a $60,000 increase is roughly $706,000 off the next appraisal. Owners
                price that increase in cash and get the right answer. Priced against value, it is
                frequently the largest single move available on the asset that year.
              </p>
              <p>
                The useful reframe is per available room. Your hotel sells the same room count every
                night whether anyone stays or not, so spreading the premium across available room
                nights puts it directly alongside RevPAR — the number you already manage to. A
                180-key hotel paying $420,000 is carrying about $6.39 of insurance per available room
                night against $151 of RevPAR. Stated that way, the renewal question stops being a
                budget line and starts being a pricing decision: at 72% occupancy, an $84,000
                increase is $1.78 of ADR.
              </p>
              <p>
                No property type got repriced harder. Hospitality sits at the intersection of two
                hard markets at once — catastrophe property for coastal and resort assets, and
                premises liability at a moment when hotel verdicts routinely clear eight figures,
                with pools, bars, banquets, and assault-and-battery exposure all underwritten
                separately. Meanwhile the flag dictates limits in the franchise agreement, so the
                program has to satisfy the brand before it can be shopped on price.
              </p>
              <p>
                The calculator above also sizes the parts that never appear in the premium: the
                occupancy you need to cover a fixed block that insurance is inside of, the DSCR
                headroom a premium increase consumes, and whether business income actually funds a
                closure. That last one is where hospitality differs most from every other asset
                class. Business income limits get sized on an average month, and a hurricane does not
                arrive in an average month — a resort earning 42% of its revenue in three months
                burns through the same limit far faster if the closure starts at the top of the
                season.
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
                  Coastal or hail-belt hotel?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  A percentage wind deductible applies to each affected location&apos;s insured value,
                  so one storm applies several. Size what you actually retain.
                </p>
                <Link
                  href="/wind-deductible-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Wind &amp; hail deductible calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Looking for the program, not the math?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Property, guest and premises liability, liquor, and brand-required umbrella towers
                  for flagged and independent hotels.
                </p>
                <Link
                  href="/hospitality-hotel-insurance"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Hospitality &amp; hotel insurance <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-l-2 border-gold bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  Is your limit still enough?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  A coinsurance clause cuts every claim, not just a total loss, when the limit trails
                  replacement cost. Price the penalty on your own loss.
                </p>
                <Link
                  href="/coinsurance-penalty-calculator"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-obsidian underline hover:text-gold"
                >
                  Coinsurance penalty calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection
          source="hotel-calculator"
          heading="Have someone read the program behind these numbers"
          sub="The calculator prices the premium. It can't tell you whether that premium is right for the risk — that takes your loss runs, your STR report, your franchise requirements, and what hospitality capacity is charging accounts like yours this quarter. Send the program over, or just the renewal date."
        />
      </main>

      <SiteFooter />
    </>
  );
}
