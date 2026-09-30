import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import {
  GuideDisclaimerTop,
  GuideDisclaimerBottom,
  LegalInfoDisclaimer,
} from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const PATH = "/negligent-security-lawsuit-apartments";
const TITLE = "Negligent Security Lawsuits Against Apartment Owners";
const META_TITLE = "Negligent Security Lawsuit: Apartment Owners | ACREInsure";
const DESCRIPTION =
  "Who is liable when crime hits an apartment community, and does your GL policy pay? What negligent security claims allege, how the assault and battery exclusion works, and which records matter.";

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

// Add new state guides here. Each entry renders in the "State guides" list.
const STATE_GUIDES = [
  {
    state: "Alabama",
    href: "/negligent-security-lawsuit-alabama-apartments",
    note: "Strict foreseeability test that turns on specific prior knowledge.",
  },
  {
    state: "Florida",
    href: "/negligent-security-lawsuit-florida-apartments",
    note: "A 2023 statute gives multifamily owners a presumption against liability if they meet a security checklist.",
  },
  {
    state: "Georgia",
    href: "/negligent-security-lawsuit-georgia-apartments",
    note: "A 2025 statute sets the elements plaintiffs must prove and requires fault to be apportioned to the criminal.",
  },
];

const ALLEGATIONS = [
  "Broken or propped door locks, gates, and fences",
  "Inadequate or out-of-service exterior lighting",
  "Weak access control, such as unmanaged fobs or open pedestrian gates",
  "Prior incidents or complaints that were ignored",
  "A security vendor that missed patrols or failed to follow post orders",
];

const NAMED = [
  {
    title: "The owner entity",
    body: "Usually the property-level LLC or partnership that holds title. Plaintiffs often name the parent or sponsor as well.",
  },
  {
    title: "The property manager",
    body: "Day-to-day decisions on repairs, lighting, and security spending sit with the manager, so it is a common defendant.",
  },
  {
    title: "The security vendor",
    body: "A patrol company or monitoring contractor can be named for how it performed its contract.",
  },
];

const POLICY_QUESTIONS = [
  {
    title: "Is assault and battery excluded, or sublimited?",
    body: "An exclusion means the GL policy does not respond at all. A sublimit means it responds, but only up to a cap below your per-occurrence limit. Read the form wording, not just the declarations page.",
  },
  {
    title: "Do defense costs erode the limit?",
    body: "If defense costs sit inside the limit, every dollar spent on lawyers reduces what is left for a settlement or judgment. If they sit outside, they do not.",
  },
  {
    title: "Does the umbrella follow form on A&B?",
    body: "Some umbrella and excess policies carry their own exclusion, or sit only over the underlying sublimit. Ask whether the umbrella responds above an A&B sublimit or excludes it.",
  },
  {
    title: "What do the security contract's indemnity terms say?",
    body: "Ask whether the vendor indemnifies you, whether you are an additional insured on its policy, and what limits the vendor carries. A small vendor limit may not go far.",
  },
  {
    title: "Is the property manager covered?",
    body: "Check whether the manager is an insured under your policy or relies on its own, and whether its policy carries the same A&B restriction.",
  },
  {
    title: "Does the wording reach negligent security claims?",
    body: "The same lawsuit can be pleaded as negligent security, poor lighting, or failure to supervise. Ask how the exclusion is worded and whether it applies to all of them.",
  },
];

const RECORDS = [
  "Work orders for door locks, gates, access controls, cameras, and exterior lighting, with the date reported, the date fixed, and who fixed it.",
  "Incident logs for crimes and safety complaints, with police report numbers and what the team did in response.",
  "Resident complaints about safety, kept in a system that shows each one was acknowledged and closed.",
  "Security vendor post orders, patrol logs, and incident reports.",
  "Code-compliance and inspection records, plus any citations and how they were cleared.",
];

