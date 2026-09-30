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

const PATH = "/negligent-security-lawsuit-florida-apartments";
const TITLE = "Negligent Security Lawsuits Against Florida Apartment Owners";
const META_TITLE = "Florida Negligent Security Law: Apartments | ACREInsure";
const DESCRIPTION =
  "Florida's § 768.0706 gives multifamily owners a presumption against liability for third-party crime if they substantially implement a statutory security checklist. The measures, the records to keep, and the GL policy questions that sit beside them.";

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

const CHECKLIST = [
  {
    measure: "Security cameras",
    statute:
      "A camera system at points of entry and exit that records, and keeps retrievable for at least 30 days, video footage to assist in offender identification and apprehension.",
    records:
      "Camera map showing entry and exit coverage, retention settings, dated test pulls of older footage, and repair tickets for any outage.",
  },
  {
    measure: "Parking lot lighting",
    statute:
      "A lighted parking lot at an average of at least 1.8 foot-candles per square foot at 18 inches above the surface, from dusk until dawn, or controlled by photocell or a similar device that provides light from dusk until dawn.",
    records:
      "Light-level readings or a lighting survey, photocell or timer settings, and a log of outages with the date reported and the date fixed.",
  },
  {
    measure: "Walkway, laundry room, common area, and porch lighting",
    statute:
      "Lighting in those areas, on from dusk until dawn or controlled by photocell or a similar device that provides light from dusk until dawn.",
    records:
      "Nightly or weekly walk-through checklists, bulb and fixture work orders, and photocell or timer settings.",
  },
  {
    measure: "Unit door deadbolts",
    statute: "At least a 1-inch deadbolt in each dwelling unit door.",
    records:
      "Unit-by-unit inspection sheet noting the deadbolt on each door, plus work orders for replacements and turnovers.",
  },
  {
    measure: "Window, sliding door, and other door locks",
    statute:
      "A locking device on each window, each exterior sliding door, and any other doors not used for community purposes.",
    records:
      "Inspection sheet by unit and by opening, with lock repair requests and the dates they were closed.",
  },
  {
    measure: "Pool gates",
    statute: "Locked gates with key or fob access along pool fence areas.",
    records:
      "Gate latch and lock checks, fob or key access lists, and repair tickets for gates found open or broken.",
  },
  {
    measure: "Door viewers",
    statute:
      "A peephole or door viewer on each dwelling unit door that does not include a window or that does not have a window next to the door.",
    records:
      "Unit inspection sheet that records which doors need a viewer and which have one, with install dates.",
  },
  {
    measure: "CPTED assessment",
    statute:
      "By January 1, 2025, a crime prevention through environmental design assessment no more than 3 years old, performed by a law enforcement agency or a Florida CPTED Practitioner designated by the Florida Crime Prevention Training Institute of the Department of Legal Affairs. The owner or operator must remain in substantial compliance with it.",
    records:
      "The assessment report with its date and the assessor's credentials, a punch list of its recommendations, and proof of each item completed.",
  },
  {
    measure: "Employee safety training",
    statute:
      "By January 1, 2025, training for current employees, and after that within 60 days of hire. It must familiarize employees with the measures in paragraph (a) and be reviewed at least every 3 years and updated as necessary.",
    records:
      "Training curriculum with revision dates, sign-in sheets by employee, hire dates to show the 60-day timing, and the date of each 3-year review.",
  },
];

