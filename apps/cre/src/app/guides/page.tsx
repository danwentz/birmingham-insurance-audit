import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { HeroBackground, GUIDE_HERO } from "@/components/HeroBackground";
import { DOMAIN } from "@/lib/site";
import { GUIDE_GROUPS, TOOLS, groupId } from "@/lib/nav";

const META_TITLE = "Commercial Real Estate Insurance Guides | ACREInsure";
const DESCRIPTION =
  "Plain-English guides for CRE owners on lender insurance requirements, wind deductibles, hotel programs, liability, and claims.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { title: META_TITLE, description: DESCRIPTION, url: `${DOMAIN}/guides`, type: "website" },
  twitter: { card: "summary_large_image", title: META_TITLE, description: DESCRIPTION },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${DOMAIN}/guides` },
      ],
    },
    {
      "@type": "CollectionPage",
      name: META_TITLE,
      description: DESCRIPTION,
      url: `${DOMAIN}/guides`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: GUIDE_GROUPS.flatMap((g) => g.links).map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: l.label,
          url: `${DOMAIN}${l.href}`,
        })),
      },
    },
  ],
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";
const H2 = "mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl";

export default function GuidesIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-16 text-champagne">
          <HeroBackground src={GUIDE_HERO} />
          <div className="relative mx-auto max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <p className={`mt-8 ${EYEBROW}`}>Guides</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Commercial real estate insurance guides
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-slate">
              What we explain most often to owners and CFOs, grouped by the problem you are
              trying to solve.
            </p>
          </div>
        </section>

        {GUIDE_GROUPS.map((g, i) => (
          <section
            key={g.title}
            id={groupId(g.title)}
            className={`scroll-mt-24 px-5 py-16 ${i % 2 === 0 ? "bg-white" : "gold-rule-top"}`}
          >
            <div className="mx-auto max-w-6xl">
              <p className={EYEBROW}>Guides</p>
              <h2 className={H2}>{g.title}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group rounded-md border border-gold/20 bg-white p-6 transition-colors hover:border-gold"
                  >
                    <p className="font-display text-lg font-semibold text-obsidian">{l.label}</p>
                    <p className="mt-2 text-slate">{l.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark group-hover:text-gold">
                      Read the guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="tools" className="gold-rule-top bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <p className={EYEBROW}>Free tools</p>
            <h2 className={H2}>Run the numbers yourself</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate">
              Our calculators use the same rules of thumb we use on client accounts.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="font-semibold text-gold-dark underline underline-offset-2 hover:text-gold">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection source="guides index page" heading="Not sure which guide fits your situation?" />
      </main>

      <SiteFooter />
    </>
  );
}
