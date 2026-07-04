import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { DOMAIN, PHONE_E164, PREMIUM_FLOOR } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Dan Wentz | ACREInsure" },
  description:
    "The CRE insurance practice of Dan Wentz, risk consultant at USI Insurance Services in Birmingham. Wholesale E&S background, ACRE 100 Leadership Council member.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dan Wentz | ACREInsure",
    description:
      "The CRE insurance practice of Dan Wentz, risk consultant at USI Insurance Services in Birmingham.",
    url: `${DOMAIN}/about`,
    type: "profile",
  },
};

const WORK_AREAS = [
  "Property & general liability",
  "Umbrella & excess",
  "Management & professional liability",
  "Environmental risk",
  "Workers' compensation",
  "Claims advocacy & risk control",
];

const TIMELINE = [
  { role: "Select Consultant", org: "USI Insurance Services", years: "2025 – present" },
  { role: "Vice President, Marketing", org: "CAC Group · Cobbs Allen · CAC Specialty", years: "2023 – 2025" },
  { role: "Assistant Vice President, Marketing", org: "CRC Group", years: "2014 – 2023" },
  { role: "Director of Marketing & Radio Host", org: "iHeartMedia", years: "2007 – 2014" },
  { role: "Radio Host", org: "Various media outlets", years: "2000 – 2007" },
  { role: "Graduate", org: "Penn State University", years: "2000 – 2004" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dan Wentz",
  jobTitle: "Risk Consultant",
  worksFor: { "@type": "Organization", name: "USI Insurance Services" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Penn State University" },
  memberOf: "ACRE 100 Leadership Council",
  telephone: PHONE_E164,
  url: `${DOMAIN}/about`,
  address: { "@type": "PostalAddress", addressLocality: "Birmingham", addressRegion: "AL", addressCountry: "US" },
};

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* HERO (dark) */}
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-2%] -translate-y-1/2 select-none font-display text-[30vw] font-bold leading-none tracking-tight text-gold opacity-[0.04]"
          >
            DW
          </span>
          <div className="relative mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">About</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Dan Wentz
            </h1>
            <p className="mt-5 text-xl text-slate">
              The person behind the programs on this site.
            </p>
          </div>
        </section>

        {/* BIO (white) */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
            <p>
              ACREInsure is the commercial real estate practice of Dan Wentz, a risk consultant at
              USI Insurance Services in Birmingham. Dan works with owners, managers, and developers
              of commercial real estate and hotels, building insurance programs for accounts with{" "}
              {PREMIUM_FLOOR} and up in annual premium.
            </p>
            <p>
              Dan came up on the wholesale side of the business: nine years at CRC Group and two at
              CAC Group, marketing and placing the risk standard agents send out when they
              can&apos;t write it themselves. So the E&amp;S and specialty capacity this site keeps
              mentioning isn&apos;t an abstraction. It&apos;s a set of working relationships.
            </p>
            <p>
              Before insurance, he spent 14 years in radio, seven of them at iHeartMedia. Which is
              why you&apos;ll get your renewal explained in plain English instead of a 40-page
              proposal nobody reads.
            </p>
            <p>
              He writes on commercial insurance for the Alabama Center for Real Estate (ACRE) at
              the University of Alabama and is a member of the ACRE 100 Leadership Council.
            </p>
          </div>
        </section>

        {/* WORK AREAS (ivory) */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">The work</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Where the exposures get addressed
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Through USI&apos;s ONE&trade; platform, which pairs analytics with specialist
              resources, the work covers:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {WORK_AREAS.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-gold/20 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-slate">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-obsidian">
              Clear, actionable strategies to protect your projects, people, and profits.
            </p>
          </div>
        </section>

        {/* TIMELINE (white) */}
        <section className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              Where he&apos;s been
            </h2>
            <div className="mt-8 space-y-8">
              {TIMELINE.map((t) => (
                <div key={`${t.role}-${t.years}`} className="border-l-2 border-gold pl-5">
                  <p className="font-display text-lg font-semibold text-obsidian">{t.role}</p>
                  <p className="mt-1 text-slate">{t.org}</p>
                  <p className="mt-1 font-mono text-sm text-slate">{t.years}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection source="about page" heading="Put a name to the account" />
      </main>

      <SiteFooter />
    </>
  );
}
