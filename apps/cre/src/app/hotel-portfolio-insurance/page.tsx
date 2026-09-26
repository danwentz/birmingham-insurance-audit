import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom, SurplusLinesNote } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";

const TITLE = "Hotel Portfolio Insurance for Owners of Three or More Hotels";
const DESCRIPTION =
  "How to insure three or more hotels under one program: blanket vs. scheduled limits, catastrophe aggregates, brand and lender requirements, and adding acquisitions mid-term.";

export const metadata: Metadata = {
  title: { absolute: "Hotel Portfolio Insurance: One Program for 3+ Hotels | ACREInsure" },
  description: DESCRIPTION,
  alternates: { canonical: "/hotel-portfolio-insurance" },
  openGraph: {
    title: "Hotel Portfolio Insurance: One Program for 3+ Hotels | ACREInsure",
    description: DESCRIPTION,
    url: `${DOMAIN}/hotel-portfolio-insurance`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Portfolio Insurance: One Program for 3+ Hotels | ACREInsure",
    description: DESCRIPTION,
  },
};

const TIPPING_POINT = [
  {
    title: "Your values get carriers' attention",
    body: "Three hotels combined put you in front of middle-market carriers, which tend to offer broader coverage than small-business markets.",
  },
  {
    title: "Spread across locations earns better pricing",
    body: "A carrier would rather insure three hotels in three markets than risk one storm damaging all of them. Presented as one account, that spread is worth something.",
  },
  {
    title: "Renewals stop eating your year",
    body: "Three renewal dates means three sets of lender certificates and three brand compliance reviews. One renewal date replaces all of that.",
  },
  {
    title: "Gaps get expensive",
    body: "With several separate policies, odds are at least one has a lower limit, an old valuation, or an exclusion the others don't.",
  },
];

const CAT_QUESTIONS = [
  "What is the named storm, earthquake, and flood limit per occurrence, and how does it compare with the combined value of your hotels in any one high-risk area?",
  "Is the named-storm deductible calculated per location or per occurrence? A percentage deductible applied at each of three damaged hotels adds up fast.",
  "Has anyone modeled your portfolio's probable maximum loss (PML) for the major catastrophe perils? Carriers will model it. You should know the number too.",
];

const CHECKLIST = [
  {
    group: "Values",
    items: [
      "Each hotel has a current replacement cost valuation, appraised recently or updated for construction cost inflation.",
      "Business income limits reflect current RevPAR and the realistic time to rebuild each hotel.",
      "A clean statement of values listing construction, occupancy, protection, and exposure data for every property.",
    ],
  },
  {
    group: "Structure",
    items: [
      "Blanket or scheduled limits chosen on purpose, with the margin clause percentage known.",
      "Catastrophe per-occurrence limits compared with your largest cluster of hotels in one region.",
      "Named-storm deductible basis (per location or per occurrence) understood and budgeted.",
      "Per-location aggregate on general liability, and an umbrella sized for the whole portfolio.",
      "Every property on one renewal date, or a plan to get there.",
    ],
  },
  {
    group: "Contracts",
    items: [
      "Every loan's insurance requirements checked against the program: limits, deductible caps, flood, mortgagee and loss payee wording.",
      "Every brand's requirements met, with certificates matching.",
      "Management agreements mapped: who insures property, liability, workers' comp, and crime at each hotel.",
    ],
  },
  {
    group: "Growth",
    items: [
      "Newly acquired property limit and reporting window known.",
      "Builder's risk or an installation floater in place for any PIP or renovation, and vacancy conditions checked for floors taken offline.",
      "For coastal acquisitions in hurricane season, coverage bound before a storm is in the forecast.",
    ],
  },
];

