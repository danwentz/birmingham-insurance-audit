import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";

const TITLE = "Lender Insurance Requirements for Commercial Real Estate Loans";
const META_TITLE = "Lender Insurance Requirements | Fannie & Freddie | ACREInsure";
const DESCRIPTION =
  "What commercial real estate lenders typically require for insurance, how Fannie Mae and Freddie Mac differ, why compliance matters, and where to find the requirements in your loan documents.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/lender-insurance-requirements" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/lender-insurance-requirements`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const TYPICAL = [
  {
    title: "Property at replacement cost",
    body: "Special form (all-risk) coverage at full replacement cost, not actual cash value. Lenders want the building rebuilt, not depreciated.",
  },
  {
    title: "No coinsurance penalty",
    body: "Either no coinsurance clause, or one offset by an agreed value endorsement, so an underinsured value can't cut the claim payment.",
  },
  {
    title: "Capped deductibles",
    body: "A maximum per-occurrence deductible, often with separate caps for wind, named storm, and earthquake.",
  },
  {
    title: "Business income or rent loss",
    body: "Coverage for lost income while the property is repaired, commonly 12 months, so the loan keeps getting paid.",
  },
  {
    title: "Catastrophe perils",
    body: "Wind and named storm where exposed, flood for buildings in a FEMA Special Flood Hazard Area, and earthquake or terrorism when the lender's risk review calls for it.",
  },
  {
    title: "Ordinance or law and equipment breakdown",
    body: "Coverage for code upgrades after a loss, and for boilers and mechanical systems.",
  },
  {
    title: "Liability and umbrella",
    body: "General liability with minimum per-occurrence and aggregate limits, plus umbrella or excess sized to the property.",
  },
  {
    title: "Rated carriers",
    body: "A minimum AM Best financial strength rating, commonly A- or better.",
  },
  {
    title: "The right names and notice",
    body: "The lender as mortgagee and loss payee on property, additional insured on liability, and advance written notice before any cancellation.",
  },
];

const WHERE = [
  {
    doc: "Loan agreement",
    what: "The main source. Look for a section titled Insurance, or Insurance and Casualty, and read the definitions it relies on.",
  },
  {
    doc: "Insurance exhibit or schedule",
    what: "Many lenders put the detailed requirements in an exhibit at the back of the loan agreement: limits, deductibles, required endorsements.",
  },
  {
    doc: "Mortgage or deed of trust",
    what: "Often repeats the insurance covenant and sets out how claim proceeds are handled.",
  },
  {
    doc: "Commitment letter or term sheet",
    what: "Your earliest look. Requirements here usually carry into the final documents, so check them before you sign.",
  },
  {
    doc: "Closing checklist",
    what: "Lender's counsel lists exactly what evidence of insurance it needs to close.",
  },
  {
    doc: "Servicer's annual compliance letter",
    what: "After closing, the servicer checks coverage every renewal. Its request letter shows what it will enforce.",
  },
];

const FAQS = [
  {
    q: "What insurance do commercial lenders require?",
    a: "Typically property insurance at full replacement cost on a special form, no coinsurance penalty, capped deductibles, business income or rent loss, flood in FEMA flood zones, general liability and umbrella, carriers rated A- or better, and the lender named as mortgagee, loss payee, and additional insured.",
  },
  {
    q: "What are Fannie Mae's maximum deductibles for multifamily?",
    a: "Under Fannie Mae's Multifamily Selling and Servicing Guide (effective September 14, 2026), the per-occurrence maximum for most perils is $50,000 for properties under $10 million of insurable value and $100,000 at $10 million or more, or $250,000 on a blanket limit. Wind and hail can go up to 5% of total insurable value, and named storm and earthquake up to 7.5%.",
  },
  {
    q: "How much umbrella coverage does Freddie Mac require?",
    a: "Freddie Mac's Multifamily Guide requires $1 million per occurrence and $2 million aggregate in general liability, plus umbrella or excess based on units: $1 million up to 250 units, $2 million for 251 to 500, $3 million for 501 to 1,000, $5 million for 1,001 to 2,000, and more above that.",
  },
  {
    q: "What happens if my insurance doesn't meet my lender's requirements?",
    a: "Most loan documents treat it as a covenant breach. The lender or servicer can demand a fix, buy force-placed insurance and charge you for it, or in serious cases call a default. At closing, it can delay funding.",
  },
  {
    q: "Where do I find my lender's insurance requirements?",
    a: "Start with the insurance section of your loan agreement and any insurance exhibit attached to it. The commitment letter shows the requirements before closing, and the servicer's annual compliance letter shows what it enforces after.",
  },
  {
    q: "Can I get a waiver from my lender's insurance requirements?",
    a: "Sometimes. Portfolio lenders can often negotiate. Fannie Mae and Freddie Mac allow expanded deductibles only when specific conditions are met, such as borrower liquidity of at least four times the deductible, and Freddie Mac's waiver lasts one policy term at a time.",
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
      mainEntityOfPage: `${DOMAIN}/lender-insurance-requirements`,
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

const AGENCY_ROWS = [
  { item: "Carrier rating", fannie: "Rating minimums apply", freddie: "AM Best A- or better" },
  { item: "Property limit", fannie: "100% of insurable value (90% for multiple buildings)", freddie: "100% of insurable value (90% for multiple buildings)" },
  { item: "Coinsurance", fannie: "None, or offset by agreed amount", freddie: "None, or offset by agreed amount" },
  { item: "Deductible, most perils", fannie: "$50,000 under $10M IV; $100,000 at $10M+", freddie: "$50,000 under $10M IV; $100,000 at $10M+" },
  { item: "Deductible, blanket limit", fannie: "$250,000", freddie: "$250,000" },
  { item: "Wind / hail deductible", fannie: "Up to 5% of TIV", freddie: "Up to 5% of TIV" },
  { item: "Named storm deductible", fannie: "Up to 7.5% of TIV", freddie: "Up to 7.5% of TIV" },
  { item: "Business income", fannie: "12 months actual loss sustained, or annual income basis", freddie: "12 months actual loss sustained, or 12 months of income" },
  { item: "General liability", fannie: "Required", freddie: "$1M per occurrence / $2M aggregate, per location" },
  { item: "Umbrella", fannie: "Required", freddie: "By unit count, from $1M (up to 250 units) to $20M (10,000+)" },
];

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";

export default function LenderInsuranceRequirements() {
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
              Lender insurance requirements for commercial real estate
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What lenders require, how Fannie Mae and Freddie Mac differ, and where to find the
              requirements in your loan.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Your lender owns a big piece of your property&apos;s risk, so your loan documents tell
                you how to insure it. Those requirements decide your limits, your deductibles, and
                which carriers can write you. Miss one and you can hold up a closing, get billed for
                force-placed insurance, or put the loan in default.
              </p>
              <p>
                Most lenders ask for the same core coverage. Fannie Mae and Freddie Mac are the
                exception: their requirements are published, specific, and much harder to
                negotiate.
              </p>
            </div>
          </div>
        </section>

        {/* TYPICAL (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Typical requirements</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What most lenders require
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Banks, life companies, debt funds, and CMBS lenders each write their own, but the core
              is consistent. The exact limits and deductible caps are negotiated deal by deal.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TYPICAL.map((t) => (
                <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{t.title}</p>
                  <p className="mt-2 text-slate">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Flood is the one that isn&apos;t negotiable. Federal law requires flood insurance on
              buildings in a FEMA Special Flood Hazard Area when the loan comes from a federally
              regulated lender.
            </p>
          </div>
        </section>

        {/* AGENCY (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The exception</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Fannie Mae and Freddie Mac
            </h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Agency multifamily loans don&apos;t negotiate insurance deal by deal. The
                requirements are written into Fannie Mae&apos;s Multifamily Selling and Servicing
                Guide (Part II, Chapter 5) and Freddie Mac&apos;s Multifamily Seller/Servicer Guide
                (Chapter 31), and your servicer has to enforce them every year for the life of the
                loan.
              </p>
              <p>
                They&apos;re also more specific than most lenders&apos;: hard dollar caps on
                deductibles, liability limits tied to unit count, and narrow, conditional paths to a
                waiver.
              </p>
            </div>
            <div className="mt-8 overflow-x-auto rounded-md border border-gold/20">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-ivory">
                  <tr>
                    <th className="p-4 font-semibold text-obsidian">Requirement</th>
                    <th className="p-4 font-semibold text-obsidian">Fannie Mae</th>
                    <th className="p-4 font-semibold text-obsidian">Freddie Mac</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/20">
                  {AGENCY_ROWS.map((r) => (
                    <tr key={r.item}>
                      <td className="p-4 font-mono text-gold-dark">{r.item}</td>
                      <td className="p-4 text-slate">{r.fannie}</td>
                      <td className="p-4 text-slate">{r.freddie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate">
              Sources: Fannie Mae Multifamily Selling and Servicing Guide, Part II, Section 501.02,
              effective September 14, 2026; Freddie Mac Multifamily Seller/Servicer Guide, Chapter 31,
              updated August 25, 2026. IV = insurable value; TIV = total insurable value. Both guides
              change often, so confirm against the current version and your loan documents.
            </p>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                <strong className="font-semibold text-obsidian">Expanded deductibles are possible, with conditions.</strong>{" "}
                Both agencies allow a higher deductible ($100,000 under $10 million of insurable
                value, $150,000 above) only when a compliant policy isn&apos;t available and the
                borrower meets tests like liquidity of at least four times the deductible and no
                recent delinquency. Freddie Mac&apos;s waiver lasts one policy term and has to be
                renewed.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Coastal owners, watch the percentages.</strong>{" "}
                A 7.5% named-storm cap sounds generous until it becomes the only deductible a
                coastal market will offer. If you&apos;re near the Gulf, price the wind program
                against the agency cap before you commit to the loan. See our{" "}
                <Link href="/wind-deductible-calculator" className={LINK}>wind deductible calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* WHY COMPLY (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Why it matters</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Why you should meet them
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                <strong className="font-semibold text-obsidian">It&apos;s a loan covenant.</strong>{" "}
                Most loan documents make insurance compliance a condition of the loan. A gap can be
                treated as a covenant breach, and in serious cases a default.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Force-placed insurance is expensive.</strong>{" "}
                If your coverage lapses or falls short, the lender or servicer can buy a policy and
                charge you for it. Force-placed coverage protects the lender, not you, and it
                usually costs far more than a policy you buy yourself.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Closings stall.</strong> Lenders
                won&apos;t fund without compliant evidence of insurance. Finding a missing
                endorsement the week of closing is how deals slip.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">The lender controls the claim money.</strong>{" "}
                As mortgagee and loss payee, the lender is on the claim check. If your policy
                doesn&apos;t match the loan, expect a harder, slower path to getting repairs
                funded.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">It usually protects you too.</strong>{" "}
                Replacement cost, no coinsurance penalty, and 12 months of rent loss are coverage you
                should want anyway. The requirements are a floor, not a ceiling.
              </p>
            </div>
          </div>
        </section>

        {/* WHERE TO FIND (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Your documents</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              How to find your lender&apos;s requirements
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              The requirements are spread across several documents. Check them in this order.
            </p>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {WHERE.map((w) => (
                <div key={w.doc} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm font-medium text-gold-dark">{w.doc}</p>
                  <p className="text-slate">{w.what}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                <strong className="font-semibold text-obsidian">Searching a long PDF?</strong> Try
                these terms: insurance, casualty, deductible, mortgagee, loss payee, additional
                insured, rating, and flood.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Agency loans point to the guide.</strong>{" "}
                A Fannie Mae or Freddie Mac loan agreement often refers to the agency guide rather
                than listing every requirement. Ask your servicer for its current insurance
                requirements in writing.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Can&apos;t find them?</strong> Ask
                the lender or servicer directly. They would much rather answer now than chase you
                at renewal.
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Checklist</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Before you close, and every renewal
            </h2>
            <ul className="mt-8 space-y-3">
              {[
                "Get the requirements in writing, from the loan agreement, its exhibit, or the servicer.",
                "Compare every requirement against your current policies, line by line, before renewal goes to market.",
                "Confirm deductibles, including wind and named storm percentages, are within the caps.",
                "Confirm the property limit meets the required percentage of insurable value, with no uncovered coinsurance clause.",
                "Check every carrier's rating against the minimum.",
                "Confirm the exact mortgagee and loss payee wording, and additional insured status on liability and umbrella.",
                "Deliver evidence of property insurance (ACORD 28) and liability certificates before the lender's deadline.",
                "If something can't be met, ask for a waiver early, in writing. Don't let the servicer find it.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/insurance-document-checklist" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold">
              See our insurance document checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Common questions about lender insurance requirements
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

        {/* WORKING WITH US (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Working with us</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Send us your loan documents
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                We read the insurance section of your loan before we market your program, so the
                coverage we bind is coverage your lender accepts. That goes for bank, life company,
                CMBS, and agency loans.
              </p>
              <p>
                Heading into a closing or refinance? Send us the commitment letter. We&apos;ll tell
                you what it requires and whether your current program meets it. See also{" "}
                <Link href="/real-estate-portfolio-insurance" className={LINK}>real estate portfolio insurance</Link>{" "}
                and{" "}
                <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily insurance</Link>.
              </p>
            </div>
            <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
              Send us your loan&apos;s insurance requirements <ArrowRight className="h-4 w-4" />
            </Link>
            <GuideDisclaimerBottom />
          </div>
        </section>

        <ContactSection source="lender requirements page" heading="Check your coverage against your loan" />
      </main>

      <SiteFooter />
    </>
  );
}
