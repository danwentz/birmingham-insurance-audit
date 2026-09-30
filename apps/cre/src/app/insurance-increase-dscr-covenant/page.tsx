import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const PATH = "/insurance-increase-dscr-covenant";
const TITLE = "What to Do When an Insurance Increase Pushes DSCR Under Your Loan Covenant";
const META_TITLE = "Insurance Increase and DSCR Covenant Breach | ACREInsure";
const DESCRIPTION =
  "A premium increase cuts NOI dollar for dollar, and that can pull DSCR under your loan covenant. How lenders test it, what a miss usually triggers, and what to do before the test date.";

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
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const CALC_HREF =
  "/multifamily-insurance-calculator?u=400&p=500000&r=1500&o=95&x=4440000&c=6.5&ds=1850000&cv=1.2&pc=50";

const TEST_POINTS = [
  {
    title: "Trailing 12 months or forward-looking",
    body: "Some loans test NOI over the last twelve months. Others test underwritten or pro forma NOI. A trailing test lags a premium increase until it shows up in actual expenses. A forward test can pick it up as soon as the new premium is known.",
  },
  {
    title: "How often it is tested",
    body: "Typically quarterly or annually, sometimes only at set dates or on lender request. The test date decides when a renewal shows up in the numbers.",
  },
  {
    title: "What counts as an operating expense",
    body: "Loan agreements define NOI, and the definition matters. Insurance is almost always an operating expense. Some agreements also add a management fee or replacement reserve floor, which changes the NOI you are tested on.",
  },
  {
    title: "How debt service is measured",
    body: "Actual payments, or a stressed or amortizing figure for interest-only or floating-rate loans. Your test may not use the number you actually pay.",
  },
];

const MISS_OUTCOMES = [
  {
    title: "Cash management or a sweep",
    body: "Typically the first consequence. Property cash flows into a lender-controlled account instead of to you, often until DSCR clears the covenant for a set number of quarters.",
  },
  {
    title: "A reserve or paydown requirement",
    body: "Some loans let you cure by posting cash or a letter of credit, or by paying down principal until the ratio works.",
  },
  {
    title: "An event of default",
    body: "Some agreements treat the miss itself as a default. Others make it a trigger for cash management and default only if it goes uncured or a notice period runs out. Which one you have is a matter of exact wording.",
  },
  {
    title: "Restrictions on distributions",
    body: "A miss can block distributions to equity, or block a refinance, extension, or supplemental loan you were counting on.",
  },
];

const LEVERS = [
  {
    title: "Deductible structure against premium",
    body: "A higher deductible usually lowers premium, but it moves risk to your balance sheet and may run into a deductible cap in your loan documents. It changes the expense line now and the retention later. It is a trade, not a free saving.",
  },
  {
    title: "Renewal timing and market approach",
    body: "A submission that reaches more markets, with clean values and COPE data, gives carriers less reason to price in uncertainty. Starting early is what makes that possible.",
  },
  {
    title: "Blanket or portfolio program",
    body: "Moving properties onto one program can change how the carrier views the whole schedule. It may or may not lower cost, and it should be checked against each loan's requirements.",
  },
  {
    title: "Premium financing",
    body: "Financing spreads the cash outlay across the year. It does not change the expense. The full premium is still an operating expense, and the finance charge is typically not one. Check how your agreement treats it before you count it as help.",
  },
  {
    title: "Program structure and loss control",
    body: "Coverage form, limits, and layers all move price. So does documented loss control such as roof condition, sprinkler and alarm maintenance, and a claims history you can explain.",
  },
];

const FAQS = [
  {
    q: "Can an insurance premium increase cause a DSCR covenant breach?",
    a: "Yes. Insurance is an operating expense, so a higher premium lowers NOI dollar for dollar. If your DSCR cushion is smaller than the increase, the ratio can fall under the covenant even when rents and occupancy haven't moved.",
  },
  {
    q: "What happens if DSCR falls below the covenant?",
    a: "It depends on your loan agreement. Typical outcomes are cash management or a sweep, a reserve or paydown to cure, restrictions on distributions, or in some agreements an event of default. Read the exact wording and the cure period.",
  },
  {
    q: "Do lenders count insurance as an operating expense in the DSCR test?",
    a: "Almost always. Confirm how your agreement defines NOI, and whether it tests trailing or underwritten figures, because that decides when a renewal hits the ratio.",
  },
  {
    q: "Does premium financing fix a DSCR problem?",
    a: "No. It changes when you pay, not what the expense is. It can help liquidity during the year, but the premium is still an operating expense for the test.",
  },
  {
    q: "When should I talk to my lender about a premium increase?",
    a: "Before the test date, and as soon as you have a renewal quote. Lenders react better to a documented plan than to a number they discover in the financials.",
  },
  {
    q: "Can I get a covenant waiver or reset?",
    a: "Sometimes. It is at the lender's discretion and depends on the loan, the sponsor, and the reason for the miss. Ask early, and bring the renewal documentation with you.",
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "DSCR covenant and insurance increases", item: `${DOMAIN}${PATH}` },
      ],
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";