const FAQS = [
  {
    q: "Is it cheaper to insure multiple hotels under one policy?",
    a: "Usually, once you own three or more. Combined values, spread across locations, and one well-prepared submission give carriers a reason to compete, and you stop paying for coverage that overlaps across separate policies. How much you save depends on how concentrated your catastrophe exposure is.",
  },
  {
    q: "What is the difference between blanket and scheduled property insurance for hotels?",
    a: "Scheduled coverage gives each hotel its own limit. Blanket coverage puts one shared limit across all of them, so an underestimated value at one hotel doesn't leave you short after a loss. Check the margin clause. It can cap what a blanket policy pays at any single hotel.",
  },
  {
    q: "Can hotels with different brands be on the same insurance program?",
    a: "Yes. The program has to meet the strictest requirement among your brands, and each hotel's certificate of insurance has to match its own brand's wording. Building to brand standards first avoids compliance notices later.",
  },
  {
    q: "What happens to my insurance when I buy another hotel?",
    a: "Most portfolio programs include a newly acquired property clause that covers a new hotel automatically, up to a set limit and for a set number of days. Report the acquisition inside that window so it's formally added. For coastal hotels in hurricane season, don't rely on the clause. Bind coverage before closing.",
  },
  {
    q: "Should my management company insure my hotels?",
    a: "It depends on the management agreement. Some management companies put the hotels they run on their own master program. Others require owners to buy their own coverage. Either can work, as long as every coverage line for every hotel is clearly assigned to someone.",
  },
  {
    q: "How do hotel portfolios handle catastrophe risk?",
    a: "With per-occurrence catastrophe limits sized to the largest cluster of hotels one event could damage, deductibles structured on purpose, and, for larger coastal portfolios, shared-and-layered placements across several carriers.",
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
      mainEntityOfPage: `${DOMAIN}/hotel-portfolio-insurance`,
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

export default function HotelPortfolioInsurance() {
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
              Hotel portfolio insurance: one program for three or more hotels
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              How portfolio programs are built, where they go wrong, and what to check before
              your next renewal.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Once you own three or more hotels, a separate policy for each property stops making
                sense. You end up with a stack of renewal dates, coverage that doesn&apos;t match
                from one hotel to the next, a different deductible at each location, and no
                bargaining power with carriers.
              </p>
              <p>
                One program covering the whole portfolio fixes most of that, but only if it&apos;s
                built correctly. A bad portfolio program can leave one hotel badly underinsured, or
                let a single claim use up liability limits every other property depends on.
              </p>
              <p className="text-base">
                Insuring one hotel? See{" "}
                <Link href="/hospitality-hotel-insurance" className="font-semibold text-gold-dark underline underline-offset-2 hover:text-gold">
                  Hospitality &amp; Hotel Insurance
                </Link>
                . Own a mix of property types? See{" "}
                <Link href="/real-estate-portfolio-insurance" className="font-semibold text-gold-dark underline underline-offset-2 hover:text-gold">
                  Real Estate Portfolio Insurance
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* TIPPING POINT (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Why three</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Three hotels is the tipping point
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              With one or two hotels, separate policies are usually fine. Around the third, the math
              changes.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TIPPING_POINT.map((t) => (
                <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{t.title}</p>
                  <p className="mt-2 text-slate">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLANKET VS SCHEDULED (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Structure</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Blanket vs. scheduled limits
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              The most important structural decision in a hotel portfolio program.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-ivory p-6">
                <p className="font-mono text-sm text-gold-dark">Scheduled</p>
                <p className="mt-2 font-display text-2xl font-bold text-obsidian">A limit per hotel</p>
                <p className="mt-4 text-slate">
                  If Hotel A is insured for $12 million, that&apos;s the most the policy pays for a
                  loss at Hotel A, even if your other hotels are overinsured.
                </p>
              </div>
              <div className="rounded-md border border-gold/20 bg-ivory p-6">
                <p className="font-mono text-sm text-gold-dark">Blanket</p>
                <p className="mt-2 font-display text-2xl font-bold text-obsidian">One shared limit</p>
                <p className="mt-4 text-slate">
                  One combined limit covers every listed hotel. If one value was underestimated,
                  the blanket can absorb the difference.
                </p>
              </div>
            </div>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>Blanket sounds strictly better. Three things in the policy wording decide whether it is.</p>
              <p>
                <strong className="font-semibold text-obsidian">Margin clauses.</strong> Many blanket
                policies cap what they pay at any one hotel at a percentage of that hotel&apos;s
                listed value, such as 110% or 125%. With a tight margin clause, a blanket policy
                behaves almost like a scheduled one. Read this clause before comparing quotes.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Loss-limit policies.</strong> For
                large or spread-out portfolios, carriers sometimes write a limit well below total
                value, based on the largest loss you could realistically suffer in one event. It
                saves premium, but only if real modeling sets the limit, not a target price.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Lender acceptance.</strong> Some loan
                documents require a dedicated limit for each property, or reject margin clauses.
                Check every loan&apos;s insurance requirements before choosing a structure, not after.
              </p>
            </div>
          </div>
        </section>

        {/* CATASTROPHE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Catastrophe</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              One storm, several hotels, one limit
            </h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Portfolio property policies usually carry sub-limits for named storm, earthquake,
                and flood. Those sub-limits often apply per occurrence and in the annual aggregate
                across the entire portfolio.
              </p>
              <p>
                That creates a risk single-hotel owners don&apos;t face. One hurricane can damage
                several of your hotels at once, and every one of those losses draws down the same
                catastrophe limit. If you own three hotels on the same stretch of coast, the
                question isn&apos;t whether each is insured for its own value. It&apos;s whether the
                catastrophe limit covers all three in the same storm.
              </p>
            </div>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {CAT_QUESTIONS.map((q) => (
                <div key={q} className="flex items-start gap-3 p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-slate">{q}</p>
                </div>
              ))}
            </div>
            <Link
              href="/wind-deductible-calculator"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold"
            >
              Size your per-location wind deductible <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Larger coastal portfolios are often too big for one carrier. They get placed as
                shared-and-layered programs, with several insurers each taking a portion of the
                limit, largely in the excess and surplus lines market. That&apos;s not a warning
                sign. It&apos;s the standard structure for concentrated coastal value.
              </p>
              <SurplusLinesNote />
              <p className="rounded-md border-l-2 border-gold bg-white p-5 text-base">
                <strong className="font-semibold text-obsidian">Hurricane season timing.</strong>{" "}
                When a named storm is forecast to make landfall, carriers stop binding new wind
                coverage in its path until it passes. If you&apos;re buying a coastal hotel between
                June and November, get coverage bound early. Don&apos;t plan to add it the week of
                closing. More in our{" "}
                <Link href="/gulf-coast-hotel-insurance" className="font-semibold text-gold-dark underline underline-offset-2 hover:text-gold">
                  Gulf Coast hotel insurance guide
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* LIABILITY (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Liability</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Don&apos;t let one claim drain every hotel&apos;s limits
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>Casualty is where portfolio programs most often fail quietly.</p>
              <p>
                <strong className="font-semibold text-obsidian">Per-location aggregate.</strong> A
                standard general liability policy has one annual aggregate shared by every hotel on
                it. One catastrophic claim at one hotel can use up the limit all the others depend
                on. A per-location aggregate endorsement gives each hotel its own. Confirm it&apos;s
                actually on your policy.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">The umbrella is shared too.</strong>{" "}
                Your excess and umbrella limits sit over every property. Size them for the whole
                portfolio&apos;s exposure (pools, bars, banquets, parking, security), not for what
                one hotel would need.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Liability rates are still rising.</strong>{" "}
                Nationally, general liability rose 2.6% and umbrella 4.8% in Q1 2026, according to
                the Council of Insurance Agents &amp; Brokers, pushed by larger jury verdicts. Expect
                relief on property, not on casualty.
              </p>
            </div>
          </div>
        </section>

        {/* BRANDS & MANAGEMENT (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contracts</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Brand and management company requirements
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                With several flags, you&apos;re building one program to meet several different sets
                of requirements.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Franchise agreements.</strong> Each
                brand sets its own minimum limits, required additional insureds, and wording for
                proof of insurance. Build the program to the strictest requirement you&apos;re
                subject to, then make sure each hotel&apos;s certificate matches its own brand.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Management agreements.</strong> If a
                third-party management company runs some of your hotels, the management agreement
                decides who buys which coverage. Some managers put hotels on their own master
                program. Others require you to insure the hotel and name them as an additional
                insured. Gaps show up where those arrangements meet, so map who insures what at
                every hotel.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Workers&apos; comp</strong> usually
                follows the employer. If the management company employs the staff, it&apos;s usually
                their policy, not yours.
              </p>
            </div>
          </div>
        </section>

        {/* ADDING & SELLING (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Growth</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Adding and selling hotels mid-term
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>A portfolio program should make growth easy, not require a new policy for every deal.</p>
              <p>
                <strong className="font-semibold text-obsidian">Newly acquired property clause.</strong>{" "}
                Covers hotels you buy during the policy term automatically, up to a set limit and
                for a set number of days. Know both numbers. A hotel worth more than the limit, or a
                report that arrives after the window, leaves the new property uninsured.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Adding to the program.</strong> Adding
                a hotel partway through the term changes the premium, not the policy wording, so
                every property stays on the same coverage and renews on the same date.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Selling a hotel.</strong> Removing a
                sold property should return unearned premium, but surplus lines policies often carry
                a minimum earned premium, so the refund can be smaller than you expect. Know the
                terms before you sign.
              </p>
            </div>
          </div>
        </section>

        {/* MARKET (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The 2026 market</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Property has turned. Lock in terms while it lasts.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Commercial property, Q1 2026</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">-5.5%</p>
                <p className="mt-4 text-slate">
                  Down from a +20.4% peak in Q3 2023. All-lines commercial pricing fell for the
                  first time since 2017.
                </p>
              </div>
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Umbrella, Q1 2026</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">+4.8%</p>
                <p className="mt-4 text-slate">
                  Casualty is still rising. General liability was up 2.6% and commercial auto 5.8%.
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate">Source: Council of Insurance Agents &amp; Brokers.</p>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                The steepest property declines are in U.S. shared-and-layered commercial property,
                exactly how larger hotel portfolios are placed. Reinsurance capital hit a record in
                2025, and cheaper catastrophe reinsurance is flowing through to primary pricing.
              </p>
              <p>
                It may not last. Reinsurers have said publicly there&apos;s not a lot of room for
                further cuts, and a heavy catastrophe year could reverse the trend. If your
                portfolio took large increases in 2023 and 2024, remarket now. Use the soft market
                for better terms, not just a lower price: wider margin clauses, lower catastrophe
                deductibles, higher sub-limits.
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Checklist</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Hotel portfolio insurance review
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Run this at least 90 days before renewal, and again before any acquisition or
              refinance.
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
              <Link href="/hotel-insurance-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
                Hotel insurance calculator <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/builders-risk-ocip" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
                Builder&apos;s risk for PIPs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Common questions from hotel owners
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
              One program, one renewal, no gaps
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                We build programs for hotel owners and operators with multiple properties, flagged
                and independent, in one market or across several. Commercial real estate is all we
                do.
              </p>
              <p>
                If you own three or more hotels and your policies still renew on different dates
                with different terms, send us your schedule. We&apos;ll show you where the gaps are
                and what a single program would look like.
              </p>
            </div>
            <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
              Send us your hotel schedule for a portfolio review <ArrowRight className="h-4 w-4" />
            </Link>
            <GuideDisclaimerBottom />
          </div>
        </section>

        <ContactSection source="hotel portfolio page" heading="Get a hotel portfolio review" />
      </main>

      <SiteFooter />
    </>
  );
}
