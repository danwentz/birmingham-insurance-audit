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

const PATH = "/negligent-security-lawsuit-georgia-apartments";
const TITLE = "Negligent Security Lawsuits Against Georgia Apartment Owners";
const META_TITLE = "Negligent Security Lawsuit: Georgia Apartments | ACREInsure";
const DESCRIPTION =
  "Georgia's 2025 tort reform (SB 68) created a statute for negligent security claims. What plaintiffs must now prove against an apartment owner, and what to check in your GL policy.";

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

const ELEMENTS = [
  {
    element: "1. Foreseeability",
    plain:
      "The owner had a particularized warning of imminent wrongful conduct, or reasonably should have known it was likely, based on prior substantially similar incidents the owner actually knew about. Those incidents can be on the property, on adjoining property, or within 500 yards. A third route covers prior conduct by the same person the owner knew, or should have known, would be on the premises.",
  },
  {
    element: "2. Foreseeable injury",
    plain: "The injury was a reasonably foreseeable consequence of that wrongful conduct.",
  },
  {
    element: "3. A known physical condition",
    plain:
      "The wrongful conduct was a reasonably foreseeable result of the criminal exploiting a specific physical condition of the property that the owner knew about, and that condition made the risk substantially greater than the general risk in the area.",
  },
  {
    element: "4. Failure to fix it",
    plain:
      "The owner failed to use ordinary care to remedy or mitigate that known condition and to otherwise keep the premises safe from the conduct.",
  },
  {
    element: "5. Proximate cause",
    plain: "That failure was a proximate cause of the injury.",
  },
];

const OTHER_RULES = [
  {
    title: "Licensees",
    body: "For a licensee, the statute requires a particularized warning and a willful and wanton failure to remedy the known condition, which is a higher standard than ordinary care.",
  },
  {
    title: "Security contractors",
    body: "A security vendor that undertakes a duty to keep the premises safe is liable only in the same manner and to the same extent as the owner, and never to a greater extent.",
  },
  {
    title: "Standard of care",
    body: "The statute says the owner does not have to meet a standard of extraordinary care, and it lists what the jury considers: the security measures in place, the need for and practicality of others, and whether they would have prevented the injury.",
  },
  {
    title: "Claims left untouched",
    body: "The statute says it does not limit breach of contract claims, or claims tied to Code Section 16-5-46. Your lawyer can tell you what that means for a given suit.",
  },
];

const POLICY_QUESTIONS = [
  {
    title: "Is assault and battery excluded, or sublimited?",
    body: "An exclusion means the GL policy does not respond at all. A sublimit means it responds up to a lower cap than your per-occurrence limit. Read the forms, not just the declarations page.",
  },
  {
    title: "How does the exclusion treat a negligent security allegation?",
    body: "A plaintiff can word the same incident as negligent security, poor lighting, or failure to supervise. Ask whether the policy language reaches all of those, or only claims that use the words assault and battery.",
  },
  {
    title: "Do defense costs erode the limit?",
    body: "If defense sits inside the limit, every dollar spent on lawyers is a dollar not available for a settlement or judgment. On a sublimit, that can consume most of it.",
  },
  {
    title: "Is there a duty to defend?",
    body: "Some policies only reimburse defense costs on assault and battery claims. Ask what the insurer does before the sublimit is reached, and after.",
  },
  {
    title: "Does the umbrella follow form?",
    body: "Umbrella and excess policies may carry their own exclusion or sit over only the underlying limit. Confirm whether they respond above an A&B sublimit.",
  },
  {
    title: "Who is an insured?",
    body: "Check the ownership entity, the manager, and any security contractor, and whether the contractor carries its own coverage naming you as an additional insured.",
  },
];

const RECORDS = [
  "An incident log for crimes and safety complaints on the property, with police report numbers, and a way to note incidents you hear about nearby.",
  "Work-order records for door locks, gates, fences, access controls, and exterior lighting: date reported, date fixed, and who fixed it.",
  "Tenant service requests, in a system that shows each one was acknowledged and closed.",
  "Security contracts, patrol logs, and camera or gate system maintenance records, if you use them.",
  "Notes on any warning you received about a specific person, and what you did with it, including any report to police.",
];

