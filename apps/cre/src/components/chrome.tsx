"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { BRAND_NAME, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { programsByCategory } from "@/lib/programs";
import { trackCall } from "@/components/LeadForm";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-gold">ACRE</span>Insure
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="gold-rule-top sticky top-0 z-40 bg-obsidian">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <Link href="/">
          <Wordmark className="text-xl text-white" />
        </Link>
        <nav className="flex items-center gap-6">
          <a
            href={PHONE_HREF}
            onClick={trackCall}
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate transition-colors hover:text-champagne sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="rounded-sm bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
          >
            Request a Quote
          </a>
        </nav>
      </div>
    </header>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { slug: string; shortName: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`} className="text-slate transition-colors hover:text-gold">
              {p.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-obsidian text-slate">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark className="text-lg text-white" />
            <p className="mt-3 max-w-[34ch] text-sm text-slate">
              Institutional-grade coverage for serious Alabama portfolios.
            </p>
            <a
              href={PHONE_HREF}
              onClick={trackCall}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-champagne transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href="#contact" className="mt-3 block text-sm font-semibold text-gold hover:underline">
              Request a quote →
            </a>
          </div>
          <FooterColumn title="Specialty Programs" items={programsByCategory("program")} />
          <FooterColumn title="By Asset Class" items={programsByCategory("asset")} />
          <FooterColumn title="Advisory" items={programsByCategory("advisory")} />
        </div>
      </div>
      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-5 py-6 text-xs text-slate">
          <span>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </span>
          <span>Insurance produced through Dan Wentz, USI Insurance Services, Birmingham, AL.</span>
        </div>
      </div>
    </footer>
  );
}
