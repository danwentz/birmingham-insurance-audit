import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const TITLE = "Replacement Cost Value: What It Is and Why You Update It Every Year";
const META_TITLE = "Replacement Cost Value for Commercial Property | ACREInsure";
const DESCRIPTION =
  "What replacement cost value is, how it differs from market value, how it's calculated, and why a stale one shrinks your claim under a coinsurance clause.";
const PATH = "/replacement-cost-value";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}${PATH}`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: DESCRIPTION,
  },
};

const COMPARE = [
  {
    label: "What it measures",
    market: "What a buyer would pay for the property today.",
    rcv: "What it would cost to rebuild the building today.",
  },
  {
    label: "Land",
    market: "Included. Often a large share of the price.",
    rcv: "Excluded. Land doesn't burn down.",
  },
  {
    label: "What moves it",
    market: "Rents, occupancy, cap rates, interest rates, the submarket.",
    rcv: "Labor, materials, building codes, and what's actually in the building.",
  },
  {
    label: "Who sets it",
    market: "An appraiser for the lender, or the next buyer.",
    rcv: "A cost estimate built from the building's construction details.",
  },
  {
    label: "What it's for",
    market: "Buying, selling, and financing.",
    rcv: "Setting your property insurance limit.",
  },
];

const INPUTS = [
  {
    title: "Size",
    body: "Gross square footage and number of stories. The biggest single driver, and the one most often copied forward from an old schedule without anyone measuring.",
  },
  {
    title: "Construction class",
    body: "What the building is made of: frame, joisted masonry, non-combustible, masonry non-combustible, or fire-resistive. A steel and concrete building costs more per foot to rebuild than a wood frame one.",
  },
  {
    title: "Occupancy",
    body: "What the building is used for. An apartment building, a medical office, and a warehouse of the same size have very different interiors, plumbing, and mechanical systems.",
  },
  {
    title: "Quality and features",
    body: "Finish level, elevators, sprinklers, parking structures, amenity spaces, and anything else that would have to be rebuilt.",
  },
  {
    title: "Updates since it was built",
    body: "New roofs, HVAC, electrical, plumbing, and renovations. A 1985 building with a 2022 interior renovation costs more to rebuild than the year built suggests.",
  },
  {
    title: "Location",
    body: "Local labor and material costs. The same building costs a different amount to rebuild in Birmingham, Houston, and Miami.",
  },
];

const FAQS = [
  {
    q: "Is replacement cost value the same as my appraised value?",
    a: "Usually not. A lender's appraisal estimates market value, which includes land and depends on rents and cap rates. Replacement cost value is the cost to rebuild the building only. The two numbers can be far apart in either direction, and your insurance limit should be set from replacement cost.",
  },
  {
    q: "Does replacement cost value include the land?",
    a: "No. Land isn't destroyed in a fire or storm, so it isn't part of the rebuilding cost and isn't insured under a property policy.",
  },
  {
    q: "How often should replacement cost value be updated?",
    a: "Every year, at every renewal. Construction costs, codes, and the building itself change year to year, and a valuation that isn't updated drifts below the real cost to rebuild.",
  },
  {
    q: "What's the difference between replacement cost and actual cash value?",
    a: "Replacement cost pays to rebuild with new materials of like kind and quality, with no deduction for wear and tear. Actual cash value subtracts depreciation, so an older building gets paid less than it costs to rebuild. Most lenders require replacement cost.",
  },
  {
    q: "What is an agreed value endorsement?",
    a: "An endorsement that suspends the coinsurance clause for the policy term, based on a signed statement of values the carrier accepts. It removes the coinsurance penalty, but only as long as the valuation behind it is current, which is another reason to update it every year.",
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
      mainEntityOfPage: `${DOMAIN}${PATH}`,
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

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

// Worked coinsurance example, ISO order (same math as the coinsurance calculator).
const EX = { rcv: 20_000_000, limit: 15_000_000, pct: 0.9, loss: 2_000_000, deductible: 25_000 };
const EX_REQUIRED = EX.rcv * EX.pct;
const EX_PAID = (EX.limit / EX_REQUIRED) * EX.loss - EX.deductible;
const EX_FULL = EX.loss - EX.deductible;

export default function ReplacementCostValue() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* HERO (dark) */}
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <HeroBackground src={GUIDE_HERO} />
          <div className="relative mx-auto max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Guide</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Replacement cost value: what it is, and why it changes every year
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              It&apos;s the number your property limit is built on. When it goes stale, every claim
              you file can get smaller.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* WHAT IT IS (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                What replacement cost value is
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Replacement cost value (RCV) is what it would cost to rebuild your building today, at the
                  same size and quality, with new materials and today&apos;s labor. No deduction for
                  age or wear.
                </p>
                <p>
                  It&apos;s the number your property insurance limit should be built on. If your
                  building burns to the ground, replacement cost is what the contractor&apos;s bill
                  will look like. Your limit is what the policy will pay toward it.
                </p>
                <p>
                  When those two numbers match, a loss is a construction project. When they don&apos;t,
                  it&apos;s a construction project with a funding gap, and the gap is yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VS MARKET VALUE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Two different numbers</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Replacement cost value vs. market value
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Owners think in market value, because that&apos;s what they bought at, borrowed against,
                and will sell at. Insurance runs on a different number.
              </p>

              <div className="mt-8 overflow-hidden rounded-md border border-gold/20 bg-white">
                <div className="hidden grid-cols-[10rem_1fr_1fr] gap-4 border-b border-gold/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate sm:grid">
                  <span />
                  <span>Market value</span>
                  <span className="text-gold-dark">Replacement cost value</span>
                </div>
                {COMPARE.map((r) => (
                  <div
                    key={r.label}
                    className="grid gap-2 border-b border-gold/10 px-6 py-4 last:border-0 sm:grid-cols-[10rem_1fr_1fr] sm:gap-4"
                  >
                    <p className="font-semibold text-obsidian">{r.label}</p>
                    <p className="text-slate">
                      <span className="font-semibold text-obsidian sm:hidden">Market value: </span>
                      {r.market}
                    </p>
                    <p className="text-slate">
                      <span className="font-semibold text-gold-dark sm:hidden">Replacement cost: </span>
                      {r.rcv}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The gap runs both ways. Take a 1980s office building in a soft submarket. With high
                  vacancy and today&apos;s cap rates, it might sell for $6 million. Rebuilding the same
                  building could cost $14 million. Insure it to market value and you&apos;re $8 million
                  short on a total loss.
                </p>
                <p>
                  Now take a newer apartment community in a strong market that sells for $60 million.
                  Much of that price is land, location, and the rent roll. The buildings themselves
                  might cost $40 million to rebuild. Insure to market value and you&apos;re paying
                  premium on $20 million that no claim will ever pay out.
                </p>
                <p>
                  Either way, the purchase price and the lender&apos;s appraisal are the wrong starting
                  point for your property limit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY EVERY YEAR (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Why it has to be updated every year
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Your building doesn&apos;t change much year to year. The cost to rebuild it does.
                  Labor, lumber, steel, concrete, roofing, and mechanical equipment all move, and
                  after a major storm, local rebuilding costs can jump as every contractor in the
                  region gets busy at once.
                </p>
                <p>
                  Here&apos;s how quietly that adds up. Say your building was valued at $15 million
                  five years ago, and nobody has touched the number since. If rebuilding costs rose 6%
                  a year over that stretch, the real cost to rebuild today is about $20 million. The
                  policy still says $15 million.
                </p>
                <p>
                  The building changes too. A new roof, a renovated clubhouse, upgraded units, a new
                  parking deck. Each one adds to what it would cost to rebuild, and none of them show
                  up on your schedule unless someone puts them there.
                </p>
                <p>
                  Keeping your limit in line with the real cost to rebuild is what underwriters call
                  insurance to value. A valuation that isn&apos;t updated doesn&apos;t stay accurate. It
                  falls further behind every year, and you usually find out at the worst possible
                  time: after a loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT'S DETERMINED (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How it&apos;s calculated</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How replacement cost value is determined
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                A replacement cost valuation is a construction estimate. It starts with what the
                building actually is, then prices it against current local construction costs.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {INPUTS.map((i) => (
                  <div key={i.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <h3 className="font-display text-xl font-semibold text-obsidian">{i.title}</h3>
                    <p className="mt-2 text-slate">{i.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Those details go into commercial cost-estimating software built on regional
                  construction cost data, which prices the building component by component. For large,
                  unusual, or historic buildings, an insurance appraiser may inspect the property and
                  produce a formal valuation.
                </p>
                <p>
                  The estimate is only as good as what goes into it. The wrong square footage or the
                  wrong construction class can move the number by millions, which is why the details
                  are worth checking before the number is.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LENDERS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Why your lender cares
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Your lender&apos;s collateral is the building. If it burns and the insurance
                  won&apos;t pay to rebuild it, the loan is secured by a slab and a claim check that
                  doesn&apos;t cover the job.
                </p>
                <p>
                  That&apos;s why most commercial loan documents require property coverage at full
                  replacement cost, and either no coinsurance clause or an agreed value endorsement
                  that suspends it. Lenders and loan servicers check this at closing and often again
                  at renewal. A limit that falls short of replacement cost can put you out of
                  compliance with your loan, even if you never have a claim.
                </p>
              </div>
              <Link
                href="/lender-insurance-requirements"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold"
              >
                What lenders typically require, including Fannie Mae and Freddie Mac{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* COINSURANCE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Coinsurance</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Why a stale valuation can shrink every claim
              </h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Many commercial property policies carry a coinsurance clause, usually 80%, 90%, or
                  100%. It says your limit must be at least that percentage of the building&apos;s
                  replacement cost. If it isn&apos;t, the carrier pays only a share of every covered
                  loss, not just a total loss.
                </p>
                <p>
                  The share is your limit divided by the limit the clause required. Take the building
                  from above: real replacement cost of $20 million, still insured for $15 million, with
                  a 90% coinsurance clause, a $25,000 deductible, and a $2 million fire.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-mono text-sm text-gold-dark">Limit meets the clause</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">{usd(EX_FULL)}</p>
                  <p className="mt-1 font-mono text-slate">
                    {usd(EX.loss)} loss − {usd(EX.deductible)} deductible
                  </p>
                </div>
                <div className="rounded-md border border-gold/40 bg-white p-6">
                  <p className="font-mono text-sm text-gold-dark">Limit falls short</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">{usd(EX_PAID)}</p>
                  <p className="mt-1 font-mono text-slate">
                    {usd(EX.limit)} ÷ {usd(EX_REQUIRED)} × {usd(EX.loss)} − {usd(EX.deductible)}
                  </p>
                </div>
              </div>

              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The clause required {usd(EX_REQUIRED)} of limit (90% of $20 million). You carried{" "}
                  {usd(EX.limit)}, so the carrier pays 83% of the loss. On a $2 million fire, that&apos;s{" "}
                  {usd(EX_FULL - EX_PAID)} out of your pocket on top of the deductible, on a partial
                  loss, with a policy you thought was fine.
                </p>
                <p>
                  An agreed value endorsement can take the coinsurance penalty off the table, but it
                  only works if the carrier accepts a current statement of values. That brings you back
                  to the same place: an accurate replacement cost, updated every year.
                </p>
              </div>
              <Link
                href="/coinsurance-penalty-calculator"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold"
              >
                Run your own numbers in the coinsurance penalty calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Common questions about replacement cost value
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
          </div>
        </section>

        {/* WORKING WITH US (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Working with us</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                We run a valuation every time we write or renew
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Any time we write or renew a policy, we run a replacement cost valuation on the
                  buildings on your schedule. We check the construction details, price them against
                  current costs, and compare the result to the limits you&apos;re carrying.
                </p>
                <p>
                  If a building is underinsured, you hear it from us before the renewal binds, not
                  from an adjuster after a loss. And if a building is overinsured, you stop paying
                  premium on value that isn&apos;t there.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your schedule. We&apos;ll tell you where the values stand. <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="replacement cost value page" heading="Find out what your buildings would cost to rebuild" />
      </main>

      <SiteFooter />
    </>
  );
}