const FAQS = [
  {
    q: "Is a Georgia landlord liable for crime on the property?",
    a: "Not automatically. For negligent security claims arising on or after the effective date of SB 68 (2025), the statute says it is the sole and exclusive remedy, and it requires the plaintiff to prove each element, including that the owner knew of prior substantially similar incidents or had a particularized warning. Whether a given owner is liable is a question for a lawyer.",
  },
  {
    q: "What is a particularized warning under Georgia's negligent security law?",
    a: "The statute defines it as information the owner actually knew and found credible, which caused the owner to understand that a specific third person was likely to imminently engage in wrongful conduct that posed a clear danger. The information must be specific as to the person's identity, the nature and dangerousness of the conduct, and its location, time, and circumstances.",
  },
  {
    q: "Does Georgia's law apply to crimes that happen next door?",
    a: "Prior incidents on adjoining property or within 500 yards can count toward foreseeability, but only if the owner had actual knowledge of them. The statute also bars claims where the wrongful conduct did not occur on the premises in a place from which the owner could exclude the third person.",
  },
  {
    q: "Does SB 68 apply to incidents before it took effect?",
    a: "The Act says its negligent security provisions apply only to causes of action arising on or after its effective date, and that prior causes of action are governed by prior law. Which law applies to a specific incident is a question for a lawyer.",
  },
  {
    q: "Do apartment insurance policies cover negligent security claims?",
    a: "It depends on the policy. Assault and battery is frequently excluded or sublimited on apartment GL policies, and the wording varies. Read the exclusion, the sublimit, the defense-cost terms, and the umbrella.",
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
          name: "Negligent Security",
          item: `${DOMAIN}/negligent-security-lawsuit-apartments`,
        },
        { "@type": "ListItem", position: 3, name: TITLE, item: `${DOMAIN}${PATH}` },
      ],
    },
  ],
};

const LINK = "font-semibold text-gold-dark underline underline-offset-2 hover:text-gold";
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";
const H2 = "mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl";

