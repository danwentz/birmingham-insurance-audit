"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { BRAND_SHORT, BRAND_NAME, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";
import { trackCall } from "@/components/LeadForm";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-ink">
          {BRAND_SHORT}
        </Link>
        <nav className="flex items-center gap-5">
          <a
            href={PHONE_HREF}
            onClick={trackCall}
            className="hidden items-center gap-2 text-sm font-semibold text-ink hover:text-accent sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Request a Review
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-tint">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">{BRAND_NAME}</p>
            <p className="mt-2 text-sm text-ink-soft">
              A commercial real estate insurance brokerage for large accounts. Alabama-based,
              placing deals nationwide.
            </p>
            <a
              href={PHONE_HREF}
              onClick={trackCall}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-ink hover:text-accent"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Programs</p>
            <ul className="mt-3 space-y-2 text-sm">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="text-ink-soft hover:text-accent">
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Get started</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#contact" className="text-ink-soft hover:text-accent">
                  Request a renewal review
                </a>
              </li>
              <li>
                <Link href="/" className="text-ink-soft hover:text-accent">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved. Coverage is subject to
          policy terms and underwriting. This site is informational and not an offer of insurance or
          legal advice.
        </div>
      </div>
    </footer>
  );
}
