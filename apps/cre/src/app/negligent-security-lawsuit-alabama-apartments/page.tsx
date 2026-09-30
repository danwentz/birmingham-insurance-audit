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

const PATH = "/negligent-security-lawsuit-alabama-apartments";
const TITLE = "Negligent Security Lawsuits Against Alabama Apartment Owners";
const META_TITLE = "Negligent Security Lawsuit: Alabama Apartments | ACREInsure";
const DESCRIPTION =
  "Is an Alabama apartment owner liable for crime on the property? How the Alabama Supreme Court treats these suits, and what to check in your GL policy for assault and battery limits.";

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

const TEST = [
  {
    title: "The crime was foreseeable",
    body: "The particular criminal conduct must have been foreseeable, not crime in general.",
  },
  {
    title: "The owner had specialized knowledge",
    body: "The defendant must have possessed “specialized knowledge” of the criminal activity.",
  },
  {
    title: "The crime was a probability",
    body: "The criminal conduct must have been a probability, not just a possibility.",
  },
];

const CASES = [
  {
    name: "Dailey v. Housing Authority, 639 So. 2d 1343, 1347 (Ala. 1994)",
    facts:
      "A tenant was shot and killed on her apartment porch during a gunfight in an adjoining parking lot. The complex had 920 apartments. There had been one prior shooting on the premises, tenants had reported drug sales, and internal documents described a crime problem.",
    held:
      "The Alabama Supreme Court held that on those facts the plaintiffs had not shown the owner had a duty to protect the tenant, and affirmed judgment for the housing authority. The Court also declined to treat hiring a security guard as taking on a duty to provide a crime-free environment.",
  },
  {
    name: "Brock v. Watts Realty Co., 582 So. 2d 438, 440 (Ala. 1991)",
    facts:
      "A tenant was stabbed to death in her apartment. Her estate alleged the back-door lock was faulty, that she had submitted two service requests to have it repaired, and that the landlord never repaired the lock or acknowledged the requests. The estate pointed to two Birmingham Housing Code ordinances on maintaining door locks.",
    held:
      "The Court held those ordinances created a duty to maintain the locks in working condition, regardless of prior similar incidents in the area. It reversed summary judgment for the landlord because whether the killer actually entered through that door was a fact question for a jury. The Court added that its holding was limited to the facts of that case.",
  },
];

const POLICY_QUESTIONS = [
  {
    title: "Is assault and battery excluded, or sublimited?",
    body: "An exclusion means the GL policy does not respond to those claims at all. A sublimit means it responds, but only up to a lower cap than your per-occurrence limit. Find the exact wording in the forms, not just the declarations page.",
  },
  {
    title: "What does the exclusion actually reach?",
    body: "Ask how the policy defines assault and battery, and whether the wording ties into claims that allege negligent security, inadequate lighting, or failure to supervise. The same lawsuit can be worded several ways.",
  },
  {
    title: "Do defense costs erode the limit?",
    body: "If defense costs sit inside the limit, every dollar spent on lawyers reduces what is left to pay a settlement or judgment. If they sit outside, they do not. On a sublimit, this matters a lot.",
  },
  {
    title: "Is there a duty to defend under the sublimit?",
    body: "Ask whether the insurer defends these claims at all, or only reimburses defense costs, and whether that changes once the sublimit is used up.",
  },
  {
    title: "Does the umbrella follow form on assault and battery?",
    body: "Some umbrella and excess policies carry their own exclusion or sit over only the underlying limit. Ask whether the umbrella responds above an A&B sublimit or excludes it outright.",
  },
  {
    title: "Who else is covered?",
    body: "Check whether the property manager, the ownership entity, and any security contractor are insureds, and whether security contractors carry their own coverage and name you as an additional insured.",
  },
];

const RECORDS = [
  "Work-order and maintenance logs for door locks, gates, access controls, fences, and exterior lighting, with the date reported, the date fixed, and who fixed it.",
  "Tenant service requests, kept in a system that shows every request was acknowledged and closed.",
  "An incident log for crimes and safety complaints on the property, including police report numbers.",
  "Inspection and code-compliance records for the local housing code, plus any citations and how they were cleared.",
  "Security contracts, patrol logs, and camera or gate system maintenance records, if you use them.",
];

