import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { DOMAIN } from "@/lib/site";

const TITLE = "How to Organize Your Commercial Property Insurance Documents";
const DESCRIPTION =
  "A working checklist for CRE owners and managers: which insurance documents to keep, how to file them by property and policy year, and what to update before every renewal.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ACREInsure` },
  description: DESCRIPTION,
  alternates: { canonical: "/insurance-document-checklist" },
  openGraph: {
    title: `${TITLE} | ACREInsure`,
    description: DESCRIPTION,
    url: `${DOMAIN}/insurance-document-checklist`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ACREInsure`,
    description: DESCRIPTION,
  },
};

const FOLDERS = [
  {
    n: "01",
    name: "Policies",
    keep: [
      "The full policy for every line, with all forms and endorsements. Not just the declarations page.",
      "Binders, until the policy itself arrives",
      "Premium invoices and financing agreements",
    ],
    why: "The dec page tells you the limit. The endorsements tell you whether you get paid. When a claim turns on a wind exclusion or a protective safeguards warranty, the dec page is useless.",
  },
  {
    n: "02",
    name: "Statement of values",
    keep: [
      "One row per building: address, year built, construction type, stories, square footage, unit or key count",
      "Roof, electrical, plumbing, and HVAC update years",
      "Sprinklers, alarms, and other protection",
      "Replacement cost and business income values",
    ],
    why: "This is the spreadsheet every underwriter prices from. If it's stale, you're either overpaying or underinsured, and you won't find out which until a loss.",
  },
  {
    n: "03",
    name: "Loss runs",
    keep: [
      "Five years of loss runs for every line, from every carrier that wrote you",
      "Valued within the last 90 days",
      "A short written explanation for any large or unusual claim",
    ],
    why: "Underwriters price what they can't see as if it were bad. A large claim with a one-paragraph explanation of what happened and what you fixed reads very differently than the same number with no context.",
  },
  {
    n: "04",
    name: "Property condition",
    keep: [
      "Replacement cost appraisals and valuation reports",
      "Dated photos and walkthrough video of every building, inside and out",
      "Roof certifications, wind mitigation reports, and property condition assessments",
      "Sprinkler, fire alarm, and elevator inspection reports",
    ],
    why: "After a storm, the adjuster's first question is what the building looked like before. Photos from last spring answer it. Your memory doesn't.",
  },
  {
    n: "05",
    name: "Contracts",
    keep: [
      "The insurance section of every loan agreement",
      "Lease insurance requirements, indemnity, and waiver of subrogation clauses",
      "Property management agreements",
      "Vendor and contractor agreements",
    ],
    why: "Your contracts promise things your policy has to deliver: additional insured status, specific limits, waivers. If nobody checks the two against each other, the gap shows up on the day a lender or tenant asks for proof.",
  },
  {
    n: "06",
    name: "Certificates",
    keep: [
      "Evidence of property and certificates you've issued to lenders and landlords",
      "Certificates you've collected from tenants, vendors, and contractors",
      "A tracker of expiration dates for everything collected",
    ],
    why: "A certificate from a roofing contractor that expired in March doesn't cover his fall from your roof in June. The tracker matters more than the file.",
  },
  {
    n: "07",
    name: "Claims",
    keep: [
      "One subfolder per claim: first notice, claim number, adjuster contact",
      "Photos, estimates, invoices, and proofs of loss",
      "Every letter and email with the carrier, in date order",
    ],
    why: "Claims on large properties run for months and change adjusters. The side with the cleaner file controls the conversation.",
  },
  {
    n: "08",
    name: "Risk control",
    keep: [
      "Carrier loss control reports and their recommendations",
      "Proof of what you did about each one, with dates and invoices",
    ],
    why: "An open recommendation the carrier made two years ago is a reason to non-renew. A closed one with a paid invoice is a reason to give you a better rate.",
  },
];

const CALENDAR = [
  {
    when: "120 days before renewal",
    what: "Update the statement of values. Adjust replacement costs for current construction pricing and add any building updates.",
  },
  {
    when: "90 days before renewal",
    what: "Order current loss runs from every carrier. Write up any claim over $25,000. Send the full package to your broker.",
  },
  {
    when: "30 days after binding",
    what: "Confirm the issued policies match what was bound. File them, and send updated evidence to lenders.",
  },
  {
    when: "Monthly",
    what: "Check the certificate tracker. Chase anything expiring in the next 30 days.",
  },
  {
    when: "Every spring",
    what: "Re-shoot photos and video of every property before storm season.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Dan Wentz", url: `${DOMAIN}/about` },
  publisher: { "@type": "Organization", name: "ACREInsure", url: DOMAIN },
  mainEntityOfPage: `${DOMAIN}/insurance-document-checklist`,
};

export default function InsuranceDocumentChecklist() {
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
              How to organize your commercial property insurance documents
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Eight folders, one naming rule, and a renewal calendar. The same setup we ask every
              client to build.
            </p>
          </div>
        </section>

        {/* WHY (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
            <p>
              Most owners find out their insurance records are a mess at the worst possible time.
              The lender wants evidence of coverage by Friday. The buyer&apos;s due diligence team
              wants five years of loss runs. A hurricane just came through and the adjuster wants
              to know what the roof looked like before.
            </p>
            <p>
              Organized files don&apos;t just save time in those moments. They change what you pay.
            </p>
            <p>
              Here&apos;s why. Say your statement of values lists a building at $12 million, and
              it would actually cost $18 million to rebuild. Your policy has a 90% coinsurance
              clause, so you were required to carry $16.2 million. A $2 million fire claim pays
              $12M ÷ $16.2M of the loss:{" "}
              <strong className="font-semibold text-obsidian">about $1.48 million</strong>. The
              other $518,000 or so is yours, before the deductible.
            </p>
            <p>
              That penalty didn&apos;t come from a bad policy. It came from a spreadsheet nobody
              updated. You can run your own numbers in our{" "}
              <Link href="/coinsurance-penalty-calculator" className="font-semibold text-gold-dark underline underline-offset-2 hover:text-gold">
                coinsurance penalty calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* STRUCTURE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The structure</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              One folder per entity, then one per property
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Inside each property, split by policy year. Inside each year, use the same eight
              folders every time. When something is missing, the empty folder tells you.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-md border border-gold/20 bg-obsidian p-5 font-mono text-sm leading-relaxed text-champagne">
{`Riverside Holdings LLC/
  1200 Riverside Apartments/
    2026-2027/
      01 Policies/
      02 Statement of values/
      03 Loss runs/
      04 Property condition/
      05 Contracts/
      06 Certificates/
      07 Claims/
      08 Risk control/`}
            </pre>
            <h3 className="mt-10 font-display text-xl font-semibold text-obsidian">Name every file the same way</h3>
            <p className="mt-3 max-w-2xl text-slate">
              Date first, so files sort themselves. Then property, document type, and carrier.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-gold/20 bg-white p-5 font-mono text-sm leading-relaxed text-obsidian">
{`2026-06-01_Riverside_Property-Policy_Zurich.pdf
2026-03-14_Riverside_Loss-Runs_Travelers.pdf
2026-04-02_Riverside_Roof-Photos.zip`}
            </pre>
          </div>
        </section>

        {/* EIGHT FOLDERS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What goes in each folder
            </h2>
            <div className="mt-10 space-y-10">
              {FOLDERS.map((f) => (
                <div key={f.n} className="grid gap-4 border-l-2 border-gold pl-5 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <p className="font-mono text-sm text-gold-dark">{f.n}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-obsidian">{f.name}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate marker:text-gold">
                      {f.keep.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-slate italic sm:self-center">{f.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALENDAR (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Keeping it current</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              The renewal calendar
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Files only help if they&apos;re current. Put these on the calendar once and they
              run themselves.
            </p>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {CALENDAR.map((c) => (
                <div key={c.when} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm font-medium text-gold-dark">{c.when}</p>
                  <p className="text-slate">{c.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORAGE (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Keep it where you can reach it after a storm
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                If the only copy lives on a server in the building that just flooded, you
                don&apos;t have a copy. Use a cloud drive that your CFO, your property manager, and
                your broker can all reach from a phone.
              </p>
              <p>
                Then make a one-page claims card for each property: carrier, policy number, claims
                phone line, deductible, and your broker&apos;s cell. Print it. Put it in the
                property manager&apos;s truck. It&apos;s the first thing anyone will need, and it
                should never depend on a login.
              </p>
            </div>
          </div>
        </section>

        {/* WE DO THIS FOR YOU (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Working with us</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Or let us build it for you
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                You don&apos;t have to do all of this on your own. When you work with us, getting
                organized is part of the process, not an extra project.
              </p>
              <p>
                Every document we handle for you gets named and filed the way this page describes.
                Policies, endorsements, statements of values, loss runs, certificates. Clearly
                labeled, in one place, by property and policy year.
              </p>
              <p>
                So your documentation gets better just by doing business with us. By the first
                renewal, you have the file most owners never get around to building.
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold"
            >
              Send us what you have. We&apos;ll tell you what&apos;s missing. <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <ContactSection source="document checklist page" heading="Get a second set of eyes on your files" />
      </main>

      <SiteFooter />
    </>
  );
}
