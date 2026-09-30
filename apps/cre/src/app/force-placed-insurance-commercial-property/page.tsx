import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const PATH = "/force-placed-insurance-commercial-property";
const TITLE = "Force-Placed Insurance on a Commercial Property Loan: Triggers, Cost, and How to Remove It";
const META_TITLE = "Force-Placed Insurance on Commercial Property | ACREInsure";
const DESCRIPTION =
  "Why a lender or servicer force places insurance on a commercial or multifamily loan, what it covers, how the cost lands on you, Freddie Mac's servicing timeline, and how to get it removed.";

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

const TRIGGERS = [
  {
    title: "A lapse or a coming lapse",
    body: "The policy expires or is cancelled and the servicer has no evidence of renewal. Under Freddie Mac's guide, a servicer must force place if coverage will lapse within three days (or over an intervening weekend or holiday) and it can't confirm that renewal is coming.",
  },
  {
    title: "Limits below what the loan requires",
    body: "The building limit is short of the required insured value. Freddie Mac treats coverage under 80% of required as the more urgent case, and coverage between 80% and 100% as a slower one.",
  },
  {
    title: "A deductible above the loan's cap",
    body: "Many loan agreements cap the deductible, including wind and named-storm deductibles. A renewal that comes back with a higher one is a compliance failure even though you are fully insured.",
  },
  {
    title: "Carrier or form problems",
    body: "The carrier fails the lender's rating or admitted-status test, or a required coverage or endorsement is missing. Examples are business income, ordinance or law, flood, or a mortgagee clause that names the wrong party.",
  },
  {
    title: "Missing evidence",
    body: "The coverage is fine but the servicer never received the evidence of property insurance or the certificate. From the servicer's side, unproven coverage is the same as no coverage.",
  },
];

const FREDDIE_TIMELINE = [
  {
    when: "Lapse within 3 days, renewal not confirmed",
    what: "The servicer must force place. There is no cure period. This includes lapses that would fall over a weekend or holiday.",
  },
  {
    when: "Coverage under 80% of required, no imminent lapse",
    what: "The servicer contacts the borrower within 2 days. If it is not resolved within 15 days, the servicer must force place or request a waiver from Freddie Mac.",
  },
  {
    when: "Coverage from 80% to 100% of required, or any other non-compliance",
    what: "The servicer contacts the borrower within 5 days. If it is not resolved within 30 days, the servicer must force place or request a waiver.",
  },
  {
    when: "A waiver request left unresolved",
    what: "If the deficiencies in an exception request are not resolved within 90 days of submittal, the servicer must force place.",
  },
];

const PROTECTS = [
  "The lender's interest in the collateral, up to what the policy provides.",
  "Physical damage to the building, typically on a basic form.",
];

const OFTEN_MISSING = [
  "Your liability coverage. Check the lender-placed policy.",
  "Business income or rent loss.",
  "Your equity above the loan balance. Coverage is usually tied to the lender's interest, not your full values.",
  "Contents, tenant improvements, and other items the loan does not require.",
];

const REMOVAL_STEPS = [
  {
    title: "Get the notice and the reason",
    body: "Force placement should be preceded by notices. Find out which condition triggered it: lapse, limits, deductible, carrier, or missing evidence. The fix depends on which one it was.",
  },
  {
    title: "Fix the actual deficiency",
    body: "If the problem was a late binder, get the renewal bound. If it was a deductible over the cap, get the deductible lowered or a buy-down placed. If it was limits, correct the insured value.",
  },
  {
    title: "Deliver compliant evidence",
    body: "Send the servicer the evidence of property insurance, the liability certificate, and any required endorsements. Ask us to send them directly so the servicer gets them from the source. Our document checklist lists what lenders typically ask for.",
  },
  {
    title: "Confirm in writing that the deficiency is cured",
    body: "Ask the servicer to confirm the evidence is accepted and to cancel the force-placed policy.",
  },
  {
    title: "Ask for the refund of any overlap",
    body: "If your policy and the force-placed policy were both in force for a period, ask for a refund or credit of the duplicate premium. Whether and how much is refunded depends on your loan documents and the lender-placed policy.",
  },
  {
    title: "Ask the servicer to correct your escrow",
    body: "If the charge went into escrow or onto the loan balance, ask that it be reversed or adjusted once the policy is cancelled.",
  },
];

const PREVENTION = [
  {
    title: "Start the renewal 90 days or more out",
    body: "Bind late and every other step compresses. Our renewal calendar starts well before expiry, so there is time to fix a deductible or limit problem before it becomes a lender problem.",
  },
  {
    title: "Match the loan's insurance exhibit line by line",
    body: "Before you accept a quote, compare limits, deductibles, carrier rating, and required endorsements to the loan's insurance requirements. Do this before binding, not after.",
  },
  {
    title: "Send evidence before expiry",
    body: "Get the renewal evidence of property insurance and certificates to the servicer before the old policy expires, and keep proof of delivery.",
  },
  {
    title: "Watch the deductible on the coast",
    body: "Percentage wind and named-storm deductibles are the most common deductible mismatch. A buy-down can bring the retention back within the cap.",
  },
];