const FAQS = [
  {
    q: "Is a landlord liable for crime on the property?",
    a: "Sometimes. Courts generally look at whether the crime was foreseeable and whether the owner's security measures were reasonable, and the tests vary a lot by state. A lawyer licensed in your state can tell you how the rules apply to a specific claim.",
  },
  {
    q: "Who is liable after a shooting at an apartment complex?",
    a: "The person who committed the crime is responsible for it. A negligent security suit is a separate claim against the owner, the property manager, or a security vendor, alleging their failures contributed. Whether it succeeds depends on state law and the facts.",
  },
  {
    q: "Does apartment insurance cover negligent security claims?",
    a: "It depends on the policy. Assault and battery is frequently excluded or sublimited on apartment general liability policies. Check the exclusion, the sublimit, how defense costs are treated, and what the umbrella does above it.",
  },
  {
    q: "What is an assault and battery exclusion?",
    a: "It is a GL policy provision that removes coverage for claims arising from assault or battery. Some policies exclude these claims outright, while others cover them up to a lower sublimit. Wording varies, so the policy controls.",
  },
  {
    q: "Does the security vendor's insurance protect the owner?",
    a: "Only if the contract and the vendor's policy say so. Look for an indemnity clause, additional-insured status for the owner and manager, and the vendor's own limits. We can review the vendor contract language when we review your program.",
  },
  {
    q: "Can we get A&B coverage back if our policy excludes it?",
    a: "Sometimes. Options depend on the property, its claims history, and the market. We take these accounts to the habitational markets that still write apartments and price the structure, without any promise about the outcome.",
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
      datePublished: "2026-09-30",
      dateModified: "2026-09-30",
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
          name: "Multifamily & Apartment Insurance",
          item: `${DOMAIN}/multifamily-apartment-insurance`,
        },
        { "@type": "ListItem", position: 3, name: TITLE, item: `${DOMAIN}${PATH}` },
      ],
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";
const H2 = "mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl";