const POLICY_QUESTIONS = [
  {
    title: "Is assault and battery excluded, or sublimited?",
    body: "An exclusion means the GL policy does not respond to those claims. A sublimit means it responds up to a cap below your per-occurrence limit. Read the form wording, not only the declarations page.",
  },
  {
    title: "Do defense costs erode the limit?",
    body: "If defense costs sit inside the limit, legal fees reduce what is left for a settlement or judgment. Inside a sublimit, that can use up the cap quickly.",
  },
  {
    title: "Does the wording reach negligent security pleadings?",
    body: "The same suit can be pleaded as negligent security, inadequate lighting, or failure to maintain locks. Ask whether the exclusion applies to each version.",
  },
  {
    title: "Is there a duty to defend under the sublimit?",
    body: "Ask whether the insurer defends these claims or only reimburses defense costs, and whether that changes once the sublimit is spent.",
  },
  {
    title: "Does the umbrella follow form on A&B?",
    body: "Some umbrella and excess policies carry their own exclusion or sit only over the underlying sublimit. Confirm what responds above it.",
  },
  {
    title: "Who else is an insured?",
    body: "Check the property manager, the ownership entity, and any security contractor. Ask whether contractors carry their own limits and name you as an additional insured.",
  },
];

const FAQS = [
  {
    q: "Is a Florida apartment owner liable for crime on the property?",
    a: "Sometimes. Florida courts have allowed juries to decide whether a landlord's duty to keep common areas reasonably safe required security measures, given the crime history at the property. Since 2023, § 768.0706 also gives owners of multifamily property a presumption against liability if they substantially implement a statutory checklist. A Florida attorney can tell you how this applies to a specific claim.",
  },
  {
    q: "What is the Florida presumption against liability for apartment crime?",
    a: "Section 768.0706, Fla. Stat., says an owner or principal operator of multifamily residential property that substantially implements the listed security measures has a presumption against liability for criminal acts on the premises committed by third parties who are not its employees or agents. The owner has the burden of proving it substantially implemented them.",
  },
  {
    q: "What counts as multifamily residential property under the statute?",
    a: "The statute defines it as a residential building, or group of buildings, such as apartments, townhouses, or condominiums, with at least five dwelling units on a particular parcel.",
  },
  {
    q: "Does § 768.0706 create a right to sue an owner who misses a measure?",
    a: "The statute says: “This section does not establish a private cause of action.” What a missed measure means in a specific lawsuit is a question for counsel.",
  },
  {
    q: "How long does someone have to file a negligence suit in Florida?",
    a: "Section 95.11(5)(a) provides that an action founded on negligence must be brought within two years. Chapter 2023-15 reduced that from four years for causes of action accruing after March 24, 2023. Ask a lawyer how the deadline applies to a specific claim.",
  },
  {
    q: "Does the presumption mean our GL policy will pay a claim?",
    a: "No. The presumption is a rule about liability. Your policy is a separate contract, and assault and battery is frequently excluded or sublimited on apartment GL policies. You can have a strong compliance file and still be paying defense costs out of pocket.",
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

export default function NegligentSecurityFloridaGuide() {
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
              Negligent security lawsuits against Florida apartment owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Florida gives multifamily owners a presumption against liability if they can prove a
              checklist was in place. Your GL policy still decides who pays the defense.
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
                  In 2023, Florida added a statute for multifamily owners, Fla. Stat. &sect; 768.0706.
                  An owner or principal operator that substantially implements a listed set of
                  security measures has a presumption against liability for crimes on the premises
                  committed by third parties. The owner carries the burden of showing it did.
                </p>
                <p>
                  That makes compliance an operations and documentation job. A camera that records
                  for 12 days is not a camera that keeps footage for 30, and a lighting fix nobody
                  logged is hard to prove later.
                </p>
                <p>
                  It also sits beside the insurance question rather than replacing it. A suit can
                  still be filed, and many apartment GL policies exclude or sublimit assault and
                  battery. We are brokers, so this guide covers the checklist, the records, and the
                  policy terms to check. The legal parts are general information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: STATUTE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Florida law</p>
              <h2 className={H2}>What does Florida&apos;s presumption against liability say?</h2>
              <LegalInfoDisclaimer asOf="September 2026" state="Florida" />
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Florida Statutes &sect; 768.0706, titled &ldquo;Multifamily residential property
                  safety and security; presumption against liability,&rdquo; came from section 8 of
                  chapter 2023-15 (CS/CS/HB 837), which the Governor approved on March 24, 2023. It
                  covers a residential building, or group of buildings, with &ldquo;at least five
                  dwelling units on a particular parcel.&rdquo;
                </p>
                <p>
                  An owner or principal operator that &ldquo;substantially implements the following
                  security measures&rdquo; has &ldquo;a presumption against liability in connection
                  with criminal acts that occur on the premises which are committed by third parties
                  who are not employees or agents of the owner or operator.&rdquo; The measures are
                  in the table below.
                </p>
                <p>
                  On proof, subsection (3) is direct: &ldquo;the burden of proof is on the owner or
                  principal operator to demonstrate&rdquo; that it substantially implemented the
                  measures. Subsection (5) adds: &ldquo;This section does not establish a private
                  cause of action.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHECKLIST TABLE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>Checklist</p>
            <h2 className={H2}>What does the statute require, and what should you keep on file?</h2>
            <p className="mt-3 max-w-3xl text-slate">
              The statute lists these measures and requires them to be &ldquo;substantially&rdquo;
              implemented. The middle column paraphrases the statute. The right column is our
              suggestion for proof, not a legal requirement. Because the owner bears the burden,
              the records are the evidence.
            </p>
            <div className="mt-8 overflow-x-auto rounded-md border border-gold/20 bg-ivory">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gold/20 bg-white text-obsidian">
                    <th scope="col" className="w-1/5 px-4 py-3 font-display font-semibold">Measure</th>
                    <th scope="col" className="w-2/5 px-4 py-3 font-display font-semibold">What the statute says</th>
                    <th scope="col" className="w-2/5 px-4 py-3 font-display font-semibold">Records to keep</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKLIST.map((row) => (
                    <tr key={row.measure} className="border-b border-gold/10 align-top last:border-b-0">
                      <th scope="row" className="px-4 py-4 font-semibold text-obsidian">{row.measure}</th>
                      <td className="px-4 py-4 text-slate">{row.statute}</td>
                      <td className="px-4 py-4 text-slate">{row.records}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                The training rule has a source of help built in. The statute says the owner may
                request a law enforcement agency, or the CPTED practitioner who performed the
                assessment, to review the training curriculum. The statute also has the Florida
                Crime Prevention Training Institute develop a proposed curriculum or best practices.
              </p>
            </div>
          </div>
        </section>

        {/* LEGAL: WHY DOCUMENTATION (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Documentation</p>
              <h2 className={H2}>Why does documentation matter so much under this statute?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Because the owner has to demonstrate substantial implementation, a measure you
                  cannot show is a measure you may not get credit for. The question is not whether
                  the cameras worked on a good day. It is whether you can show they recorded and
                  kept footage for the required period around the date of the incident.
                </p>
                <p>
                  Here is a hypothetical, for illustration only. A 200-unit community has cameras at
                  its gates, but the recorder overwrites footage after 14 days. Nobody changes the
                  setting because nobody has read it in two years. The statute describes footage
                  &ldquo;retrievable for at least 30 days.&rdquo; A setting check and a dated test
                  pull would have caught the gap. We are not saying how a court would treat any
                  particular set of facts.
                </p>
                <p>
                  The CPTED assessment adds a second job. The owner must remain in substantial
                  compliance with the assessment, so its recommendations become a punch list with
                  dates attached. An assessment sitting in a drawer with no follow-through is worse
                  than it looks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: OTHER RULES (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Other rules</p>
              <h2 className={H2}>What else changed in 2023, and what did courts say before?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Fault of others.</strong>{" "}
                  Section 768.0701 applies when a person lawfully on commercial or real property is
                  injured by a third party&apos;s criminal act and sues the owner, lessor, operator,
                  or manager. In that case, &ldquo;the trier of fact must consider the fault of all
                  persons who contributed to the injury.&rdquo; Fla. Stat. &sect; 768.0701.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Plaintiff&apos;s own fault.</strong>{" "}
                  Section 768.81(6) says that in negligence actions, &ldquo;any party found to be
                  greater than 50 percent at fault for his or her own harm may not recover any
                  damages,&rdquo; with an exception for medical negligence. Whether and how that
                  applies to a negligent security claim is a question to confirm with counsel.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Filing deadline.</strong>{" "}
                  &ldquo;An action founded on negligence&rdquo; must be brought within two years
                  under &sect; 95.11(5)(a). Chapter 2023-15 reduced that from four years for causes
                  of action accruing after March 24, 2023.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Before 2023.</strong> Florida
                  courts had treated these cases as fact-driven. In{" "}
                  <em>Holley v. Mt. Zion Terrace Apartments, Inc.</em>, 382 So. 2d 98, 99 (Fla. 3d
                  DCA 1980), the court wrote that, &ldquo;in view of the evidence concerning the past
                  record, and therefore the future foreseeability of violent crime at its
                  premises,&rdquo; a jury could properly find the landlord&apos;s duty required a
                  guard or other security measures. In{" "}
                  <em>Sanders v. ERP Operating Ltd. Partnership</em>, 157 So. 3d 273 (Fla. 2015), the
                  Florida Supreme Court said foreseeability of danger to residents from
                  criminals on the premises &ldquo;was an issue of fact for the jury to decide.&rdquo;
                </p>
                <p>
                  Chapter 2023-15 generally applies to causes of action filed after its effective
                  date. Ask your attorney how the pre-2023 cases and the new statute fit together for
                  your property.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POLICY (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Your policy</p>
              <h2 className={H2}>If we meet the checklist, does our GL policy still matter?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Yes. The presumption speaks to liability. It does not say who pays the lawyers.
                Assault and battery is frequently excluded or sublimited on what remains of the
                habitational GL market. Here is what to ask about yours.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {POLICY_QUESTIONS.map((q, i) => (
                  <div key={q.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-mono text-sm text-gold-dark">Question {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{q.title}</p>
                    <p className="mt-2 text-slate">{q.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Take a 250-unit community with a $100,000 assault and battery sublimit that
                  includes defense costs. Those figures are illustrative only. A suit that costs
                  $150,000 to defend has spent the whole sublimit before anyone discusses a
                  settlement, whether or not the owner ends up with a presumption on its side.
                </p>
                <p>
                  Compliance also helps the insurance conversation. Underwriters ask about lighting,
                  access control, and cameras, and a clean file answers those questions. For the wider
                  picture, see{" "}
                  <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily and apartment insurance</Link>,
                  the{" "}
                  <Link href="/negligent-security-lawsuit-apartments" className={LINK}>national negligent security guide</Link>,
                  and, for a state with a different legal test, our{" "}
                  <Link href="/negligent-security-lawsuit-alabama-apartments" className={LINK}>Alabama guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RECORDS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Operating habits</p>
              <h2 className={H2}>How do we keep this file current?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                This is operating practice, not legal advice. Ask your attorney what to keep and for
                how long.
              </p>
              <div className="mt-8 max-w-3xl rounded-md border border-gold/20 bg-ivory p-6">
                <ul className="space-y-3">
                  {[
                    "One owner for the compliance file at each property, with a named backup.",
                    "A recurring inspection of every measure in the table, dated and signed, with failures turned into work orders.",
                    "Camera retention settings and lighting readings checked on a schedule, not just after an incident.",
                    "Training records for every employee, tied to hire date and revision date.",
                    "The CPTED assessment and its follow-up list kept together, updated as items close.",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-3 text-slate">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The same records help after a loss. See{" "}
                  <Link href="/commercial-insurance-claims-strategy" className={LINK}>claims strategy</Link>{" "}
                  for how we approach reporting and documentation.
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
              <h2 className={H2}>Common questions about Florida negligent security claims</h2>
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
                  If there is a gap, we will take the account to the habitational markets that still
                  write apartments and price a better structure. We do not promise an outcome.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your policies for an assault and battery review <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="negligent security lawsuit page" heading="Get a liability coverage review" />
      </main>

      <SiteFooter />
    </>
  );
}