const FAQS = [
  {
    q: "What is force-placed insurance on a commercial property?",
    a: "It is a property policy that a lender or servicer buys on your behalf when it cannot confirm that you carry the insurance your loan requires. It protects the lender's interest in the collateral, and the cost is generally charged back to you under the loan documents.",
  },
  {
    q: "Can a lender force place insurance if I already have coverage?",
    a: "It can if the coverage does not meet the loan's requirements or the servicer can't verify it. A deductible above the cap, limits below the required value, or missing evidence can each be enough. Your loan agreement sets the exact standard.",
  },
  {
    q: "How do I get rid of force-placed insurance?",
    a: "Cure the deficiency that triggered it, deliver compliant evidence of insurance to the servicer, and ask in writing that the force-placed policy be cancelled and any overlapping premium refunded. Check your loan agreement for the servicer's process.",
  },
  {
    q: "Does force-placed insurance cover my liability or lost rents?",
    a: "Typically not. It usually protects the lender's interest in the building. Read the lender-placed policy itself, and don't assume it replaces your own program.",
  },
  {
    q: "Who pays for force-placed insurance?",
    a: "The borrower, in most loan agreements. Freddie Mac's guide, for example, says a servicer may charge the borrower for the cost and must adjust the borrower's insurance reserve payments (or bill the borrower) to recover it. Check how your own loan documents handle it.",
  },
  {
    q: "What does Freddie Mac require servicers to do?",
    a: "As of the Multifamily Seller/Servicer Guide bulletin update dated August 25, 2026 (Chapter 31, Section 31.24), servicers must force place if coverage will lapse within three days and renewal can't be confirmed. For coverage shortfalls, they must contact the borrower and, if it is not resolved in 15 or 30 days, force place or request a waiver. They must also notify Freddie Mac when they force place, and report force-placed policies monthly.",
  },
  {
    q: "Do Fannie Mae loans work the same way?",
    a: "We have not reviewed Fannie Mae's servicing-side force-placement rules for this page. Requirements vary by lender and by your loan documents, so read yours.",
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
        { "@type": "ListItem", position: 2, name: "Lender Insurance Requirements", item: `${DOMAIN}/lender-insurance-requirements` },
        { "@type": "ListItem", position: 3, name: "Force-Placed Insurance", item: `${DOMAIN}${PATH}` },
      ],
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";
const H2 = "mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl";
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";

export default function ForcePlacedInsurance() {
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
              Force-placed insurance on a commercial property loan
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Why a lender or servicer buys it, what it does and doesn&apos;t cover, how the cost
              reaches you, and how to get it removed.
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
                  Force-placed insurance, also called lender-placed insurance, is a property policy
                  your lender or servicer buys when it can&apos;t confirm you carry the coverage your
                  loan requires. It protects the lender&apos;s interest in the collateral, and the cost
                  is generally charged back to you. It often costs more and covers less than a policy
                  you place yourself.
                </p>
                <p>
                  The triggers are narrower than most owners think. A lapse is one. A deductible
                  above the loan&apos;s cap, limits below the required value, or a certificate that
                  never reached the servicer can each be enough.
                </p>
                <p>
                  The fix is almost always the same: cure the deficiency, get compliant evidence to
                  the servicer, and ask in writing for the force-placed policy to be cancelled. This
                  page covers the triggers, Freddie Mac&apos;s servicing timeline, and the steps that
                  keep it from happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRIGGERS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Triggers</p>
              <h2 className={H2}>What makes a lender force place insurance?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Five things cause most force placements on commercial and multifamily loans. Your
                loan agreement defines the exact standard.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {TRIGGERS.map((t) => (
                  <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{t.title}</p>
                    <p className="mt-2 text-slate">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FREDDIE TIMELINE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Freddie Mac</p>
              <h2 className={H2}>How fast does a Freddie Mac servicer have to act?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                As of the August 25, 2026 bulletin update to the Freddie Mac Multifamily
                Seller/Servicer Guide,{" "}
                <a href="https://mf.freddiemac.com/docs/chapters/mf_guide_ch_31.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chapter 31
                </a>
                , Section 31.24, this is the timeline for a
                Freddie Mac loan.
              </p>
              <div className="mt-8 space-y-4">
                {FREDDIE_TIMELINE.map((r) => (
                  <div key={r.when} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{r.when}</p>
                    <p className="mt-2 text-slate">{r.what}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">The percentage is about dollars, not
                  deductibles.</strong>{" "}
                  Freddie Mac measures coverage by the dollar amount in force. Its own example: $7
                  million of property coverage against a $10 million required insured value is 70%.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The waiver route exists.</strong>{" "}
                  Instead of force placing, a servicer can ask Freddie Mac Multifamily Asset
                  Management, Borrower Transactions for a waiver or propose an alternative, with
                  justification. It is the servicer&apos;s call to ask, not yours, but a clear
                  explanation from your side helps.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The servicer has reporting duties.</strong>{" "}
                  Section 31.24 requires prompt written notice to Freddie Mac when coverage is force
                  placed, including the premium and the reason, plus monthly reporting of force-placed
                  policies. That is one reason servicers don&apos;t let these sit.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Any force-placed policy must carry
                  deductibles no greater than the loan documents require.</strong>{" "}
                  Freddie Mac also says the servicer may charge the borrower for the cost, and must
                  adjust the borrower&apos;s insurance reserve payments (or bill the borrower) to recover it.
                </p>
                <p>
                  Not a Freddie Mac loan? We haven&apos;t reviewed Fannie Mae&apos;s servicing-side
                  rules for this page. Requirements vary by lender and loan documents. See{" "}
                  <Link href="/fannie-mae-freddie-mac-named-storm-deductible" className={LINK}>
                    Fannie Mae and Freddie Mac named-storm deductible rules
                  </Link>{" "}
                  and our{" "}
                  <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COVERAGE + COST (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Coverage and cost</p>
              <h2 className={H2}>What does force-placed insurance cover, and who pays?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                It is written for the lender, not for you. Read the lender-placed policy itself
                before you assume anything.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">It typically protects</p>
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-slate">
                    {PROTECTS.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">It often leaves out</p>
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-slate">
                    {OFTEN_MISSING.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">The cost comes back to you.</strong>{" "}
                  Loan documents usually let the lender charge the premium to the borrower, add it to
                  the escrow or reserve, or add it to the loan balance. Some loans treat unpaid
                  charges as a default. Check your loan agreement for which of these applies.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">You may be paying twice.</strong>{" "}
                  If your own policy is still in force, the force-placed policy can overlap it for a
                  period. Ask for a refund of the duplicate premium once it is cancelled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WORKED EXAMPLE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Example</p>
              <h2 className={H2}>A $25M multifamily loan with a late renewal and an over-cap deductible</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Illustrative only. Your loan documents and servicer may set different terms.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">The setup</p>
                  <p className="mt-3 text-slate">
                    A $25M multifamily loan. The loan documents cap the property deductible at
                    $100,000. The renewal is due on a Saturday. The broker binds late in the week
                    before, but the quote that binds carries a $250,000 all-other-perils deductible,
                    and the evidence reaches the servicer after the old policy has expired.
                  </p>
                </div>
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">What can happen</p>
                  <p className="mt-3 text-slate">
                    The servicer can&apos;t confirm renewal ahead of the weekend, so it may force
                    place. If it does, the force-placed policy must carry deductibles within the
                    loan&apos;s cap. That is a separate policy, with a separate premium charged to
                    you, and it may not include your liability or rent loss coverage.
                  </p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Two separate problems are hiding in that one renewal. The late evidence is a
                  timing problem. The $250,000 deductible is a compliance problem that would have
                  triggered the 30-day clock on a Freddie Mac loan even if the paperwork had arrived
                  on time.
                </p>
                <p>
                  The fix is to lower the deductible to the cap or get a written waiver, deliver
                  fresh evidence, and ask the servicer to cancel the force-placed policy and refund
                  any overlap. Better still, catch it 90 days out, when the deductible is a
                  negotiation and not an emergency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REMOVAL (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Removal</p>
              <h2 className={H2}>How do you get rid of force-placed insurance?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Cure the deficiency, prove it, and get the cancellation in writing. Process details
                vary by servicer and loan.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {REMOVAL_STEPS.map((s, i) => (
                  <div key={s.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-mono text-sm text-gold-dark">Step {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{s.title}</p>
                    <p className="mt-2 text-slate">{s.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  See our{" "}
                  <Link href="/insurance-document-checklist" className={LINK}>insurance document checklist</Link>{" "}
                  for what to gather, and our{" "}
                  <Link href="/certificate-of-insurance" className={LINK}>certificate of insurance guide</Link>{" "}
                  for how certificates differ from evidence of property insurance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PREVENTION (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Prevention</p>
              <h2 className={H2}>How do you keep it from happening?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Most force placements are paperwork and timing failures, not coverage failures.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {PREVENTION.map((s, i) => (
                  <div key={s.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-mono text-sm text-gold-dark">Rule {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{s.title}</p>
                    <p className="mt-2 text-slate">{s.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  On the coast, see our{" "}
                  <Link href="/wind-deductible-buy-down" className={LINK}>wind deductible buy-down guide</Link>{" "}
                  for how to bring a named-storm retention back inside a loan cap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>FAQ</p>
              <h2 className={H2}>Common questions about force-placed insurance</h2>
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

        {/* WORKING WITH US (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>Working with us</p>
              <h2 className={H2}>Check your renewal against the loan before it binds</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  We compare the renewal quote to your loan&apos;s insurance requirements before it
                  binds, and we send evidence to the servicer ahead of expiry.
                </p>
                <p>
                  Send us your loan&apos;s insurance exhibit and your current policy. We&apos;ll tell
                  you where they don&apos;t match while there is still time to fix it.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your loan requirements for a compliance check <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="force-placed insurance page" heading="Get a lender compliance check" />
      </main>

      <SiteFooter />
    </>
  );
}
