import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { ContactSection } from "@/components/ContactSection";
import { PROGRAMS, getProgram } from "@/lib/programs";
import { BRAND_NAME, DOMAIN, PHONE_E164 } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ program: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ program: string }>;
}): Promise<Metadata> {
  const { program: slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.metaTitle,
    description: program.metaDescription,
    alternates: { canonical: `/${program.slug}` },
    openGraph: {
      title: program.metaTitle,
      description: program.metaDescription,
      url: `${DOMAIN}/${program.slug}`,
      siteName: BRAND_NAME,
      type: "website",
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ program: string }>;
}) {
  const { program: slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const others = [
    ...PROGRAMS.filter((p) => p.slug !== program.slug && p.category === program.category),
    ...PROGRAMS.filter((p) => p.slug !== program.slug && p.category !== program.category),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: program.name,
        serviceType: "Commercial real estate insurance brokerage",
        provider: { "@type": "InsuranceAgency", name: BRAND_NAME, telephone: PHONE_E164, areaServed: "US" },
        areaServed: "US",
        url: `${DOMAIN}/${program.slug}`,
        description: program.metaDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: program.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="px-5 pt-14 pb-16">
          <div className="mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" /> All programs
            </Link>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {program.name}
            </h1>
            <p className="mt-5 text-xl text-ink-soft">{program.hook}</p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
              >
                Request a Review <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="border-t border-line bg-paper-card px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">{program.intro}</p>
          </div>
        </section>

        {/* IDEAL FOR */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Who this is for</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {program.idealFor.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-line bg-paper-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-ink-soft">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COVERAGES */}
        <section className="border-t border-line bg-paper-tint px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              {program.coveragesTitle ?? "What we structure"}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {program.coverages.map((c) => (
                <div key={c.title}>
                  <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-ink-soft">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Common questions</h2>
            <div className="mt-8 space-y-4">
              {program.faqs.map((f) => (
                <details key={f.q} className="rounded-lg border border-line bg-paper-card p-5">
                  <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
                  <p className="mt-3 text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CROSS-LINKS */}
        <section className="border-t border-line px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-2xl font-semibold text-ink">Other programs</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group rounded-lg border border-line bg-paper-card p-5 transition hover:border-accent hover:shadow-sm"
                >
                  <h3 className="font-semibold text-ink">{p.shortName}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    View <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection
          source={`${program.shortName} page`}
          heading={`Talk to a ${program.shortName.toLowerCase()} specialist`}
        />
      </main>

      <SiteFooter />
    </>
  );
}
