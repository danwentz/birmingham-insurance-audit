import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const PATH = "/fannie-mae-freddie-mac-named-storm-deductible";
const TITLE = "Fannie Mae and Freddie Mac Named Storm Deductible Requirements";
const META_TITLE = "Fannie & Freddie Named Storm Deductible Rules | ACREInsure";
const DESCRIPTION =
  "Fannie Mae and Freddie Mac cap named storm deductibles at 7.5% of total insurable value. A 5% Gulf Coast deductible fits. Here is where multifamily programs actually fail.";

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

const CAPS = [
  {
    item: "Named storm deductible",
    fannie: "Up to 7.5% of the collateral's total insurable value (TIV). Sec. 501.02B and 502.02.",
    freddie: "Up to 7.5% of TIV. Sec. 31.7(d).",
  },
  {
    item: "Stated minimum inside a % deductible",
    fannie: "Not more than $100,000 (specific limit) or $250,000 (shared blanket limit). Sec. 501.02B.",
    freddie: "Not more than $100,000 (specific) or $250,000 (blanket). Sec. 31.7(d).",
  },
  {
    item: "Deductible stated only in dollars",
    fannie: "$50,000 under $10M insurable value; $100,000 at $10M or more. Sec. 501.02B.",
    freddie: "$50,000 under $10M; $100,000 at $10M or more. Sec. 31.7(d).",
  },
  {
    item: "Wind/hail (not named storm)",
    fannie: "5% of TIV, same dollar caps and minimums. Sec. 501.02B.",
    freddie: "5% of TIV, stated minimum $100,000 or less (blanket $250,000). Sec. 31.7(b).",
  },
  {
    item: "Business income waiting period",
    fannie: "15 days or $100,000.",
    freddie: "15 days or $100,000. Sec. 31.7(b) and (d).",
  },
  {
    item: "Named storm coverage amount",
    fannie: "At least 90% of TIV (standalone) or of the largest individual property (blanket). Valuation may not rely solely on PML. Sec. 502.02.",
    freddie: "Blanket named storm limit not less than 90% of the largest individual TIV, per occurrence, reinstating. Sec. 31.7(c).",
  },
];

const TRAPS = [
  {
    title: "The named storm limit is set by PML, not TIV",
    body: "The percentage deductible is rarely what fails a review. The limit is. Fannie Mae requires named storm coverage of at least 90% of TIV, and the valuation may not rely solely on a probable maximum loss (PML) model. Freddie Mac wants a blanket named storm limit of at least 90% of the largest individual TIV.",
  },
  {
    title: "The dollar minimum inside the percentage is too high",
    body: "A policy can read \"5% of TIV, $500,000 minimum\" and still fail. The stated minimum cannot exceed $100,000 on a specific limit or $250,000 on a blanket limit. On a small building the minimum, not the percentage, becomes your deductible.",
  },
  {
    title: "You assumed an expanded deductible would cover wind",
    body: "Both agencies allow expanded deductibles in some cases. Freddie Mac's Sec. 31.5(b) says no for windstorm, earthquake, and NFIP. Fannie Mae's expanded deductible language does not clearly address named storm, so confirm with your lender before you count on it.",
  },
  {
    title: "The all-other-perils deductible is over the dollar cap",
    body: "Fire, water, theft, and liability-driven losses fall under the all-other-perils deductible: $50,000 under $10M of insurable value, $100,000 at $10M or more, $250,000 on a blanket limit. A $250,000 AOP deductible on a single $15M building is out of compliance no matter how the wind terms look.",
  },
];