export default function InsuranceIncreaseDscrCovenant() {
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
              When an insurance increase pushes DSCR under the covenant
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              How lenders test it, what a miss usually triggers, and what to do before the test date.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* ANSWER + WORKED EXAMPLE (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Can a premium increase put me in breach of my DSCR covenant?
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Yes. Insurance is an operating expense, so every dollar of increase comes straight
                  off NOI and lowers DSCR. If your cushion above the covenant is smaller than the
                  increase, you can miss the test with no change in rents or occupancy.
                </p>
                <p>
                  What happens next depends on your loan agreement. Often it is cash management, not
                  default, but some agreements are harsher. The best time to deal with it is before
                  the test date, with a renewal file in hand.
                </p>
              </div>
            </div>

            <div className="mt-10 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Example</p>
              <h3 className="mt-3 font-display text-xl font-bold text-obsidian sm:text-2xl">
                A 400-unit property, $250,000 more at renewal
              </h3>
              <p className="mt-3 max-w-2xl text-slate">
                Premium goes from $500,000 to $750,000. Annual debt service is $1,850,000 and the
                covenant is 1.20x. Rounded numbers, for illustration only.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">Before the increase</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">1.30x</p>
                  <p className="mt-4 text-slate">
                    NOI $2,400,000 ÷ $1,850,000 debt service. Value at a 6.5% cap rate is about
                    $36.9M.
                  </p>
                </div>
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">After the increase</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">1.16x</p>
                  <p className="mt-4 text-slate">
                    NOI $2,150,000 ÷ $1,850,000. That is under 1.20x. Value drops about $3.85M
                    ($250,000 ÷ 6.5%).
                  </p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  To hold 1.20x you need NOI of $2,220,000. Starting from $2,400,000, the cushion is
                  $180,000. The increase used all of it and then $70,000 more.
                </p>
                <p>
                  Your numbers are different. The calculator below is prefilled with this example, so
                  you can replace it with yours.
                </p>
              </div>
              <Link
                href={CALC_HREF}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold"
              >
                Open this example in the multifamily insurance calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* HOW LENDERS TEST (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The test</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How do lenders test DSCR?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Loan agreements differ. These are the four terms to find in yours.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {TEST_POINTS.map((t) => (
                  <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{t.title}</p>
                    <p className="mt-2 text-slate">{t.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Check your loan agreement.</strong>{" "}
                  Look for the definitions of Net Operating Income and Debt Service, then the section
                  that states the ratio, the test dates, and what a shortfall triggers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS ON A MISS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Consequences</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                What happens if DSCR falls below the covenant?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Typically one or more of these. Which ones apply is a matter of your documents.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {MISS_OUTCOMES.map((m) => (
                  <div key={m.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{m.title}</p>
                    <p className="mt-2 text-slate">{m.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Look for cure rights.</strong>{" "}
                  Many agreements give a notice period or a defined way to cure. Know the deadline
                  and who has to give notice. This is a question for your attorney as much as for
                  us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TALK TO LENDER (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Lender conversation</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How do I talk to my lender before the test date?
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Go early, and bring three things: the renewal, the market context, and the plan.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The renewal.</strong>{" "}
                  Expiring and renewal premium side by side, with the change in coverage terms. A
                  lender who sees a documented number reacts differently from one who finds it in
                  the year-end financials.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The market context.</strong>{" "}
                  Why the increase happened: the carrier&apos;s class or region, loss history,
                  values, or a change in the market. Keep it to what you can show. The{" "}
                  <Link href="/commercial-insurance-rate-barometer" className={LINK}>rate barometer</Link>{" "}
                  is one place to start.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The plan.</strong>{" "}
                  What you did to market the program, what you are changing, and what it does to the
                  ratio. Show the projected DSCR under each option, not only the one you prefer.
                </p>
                <p>
                  Ask what the lender needs to see, in writing. If a waiver or a covenant reset is
                  possible, this is when to ask. Before you count on a requirement being relaxed,
                  read our guide to{" "}
                  <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEVERS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Levers</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Which insurance levers change the number?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                None of these is a promise. Each one has a cost somewhere else in the program.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {LEVERS.map((l) => (
                  <div key={l.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{l.title}</p>
                    <p className="mt-2 text-slate">{l.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Mind the lender&apos;s deductible cap.</strong>{" "}
                  Raising a deductible to lower premium can breach an insurance covenant while
                  fixing the DSCR one. On the coast, a{" "}
                  <Link href="/wind-deductible-buy-down" className={LINK}>wind deductible buy-down</Link>{" "}
                  is the other side of that trade. See also{" "}
                  <Link href="/fannie-mae-freddie-mac-named-storm-deductible" className={LINK}>
                    Fannie Mae and Freddie Mac named-storm deductibles
                  </Link>.
                </p>
                <p>
                  If you own several properties,{" "}
                  <Link href="/real-estate-portfolio-insurance" className={LINK}>portfolio insurance</Link>{" "}
                  is worth pricing against separate programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TIMING (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Timing</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Why start the renewal 90 days or more out?
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Because every lever above takes time, and so does the lender. At 90 days you can
                  market the program, compare structures, and get the projected DSCR in front of
                  your lender before the test. At 30 days you accept what the incumbent offers.
                </p>
                <p>
                  Work backward from the test date, not the policy expiration. If the covenant is
                  tested a quarter after renewal, that is your real deadline. To check your own
                  cushion first, use the{" "}
                  <Link href={CALC_HREF} className={LINK}>multifamily insurance calculator</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Common questions about DSCR and insurance increases
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
                Get the renewal file ready before the test
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  We build renewal comparisons your lender can read: expiring against renewal,
                  options side by side, and what each does to NOI. Send us your expiring policy and
                  your covenant, and we&apos;ll show you the cushion.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your renewal for a covenant check <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="dscr covenant insurance increase page" heading="Get a renewal review" />
      </main>

      <SiteFooter />
    </>
  );
}