export default function GeorgiaNegligentSecurityGuide() {
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
              Negligent security lawsuits against Georgia apartment owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Georgia&apos;s 2025 tort reform put negligent security claims into a statute. The
              elements are specific. Your GL policy is still the question that decides who pays.
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
                  In 2025 Georgia enacted SB 68, a tort reform bill that added a new article to the
                  premises liability chapter of the Georgia code. It sets out what a plaintiff must
                  prove to hold an apartment owner liable for crime on the property, and it tells
                  juries to assign fault to the criminal. For claims arising on or after its effective
                  date, that statute replaces the earlier case-law approach.
                </p>
                <p>
                  A tighter statute does not make a suit free. You still pay to defend it, and many
                  apartment general liability policies exclude assault and battery or cap it at a
                  sublimit.
                </p>
                <p>
                  This guide covers what the statute requires, what it means for how you run the
                  property, and what to check in your policy. We are brokers, so the policy half is
                  where we can help. For the national picture, see our{" "}
                  <Link href="/negligent-security-lawsuit-apartments" className={LINK}>negligent security overview</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: STATUTE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Georgia law</p>
              <h2 className={H2}>What does Georgia&apos;s negligent security statute say?</h2>
              <LegalInfoDisclaimer asOf="September 2026" state="Georgia" />
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  SB 68, signed into law in 2025, added O.C.G.A. &sect;&sect; 51-3-50 through 51-3-57.
                  The statute defines negligent security as a claim against an owner or occupier, or a
                  security contractor, that seeks damages for bodily injury or wrongful death and
                  &ldquo;arises from an alleged failure to keep the premises and approaches safe from
                  the wrongful conduct of third persons.&rdquo; O.C.G.A. &sect; 51-3-50(1).
                </p>
                <p>
                  The statute makes itself the exclusive route. It provides that its terms &ldquo;shall
                  be the sole and exclusive remedy for negligent security against owners or
                  occupiers.&rdquo; O.C.G.A. &sect; 51-3-53(a).
                </p>
                <p>
                  For an invitee, which covers a typical tenant or visitor, the plaintiff must prove
                  every one of five elements. O.C.G.A. &sect; 51-3-51. In plain English:
                </p>
              </div>

              <div className="mt-6 overflow-x-auto rounded-md border border-gold/20 bg-white">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-gold/20 bg-ivory">
                      <th scope="col" className="px-4 py-3 font-display font-semibold text-obsidian">Element</th>
                      <th scope="col" className="px-4 py-3 font-display font-semibold text-obsidian">What the plaintiff must show</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ELEMENTS.map((e) => (
                      <tr key={e.element} className="border-b border-gold/10 align-top last:border-0">
                        <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-obsidian">{e.element}</th>
                        <td className="px-4 py-3 text-slate">{e.plain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Two phrases carry most of the weight. On distance, the statute counts prior incidents
                  on adjoining property &ldquo;or otherwise occurring within 500 yards of the
                  premises,&rdquo; but only ones the owner &ldquo;had actual knowledge&rdquo; of.
                  O.C.G.A. &sect; 51-3-51(1)(B)(ii). On physical conditions, the conduct must have
                  followed from the criminal &ldquo;exploiting a specific physical condition of the
                  premises known to the owner or occupier.&rdquo; O.C.G.A. &sect; 51-3-51(3).
                </p>
                <p>
                  The statute defines a particularized warning narrowly: information the owner actually
                  knew and considered credible, specific as to who, what, where, and when. If the
                  owner made any reasonable effort to give that information to law enforcement, the
                  statute bars a claim based on it, and it says a 9-1-1 call or other report to police
                  counts as a reasonable effort. O.C.G.A. &sect;&sect; 51-3-50(3), 51-3-54(7).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: EXCLUSIONS & OTHER RULES (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Exclusions and other rules</p>
              <h2 className={H2}>When is an owner not liable under the statute?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Section 51-3-54 lists situations where no owner or occupier is liable for negligent
                  security. They include injuries to trespassers, injuries to a person not on the
                  premises, wrongful conduct that did not occur on the premises in a place the owner
                  could exclude the person from, and injuries on premises used as a single-family
                  residence. It also excludes a person who came onto the premises to commit certain
                  crimes, or was committing them at the time. O.C.G.A. &sect; 51-3-54.
                </p>
                <p>
                  One exclusion is specific to apartment operators. There is no liability for wrongful
                  conduct by a person on the premises as a tenant or a tenant&apos;s guest &ldquo;if
                  the owner or occupier had commenced eviction proceedings against such tenant at the
                  time of the wrongful conduct.&rdquo; O.C.G.A. &sect; 51-3-54(4). It turns on
                  whether proceedings had actually begun, so timing and documentation matter.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {OTHER_RULES.map((r) => (
                  <div key={r.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{r.title}</p>
                    <p className="mt-2 text-slate">{r.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The statute provides that &ldquo;No owner or occupier shall be required to exercise
                  extraordinary care&rdquo; to keep people safe from third-party wrongful conduct, and
                  that the jury weighs security measures actually in place. O.C.G.A. &sect; 51-3-55. Documented measures are
                  evidence of what you did.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: APPORTIONMENT (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Fault</p>
              <h2 className={H2}>How does Georgia apportion fault to the criminal?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The statute requires apportionment. If the jury finds a defendant liable, it must
                  &ldquo;reasonably apportion fault&rdquo; among the owner or occupier, any third
                  person whose wrongful conduct was a cause of the injury, and others. O.C.G.A.
                  &sect; 51-3-56(1).
                </p>
                <p>
                  There is a check on the result. If the jury fails to assign a reasonable degree of
                  fault to the criminal, &ldquo;the trial court shall set aside the verdict of the
                  jury and order a retrial of liability and damages.&rdquo; O.C.G.A. &sect;
                  51-3-56(3). The statute also creates a rebuttable presumption that an apportionment
                  is unreasonable when the total fault assigned to all wrongdoers is less than the
                  total assigned to owners, security contractors, and others who did not engage in
                  wrongful conduct.
                </p>
                <p>
                  Apportionment to the criminal was already part of Georgia case law before SB 68. In{" "}
                  <em>Couch v. Red Roof Inns, Inc.</em>, 291 Ga. 359 (2012), the Georgia Supreme Court
                  answered a certified question by finding &ldquo;the jury is allowed to apportion
                  damages among the property owner and the criminal assailant.&rdquo; The statute
                  now sets out apportionment for negligent security claims directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: BEFORE SB 68 (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Before SB 68</p>
              <h2 className={H2}>What was the rule before the statute?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Georgia premises liability cases grew out of O.C.G.A. &sect; 51-3-1, which makes an
                  owner liable to invitees for damage caused by a &ldquo;failure to exercise ordinary
                  care in keeping the premises and approaches safe.&rdquo; The Georgia Supreme Court
                  quoted that language in <em>Martin v. Six Flags Over Georgia II, L.P.</em>, 301 Ga.
                  323 (2017).
                </p>
                <p>
                  On prior incidents, <em>Sturbridge Partners, Ltd. v. Walker</em>, 267 Ga. 785
                  (1997), a case involving an apartment complex, held that the incident causing the
                  injury &ldquo;must be substantially similar in type&rdquo; to earlier criminal
                  activity on or near the premises. The Court added that this &ldquo;does not mean
                  identical.&rdquo;
                </p>
                <p>
                  This is background. The Act says its Sections 6 and 7, which include the negligent
                  security article, &ldquo;shall apply only with respect to causes of action arising on
                  or after the effective date of this Act, and any prior causes of action shall be
                  governed by prior law.&rdquo; SB 68 (2025), Section 9(b). We are not predicting how
                  any case comes out. Which body of law governs a particular incident is a question for
                  your attorney.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TAKEAWAYS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Operations</p>
              <h2 className={H2}>What should Georgia owners do differently?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The statute keys on what you actually knew and what you did about a specific
                  condition. That points to three habits. Know your incident history, including what
                  happens at neighboring properties that reaches you. Fix known physical conditions
                  such as locks, gates, fences, and lighting. Keep dated records that show both.
                </p>
                <p>
                  This is good operating practice, not legal defense advice. Ask your attorney what to
                  keep and for how long. The records below are the ones we see matter to underwriters
                  as well.
                </p>
              </div>
              <div className="mt-8 max-w-3xl rounded-md border border-gold/20 bg-white p-6">
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
                  Clean records also help your broker present the property to underwriters. See our{" "}
                  <Link href="/commercial-insurance-claims-strategy" className={LINK}>claims strategy</Link>{" "}
                  page for how we approach a loss.
                </p>
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
                A statute that limits liability does not change what your policy says. Assault and
                battery is frequently excluded or sublimited on apartment GL. Here is what to ask.
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
                  Take a 250-unit community with a $1M per-occurrence limit and a $100,000 assault and
                  battery sublimit that includes defense costs. Those figures are illustrative only. A
                  defense that costs $150,000 has used the whole sublimit before anyone discusses a
                  settlement, however the case ends.
                </p>
                <p>
                  Find that gap before a claim. For how these limits fit into a full program, see{" "}
                  <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily and apartment insurance</Link>.
                  Owners in neighboring states can read our{" "}
                  <Link href="/negligent-security-lawsuit-alabama-apartments" className={LINK}>Alabama guide</Link>.
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
              <h2 className={H2}>Common questions about Georgia negligent security claims</h2>
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
                  Send us your GL and umbrella policies. We will read the assault and battery
                  wording, check how defense costs are treated, and tell you what the umbrella does
                  above it.
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

        <ContactSection source="negligent security lawsuit georgia page" heading="Get a liability coverage review" />
      </main>

      <SiteFooter />
    </>
  );
}