const FAQS = [
  {
    q: "What is the maximum named storm deductible for Fannie Mae?",
    a: "As of September 2026, 7.5% of the collateral's total insurable value under Sec. 501.02B of the Multifamily Selling and Servicing Guide. Sec. 502.02 says the deductible must not exceed the greater of 7.5% of TIV or the applicable Sec. 501.02B maximum. If the deductible is stated only as a dollar amount, the cap is $50,000 under $10M of insurable value and $100,000 at $10M or more.",
  },
  {
    q: "What is Freddie Mac's windstorm deductible limit?",
    a: "Sec. 31.7(d) of the Multifamily Seller/Servicer Guide allows a named storm deductible of 7.5% of TIV with a stated minimum of $100,000 or less, or $250,000 or less on a blanket limit. Sec. 31.7(b) allows a wind/hail deductible of 5% of TIV on the same minimums.",
  },
  {
    q: "Is a 5% named storm deductible acceptable to Fannie Mae and Freddie Mac?",
    a: "Yes, on the percentage. 5% is inside the 7.5% cap for both agencies. Check the stated dollar minimum, the named storm limit, and the other-perils deductible, because those are where programs fail.",
  },
  {
    q: "Does Fannie Mae allow a PML-based named storm limit?",
    a: "Not on its own. Sec. 502.02 requires named storm coverage of at least 90% of TIV, or of the largest individual property on a blanket policy, and says the valuation may not rely solely on PML.",
  },
  {
    q: "Can I get an expanded deductible for wind?",
    a: "Not from Freddie Mac. Sec. 31.5(b) excludes NFIP, windstorm, and earthquake from expanded deductibles. Fannie Mae's table is unclear on named storm, so confirm in writing with your lender. Both agencies also condition expanded deductibles on things like liquidity, so do not assume approval.",
  },
  {
    q: "What if named storm coverage is unavailable?",
    a: "Fannie Mae says it will consider a State insurance plan or a State-managed windstorm or beach-erosion pool. Freddie Mac also addresses state windpools in Sec. 31.7(e). Ask your lender how they treat it before you rely on one.",
  },
  {
    q: "Does a wind deductible buy-down count toward the cap?",
    a: "The agency guides we reviewed do not mention buy-downs or parametric coverage. Ask your lender in writing before you count on one.",
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
      "@id": `${DOMAIN}${PATH}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lender Insurance Requirements",
          item: `${DOMAIN}/lender-insurance-requirements`,
        },
        { "@type": "ListItem", position: 3, name: TITLE, item: `${DOMAIN}${PATH}` },
      ],
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";

export default function NamedStormAgencyPage() {
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
              Fannie Mae and Freddie Mac named storm deductible requirements
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Your 5% Gulf Coast deductible is probably fine. Here is what actually fails a
              lender review.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <div className="space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  As of September 2026, Fannie Mae and Freddie Mac both cap a named storm
                  deductible at 7.5% of the property&apos;s total insurable value (TIV). Fannie Mae
                  sets it in Sec. 501.02B and 502.02 of the Multifamily Selling and Servicing Guide.
                  Freddie Mac sets it in Sec. 31.7(d) of the Multifamily Seller/Servicer Guide.
                </p>
                <p>
                  A typical 5% Gulf Coast named storm deductible sits inside that cap. So the
                  percentage is rarely the problem. The problems are the named storm limit, the
                  dollar minimum hiding inside the percentage, and an assumption that wind can
                  be bought down with an expanded deductible.
                </p>
                <p>
                  This is a general guide, not your loan document. Your loan agreement controls, and
                  a lender can be stricter than the agency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAPS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The rules</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                What do the two agencies actually require?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Fannie Mae figures are from the guide effective September 28, 2026. Freddie Mac
                figures are from Chapter 31 as updated by the August 25, 2026 bulletin.
              </p>
              <div className="mt-8 overflow-x-auto rounded-md border border-gold/20 bg-white">
                <table className="w-full min-w-[42rem] text-left text-sm">
                  <thead className="bg-midnight text-champagne">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Item</th>
                      <th className="px-4 py-3 font-semibold">Fannie Mae</th>
                      <th className="px-4 py-3 font-semibold">Freddie Mac</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/20 text-slate">
                    {CAPS.map((r) => (
                      <tr key={r.item}>
                        <th scope="row" className="px-4 py-3 align-top font-semibold text-obsidian">{r.item}</th>
                        <td className="px-4 py-3 align-top">{r.fannie}</td>
                        <td className="px-4 py-3 align-top">{r.freddie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate">
                Sources: Fannie Mae Multifamily Selling and Servicing Guide, Part II,{" "}
                <a href="https://mfguide.fanniemae.com/fnmf-pdf/download/4346" target="_blank" rel="noopener noreferrer" className={LINK}>
                  Section 501
                </a>{" "}
                and{" "}
                <a href="https://mfguide.fanniemae.com/fnmf-pdf/download/4451" target="_blank" rel="noopener noreferrer" className={LINK}>
                  Section 502
                </a>
                , effective September 28, 2026; Freddie Mac Multifamily Seller/Servicer Guide,{" "}
                <a href="https://mf.freddiemac.com/docs/chapters/mf_guide_ch_31.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chapter 31
                </a>
                , Guide Bulletin update August 25, 2026. Both guides change often, so confirm against
                the current version and your loan documents.
              </p>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Freddie Mac applies its Sec. 31.7(c) named storm rules to properties in Tier 1
                  Windstorm Risk counties, as defined by the insurer. Fannie Mae uses a similar
                  Tier I named storm county test in Sec. 502.02.
                </p>
                <p>
                  For the rest of the agency insurance rules, see our{" "}
                  <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRAPS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Where programs fail</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                If 5% is fine, what fails a lender review?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Four things, roughly in the order they trip owners up.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {TRAPS.map((t, i) => (
                  <div key={t.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-mono text-sm text-gold-dark">Trap {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{t.title}</p>
                    <p className="mt-2 text-slate">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXAMPLE 1 (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Example</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Does a 5% deductible pass on a $20M Baldwin County property?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                One multifamily property, $20M TIV, Baldwin County, Alabama. Round numbers,
                illustrative only.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-mono text-sm text-gold-dark">Named storm deductible at 5%</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$1,000,000</p>
                  <p className="mt-4 text-slate">Compliant. It is under the cap.</p>
                </div>
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-mono text-sm text-gold-dark">The 7.5% cap</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$1,500,000</p>
                  <p className="mt-4 text-slate">The most either agency lets the deductible reach.</p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  So a coastal owner with a 5% deductible has $500,000 of room under the cap. That
                  room is not a reason to negotiate up. It just means the deductible alone will not
                  be what your lender flags.
                </p>
                <p>
                  Now change one thing: the policy states &quot;5% of TIV, $250,000 minimum&quot;
                  on a specific limit. The percentage still works out to $1M. But the stated
                  minimum is over the $100,000 specific-limit ceiling, so a reviewer can flag the
                  wording even though the dollars you would pay do not change. Ask your carrier to
                  reword it before the lender does.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXAMPLE 2 (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Example</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How does a PML-based named storm limit fail the 90% test?
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                A blanket program across four Baldwin County properties: $60M total, and the
                largest single property is $20M.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">Limit set by a PML model</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$12,000,000</p>
                  <p className="mt-4 text-slate">
                    Cheaper to buy, because the model says a single storm will not destroy every
                    building.
                  </p>
                </div>
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">90% of the largest property</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$18,000,000</p>
                  <p className="mt-4 text-slate">
                    The floor under Fannie Mae Sec. 502.02 and Freddie Mac Sec. 31.7(c).
                  </p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The PML limit is $6M short of the floor. It fails, even though the deductible
                  is fine. The fix is a higher blanket named storm limit, and that costs
                  premium.
                </p>
                <p>
                  So check the limit at renewal, not only the deductible. If you
                  want to see what your own schedule retains under a storm, use the{" "}
                  <Link href="/wind-deductible-calculator" className={LINK}>wind deductible calculator</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPANDED / BUY-DOWN (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Workarounds</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Can an expanded deductible or a buy-down fix a compliance gap?
              </h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Not by default. Freddie Mac allows a Servicer to approve expanded deductibles on
                  existing mortgages, up to $100,000 or $150,000, but Sec. 31.5(b) says not for
                  NFIP, windstorm, or earthquake. It is approved for one policy term at a time.
                </p>
                <p>
                  Fannie Mae allows expanded deductibles on policies other than NFIP, up to
                  $100,000 or $150,000, with conditions: liquid assets of at least four times the
                  deductible, a Pass rating, no delinquency in 12 months, property condition of 2
                  or better, and an annual lender review. Whether that reaches named storm is
                  unclear from the table, so confirm with your lender.
                </p>
                <p>
                  Fannie Mae also takes insurance exceptions through DUS Gateway, at least 72 hours
                  before rate lock. Fannie Mae will allow an aggregate deductible above the maximum
                  if it is fully funded in a segregated account, T&amp;I escrow, or by a third party.
                </p>
                <p>
                  The guides we reviewed say nothing about buy-downs. If you carry one, our{" "}
                  <Link href="/wind-deductible-buy-down" className={LINK}>wind deductible buy-down guide</Link>{" "}
                  covers how it works. Get your lender&apos;s position in writing.
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
                Common questions about agency named storm rules
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
                Check your program against the loan before renewal
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Send us your policy and your loan insurance section. We compare the deductible
                  wording, the named storm limit, and the other-perils deductible against what the
                  agency and your lender require, and tell you what to fix before the servicer
                  finds it.
                </p>
                <p>
                  If the servicer has already flagged a gap, read our guide on{" "}
                  <Link href="/force-placed-insurance-commercial-property" className={LINK}>force-placed insurance</Link>{" "}
                  and act before the deadline.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your program for a lender-compliance check <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="agency named storm deductible page" heading="Get a lender-compliance review" />
      </main>

      <SiteFooter />
    </>
  );
}
