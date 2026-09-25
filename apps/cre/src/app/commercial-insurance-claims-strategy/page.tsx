import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { DOMAIN } from "@/lib/site";

const TITLE = "Commercial Insurance Claims Strategy for Property Owners";
const DESCRIPTION =
  "When to report, which claims to file, whether you can start repairs before the adjuster arrives, and how open claims, frequency, and severity change what you pay at renewal.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ACREInsure` },
  description: DESCRIPTION,
  alternates: { canonical: "/commercial-insurance-claims-strategy" },
  openGraph: {
    title: `${TITLE} | ACREInsure`,
    description: DESCRIPTION,
    url: `${DOMAIN}/commercial-insurance-claims-strategy`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ACREInsure`,
    description: DESCRIPTION,
  },
};

const NOTIFY = [
  {
    when: "Anyone hurt",
    what: "Call us, and report to the carrier immediately. Don't wait on one to do the other, and don't wait because nobody has said the word lawyer. Get the incident report, names, photos, and any video before it's overwritten.",
  },
  {
    when: "Large property loss",
    what: "Call your broker the same day, then report to the carrier. Fire, major storm damage, anything that shuts down units or rooms.",
  },
  {
    when: "Small property loss",
    what: "Call your broker before you file. Talk through whether it belongs on your insurance or in your maintenance budget.",
  },
  {
    when: "Damage that can grow",
    what: "Report early. A small leak that turns into mold six months later is a much harder claim if the carrier first hears about it then.",
  },
  {
    when: "A demand letter or lawsuit",
    what: "Send it to us and to your carrier the day it arrives. Deadlines to respond to a lawsuit are short, and your carrier needs time to assign defense counsel.",
  },
];

const REPAIRS_DO = [
  "Stop the damage from getting worse: tarp the roof, shut off the water, extract standing water, board up openings",
  "Photograph and video everything before you touch it, then again as work progresses",
  "Keep samples of damaged materials, like a section of roofing, flooring, or drywall",
  "Keep every receipt and invoice for emergency work",
];

const REPAIRS_DONT = [
  "Start permanent repairs before the adjuster has seen the damage or agreed in writing",
  "Throw away damaged materials the adjuster hasn't inspected",
  "Sign a restoration contract that takes over your claim (an assignment of benefits) without reading it first",
];

const AFTER = [
  {
    title: "Get the claim number, the adjuster, and the reserve",
    body: "Ask your adjuster what reserve they've set. That number shows up on your loss runs long before the claim closes, so you want to know it and push back if it's out of line with the actual damage.",
  },
  {
    title: "Build the claim file",
    body: "Photos, estimates, invoices, and every email with the carrier, in one place, in date order. Our document checklist shows how to set it up.",
    link: { href: "/insurance-document-checklist", label: "Document checklist" },
  },
  {
    title: "Find out whether someone else should pay",
    body: "If a contractor, vendor, or tenant caused the loss, your carrier can go after their insurer. That's subrogation. Money recovered comes off your claim, and a smaller claim is a better renewal.",
  },
  {
    title: "Fix the cause, and prove it",
    body: "A burst pipe claim followed by a new freeze protection program is a story underwriters like. Keep the invoices and dates. You'll need them at renewal.",
  },
  {
    title: "Write the one-paragraph explanation now",
    body: "What happened, what it cost, what you changed. Write it while the facts are fresh, and send it to your broker. It goes into every renewal submission for the next five years.",
  },
  {
    title: "Push the claim to close",
    body: "Respond to adjuster requests quickly. Submit final invoices. Ask for the file to be closed once payment is made. An open claim costs you at renewal even after the work is done.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Dan Wentz", url: `${DOMAIN}/about` },
  publisher: { "@type": "Organization", name: "ACREInsure", url: DOMAIN },
  mainEntityOfPage: `${DOMAIN}/commercial-insurance-claims-strategy`,
};

export default function ClaimsStrategy() {
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
              Claims strategy for commercial property owners
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              How you handle a claim this year decides what you pay for the next five. Here&apos;s
              how to handle it well.
            </p>
          </div>
        </section>

        {/* WHY CLAIMS SET PRICE (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Why your claims set your price
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Every renewal starts with your loss runs: five years of claims, from every carrier.
                The underwriter compares what you&apos;ve paid in premium to what the carriers have
                paid in claims. That&apos;s your loss ratio.
              </p>
              <p>
                Say you&apos;ve paid $200,000 a year for five years. That&apos;s $1 million in
                premium. If your claims over those five years add up to $300,000, your loss ratio
                is 30%. You&apos;re a good account, and carriers will compete for you.
              </p>
              <p>
                If those claims add up to $700,000, your loss ratio is 70%. Now the conversation is
                about how much your rate goes up, not how much it comes down.
              </p>
              <p>
                A claim stays on your loss runs for five years. So a claim isn&apos;t a one-time
                event. It&apos;s a line item in the next five renewals.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENCY VS SEVERITY (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Frequency vs. size</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Six small claims can hurt more than one big one
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Underwriters look at two things: how often you have claims (frequency) and how big
              they are (severity). Take two owners with the same $90,000 in losses.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Owner A</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">1 claim</p>
                <p className="mt-1 font-mono text-slate">$90,000 · hail</p>
                <p className="mt-4 text-slate">
                  One storm, one roof. Underwriters see weather, not management. They&apos;ll ask
                  about the new roof and move on.
                </p>
              </div>
              <div className="rounded-md border border-gold/20 bg-white p-6">
                <p className="font-mono text-sm text-gold-dark">Owner B</p>
                <p className="mt-2 font-display text-3xl font-bold text-obsidian">6 claims</p>
                <p className="mt-1 font-mono text-slate">$15,000 each · water</p>
                <p className="mt-4 text-slate">
                  Six water losses in five years looks like a maintenance problem. Problems repeat.
                  The underwriter prices in the next six.
                </p>
              </div>
            </div>
            <div className="mt-8 max-w-2xl space-y-4 text-slate">
              <p>
                Severity is often bad luck. Frequency looks like a pattern, and patterns predict
                future losses. That&apos;s why a run of small claims can cost you more at renewal
                than a single large one, even when the dollars are the same.
              </p>
              <p>It&apos;s also why the next section matters.</p>
            </div>
          </div>
        </section>

        {/* FILING THE RIGHT CLAIMS (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Filing the right claims
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Insurance works best for the losses you can&apos;t absorb: the fire, the hurricane,
                the lawsuit. It works worst as a maintenance budget.
              </p>
              <p>
                A $12,000 water loss on a policy with a $10,000 deductible pays you $2,000. It also
                puts a claim on your loss runs for five years and counts toward your frequency.
                That trade rarely makes sense.
              </p>
              <p>
                So before you file a small property claim, call your broker. Look at what it will
                pay after the deductible, and weigh it against what it will cost at the next five
                renewals. If small losses keep landing just above your deductible, that&apos;s a
                sign your deductible is too low. A higher one lowers your premium and keeps the
                small stuff off your record.
              </p>
              <p className="rounded-md border-l-2 border-gold bg-ivory p-5 text-base">
                <strong className="font-semibold text-obsidian">One exception: liability.</strong>{" "}
                Deciding not to file only applies to your own property damage. If someone is hurt
                on your property, or says they were, call us and call the carrier immediately.
                Liability claims can surface months later, and a carrier can deny coverage for late
                notice. On liability, not reporting
                isn&apos;t a strategy. It&apos;s a gap.
              </p>
            </div>
          </div>
        </section>

        {/* WHEN TO NOTIFY (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Timing</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              When to notify your carrier
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Most policies require notice &ldquo;as soon as practicable.&rdquo; Some set a hard
              number of days. Read the conditions section of your policy, or ask us to.
            </p>
            <div className="mt-8 divide-y divide-gold/20 rounded-md border border-gold/20 bg-white">
              {NOTIFY.map((c) => (
                <div key={c.when} className="grid gap-2 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm font-medium text-gold-dark">{c.when}</p>
                  <p className="text-slate">{c.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REPAIRS BEFORE INSPECTION (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Can you start repairs before the adjuster inspects?
            </h2>
            <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Emergency repairs, yes. In fact, your policy requires them. You&apos;re expected to
                protect the property from further damage, and the carrier can refuse to pay for
                damage you could have prevented.
              </p>
              <p>
                Permanent repairs, not yet. Once the drywall is replaced, the adjuster has nothing
                to look at but your word. Wait for the inspection, or get written approval to
                proceed.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gold/20 bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">Do</p>
                <ul className="mt-4 space-y-3">
                  {REPAIRS_DO.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-slate">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-gold/20 bg-ivory p-6">
                <p className="font-display text-lg font-semibold text-obsidian">Don&apos;t</p>
                <ul className="mt-4 space-y-3">
                  {REPAIRS_DONT.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-slate">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-slate" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-slate">
              After a large storm, adjusters can take weeks to arrive. If waiting would put tenants
              at risk or let damage spread, document everything thoroughly, tell the carrier in
              writing what you&apos;re doing and why, and do the work.
            </p>
          </div>
        </section>

        {/* OPEN VS CLOSED (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Open vs. closed</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What an open claim tells an underwriter
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                A closed claim is a known number. It happened, it was paid, it&apos;s done. An
                underwriter can price that.
              </p>
              <p>
                An open claim is a question. While it&apos;s open, the carrier holds a reserve: its
                estimate of what the claim will cost when it&apos;s finished. Your loss runs show
                the claim as <em>incurred</em>, which is what&apos;s been paid plus the reserve.
              </p>
              <p>
                Say a slip-and-fall claim has paid $20,000 so far, with a $250,000 reserve. On your
                loss runs, that&apos;s a{" "}
                <strong className="font-semibold text-obsidian">$270,000 claim</strong>, even if it
                eventually settles for $40,000. And underwriters know open liability claims tend to
                grow, so many will price it as if it gets worse, not better.
              </p>
              <p>
                That&apos;s why closing claims matters, and why reserves are worth watching. If a
                reserve is much higher than the claim justifies, your broker can ask the carrier to
                review it before your renewal goes to market.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT AFTER A CLAIM (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              What to do right after a claim
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Once the property is safe and the carrier is notified, these steps decide how the
              claim reads at your next five renewals.
            </p>
            <div className="mt-10 space-y-8">
              {AFTER.map((a, i) => (
                <div key={a.title} className="border-l-2 border-gold pl-5">
                  <p className="font-mono text-sm text-gold-dark">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-obsidian">{a.title}</h3>
                  <p className="mt-2 max-w-3xl text-slate">{a.body}</p>
                  {a.link && (
                    <Link
                      href={a.link.href}
                      className="mt-2 inline-block text-sm font-semibold text-gold-dark underline underline-offset-2 hover:text-gold"
                    >
                      {a.link.label} →
                    </Link>
                  )}
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
              Call us when it happens
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
              <p>
                We help you decide what to file, report it the right way, and keep the claim moving
                until it closes. Then we write it into your renewal story so underwriters read it
                as what it was, not as a guess.
              </p>
              <p>
                If you&apos;re carrying open claims or a rough loss history into your next renewal,
                talk to us early. There&apos;s a lot more you can do about it 120 days out than 30.
              </p>
            </div>
            <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
              Send us your loss runs. We&apos;ll tell you how they read. <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-10 text-sm text-slate">
              This is general guidance, not legal advice. Your policy&apos;s conditions control, and
              they vary by carrier.
            </p>
          </div>
        </section>

        <ContactSection source="claims strategy page" heading="Talk through a claim before you file it" />
      </main>

      <SiteFooter />
    </>
  );
}
