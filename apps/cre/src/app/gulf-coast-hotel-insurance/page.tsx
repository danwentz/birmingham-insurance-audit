import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom, SurplusLinesNote } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";

const TITLE = "Gulf Coast Hotel Insurance: Named Storm, E&S, and What Drives Your Premium";
const META_TITLE = "Gulf Coast Hotel Insurance: Gulf Shores & Mobile | ACREInsure";
const DESCRIPTION =
  "Why Gulf Coast hotels end up in the E&S market, how named-storm deductibles work, hurricane-season binding moratoriums, and the insurance steps before a refi, acquisition, or PIP.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/gulf-coast-hotel-insurance" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/gulf-coast-hotel-insurance`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const PREMIUM_DRIVERS = [
  {
    title: "Distance to the water",
    body: "The single biggest factor on the coast. Some wind markets define their appetite purely by proximity, such as properties within five miles of the coastline.",
  },
  {
    title: "Construction and roof",
    body: "Building type, roof age, roof covering, and how it's attached. Roof claims are roughly 30% of all property claim line items nationally, so underwriters look hard at the roof.",
  },
  {
    title: "Total insured value",
    body: "The market splits around $10 million in TIV. Below it, more small-commercial and program markets will quote. Above it, coverage is often built in layers across several carriers.",
  },
  {
    title: "Mitigation",
    body: "Roof upgrades, FORTIFIED construction, and documented maintenance strengthen a submission. IBHS reports FORTIFIED buildings see 55% to 74% lower loss frequency than standard construction.",
  },
];

const CHECKLIST = [
  {
    group: "Before the term sheet",
    items: [
      "Get the lender's insurance requirements in writing: limits, deductibles, wind and flood, carrier rating minimums.",
      "Confirm whether the lender caps your named-storm deductible. Coastal lenders often do, and it changes which markets can quote you.",
      "Check the flood zone, and whether the lender requires flood coverage and at what limit.",
    ],
  },
  {
    group: "During due diligence",
    items: [
      "Get a replacement cost valuation that holds up. Underinsuring to save premium can trigger a coinsurance penalty at claim time.",
      "Pull five years of loss runs. On an acquisition, request them from the seller.",
      "Document roof age, covering, condition, and any wind mitigation. It's your strongest underwriting argument.",
      "Set business income limits on current RevPAR, not pre-renovation numbers.",
    ],
  },
  {
    group: "For a PIP or renovation",
    items: [
      "Arrange builder's risk or an installation floater. Your property policy may not cover work in progress or materials on site.",
      "Check vacancy and unoccupancy conditions if floors or the whole hotel go offline.",
      "Require certificates from your GC and subs, with you and your lender as additional insureds.",
    ],
  },
  {
    group: "At closing",
    items: [
      "Lender named as mortgagee and loss payee on property, and additional insured on liability.",
      "Evidence of insurance delivered to the lender or closing attorney.",
      "Coverage bound before a named storm enters the Gulf. Don't count on binding the week of closing in August.",
    ],
  },
];

const FAQS = [
  {
    q: "How much does hotel insurance cost on the Gulf Coast?",
    a: "It depends mostly on distance to the water, total insured value, construction, roof, and loss history. There's no reliable per-room figure. A beachfront hotel and an inland hotel of the same size can land in different markets entirely because of wind exposure. The only way to know is a submission to the right markets.",
  },
  {
    q: "Why is my Gulf Shores hotel insured through a surplus lines carrier?",
    a: "Because many admitted carriers limit or exclude named wind near the coast. Excess and surplus lines carriers can write that exposure with more flexibility on rates and terms. Many are strongly rated, but confirm your carrier's financial rating and understand your deductible structure.",
  },
  {
    q: "What is a named-storm deductible?",
    a: "A separate deductible that applies only to losses from a named tropical storm or hurricane. On the coast it's usually a percentage of the insured value at the location, not a flat dollar amount. For example, a 5% deductible on a $10 million building means $500,000 out of pocket before coverage responds.",
  },
  {
    q: "Can I buy insurance while a hurricane is in the Gulf?",
    a: "Usually not for new or increased wind coverage. Carriers impose binding moratoriums until the storm passes. Plan renewals and closings around hurricane season.",
  },
  {
    q: "Are Gulf Coast hotel insurance rates going down?",
    a: "Property rates are softening nationally. Commercial property fell 5.5% in Q1 2026, and the steepest declines are in shared-and-layered property, the structure larger coastal hotels use. Liability, umbrella, and auto are still rising. Owners who haven't remarketed since 2023 or 2024 are the most likely to see savings.",
  },
  {
    q: "Does FORTIFIED construction lower hotel insurance costs?",
    a: "It strengthens your underwriting case. IBHS data shows 55% to 74% lower loss frequency for FORTIFIED buildings, and documented mitigation makes a coastal wind submission more competitive.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      author: { "@type": "Person", name: "Dan Wentz", url: `${DOMAIN}/about` },
      publisher: { "@type": "Organization", name: "ACREInsure", url: DOMAIN },
      mainEntityOfPage: `${DOMAIN}/gulf-coast-hotel-insurance`,
      about: { "@type": "Place", name: "Alabama Gulf Coast" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";

export default function GulfCoastHotelInsurance() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* HERO (dark) */}
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <div className="relative mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Guide</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Gulf Coast hotel insurance
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Why coastal hotels end up in the E&amp;S market, how named-storm deductibles work, and
              what to do before closing.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                If you own a hotel in Gulf Shores, Orange Beach, Mobile, or anywhere along the Gulf,
                your insurance is decided by three things: how close the building sits to the
                water, how it&apos;s built and maintained, and which market your policy is placed
                in.
              </p>
              <p>
                The same limited-service hotel can be written in two completely different insurance
                markets depending on whether it&apos;s inland or on the coast, with different
                deductibles and very different renewals. Baldwin and Mobile counties carry the
                highest wind, named-storm, and surge exposure in Alabama.
              </p>
              <p className="text-base">
                Own three or more hotels? See the{" "}
                <Link href="/hotel-portfolio-insurance" className={LINK}>hotel portfolio insurance guide</Link>.
                Looking for our full hotel program? See{" "}
                <Link href="/hospitality-hotel-insurance" className={LINK}>Hospitality &amp; Hotel Insurance</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* PREMIUM DRIVERS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Pricing</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What drives a coastal hotel&apos;s premium
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Carriers don&apos;t price off room count. Loss history and your liability profile
              matter everywhere. On the coast, these four matter most.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PREMIUM_DRIVERS.map((d) => (
                <div key={d.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{d.title}</p>
                  <p className="mt-2 text-slate">{d.body}</p>
                </div>
              ))}
            </div>
            <Link
              href="/hotel-insurance-calculator"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold"
            >
              Run the hotel insurance calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* WHY E&S (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The market</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Why Gulf Coast hotels end up in E&amp;S
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                E&amp;S means excess and surplus lines: non-admitted insurers that can write risks
                the standard admitted market won&apos;t, with more flexibility on rates and policy
                forms. Coastal hotels land there for three reasons.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Named wind is the binding constraint.</strong>{" "}
                Near the Gulf, the question isn&apos;t whether a carrier likes hotels. It&apos;s
                whether it will take the wind at that address. Many admitted carriers cap or exclude
                coastal wind, which leaves E&amp;S as the realistic home.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Big coastal values need a lot of capacity.</strong>{" "}
                A beachfront hotel with a large insured value often can&apos;t be written by one
                carrier. It gets built as a shared-and-layered program, with several insurers each
                taking a slice, mostly in the E&amp;S market.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">The admitted market has pulled back on the coast.</strong>{" "}
                In 2023, London markets non-renewed about 70 Alabama Gulf Coast condo master
                policies after premiums had tripled and named-storm deductibles reached $25,000 to
                $50,000 and up. Those were condos, not hotels, but it&apos;s the same coastline and
                the same underwriters.
              </p>
              <p className="rounded-md border-l-2 border-gold bg-ivory p-5 text-base">
                <strong className="font-semibold text-obsidian">E&amp;S isn&apos;t necessarily worse.</strong>{" "}
                Many E&amp;S carriers are rated A or better, and E&amp;S programs can offer things
                admitted policies often can&apos;t, like flexible deductible structures and
                wind-deductible buy-backs. What matters is how the program is structured.
              </p>
              <SurplusLinesNote />
            </div>
          </div>
        </section>

        {/* DEDUCTIBLES (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Deductibles</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              The named-storm deductible is where the money is
            </h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                On the coast, the named-storm deductible is usually a percentage of the insured
                value at the location, not a flat dollar amount. That changes the math completely.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Example: flat deductible</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">$25,000</p>
                <p className="mt-4 text-slate">What many owners picture when they hear &ldquo;deductible.&rdquo;</p>
              </div>
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Example: 5% of a $10M hotel</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">$500,000</p>
                <p className="mt-4 text-slate">What a percentage named-storm deductible actually means on the coast.</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Know the percentage, what value it applies to, and whether your lender caps it. Then
              decide whether a buy-back is worth the premium.
            </p>
            <Link
              href="/wind-deductible-calculator"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold"
            >
              Size your wind deductible <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* MORATORIUMS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Hurricane season</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              When a storm is in the Gulf, the market closes
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                When a named storm enters the Gulf, carriers stop binding new coverage along the
                coast, often with no warning. Alabama has seen it repeatedly: during Hurricane Sally
                in 2020, Tropical Storm Helene in 2024, and Tropical Storm Cindy in June 2026,
                carriers suspended new wind business in Alabama until the storm passed.
              </p>
              <p>
                If your renewal or a closing falls between June and November, don&apos;t leave
                placement to the last week. A storm in the Gulf can freeze the market right when you
                need to bind.
              </p>
            </div>
          </div>
        </section>

        {/* MARKET + REGULATION (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">2026</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Property is softening. Liability isn&apos;t.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Commercial property, Q1 2026</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">-5.5%</p>
                <p className="mt-4 text-slate">Down from a +20.4% peak in Q3 2023.</p>
              </div>
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">General liability, Q1 2026</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">+2.6%</p>
                <p className="mt-4 text-slate">Umbrella was up 4.8% and commercial auto 5.8%.</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate">Source: Council of Insurance Agents &amp; Brokers.</p>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                The steepest property declines are in U.S. shared-and-layered commercial property,
                the structure most larger coastal hotels use. Reinsurers have said there&apos;s not
                a lot of room for further cuts, and a heavy storm season could reverse the trend. If
                your hotel took big increases in 2023 and 2024, now is the time to remarket and lock
                in terms.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Alabama regulators are watching coastal non-renewals.</strong>{" "}
                The Department of Insurance has restricted admitted property insurers from
                cancelling or non-renewing policies over natural-disaster losses or unrelated prior
                losses, and in 2025 the legislature adopted HJR220, asking for closer oversight of
                non-renewals in the coastal commercial market. If you were non-renewed after a
                storm, it&apos;s worth asking whether it was handled properly.
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Checklist</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Before you close a hotel refi, acquisition, or PIP
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              A financing event is an insurance event. Start at least 30 to 45 days before closing,
              and earlier in hurricane season.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CHECKLIST.map((c) => (
                <div key={c.group} className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{c.group}</p>
                  <ul className="mt-4 space-y-3">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/coinsurance-penalty-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
                Check coinsurance exposure <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/builders-risk-ocip" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
                Builder&apos;s risk for PIPs <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/catastrophe-coastal-property-insurance" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
                Coastal &amp; catastrophe property <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Common questions from coastal hotel owners
            </h2>
            <div className="mt-8 space-y-8">
              {FAQS.map((f) => (
                <div key={f.q} className="border-l-2 border-gold pl-5">
                  <h3 className="font-display text-xl font-semibold text-obsidian">{f.q}</h3>
                  <p className="mt-2 text-slate">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKING WITH US (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Working with us</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Coastal hotels, placed from Birmingham
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                We place hotel programs along the Alabama coast, from limited-service properties
                off I-10 to beachfront resorts, and commercial real estate is all we do.
              </p>
              <p>
                If your renewal is inside 120 days, or you&apos;re heading into a refi, acquisition,
                or PIP, talk to us early. There&apos;s a lot more room to work before hurricane
                season than during it.
              </p>
            </div>
            <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
              Send us your current program for a review <ArrowRight className="h-4 w-4" />
            </Link>
            <GuideDisclaimerBottom />
          </div>
        </section>

        <ContactSection source="gulf coast hotel page" heading="Get a coastal hotel program review" />
      </main>

      <SiteFooter />
    </>
  );
}