export default function NegligentSecurityApartmentsGuide() {
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
              Negligent security lawsuits against apartment owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              The liability rules change by state. The insurance problem does not: your GL policy
              may exclude or cap the claim.
            </p>
            <GuideDisclaimerTop asOf="September 2026" />
          </div>
        </section>

        {/* INTRO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                An apartment owner can be sued when a resident or guest is hurt by a third party&apos;s
                crime and the suit says the owner&apos;s security failures contributed. Whether the owner
                is liable depends on state law. Whether the GL policy pays depends on its assault and
                battery wording, and many apartment policies now exclude or sublimit it.
              </p>
              <p>
                Most standard carriers have exited multifamily general liability, and A&amp;B is often
                excluded or sublimited on what remains. That can leave an owner funding the defense
                and any judgment directly, even when the owner wins.
              </p>
              <p>
                This guide covers the claim, how courts approach it, what to ask about your policy,
                and which records to keep. We are brokers, so the policy and records sections are
                where we can help most.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT IS IT (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>The claim</p>
              <h2 className={H2}>What is a negligent security claim?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  It is a claim that an owner&apos;s failure to take reasonable security measures
                  contributed to a third party&apos;s crime against a resident or guest. The owner did
                  not commit the crime. The suit says the property made it easier to commit.
                </p>
                <p>Typical allegations include:</p>
              </div>
              <div className="mt-4 max-w-3xl rounded-md border border-gold/20 bg-white p-6">
                <ul className="space-y-3">
                  {ALLEGATIONS.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-slate">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHO CAN BE NAMED (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Defendants</p>
              <h2 className={H2}>Who can be named in these suits?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Plaintiffs commonly name everyone involved in running the property.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {NAMED.map((n) => (
                  <div key={n.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{n.title}</p>
                    <p className="mt-2 text-slate">{n.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Each defendant has its own insurance, and they do not always line up. That is why
                  the contracts between them matter, and why we come back to them below.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Courts and state law</p>
              <h2 className={H2}>How do courts decide negligent security cases?</h2>
              <LegalInfoDisclaimer asOf="September 2026" />
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Courts generally ask two things: whether the crime was foreseeable, and whether the
                  owner&apos;s security measures were reasonable. The tests for those questions vary a
                  lot by state.
                </p>
                <p>
                  Some states apply strict tests that require specific prior knowledge. Alabama is one
                  example. Its Supreme Court has said that absent special relationships or
                  circumstances, a person has no duty to protect another from the criminal acts of a
                  third person. <em>Moye v. A.G. Gaston Motels, Inc.</em>, 499 So. 2d 1368, 1370 (Ala.
                  1986). See our{" "}
                  <Link href="/negligent-security-lawsuit-alabama-apartments" className={LINK}>
                    Alabama guide
                  </Link>.
                </p>
                <p>
                  Other states weigh the totality of the circumstances instead.
                </p>
                <p>
                  State law also differs on fault allocation, damages and filing deadlines. If you
                  own in more than one state, expect each property to be judged under its own rules.
                </p>
              </div>

              <div className="mt-8 max-w-3xl rounded-md border border-gold/20 bg-white p-6">
                <p className="font-display text-lg font-semibold text-obsidian">State guides</p>
                <ul className="mt-3 space-y-3">
                  {STATE_GUIDES.map((s) => (
                    <li key={s.href} className="text-slate">
                      <Link href={s.href} className={LINK}>{s.state}</Link>
                      <span>: {s.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* POLICY (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Your policy</p>
              <h2 className={H2}>Does your GL policy cover a negligent security claim?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Maybe, up to a point. Here are the questions to put to your broker.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {POLICY_QUESTIONS.map((q, i) => (
                  <div key={q.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-mono text-sm text-gold-dark">Question {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{q.title}</p>
                    <p className="mt-2 text-slate">{q.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Vendor contracts are worth a read before you need them. For certificate and
                  additional-insured mechanics, see{" "}
                  <Link href="/certificate-of-insurance" className={LINK}>certificates of insurance</Link>.
                  For how GL limits fit a full program, see{" "}
                  <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily and apartment insurance</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXAMPLE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Illustrative example</p>
              <h2 className={H2}>How does an A&amp;B sublimit change what the policy pays?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Hypothetical numbers, chosen to show the mechanics. Not a prediction and not a
                verdict figure.
              </p>
              <div className="mt-8 max-w-3xl rounded-md border border-gold/20 bg-white p-6">
                <p className="font-display text-lg font-semibold text-obsidian">
                  240-unit community, illustrative only
                </p>
                <ul className="mt-3 space-y-2 text-slate">
                  <li>GL limit: $1,000,000 per occurrence</li>
                  <li>Assault and battery sublimit: $100,000</li>
                  <li>Defense costs: inside the limits</li>
                </ul>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  A resident is assaulted in a poorly lit parking area and sues, alleging negligent
                  security. The headline limit reads $1M. The A&amp;B sublimit is what actually
                  applies, because the claim arises from an assault.
                </p>
                <p>
                  Say defense costs reach $60,000 before the case resolves. With defense inside the
                  limits, only $40,000 is left for any settlement or judgment. Anything above that is
                  the owner&apos;s to fund, unless an umbrella responds above the sublimit.
                </p>
                <p>
                  That last point is the second thing to check. The umbrella may not sit over an A&amp;B
                  sublimit at all. The $1M figure on the certificate did not tell you any of this.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RECORDS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Records</p>
              <h2 className={H2}>Which operating records matter?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                This is good operating practice, not legal defense advice. Ask your attorney what to
                keep and for how long.
              </p>
              <div className="mt-8 max-w-3xl rounded-md border border-gold/20 bg-ivory p-6">
                <ul className="space-y-3">
                  {RECORDS.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-slate">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Dated records show what your team knew and when it acted. They also help your broker
                  present the property to underwriters at renewal.
                </p>
                <p>
                  If a claim does arrive, see our notes on{" "}
                  <Link href="/commercial-insurance-claims-strategy" className={LINK}>claims strategy</Link>.
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
              <h2 className={H2}>Common questions about negligent security claims</h2>
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
              <h2 className={H2}>Find the assault and battery gap before a claim does</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Send us your GL and umbrella policies and your security vendor contract. We will
                  read the A&amp;B wording, check how defense costs are treated, and tell you what the
                  umbrella does above it.
                </p>
                <p>
                  If the answer is a gap, we will take the account to the habitational markets that
                  still write apartments and price a better structure.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your policies for an assault and battery review <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="negligent security lawsuit apartments page" heading="Get a liability coverage review" />
      </main>

      <SiteFooter />
    </>
  );
}
