import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { GuideDisclaimerTop, GuideDisclaimerBottom, SurplusLinesNote } from "@/components/Disclaimers";
import { DOMAIN } from "@/lib/site";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";

const TITLE = "Wind Deductible Buy-Down: What It Is and When a CRE Owner Needs One";
const META_TITLE = "Wind Deductible Buy-Down (Buy-Back) Guide | ACREInsure";
const DESCRIPTION =
  "How a wind or named-storm deductible buy-down (buy-back) works, a worked example, when it pays, and how to place one before hurricane season.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/wind-deductible-buy-down" },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}/wind-deductible-buy-down`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const MECHANICS = [
  {
    title: "It sits under the primary deductible",
    body: "The primary policy applies its percentage deductible first. The buy-down responds to that deductible, so you only keep the retention you chose.",
  },
  {
    title: "You pick a smaller retention",
    body: "Buy 5% down to 1%, or down to a flat dollar amount. Whatever you buy down, you keep the rest.",
  },
  {
    title: "It has its own limit",
    body: "Usually a per-occurrence limit, and often an annual aggregate. Once the limit is spent, you are back to the primary deductible.",
  },
  {
    title: "Definitions have to match",
    body: "Its named-storm trigger and its occurrence definition must line up with the primary. A mismatch leaves a gap that nobody pays for.",
  },
];

const NEED_IT = [
  "Coastal or Gulf exposure with a high percentage named-storm deductible.",
  "Loan documents that cap your deductible. Read the insurance section of the loan docs before you accept a quote.",
  "Thin cash reserves or a tight DSCR, where a seven-figure retention would be a crisis, not an expense.",
  "A multi-location schedule where one storm hits several locations. Each location's deductible applies on its own.",
  "A cost per dollar of retention removed that beats what you would reasonably hold in reserve.",
];

const SKIP_IT = [
  "The premium approaches the retention you are removing. You are just prepaying the loss with a markup.",
  "You have strong reserves and the retention would hurt but not threaten the asset.",
  "The exposure is inland, and the wind deductible is small or flat.",
  "The buy-down's terms don't match the primary closely enough to trust it.",
];

const STEPS = [
  {
    title: "Ask your broker to quote it with the primary",
    body: "It is usually placed alongside the primary renewal, so the two programs can be built to fit each other.",
  },
  {
    title: "Send the same data the primary gets",
    body: "The buy-down market needs your SOV and COPE data (construction, occupancy, protection, exposure). Clean values and roof detail help both programs.",
  },
  {
    title: "Start 90 days or more before renewal",
    body: "These are specialty placements. Starting late leaves you with fewer quotes and less room to compare.",
  },
  {
    title: "Watch the calendar",
    body: "In hurricane season, carriers stop binding once a storm is in play. If it isn't bound before that, it doesn't get bound.",
  },
  {
    title: "Compare cost per dollar of retention removed",
    body: "Divide the premium by the retention you take out. It is the cleanest way to compare quotes and to compare a quote against self-insuring.",
  },
  {
    title: "Coordinate the wording",
    body: "Have the buy-down's trigger, occurrence, and location definitions checked against the primary before you bind.",
  },
];

const FAQS = [
  {
    q: "What is a wind deductible buy-down?",
    a: "A separate policy, usually written by a surplus lines or London market, that pays part of the percentage named-storm or wind/hail deductible on your primary property policy. It lowers what you pay out of pocket after a covered storm.",
  },
  {
    q: "What's the difference between a wind deductible buy-back and a buy-down?",
    a: "Nothing. It is the same product, and the terms are used interchangeably. Both refer to a separate policy that pays part of the percentage deductible on your primary property policy.",
  },
  {
    q: "Is a buy-down the same as a lower deductible on the primary?",
    a: "No. A lower deductible is negotiated inside the primary policy and is priced by that carrier. A buy-down is a second policy with its own carrier, limit, and terms. On the coast, the primary often won't offer a lower percentage at any reasonable price, which is why buy-downs exist.",
  },
  {
    q: "Does a buy-down satisfy my lender's deductible cap?",
    a: "Not automatically. It depends on what your loan documents say and how your lender treats a separate policy. Ask the lender in writing before you count on it, and give them the buy-down policy along with the primary.",
  },
  {
    q: "Can I buy one when a hurricane is approaching?",
    a: "Usually not. Carriers impose binding moratoriums once a storm is in play, and that includes buy-downs. Plan to have it bound well before the season peaks.",
  },
  {
    q: "What does a buy-down cost?",
    a: "It depends on the location, the values, the construction, and how much retention you are removing. It is priced as a layer of catastrophe risk, so it can be expensive relative to the limit you buy. There isn't a reliable rule of thumb, which is why comparing cost per dollar of retention removed matters.",
  },
  {
    q: "What happens if the buy-down limit runs out?",
    a: "You go back to the primary's percentage deductible for the rest of the loss. That is why the per-occurrence limit and any annual aggregate matter as much as the price.",
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
      mainEntityOfPage: `${DOMAIN}/wind-deductible-buy-down`,
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

export default function WindDeductibleBuyDown() {
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
              Wind deductible buy-down for commercial property
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What it is, how it works, and when it&apos;s worth buying instead of carrying a
              seven-figure named-storm retention.
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
                  A wind deductible buy-down is a separate policy that pays part of the percentage
                  named-storm or wind/hail deductible on your primary property policy. It is usually
                  written by a surplus lines carrier, sometimes by a London market. You may also hear it
                  called a wind deductible buy-back or a named-storm deductible buy-down.
                </p>
                <p>
                  It exists because of how percentage deductibles work. They apply to each
                  location&apos;s insured value (TIV), not to the size of the loss. Gulf Coast
                  named-storm deductibles commonly start around 5% of TIV. On a $20M building, that
                  is $1M out of pocket before the primary pays anything.
                </p>
                <p>
                  Most owners can&apos;t write that check on short notice. A buy-down turns part of
                  it into a premium you can plan for.
                </p>
                <p className="rounded-md border-l-2 border-gold bg-ivory p-5 text-base">
                  <strong className="font-semibold text-obsidian">Want the numbers for your own schedule?</strong>{" "}
                  Our free{" "}
                  <Link href="/wind-deductible-calculator" className={LINK}>wind deductible calculator</Link>{" "}
                  models your retention by location, storm, and season, and shows what a buy-down
                  is worth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Mechanics</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How a buy-down works
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                It responds when the primary&apos;s deductible is triggered. Four things decide
                whether it does its job.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {MECHANICS.map((m) => (
                  <div key={m.title} className="rounded-md border border-gold/20 bg-white p-6">
                    <p className="font-display text-lg font-semibold text-obsidian">{m.title}</p>
                    <p className="mt-2 text-slate">{m.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">The price reflects the risk.</strong>{" "}
                  A buy-down is priced as a layer of catastrophe risk. That layer is the first
                  dollars of a hurricane loss, so it can cost a lot relative to the limit you buy.
                  That is the trade: you swap an uncertain seven-figure hit for a certain premium.
                </p>
                <SurplusLinesNote />
              </div>
            </div>
          </div>
        </section>

        {/* WORKED EXAMPLE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Example</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                A $20M coastal building, with and without a buy-down
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                Round numbers, one location, a named storm that triggers the primary&apos;s deductible
                and causes a loss well above it.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">Without a buy-down</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$1,000,000</p>
                  <p className="mt-4 text-slate">
                    5% of $20M TIV. Yours to pay before the primary responds.
                  </p>
                </div>
                <div className="rounded-md border border-gold/20 bg-ivory p-6">
                  <p className="font-mono text-sm text-gold-dark">With a buy-down to 1%</p>
                  <p className="mt-2 font-display text-3xl font-bold text-obsidian">$200,000</p>
                  <p className="mt-4 text-slate">
                    The buy-down pays the other $800,000, if its limit is at least that much.
                  </p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Now the cost side. Say a buy-down quote for that $800,000 layer came in at
                  $120,000 a year. <strong className="font-semibold text-obsidian">That figure is
                  illustrative only.</strong> Real pricing depends on the location, construction,
                  and the market. At that price you pay $0.15 of premium for every $1 of retention
                  removed, every year, whether or not a storm comes.
                </p>
                <p>
                  Whether that is a good deal depends on your reserves, your lender, and how much
                  exposure you are really carrying. Two schedules can look the same on paper and
                  still call for different answers.
                </p>
              </div>
              <Link
                href="/wind-deductible-calculator"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold"
              >
                Run your own numbers in the wind deductible calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHEN YOU NEED ONE (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Fit</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                When you need one, and when you don&apos;t
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">It usually makes sense when</p>
                  <ul className="mt-4 space-y-3">
                    {NEED_IT.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-gold/20 bg-white p-6">
                  <p className="font-display text-lg font-semibold text-obsidian">It may not when</p>
                  <ul className="mt-4 space-y-3">
                    {SKIP_IT.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate">
                        <Minus className="mt-0.5 h-5 w-5 shrink-0 text-slate" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  <strong className="font-semibold text-obsidian">Multiple locations change the math.</strong>{" "}
                  One storm can hit several buildings on your schedule, and each location carries its
                  own deductible. Five buildings at 5% is five deductibles, not one.
                </p>
                <p>
                  <strong className="font-semibold text-obsidian">Loan documents set the floor.</strong>{" "}
                  Many loan agreements limit how large a deductible you can carry. If yours does, a
                  buy-down may be the difference between compliant and in default on the insurance
                  covenant. Check what your loan documents say, and{" "}
                  <Link href="/lender-insurance-requirements" className={LINK}>read our lender requirements guide</Link>.
                </p>
                <p className="text-base">
                  Coastal hotel owner? See{" "}
                  <Link href="/gulf-coast-hotel-insurance" className={LINK}>Gulf Coast hotel insurance</Link>.
                  For the full coastal wind program, see{" "}
                  <Link href="/catastrophe-coastal-property-insurance" className={LINK}>coastal and catastrophe property insurance</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO GET ONE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Placement</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                How to get one
              </h2>
              <p className="mt-3 max-w-2xl text-slate">
                You buy it through your broker. The work is in the timing and the fit with the
                primary.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {STEPS.map((s, i) => (
                  <div key={s.title} className="rounded-md border border-gold/20 bg-ivory p-6">
                    <p className="font-mono text-sm text-gold-dark">Step {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-obsidian">{s.title}</p>
                    <p className="mt-2 text-slate">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">FAQ</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Common questions about wind buy-downs
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
          </div>
        </section>

        {/* WORKING WITH US (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Working with us</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
                Price the retention before renewal
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  We place coastal wind programs and the buy-downs that sit under them. We build both
                  together so the definitions match and the retention fits your reserves and your
                  loan.
                </p>
                <p>
                  Send us your SOV and current policy. We&apos;ll show you what your retention is
                  today, what it would be with a buy-down, and whether the trade is worth making.
                </p>
              </div>
              <Link href="#contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark hover:text-gold">
                Send us your program for a wind deductible review <ArrowRight className="h-4 w-4" />
              </Link>
              <GuideDisclaimerBottom />
            </div>
          </div>
        </section>

        <ContactSection source="wind deductible buy-down page" heading="Get a wind deductible review" />
      </main>

      <SiteFooter />
    </>
  );
}
