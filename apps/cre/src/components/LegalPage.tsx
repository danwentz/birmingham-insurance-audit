import { SiteHeader, SiteFooter } from "@/components/chrome";

// Shared shell for /privacy and /terms: dark title band, then plain readable prose.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader contactHref="/#contact" />
      <main>
        <section className="bg-midnight px-5 pt-14 pb-12 text-champagne">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-slate">Last updated {updated}</p>
          </div>
        </section>
        <section className="bg-white px-5 py-14">
          <div className="mx-auto max-w-3xl space-y-4 text-obsidian/85 [&_a]:font-semibold [&_a]:text-gold-dark [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-obsidian [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </section>
      </main>
      <SiteFooter contactHref="/#contact" />
    </>
  );
}
