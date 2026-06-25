import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Layers,
  Waves,
  HardHat,
  Store,
  Warehouse,
  Hotel,
  GraduationCap,
  LineChart,
  ClipboardCheck,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { LeadForm } from "@/components/LeadForm";
import { programsByCategory } from "@/lib/programs";
import { BRAND_NAME, DOMAIN, PHONE_E164, PREMIUM_FLOOR, YEARS_EXPERIENCE } from "@/lib/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "multifamily-apartment-insurance": Building2,
  "real-estate-portfolio-insurance": Layers,
  "catastrophe-coastal-property-insurance": Waves,
  "builders-risk-ocip": HardHat,
  "office-building-insurance": Building2,
  "retail-shopping-center-insurance": Store,
  "industrial-warehouse-insurance": Warehouse,
  "hospitality-hotel-insurance": Hotel,
  "student-senior-housing-insurance": GraduationCap,
  "real-estate-risk-management": LineChart,
  "insurance-program-review": ClipboardCheck,
};

const SPECIALTY = programsByCategory("program");
const ASSETS = programsByCategory("asset");
const ADVISORY = programsByCategory("advisory");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "FinancialService"],
  "@id": `${DOMAIN}/#org`,
  name: BRAND_NAME,
  description:
    "Commercial real estate insurance brokerage for large accounts — multifamily/habitational, high-TIV portfolios, catastrophe property, and builders risk/OCIP.",
  url: DOMAIN,
  telephone: PHONE_E164,
  areaServed: "US",
  address: { "@type": "PostalAddress", addressRegion: "AL", addressCountry: "US" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-midnight px-5 pt-16 pb-20 text-champagne">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-2%] -translate-y-1/2 select-none font-display text-[34vw] font-bold leading-none tracking-tight text-gold opacity-[0.04]"
          >
            INSURE
          </span>
          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="inline-block border-l-2 border-gold pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Large-account specialists · {PREMIUM_FLOOR}+ premium
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
                Commercial real estate insurance, brokered for large portfolios.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                Multifamily, high-TIV master programs, catastrophe-exposed property, and builders
                risk/OCIP. We rebuild and remarket programs that standard agents can&apos;t — and put
                your account in front of the carriers that actually want it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center justify-center rounded-sm border border-champagne px-6 py-3 text-sm font-semibold uppercase tracking-wide text-champagne transition-colors hover:border-gold hover:text-gold"
                >
                  See Coverage Options
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate">
                <span>{YEARS_EXPERIENCE} years in commercial insurance</span>
                <span className="text-gold" aria-hidden>·</span>
                <span>Licensed Alabama broker</span>
                <span className="text-gold" aria-hidden>·</span>
                <span>Deals placed nationwide</span>
              </div>
            </div>

            <div className="gold-rule-top overflow-hidden rounded-md bg-white p-6 shadow-2xl sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-obsidian">Request a quote</h2>
              <p className="mt-1 text-sm text-slate">
                Tell us about the account. We respond within one business day.
              </p>
              <div className="mt-5">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* SPECIALTY PROGRAMS */}
        <section id="programs" className="bg-white px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Specialty programs</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
              The hard-to-place classes we place
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Where a specialist broker changes the outcome.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {SPECIALTY.map((p) => {
                const Icon = ICONS[p.slug] ?? Building2;
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="gold-rule-top group relative overflow-hidden rounded-md bg-ivory p-6 shadow-sm transition hover:shadow-lg"
                  >
                    <Icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-4 font-display text-xl font-semibold text-obsidian">{p.name}</h3>
                    <p className="mt-2 text-slate">{p.hook}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-gold">
                      Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ASSET CLASSES */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Asset classes</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
              Built for institutional real estate
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              The asset classes that carry real premium — owners, operators, funds, and developers.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ASSETS.map((p) => {
                const Icon = ICONS[p.slug] ?? Building2;
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group flex items-center gap-3 rounded-md border border-gold/20 bg-white p-5 transition hover:border-gold hover:shadow-md"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-gold" />
                    <span className="font-display font-semibold text-obsidian">{p.shortName}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-slate transition group-hover:translate-x-1 group-hover:text-gold" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ADVISORY */}
        <section className="bg-white px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Advisory</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
              Advisory, not just placement
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              The strategic work that lowers your total cost of risk — for owners and CFOs who want
              more than a renewal quote.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {ADVISORY.map((p) => {
                const Icon = ICONS[p.slug] ?? ClipboardCheck;
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="gold-rule-top group relative overflow-hidden rounded-md bg-ivory p-6 shadow-sm transition hover:shadow-lg"
                  >
                    <Icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-4 font-display text-xl font-semibold text-obsidian">{p.name}</h3>
                    <p className="mt-2 text-slate">{p.hook}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-gold">
                      Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPROACH (dark band) */}
        <section className="gold-rule-top bg-obsidian px-5 py-20 text-champagne">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Our approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How a real broker changes your renewal
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                { n: "01", t: "We dissect your current program", b: "Coverage, valuation, deductibles, and pricing — line by line — to find what's costing you and what's exposed." },
                { n: "02", t: "We market it broadly", b: "Domestic, E&S, and London capacity — including the specialty markets standard agents don't reach." },
                { n: "03", t: "We structure & manage it", b: "Layered limits, lender compliance, and a renewal run as a strategy — not a last-minute scramble." },
              ].map((s) => (
                <div key={s.n} className="border-l-2 border-gold pl-5">
                  <p className="font-display text-3xl font-bold text-gold">{s.n}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{s.t}</h3>
                  <p className="mt-2 text-slate">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Why ACREInsure</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
              Why owners and CFOs work with us
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                `We only take large accounts — ${PREMIUM_FLOOR}+ in premium — so the work goes deep, not wide.`,
                "Direct access to specialty and surplus-lines markets for hard-to-place and CAT-exposed risk.",
                "We manage lender and equity insurance requirements so closings don't stall.",
                `${YEARS_EXPERIENCE} years in commercial insurance, licensed in Alabama, placing deals across the country.`,
              ].map((point) => (
                <li key={point} className="border-l-2 border-gold pl-4 text-slate">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection source="homepage" />
      </main>

      <SiteFooter />
    </>
  );
}
