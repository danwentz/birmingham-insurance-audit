import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const TITLE = "Franchise Hotel Insurance Requirements for Owners";
const META_TITLE = "Franchise Hotel Insurance Requirements Guide | ACREInsure";
const DESCRIPTION =
  "What franchisors require your flagged hotel to carry, why requirements change mid-policy-year, how to find yours, and how we negotiate grandfathering.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/franchise-hotel-insurance-requirements" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/franchise-hotel-insurance-requirements`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const KINDS = [
  {
    title: "Minimum limits",
    body: "Per-occurrence and aggregate limits on general liability, plus umbrella or excess limits that commonly scale with the size of the property.",
  },
  {
    title: "Required coverages",
    body: "Beyond property and liability, brands commonly require business income, liquor liability where there is food and beverage, employment practices, crime, cyber, and workers' compensation.",
  },
  {
    title: "Additional insured status",
    body: "The franchisor and its affiliates, officers, and sometimes other named parties are typically required to be added to your liability policies by endorsement, with specific wording.",
  },
  {
    title: "Carrier ratings",
    body: "A minimum financial strength rating for the carriers on your program, and sometimes a requirement that they be admitted in your state.",
  },
  {
    title: "Deductible caps",
    body: "Limits on how large a deductible or self-insured retention you can carry, including named storm or wind deductibles.",
  },
  {
    title: "Waivers, notice, and evidence",
    body: "Waiver of subrogation, primary and noncontributory wording, notice of cancellation to the franchisor, and evidence of insurance delivered at set times, often at each renewal.",
  },
];

const FIND = [
  {
    title: "Read the insurance section of your franchise agreement",
    body: "Look for the insurance article and any exhibit attached to it. Many agreements point to brand standards or a separate requirements document instead of stating the numbers.",
  },
  {
    title: "Ask the brand for the current document",
    body: "Contact the franchisor's franchise services or insurance compliance team and ask for the current insurance requirements for your property type. The version in your closing binder may be out of date.",
  },
  {
    title: "Check the brand portal",
    body: "Most brands post standards, updates, and compliance status for each property in an owner portal. Find out who at your company receives those notices.",
  },
  {
    title: "Watch for update notices",
    body: "Requirement changes usually arrive as a notice to the franchisee of record. If that notice goes to an old address or a former GM, nobody sees it until a deadline is close.",
  },
  {
    title: "Know the events that trigger updated terms",
    body: "A property improvement plan (PIP), a change of ownership, a renewal or relicensing, or a conversion to another brand can each bring current requirements into play, even if your existing terms were older.",
  },
  {
    title: "Send it all to your broker",
    body: "Give us the agreement, the requirements document, and any notices. We can only build to what we can see.",
  },
];

const CONSEQUENCES = [
  {
    title: "Default notices and cure periods",
    body: "Franchise agreements commonly let the franchisor issue a notice of default for missing insurance, with a set number of days to cure.",
  },
  {
    title: "Force-placed coverage and charges",
    body: "Agreements often allow the brand to buy coverage on your behalf and charge it back, along with administrative fees. That coverage is typically priced and structured for the brand's protection, not yours.",
  },
  {
    title: "Risk to the agreement and relicensing",
    body: "Uncured insurance defaults can be grounds for termination under many agreements, and compliance history can come up when the license is renewed or a transfer is approved.",
  },
  {
    title: "An uninsured gap at claim time",
    body: "If the brand required a coverage or limit you didn't carry and a claim lands there, the shortfall is yours. Being out of compliance and being uninsured for a specific loss are often the same problem.",
  },
];

const BROKER = [
  {
    title: "Gets the requirements document up front",
    body: "Before we market anything for price, we get the franchise agreement and the current requirements document and build the program to it.",
  },
  {
    title: "Builds a compliance matrix",
    body: "Each requirement is mapped to the policy, endorsement, or limit that satisfies it, so you can see what is met and what is not.",
  },
  {
    title: "Issues evidence with the right wording",
    body: "",
  },
  {
    title: "Tracks brand updates",
    body: "We watch for changes and negotiate timelines, including grandfathering, so updates land at renewal instead of mid-term.",
  },
  {
    title: "Coordinates franchisor and lender terms",
    body: "",
  },
  {
    title: "Flags expensive requirements and asks for variances",
    body: "When a requirement is costly or a poor fit for your property, we say so and ask the franchisor for a variance where it makes sense.",
  },
];

const CHECKLIST = [
  "Pull the insurance section and exhibits of your franchise agreement and put them in one folder.",
  "Request the brand's current insurance requirements document in writing, and note the date and version.",
  "Confirm who at your company receives franchisor notices, and that the contact on file is current.",
  "Build a matrix: each requirement (limit, coverage, endorsement, rating, deductible cap) next to the policy that meets it.",
  "Confirm the franchisor and affiliates are named as additional insured with the wording the brand specifies.",
  "Check your carriers' financial ratings against the minimum.",
  "Check deductibles and retentions, including wind or named storm, against any cap.",
  "Compare franchisor requirements with your lender's, and use the stricter of the two where they overlap.",
  "Calendar every evidence-of-insurance deadline and your renewal date.",
  "Ask your broker to confirm in writing that the program meets the current requirements.",
  "Before a PIP, sale, or relicensing, ask what updated terms will apply and plan the insurance cost into the budget.",
];

const FAQS = [
  {
    q: "Where do I find my hotel franchise's insurance requirements?",
    a: "Start with the insurance section and exhibits of your franchise agreement. Many agreements refer to brand standards or a separate insurance requirements document, so ask the franchisor's franchise services or insurance compliance team for the current version, and check the brand's owner portal.",
  },
  {
    q: "Can a franchisor change insurance requirements after I sign?",
    a: "Many franchise agreements let the franchisor update brand standards, including insurance requirements, from time to time. Read your agreement's language on modifications and ask your attorney how it applies to you.",
  },
  {
    q: "What if a new requirement takes effect before my policy renews?",
    a: "You have a few options. You can add the limit or coverage mid-term, which is often priced less favorably. Or you can ask the franchisor for time. We negotiate with the franchisor to grandfather you in on your current program until renewal, so you can plan and price the change properly. We can't guarantee the franchisor will agree, but we ask, and we ask early.",
  },
  {
    q: "What happens if my hotel doesn't meet the requirements?",
    a: "Franchise agreements commonly allow a default notice with a cure period, and may allow the franchisor to buy coverage on your behalf and charge you for it. Continued non-compliance can put the agreement and relicensing at risk. Separately, if a claim falls under a coverage you were required to carry but didn't, you bear that loss.",
  },
  {
    q: "Do franchisor and lender insurance requirements differ?",
    a: "They can. Each has its own limits, wording, and evidence rules, and the strictest terms from each usually control the program. We reconcile both. See our lender insurance requirements guide for the lender side.",
  },
  {
    q: "Are the requirements the same for every property under a brand?",
    a: "Not necessarily. Requirements can vary by brand tier, property size, food and beverage operations, location, and the date of your agreement. Check the terms for your property specifically.",
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
      mainEntityOfPage: `${DOMAIN}/franchise-hotel-insurance-requirements`,
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
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";
const H2 = "mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl";

export default function FranchiseHotelInsuranceRequirements() {
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
            <p className={`mt-8 ${EYEBROW}`}>Guide</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Franchise hotel insurance requirements
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What your flag requires you to carry, why those requirements change mid-year, and
              how to stay compliant without a scramble.
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
                  If your hotel carries a flag, the franchisor has a say in your insurance. Every
                  brand sets minimum requirements, and as the franchisee you&apos;re contractually
                  expected to meet them.
                </p>
                <p>
                  They&apos;re in your franchise agreement, or in brand standards or an insurance
                  requirements document provided under separate cover. Either way, they&apos;re part
                  of the deal you signed. Our{" "}
                  <Link href="/hospitality-hotel-insurance" className={LINK}>hospitality insurance program</Link>{" "}
                  is built around them.
                </p>
                <p>
                  This guide covers what brands commonly require, how to find your own
                  requirements, and what to do when they change on you. We don&apos;t quote any
                  brand&apos;s numbers here. They differ by brand, tier, and agreement date, so
                  yours are the ones that count.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THEY REQUIRE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>What&apos;s required</p>
            <h2 className={H2}>What franchisors commonly require</h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Requirements vary, but they tend to fall into the same buckets.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {KINDS.map((k) => (
                <div key={k.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{k.title}</p>
                  <p className="mt-2 text-slate">{k.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Some brands also require specific additional insured wording, which is why the
              form on your policy matters and not just the certificate. If you own several
              hotels, each flag may have its own list. See{" "}
              <Link href="/hotel-portfolio-insurance" className={LINK}>hotel portfolio insurance</Link>.
            </p>
          </div>
        </section>

        {/* MID-YEAR PROBLEM (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>The mid-year problem</p>
              <h2 className={H2}>Requirements change after your program is placed</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Franchisors update their insurance requirements, and they don&apos;t always wait
                  for your renewal date. A notice arrives in the middle of your policy year,
                  after your program is already placed.
                </p>
                <p>
                  Now you&apos;re scrambling. You need more limit or a new coverage, mid-term, with
                  a compliance deadline running. Adding coverage mid-term can come with
                  short-rate charges or pricing that&apos;s less favorable than you&apos;d get at
                  renewal, and you have little time to shop.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Here&apos;s what we do.</strong>{" "}
                  We negotiate with the franchisor to grandfather you in on your current program
                  until renewal. That gives you time to prepare, budget, and implement the change
                  properly at renewal, instead of in a panic. We can&apos;t promise a franchisor
                  will agree, but it&apos;s a request we make, and making it early helps.
                </p>
              </div>

              <h3 className="mt-12 font-display text-xl font-semibold text-obsidian">
                Example: a new umbrella requirement in March
              </h3>
              <p className="mt-2 text-sm text-slate">
                Illustrative scenario. Amounts and timing will vary by brand and carrier.
              </p>
              <div className="mt-4 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  In March, you learn your brand has raised its minimum umbrella limit, effective
                  in 60 days. Your program renews in October.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Without grandfathering.</strong>{" "}
                  You have 60 days to buy the additional limit. Your umbrella carrier may not
                  offer the extra layer mid-term, or may price it pro rata plus a premium for
                  short notice. You take whatever market is available in that window, and the
                  cost is unbudgeted. Then at October renewal, you re-underwrite everything
                  again.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">With grandfathering.</strong>{" "}
                  We contact the franchisor, explain that your program is placed and compliant with
                  the prior requirement, and ask that the new limit apply from your October
                  renewal. If they agree, we spend the summer on the change: talking to umbrella
                  markets, pricing options, and setting the budget with you. The new limit goes on
                  at renewal, priced with the rest of the program.
                </p>
                <p>
                  Same requirement, same result. The difference is time and leverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FIND (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>Finding yours</p>
            <h2 className={H2}>How to find out what your requirements are</h2>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {FIND.map((f) => (
                <div key={f.title} className="grid gap-2 p-5 sm:grid-cols-[20rem_1fr] sm:gap-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{f.title}</p>
                  <p className="text-slate">{f.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Your lender may have separate requirements on top of the franchisor&apos;s. See our{" "}
              <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements guide</Link>.
            </p>
          </div>
        </section>

        {/* CONSEQUENCES (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>If you don&apos;t comply</p>
            <h2 className={H2}>What non-compliance can cost</h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Consequences depend on your agreement, but these are what franchise agreements
                commonly allow.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONSEQUENCES.map((c) => (
                <div key={c.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{c.title}</p>
                  <p className="mt-2 text-slate">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Talk to your franchise attorney about the specific cure periods and remedies in
              your agreement.
            </p>
          </div>
        </section>

        {/* BROKER (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>What a good broker does</p>
            <h2 className={H2}>How we handle franchise requirements</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BROKER.map((b) => (
                <div key={b.title} className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">{b.title}</p>
                  <p className="mt-2 text-slate">
                    {b.title === "Issues evidence with the right wording" ? (
                      <>
                        Certificates and endorsements that name the franchisor and its affiliates
                        the way the brand asks. See our guide to{" "}
                        <Link href="/certificate-of-insurance" className={LINK}>certificates of insurance</Link>.
                      </>
                    ) : b.title === "Coordinates franchisor and lender terms" ? (
                      <>
                        The two often overlap and sometimes conflict. We reconcile them into one
                        program. See{" "}
                        <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements</Link>.
                      </>
                    ) : (
                      b.body
                    )}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              Wondering what your program should cost once requirements are met? Try our{" "}
              <Link href="/hotel-insurance-calculator" className={LINK}>hotel insurance calculator</Link>.
            </p>
          </div>
        </section>

        {/* CHECKLIST (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>Checklist</p>
              <h2 className={H2}>Franchise insurance compliance checklist</h2>
              <ul className="mt-8 space-y-3">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>FAQ</p>
              <h2 className={H2}>Common questions about franchise insurance requirements</h2>
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
              <h2 className={H2}>Send us your franchise agreement</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Send us the insurance section of your franchise agreement and the brand&apos;s
                  current requirements document. We&apos;ll map them against your program, tell you
                  where you stand, and handle the conversation with the franchisor if something
                  needs time or a variance.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your franchise requirements <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="franchise hotel insurance requirements page" heading="Get your franchise requirements checked" />
      </main>

      <SiteFooter />
    </>
  );
}
