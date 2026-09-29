import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const TITLE = "Certificates of Insurance for Commercial Real Estate Owners";
const META_TITLE = "Certificate of Insurance (COI) Guide for Owners | ACREInsure";
const DESCRIPTION =
  "What a certificate of insurance does, certificate holder vs. additional insured, and what to check on a contractor's COI before work starts.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/certificate-of-insurance" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/certificate-of-insurance`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const DOES = [
  {
    title: "It is a snapshot",
    body: "A COI summarizes the policies in force on the date it was issued: carrier, policy number, dates, and limits. It says nothing about tomorrow. If the policy cancels next week, the certificate in your file still looks fine.",
  },
  {
    title: "It is informational only",
    body: "The certificate carries a disclaimer to that effect, and courts generally treat it that way. It doesn't amend, extend, or alter the policy, and it doesn't give the holder rights the policy itself doesn't give.",
  },
  {
    title: "It doesn't add anyone to the policy",
    body: "Being listed as certificate holder means you get the paper. It does not mean you're covered. Coverage for you as an additional insured comes from an endorsement on the policy, not from the certificate.",
  },
];

const HOLDER_VS_AI = [
  {
    term: "Certificate holder",
    what: "The person the certificate is issued to. It proves the insured has coverage. It gives the holder no coverage and, unless the policy says so, no right to notice of cancellation.",
  },
  {
    term: "Additional insured",
    what: "A party added to the insured's liability policy by endorsement. The policy responds to claims against them, arising out of the insured's work, subject to the endorsement's wording.",
  },
];

const ENDORSEMENTS = [
  {
    form: "ISO CG 20 10",
    what: "Additional insured, ongoing operations. Covers you while the contractor is still working.",
  },
  {
    form: "ISO CG 20 37",
    what: "Additional insured, completed operations. Covers you after the work is done, when many construction claims show up.",
  },
  {
    form: "ISO CG 20 26",
    what: "Additional insured, designated person or organization. A general-purpose form some policies use in place of CG 20 10. It doesn't pick up completed operations on its own, so check it against what your contract calls for.",
  },
];

const ACORD = [
  {
    form: "ACORD 25",
    what: "Certificate of liability insurance. This is the one contractors, vendors, and tenants hand you. It lists general liability, auto, umbrella or excess, and workers' compensation.",
  },
  {
    form: "ACORD 24 and ACORD 28",
    what: "Certificate of property insurance and evidence of commercial property insurance. This is what lenders want from you as the owner, showing your building coverage with the lender named as mortgagee and loss payee.",
  },
];

const USES = [
  {
    title: "You collect them from contractors and vendors",
    body: "Anyone working on your property hands you a certificate showing their coverage, so their losses hit their policies first.",
  },
  {
    title: "You collect them from tenants",
    body: "Leases usually require tenants to carry liability, and often property coverage on their contents and improvements. The COI is how you check.",
  },
  {
    title: "Lenders and property managers ask you for them",
    body: "Your loan documents will require evidence of insurance, and a management company may require certificates from the owner and from every vendor it hires on your behalf.",
  },
  {
    title: "You give them to lenders",
    body: "Lenders want evidence of property insurance (ACORD 28 or equivalent) and liability certificates at closing and at every renewal.",
  },
];

const GETTING = [
  {
    title: "Ask your agent or broker",
    body: "Your agent issues certificates on your policies, and a contractor's agent issues theirs. Most requests are routine and handled by the agency's service team.",
  },
  {
    title: "Give them the holder's exact name and address",
    body: "The legal name of the entity, spelled the way it appears in the contract or loan documents, plus the mailing address. A wrong entity name is the most common reason a certificate gets rejected.",
  },
  {
    title: "Send the contract's insurance requirements",
    body: "Send the insurance section itself, not a summary: additional insured status, waiver of subrogation, primary and noncontributory wording, and the required limits. The agent can only match what they can see.",
  },
  {
    title: "Ask for the endorsements, not just the certificate",
    body: "The certificate is a summary. The endorsement is the proof. Ask for a copy of the additional insured endorsement, and the waiver of subrogation and primary and noncontributory endorsements if your contract requires them.",
  },
  {
    title: "Plan for turnaround",
    body: "A routine certificate often comes back within a business day or two, and many brokers (us included) give clients an online portal to issue standard certificates themselves, immediately. Custom wording, new endorsements, and anything that has to go to the carrier take longer. Don't ask the day work starts.",
  },
];

const WHO = [
  "General contractors and subcontractors",
  "Roofers, electricians, plumbers, and HVAC contractors",
  "Elevator and fire-protection service companies",
  "Landscaping and snow removal vendors",
  "Janitorial and cleaning companies",
  "Security companies",
  "Tenant-hired contractors doing buildouts",
];

const WHAT_TO_REQUIRE = [
  {
    title: "General liability with additional insured status",
    body: "Ongoing and completed operations both. Limits are commonly set per occurrence and in the aggregate, sized to the work. Match them to your contract and your lender's requirements.",
  },
  {
    title: "Commercial auto",
    body: "For any vendor driving to and around your property. Vehicles are a real source of parking lot and driveway claims.",
  },
  {
    title: "Workers' compensation",
    body: "So an injured worker goes to the contractor's policy, not to a claim against you. Check that it covers the state where the work is done.",
  },
  {
    title: "Umbrella or excess liability",
    body: "Commonly required on larger jobs, and it should follow the underlying additional insured terms. Ask your agent to confirm it does.",
  },
  {
    title: "Waiver of subrogation",
    body: "So the contractor's carrier can't pay a claim and then sue you to get its money back.",
  },
  {
    title: "Primary and noncontributory",
    body: "So the contractor's policy pays first and your own policy isn't asked to share the loss.",
  },
];

const CHECKLIST = [
  "The insured named on the certificate is the exact entity you signed the contract with, not a related company or a trade name.",
  "Your entity is named correctly as certificate holder, and again as additional insured if the contract requires it.",
  "The certificate says additional insured status applies, and you have the endorsement itself with form numbers that include completed operations.",
  "Every policy period covers the full length of the work, and the expiration dates are noted for follow-up.",
  "General liability, auto, workers' compensation, and umbrella limits meet the contract.",
  "Waiver of subrogation and primary and noncontributory wording are shown, and the endorsements back them up.",
  "The description of operations references the project or location.",
  "The carriers are admitted or rated at least what your contract or lender requires.",
  "Watch the exclusions and limits. Ask about anything that removes coverage for the work being done, such as residential, height, or subcontractor exclusions.",
  "Subcontractors are covered too: either their own certificates, or the contractor's contract flows the requirements down.",
  "The certificate is signed, dated, and issued by the agent or broker, not by the contractor.",
];

const FAQS = [
  {
    q: "Does a certificate of insurance mean I'm covered?",
    a: "No. A COI shows that the insured had coverage on the date it was issued. It doesn't add you to the policy or change it. If you need coverage under the contractor's policy, you need an additional insured endorsement.",
  },
  {
    q: "What's the difference between certificate holder and additional insured?",
    a: "The certificate holder receives the certificate as proof of coverage and has no coverage rights because of it. An additional insured is added to the policy by endorsement and is covered under it, within the terms of that endorsement. You want to be both.",
  },
  {
    q: "What should a contractor's COI include?",
    a: "The named insured should match the name on your contract, and the general liability, auto, workers' comp, and umbrella limits should meet what the contract requires. You should be named as additional insured, with the endorsement attached and covering completed operations, along with a waiver of subrogation and primary and noncontributory wording. Check that the policy dates are current.",
  },
  {
    q: "How long does it take to get a COI?",
    a: "Routine certificates often come back in a day or two, or immediately if your broker gives you a self-service portal. Anything needing a new endorsement, custom wording, or carrier approval takes longer. Send the request early, with the exact holder name and the contract's insurance section.",
  },
  {
    q: "Which additional insured endorsement should I ask for?",
    a: "Ask for ongoing and completed operations coverage. On ISO forms that is commonly CG 20 10 together with CG 20 37, or a form your contract identifies. Carriers use different forms, so give your agent the contract language and ask them to confirm the policy matches.",
  },
  {
    q: "What if a contractor's policy expires in the middle of the job?",
    a: "The certificate you have won't warn you. Track expiration dates, request a renewal certificate before the policy ends, and make it a condition of payment in the contract. If they don't renew, stop work until they do.",
  },
  {
    q: "Is a COI a legal requirement?",
    a: "Not by itself. It's a contract and lender requirement. Your lease, construction contract, or loan documents say what evidence you need. Talk to your attorney about how the wording in your contracts applies to you.",
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
      mainEntityOfPage: `${DOMAIN}/certificate-of-insurance`,
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

export default function CertificateOfInsurance() {
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
              Certificates of insurance for commercial real estate owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What a COI does and doesn&apos;t do, how to get one, and what to check when a
              contractor hands you theirs.
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
                  A certificate of insurance is a one-page summary of someone&apos;s coverage. Owners
                  collect them by the dozen. Most of them get filed and never read.
                </p>
                <p>
                  That&apos;s where the trouble starts. A roofer&apos;s crew injures a tenant&apos;s
                  customer on a walkway. The roofer handed over a certificate before the job, so
                  everyone assumed the owner was protected. But nobody asked for an additional
                  insured endorsement, and the policy doesn&apos;t name the owner. The claim comes to
                  the owner&apos;s general liability policy instead, shows up in the owner&apos;s loss
                  history, and gets priced into the next renewal.
                </p>
                <p>
                  The certificate isn&apos;t the protection. The endorsements behind it are.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT IS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>The basics</p>
              <h2 className={H2}>What a COI does, and what it doesn&apos;t</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {DOES.map((d) => (
                  <div key={d.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{d.title}</p>
                    <p className="mt-2 text-slate">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOLDER VS AI (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Two different things</p>
              <h2 className={H2}>Certificate holder vs. additional insured</h2>
              <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
                {HOLDER_VS_AI.map((h) => (
                  <div key={h.term} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <p className="font-mono text-sm font-medium text-gold-dark">{h.term}</p>
                    <p className="text-slate">{h.what}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Additional insured status has to be on the policy. It comes from an endorsement.
                  These ISO forms are the ones you&apos;ll see most on general liability policies:
                </p>
              </div>
              <div className="mt-6 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
                {ENDORSEMENTS.map((e) => (
                  <div key={e.form} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <p className="font-mono text-sm font-medium text-gold-dark">{e.form}</p>
                    <p className="text-slate">{e.what}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-slate">
                Not every carrier uses ISO forms, and edition dates change the wording. Read the
                endorsement on the policy, not just its title.
              </p>

              <h3 className="mt-12 font-display text-xl font-semibold text-obsidian">Which form is which</h3>
              <div className="mt-4 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
                {ACORD.map((a) => (
                  <div key={a.form} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <p className="font-mono text-sm font-medium text-gold-dark">{a.form}</p>
                    <p className="text-slate">{a.what}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* USES (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>How they&apos;re used</p>
              <h2 className={H2}>Certificates go both directions</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {USES.map((u) => (
                  <div key={u.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{u.title}</p>
                    <p className="mt-2 text-slate">{u.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-slate">
                For what lenders ask of you, see our{" "}
                <Link href="/lender-insurance-requirements" className={LINK}>lender insurance requirements guide</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* GETTING ONE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Getting one</p>
              <h2 className={H2}>How to get a certificate</h2>
              <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
                {GETTING.map((g) => (
                  <div key={g.title} className="grid gap-2 p-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{g.title}</p>
                    <p className="text-slate">{g.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTRACTORS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className={EYEBROW}>Contractors and vendors</p>
              <h2 className={H2}>When to require one</h2>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Any time someone other than your own employees works on your property. Get the
                  certificate before work starts, and put the insurance requirements in the
                  contract so the certificate is the proof of something you already required.
                </p>
              </div>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {WHO.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-slate">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 font-display text-xl font-semibold text-obsidian">What to require</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {WHAT_TO_REQUIRE.map((w) => (
                  <div key={w.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{w.title}</p>
                    <p className="mt-2 text-slate">{w.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-slate">
                Limits vary with the size and hazard of the work. Set them in the contract, check
                them against your lender&apos;s requirements, and have your attorney review the
                wording.
              </p>

              <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Track expirations.</strong> A
                  certificate is good on the day it&apos;s issued. Put every policy expiration date in
                  a spreadsheet or tracking system, and ask for a renewal certificate before the
                  policy ends.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">The cost of skipping it.</strong>{" "}
                  When a contractor has no coverage, or coverage that doesn&apos;t name you, the
                  injured party looks for the next pocket. That&apos;s you. The loss lands on your
                  policy, counts against your loss history, and raises questions at renewal. See{" "}
                  <Link href="/real-estate-risk-management" className={LINK}>real estate risk management</Link>{" "}
                  and{" "}
                  <Link href="/builders-risk-ocip" className={LINK}>builders risk and OCIP</Link>{" "}
                  for larger projects.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Tenant buildouts count.</strong>{" "}
                  When a tenant hires a contractor to build out a suite, that contractor is working
                  on your building. Your lease should require the tenant to deliver the contractor&apos;s
                  certificates and endorsements before work starts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHECKLIST (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>Checklist</p>
              <h2 className={H2}>How to review a contractor&apos;s certificate of insurance (COI)</h2>
              <ul className="mt-8 space-y-3">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-slate">
                If any of these fail, send the certificate back. Don&apos;t let the crew start work
                while it gets sorted out. See also our{" "}
                <Link href="/insurance-document-checklist" className={LINK}>insurance document checklist</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className={EYEBROW}>FAQ</p>
              <h2 className={H2}>Common questions about certificates of insurance</h2>
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
              <h2 className={H2}>Send us the contract</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  We&apos;ll read the insurance section of your vendor contract, lease, or loan and
                  tell you what to require and whether your own policies respond. If you need
                  certificates issued on your program, we handle those too, and our clients can
                  issue standard certificates themselves, any time, through an online portal.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your insurance requirements <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="certificate of insurance page" heading="Get your contractor requirements checked" />
      </main>

      <SiteFooter />
    </>
  );
}