const FAQS = [
  {
    q: "Is a landlord liable for crime on the property in Alabama?",
    a: "Not automatically. The Alabama Supreme Court has said the general rule is that landlords and businesses are not liable for the criminal acts of third persons unless those acts were reasonably foreseeable (Brock v. Watts Realty Co., 582 So. 2d 438, 440 (Ala. 1991)). Whether a particular owner is liable depends on the facts and is a question for a lawyer.",
  },
  {
    q: "Does one prior shooting make an apartment owner liable?",
    a: "Not by itself. In Dailey v. Housing Authority, 639 So. 2d 1343, 1347 (Ala. 1994), the Court held that one prior shooting on the premises, along with tenant reports of drug sales, did not meet the plaintiff's burden of showing a duty on those facts. In Hail v. Regency Terrace Owners Ass'n, 782 So. 2d 1271, 1274 (Ala. 1999), the Court said prior criminal acts can indicate notice but do not conclusively establish it.",
  },
  {
    q: "Do apartment insurance policies cover negligent security claims?",
    a: "It depends on the policy. Assault and battery is frequently excluded or sublimited on apartment general liability policies, and the wording varies. Read the exclusion, the sublimit, the defense-cost terms, and the umbrella.",
  },
  {
    q: "How long does someone have to file a suit?",
    a: "Alabama's statute of limitations is two years for personal injury (Ala. Code § 6-2-38(l)) and two years for wrongful death (§ 6-5-410(d)). A lawyer can tell you how those apply to a specific claim.",
  },
  {
    q: "Can adding security guards increase my liability?",
    a: "In Dailey, the Court said it hesitated to penalize a landlord for providing private security by then holding the landlord responsible for any crime on the premises, and it refused to hold that hiring a guard assumed a duty to provide a crime-free environment. That was one case on its facts. Talk to your attorney about your own situation.",
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

export default function NegligentSecurityGuide() {
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
              Negligent security lawsuits against Alabama apartment owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              Alabama sets a high bar for these suits. You still pay to defend one, and your GL
              policy may not pay it for you.
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
                  In Alabama, an apartment owner is not automatically liable when a tenant is hurt by
                  a crime on the property. The Alabama Supreme Court has said the general rule is that
                  landlords are not liable for the criminal acts of third persons unless those acts
                  were reasonably foreseeable. Courts have set a high bar, but they have let some
                  cases go to a jury.
                </p>
                <p>
                  Winning on the law does not make the suit free. You defend it either way, and many
                  apartment general liability policies now exclude assault and battery or cap it at a
                  sublimit. That can leave the owner funding the defense, and any judgment, out of
                  pocket.
                </p>
                <p>
                  This guide covers what the courts have said, then what to check in your policy and
                  your records. We are brokers, so the second half is where we can help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: TEST (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Alabama law</p>
              <h2 className={H2}>What does Alabama law say about crime on apartment property?</h2>
              <LegalInfoDisclaimer asOf="September 2026" state="Alabama" />
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Start with the default rule. In <em>Moye v. A.G. Gaston Motels, Inc.</em>, the
                  Alabama Supreme Court wrote: &ldquo;It is the general rule in Alabama that absent
                  special relationships or circumstances, a person has no duty to protect another from
                  criminal acts of a third person.&rdquo; <em>Moye v. A.G. Gaston Motels, Inc.</em>,
                  499 So. 2d 1368, 1370 (Ala. 1986).
                </p>
                <p>
                  The exception is narrow. <em>Moye</em>, quoting an earlier case, described a duty
                  arising where the owner had &ldquo;actual or constructive knowledge that criminal
                  activity which could endanger an invitee was a probability.&rdquo;{" "}
                  <em>Moye</em>, 499 So. 2d at 1371.
                </p>
                <p>
                  In <em>Carroll v. Shoney&apos;s, Inc.</em>, a restaurant employee was shot by her
                  estranged husband at work. The Court affirmed summary judgment for the employer and
                  set out a three-part test:
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {TEST.map((t, i) => (
                  <div key={t.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-mono text-sm text-gold-dark">Part {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{t.title}</p>
                    <p className="mt-2 text-slate">{t.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  The Court&apos;s words: &ldquo;First, the particular criminal conduct must have been
                  foreseeable. Second, the defendant must have possessed &lsquo;specialized
                  knowledge&rsquo; of the criminal activity. Third, the criminal conduct must have
                  been a probability.&rdquo; <em>Carroll v. Shoney&apos;s, Inc.</em>, 775 So. 2d 753,
                  756 (Ala. 2000).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: DAILEY / BROCK (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Two cases</p>
              <h2 className={H2}>Is one prior incident enough to make an owner liable?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                Not in the case where the Court looked at exactly that. Two apartment cases show how
                different facts led to different results.
              </p>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {CASES.map((c) => (
                  <div key={c.name} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{c.name}</p>
                    <p className="mt-3 text-slate">
                      <strong className="font-semibold text-obsidian">Facts.</strong> {c.facts}
                    </p>
                    <p className="mt-3 text-slate">
                      <strong className="font-semibold text-obsidian">Holding.</strong> {c.held}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <em>Brock</em> restated the default: &ldquo;The general rule in Alabama is that
                  landlords and businesses are not liable for the criminal acts of third persons unless
                  such acts were reasonably foreseeable.&rdquo; <em>Brock</em>, 582 So. 2d at 440.
                </p>
                <p>
                  The difference between the two is the kind of fact involved. <em>Dailey</em> turned
                  on general reports of crime across a large complex. <em>Brock</em> involved a
                  specific defective condition in the tenant&apos;s own apartment, a repair request,
                  and a housing code. <em>Dailey</em> itself distinguished <em>Brock</em> on that
                  ground.
                </p>
                <p>
                  <em>Hail v. Regency Terrace Owners Ass&apos;n</em>, a condominium fire case,
                  addressed prior incidents directly. The Court said prior criminal incidents
                  &ldquo;can indicate&rdquo; notice, but &ldquo;proof of prior criminal acts does not
                  conclusively establish such notice.&rdquo; <em>Hail v. Regency Terrace Owners
                  Ass&apos;n</em>, 782 So. 2d 1271, 1274 (Ala. 1999).
                </p>
                <p>
                  We are not predicting how any case comes out. The point for an owner is narrower.
                  Facts about a specific known problem at your property, and what you did about it,
                  are the kind of facts these cases discuss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL: OTHER RULES (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Other rules</p>
              <h2 className={H2}>What else shapes these claims in Alabama?</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Wrongful death damages.</strong>{" "}
                  In a wrongful death action, the Alabama Supreme Court has said &ldquo;the damages
                  recoverable in a wrongful death action are punitive in nature.&rdquo;{" "}
                  <em>Tatum v. Schering Corp.</em>, 523 So. 2d 1042, 1045 (Ala. 1988). That is a point
                  to raise with your attorney and your insurer, because how a policy treats punitive
                  damages varies.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Contributory negligence.</strong>{" "}
                  Alabama has not adopted comparative negligence. In <em>Golden v. McCurry</em>, the
                  Court held that any change to the contributory negligence rule should be left to the
                  legislature. <em>Golden v. McCurry</em>, 392 So. 2d 815, 817 (Ala. 1980). In{" "}
                  <em>Rowden v. Tomlinson</em>, the Court explained that contributory negligence is
                  &ldquo;a complete defense to an action based on negligence,&rdquo; though it is
                  &ldquo;not a defense to a claim based on wanton misconduct.&rdquo;{" "}
                  <em>Rowden v. Tomlinson</em>, 538 So. 2d 15, 18 (Ala. 1988).
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Filing deadline.</strong>{" "}
                  The statute of limitations is two years for personal injury (Ala. Code &sect;
                  6-2-38(l)) and two years for wrongful death (Ala. Code &sect; 6-5-410(d)).
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
                Most standard carriers have exited multifamily general liability, and assault and
                battery is frequently excluded or sublimited on what remains. Here is what to ask
                about yours.
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
                  Take a 250-unit community with a $1M per-occurrence GL limit and a $100,000
                  assault and battery sublimit that includes defense costs. Those figures are
                  illustrative only. A suit that costs $150,000 to defend has spent the whole sublimit
                  before anyone talks about a settlement.
                </p>
                <p>
                  That is the gap to find before a claim, not after. For how these limits fit into a
                  full apartment program, see{" "}
                  <Link href="/multifamily-apartment-insurance" className={LINK}>multifamily and apartment insurance</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RECORDS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Records</p>
              <h2 className={H2}>Which operating records matter?</h2>
              <p className="mt-3 max-w-2xl text-slate">
                This is good operating practice, not legal defense advice. Ask your attorney what to
                keep and for how long.
              </p>
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
                  The reason is the contrast between the two cases above. A repair request with no
                  record of action is the kind of fact <em>Brock</em> involved. Clean, dated records
                  show what you knew and when you fixed it. They also help your broker present the
                  property to underwriters, and they help on renewal.
                </p>
                <p>
                  Lenders and umbrella carriers ask about liability limits too. See{" "}
                  <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements</Link>{" "}
                  and{" "}
                  <Link href="/commercial-insurance-claims-strategy" className={LINK}>claims strategy</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
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

        {/* WORKING WITH US (ivory) */}
        <section className="px-5 py-16">
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

        <ContactSection source="negligent security lawsuit page" heading="Get a liability coverage review" />
      </main>

      <SiteFooter />
    </>
  );
}
