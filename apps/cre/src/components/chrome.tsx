import Link from "next/link";
import { Phone } from "lucide-react";
import { BRAND_NAME, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { COVERAGE_GROUPS, GUIDES, TOOLS, type NavLink } from "@/lib/nav";
import { MainNav, type NavMenu } from "@/components/MainNav";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-gold">ACRE</span>Insure
    </span>
  );
}

const MENUS: NavMenu[] = [
  { id: "coverage", label: "Coverage", groups: COVERAGE_GROUPS, wide: true },
  { id: "tools", label: "Tools", groups: [{ title: "", links: TOOLS }] },
  { id: "guides", label: "Guides", groups: [{ title: "", links: GUIDES }] },
];

// Pages without a ContactSection (e.g. /privacy) pass contactHref="/#contact".
export function SiteHeader({ contactHref = "#contact" }: { contactHref?: string }) {
  return (
    <header className="gold-rule-top sticky top-0 z-40 bg-obsidian">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        {/* contents below lg so the hamburger (order-last) lands at the far right */}
        <div className="contents lg:flex lg:items-center lg:gap-10">
          <Link href="/">
            <Wordmark className="text-lg text-white sm:text-xl" />
          </Link>
          <MainNav menus={MENUS} contactHref={contactHref} />
        </div>
        <div className="ml-auto flex items-center gap-3 sm:gap-6">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate transition-colors hover:text-champagne lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={contactHref}
            className="hidden rounded-sm bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark lg:inline-block"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: NavLink[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-slate transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Below lg the call + quote actions live in a bar pinned to the bottom of the screen.
function MobileActionBar({ contactHref }: { contactHref: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-gold/20 bg-obsidian px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 rounded-sm border border-gold/40 py-3 text-sm font-semibold text-champagne"
      >
        <Phone className="h-4 w-4 shrink-0" />
        {PHONE_DISPLAY}
      </a>
      <a
        href={contactHref}
        className="flex items-center justify-center rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-obsidian"
      >
        Get a Quote
      </a>
    </div>
  );
}

export function SiteFooter({ contactHref = "#contact" }: { contactHref?: string }) {
  return (
    // pb reserves room so the fixed MobileActionBar never covers the last footer row
    <footer className="bg-obsidian pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-slate lg:pb-0">
      <MobileActionBar contactHref={contactHref} />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Wordmark className="text-lg text-white" />
            <p className="mt-3 max-w-[34ch] text-sm text-slate">
              Large-account CRE insurance.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-champagne transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href={contactHref} className="mt-3 block text-sm font-semibold text-gold hover:underline">
              Request a quote →
            </a>
            <Link href="/about" className="mt-2 block text-sm text-slate transition-colors hover:text-gold">
              About Dan Wentz
            </Link>
          </div>
          {COVERAGE_GROUPS.map((g) => (
            <FooterColumn key={g.title} title={g.title} items={g.links} />
          ))}
          <div className="space-y-10">
            <FooterColumn title="Free Tools" items={TOOLS} />
            <FooterColumn title="Guides" items={GUIDES} />
          </div>
        </div>
      </div>
      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-5 py-6 text-xs text-slate">
          <span>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </span>
          <span>Insurance produced through Dan Wentz, USI Insurance Services, Birmingham, AL.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-gold">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-gold">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
