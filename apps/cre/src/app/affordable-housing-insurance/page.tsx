import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { DOMAIN } from "@/lib/site";

const TITLE = "Affordable Housing Insurance: Section 8, HUD, and LIHTC Properties";
const META_TITLE = "Affordable Housing & Section 8 Property Insurance | ACREInsure";
const DESCRIPTION =
  "Insurance for affordable housing portfolios, including Housing Choice Voucher, project-based Section 8, HUD-financed, and LIHTC properties: what underwriters actually price, what the law says, and how to present the account.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/affordable-housing-insurance" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/affordable-housing-insurance`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const PRICED = [
  {
    title: "Construction and age",
    body: "Frame versus masonry, roof age, and when the electrical, plumbing, and HVAC systems were last updated.",
  },
  {
    title: "Location",
    body: "Wind, hail, flood, and wildfire exposure, fire protection class, and the local liability and litigation climate.",
  },
  {
    title: "Loss history",
    body: "Five years of loss runs: how many claims, how large, and what was done to stop them from happening again.",
  },
  {
    title: "Condition and maintenance",
    body: "Deferred maintenance, capital plans, and whether the property shows well on a loss control inspection.",
  },
  {
    title: "Management",
    body: "Who manages the property, how long they've done it, and whether they have written procedures for maintenance, security, and incidents.",
  },
  {
    title: "Values",
    body: "Accurate replacement cost values on the statement of values. Underinsured values are one of the fastest ways to lose a carrier's confidence.",
  },
];

const PRESENT = [
  {
    doc: "Inspection history",
    what: "HUD-required unit inspections (HQS, now moving to NSPIRE) are third-party evidence that units meet a physical standard. Include recent pass rates and how quickly failed items were fixed.",
  },
  {
    doc: "Capital improvements",
    what: "Roofs, electrical, plumbing, fire alarms, and sprinklers, with dates. Updated systems move pricing more than almost anything else you can document.",
  },
  {
    doc: "Management profile",
    what: "Your manager's experience, portfolio size, and written procedures for maintenance requests, security, and incident reporting.",
  },
  {
    doc: "Loss runs and loss narrative",
    what: "Five years of loss runs from every carrier, plus a short explanation of any large claim and what changed afterward.",
  },
  {
    doc: "Statement of values",
    what: "Current replacement cost values, unit counts, construction, and square footage for every building.",
  },
  {
    doc: "Program and loan documents",
    what: "For project-based Section 8, HUD-insured loans, or LIHTC properties, the insurance requirements from your regulatory agreement, HAP contract, or loan documents.",
  },
];

const FAQS = [
  {
    q: "Does accepting Section 8 vouchers raise my insurance premium?",
    a: "Premium is driven by the property: construction, age, location, loss history, condition, management, and values. Those are the factors we build a submission around. A growing number of states and cities also restrict insurers from declining or rating a property because tenants pay with housing assistance.",
  },
  {
    q: "Can an insurance company refuse to cover a property because it has Section 8 tenants?",
    a: "It depends on the state. Several states and some cities limit or prohibit insurers from using a tenant's source of income, including housing vouchers, in underwriting. Where no such rule exists, carriers set their own guidelines. If a carrier declines you and cites voucher tenancy, tell your broker and ask for the reason in writing.",
  },
  {
    q: "Do I have to tell my insurance company that I accept vouchers?",
    a: "Answer every question on an insurance application truthfully and completely. A misstatement on an application can give a carrier grounds to deny a claim or rescind the policy. If you're unsure how a question applies to your property, ask your broker before you sign.",
  },
  {
    q: "What insurance does a project-based Section 8 or HUD-financed property need?",
    a: "The requirements come from your HAP contract, regulatory agreement, and loan documents, and HUD-insured loans have their own property, liability, and fidelity requirements. Read those documents first, then build the program to meet them.",
  },
  {
    q: "Do I need different coverage for a property with voucher tenants?",
    a: "The core coverage is the same as any multifamily property: property at replacement cost, business income or rent loss, general liability, and umbrella. Rent loss is worth a close look, since it should reflect all the rent you collect, including the housing assistance payment.",
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
      mainEntityOfPage: `${DOMAIN}/affordable-housing-insurance`,
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

export default function AffordableHousingInsurance() {
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
              Affordable housing insurance: Section 8, HUD, and LIHTC properties
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What underwriters actually price, what the law says, and how to present an
              affordable housing portfolio to carriers.
            </p>
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Plenty of multifamily portfolios include affordable housing. Some owners accept
                Housing Choice Vouchers at a few properties. Others own project-based Section 8
                communities under a HAP contract with HUD. Either way, owners ask us the same
                question: how does this affect my insurance?
              </p>
              <p>
                The short answer is that your insurance is priced on the property, the way it&apos;s
                run, and its loss history. That&apos;s where a strong submission puts its
                attention, and it&apos;s where yours should too.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT'S PRICED (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Underwriting</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What underwriters actually price
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              These are the factors that move a multifamily quote, with or without housing
              assistance in the rent roll.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRICED.map((t) => (
                <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{t.title}</p>
                  <p className="mt-2 text-slate">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE LAW (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The rules</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What the law says
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                <strong className="font-semibold text-obsidian">Source of income is protected in a growing number of places.</strong>{" "}
                Many states and cities prohibit landlords from refusing tenants because they pay
                with a housing voucher. Some of those same jurisdictions extend the rule to
                insurers, limiting or barring carriers from declining, canceling, or rating a
                property because its tenants receive housing assistance.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Fair housing law applies to insurance too.</strong>{" "}
                The federal Fair Housing Act reaches property insurance on residential buildings.
                Carriers and brokers have to underwrite on the property and its risk.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">The rules differ by state and change often.</strong>{" "}
                A portfolio across several states can face several different standards. We keep
                track of where your properties sit, and your attorney is the right person to
                confirm how the rules apply to your leasing practices.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Applications still have to be answered honestly.</strong>{" "}
                Some carrier applications ask about subsidized or assisted housing. Answer every
                question truthfully. A misstatement can give a carrier grounds to deny a claim or
                rescind the policy, which is far worse than any pricing question.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT-BASED (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Project-based and HUD-financed</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              When HUD is part of the deal
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Project-based Section 8 properties, HUD-insured loans, and tax credit (LIHTC)
                properties come with insurance requirements written into the HAP contract,
                regulatory agreement, or loan documents. Those can set property limits,
                deductibles, liability and fidelity coverage, and carrier ratings.
              </p>
              <p>
                Treat them like any lender requirement: find them before renewal goes to market,
                and check every policy against them. See our{" "}
                <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements guide</Link>{" "}
                for how to read an insurance covenant.
              </p>
              <p>
                <strong className="font-semibold text-obsidian">Check your rent loss limit.</strong>{" "}
                Business income or rent loss coverage should reflect the full rent the property
                collects, including the housing assistance payment, not just the tenant&apos;s
                share. If the HAP contract is suspended after a loss, that coverage is what keeps
                the loan paid while you rebuild.
              </p>
            </div>
          </div>
        </section>

        {/* PRESENT THE ACCOUNT (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Your submission</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              How to present the account
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Underwriters price what they can see. Owners in HUD programs often have better
              documentation than they realize. Put it in front of the carrier.
            </p>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {PRESENT.map((w) => (
                <div key={w.doc} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm font-medium text-gold-dark">{w.doc}</p>
                  <p className="text-slate">{w.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHECKLIST (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Checklist</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Before your next renewal
            </h2>
            <ul className="mt-8 space-y-3">
              {[
                "Pull the insurance requirements from every HAP contract, regulatory agreement, and loan document in the portfolio.",
                "Update replacement cost values on the statement of values.",
                "Gather recent unit inspection results and a list of capital improvements with dates.",
                "Confirm rent loss limits reflect total rent collected, including housing assistance payments.",
                "Collect five years of loss runs and write a short narrative for any large claim.",
                "Answer every application question truthfully, and ask your broker if a question is unclear.",
                "If a carrier declines or non-renews, ask for the reason in writing.",
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
              Common questions about affordable housing insurance
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
              We market the property, not the rent roll
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                We build submissions around construction, condition, management, and loss history,
                and we go to carriers that write multifamily and affordable housing on those terms.
                For HUD and tax credit properties, we read your program documents first so the
                coverage we bind meets them.
              </p>
              <p>
                See also{" "}
                <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily insurance</Link>{" "}
                and{" "}
                <Link href="/real-estate-portfolio-insurance" className={LINK}>real estate portfolio insurance</Link>.
              </p>
            </div>
            <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
              Talk to us about your portfolio <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-10 text-sm text-slate">
              This is general guidance, not legal advice. Fair housing and insurance rules vary by
              state and city. Talk to your attorney about how they apply to your properties.
            </p>
          </div>
        </section>

        <ContactSection source="affordable housing page" heading="Review your portfolio's coverage" />
      </main>

      <SiteFooter />
    </>
  );
}
