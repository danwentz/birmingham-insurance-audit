import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Layers,
  Waves,
  HardHat,
  Store,
  Warehouse,
  Hotel,
  GraduationCap,
  LineChart,
  ClipboardCheck,
  CheckCircle2,
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
        <section className="px-5 pt-16 pb-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-card px-3 py-1 text-sm font-medium text-accent">
                <ShieldCheck className="h-4 w-4" /> Large-account specialists · {PREMIUM_FLOOR}+ premium
              </p>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                Commercial real estate insurance, brokered for large portfolios.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-soft">
                Multifamily, high-TIV master programs, catastrophe-exposed property, and builders
                risk/OCIP. We rebuild and remarket programs that standard agents can&apos;t — and put
                your account in front of the carriers that actually want it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
                >
                  Get a Renewal Review <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center justify-center rounded-md border border-ink/20 px-6 py-3 font-semibold text-ink hover:border-accent hover:text-accent"
                >
                  See what we place
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                <span>{YEARS_EXPERIENCE} years in commercial insurance</span>
                <span aria-hidden>·</span>
                <span>Licensed Alabama broker</span>
                <span aria-hidden>·</span>
                <span>Deals placed nationwide</span>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-paper-card p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-ink">Start with a free review</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Tell us about the account. We respond within one business day.
              </p>
              <div className="mt-5">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="border-y border-line bg-paper-card px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Specialty programs we place
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              The hard-to-place classes where a specialist broker changes the outcome.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {SPECIALTY.map((p) => {
                const Icon = ICONS[p.slug] ?? Building2;
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group rounded-xl border border-line bg-paper p-6 transition hover:border-accent hover:shadow-md"
                  >
                    <Icon className="h-7 w-7 text-accent" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{p.name}</h3>
                    <p className="mt-2 text-ink-soft">{p.hook}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-semibold text-accent">
                      Learn more{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Built for institutional real estate
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              We work across the asset classes that carry real premium — owners, operators, funds,
              and developers.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ASSETS.map((p) => {
                const Icon = ICONS[p.slug] ?? Building2;
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-paper-card p-5 transition hover:border-accent hover:shadow-sm"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-accent" />
                    <span className="font-semibold text-ink">{p.shortName}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-ink-muted transition group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ADVISORY */}
        <section className="border-t border-line bg-paper-card px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Advisory, not just placement
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
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
                    className="group rounded-xl border border-line bg-paper p-6 transition hover:border-accent hover:shadow-md"
                  >
                    <Icon className="h-7 w-7 text-accent" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{p.name}</h3>
                    <p className="mt-2 text-ink-soft">{p.hook}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-semibold text-accent">
                      Learn more{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className="border-t border-line bg-paper-tint px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              How a real broker changes your renewal
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "We dissect your current program",
                  b: "Coverage, valuation, deductibles, and pricing — line by line — to find what's costing you and what's exposed.",
                },
                {
                  n: "02",
                  t: "We market it broadly",
                  b: "Domestic, E&S, and London capacity — including the specialty markets standard agents don't reach.",
                },
                {
                  n: "03",
                  t: "We structure & manage it",
                  b: "Layered limits, lender compliance, and a renewal run as a strategy — not a last-minute scramble.",
                },
              ].map((s) => (
                <div key={s.n}>
                  <p className="font-serif text-3xl font-semibold text-accent">{s.n}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-ink-soft">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Why owners and CFOs work with us
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                `We only take large accounts — ${PREMIUM_FLOOR}+ in premium — so the work goes deep, not wide.`,
                "Direct access to specialty and surplus-lines markets for hard-to-place and CAT-exposed risk.",
                "We manage lender and equity insurance requirements so closings don't stall.",
                `${YEARS_EXPERIENCE} years in commercial insurance, licensed in Alabama, placing deals across the country.`,
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-ink-soft">{point}</span>
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
