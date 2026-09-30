"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu as MenuIcon, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import type { NavGroup, NavLink } from "@/lib/nav";

export type NavMenu = {
  id: string;
  label: string;
  groups: NavGroup[]; // a single untitled group renders as a plain list
  columns?: 3 | 4; // multi-column panel; omit for a narrow single-column list
  alignRight?: boolean; // anchor the panel to the right edge of the header container
  footer?: NavLink; // link shown at the bottom of the panel and mobile section
};

// Static strings so Tailwind can see every class.
const COLUMN_CLASS = {
  3: "grid w-[44rem] grid-cols-3 gap-4",
  4: "grid w-[48rem] grid-cols-4 gap-4",
} as const;

const TRIGGER =
  "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors hover:text-champagne";

function linkClass(active: boolean) {
  return `block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-gold ${
    active ? "text-gold" : "text-champagne/90"
  }`;
}

function GroupList({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div>
      {group.title && (
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate">
          {group.title}
        </p>
      )}
      <ul>
        {group.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onNavigate}
              aria-current={pathname === l.href ? "page" : undefined}
              className={linkClass(pathname === l.href)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop: disclosure-pattern dropdowns (click, or hover with a mouse).
// Mobile: full-height panel under the header with collapsible sections.
export function MainNav({ menus, contactHref }: { menus: NavMenu[]; contactHref: string }) {
  const pathname = usePathname();
  const baseId = useId();
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [open, setOpen] = useState<{ id: string; by: "click" | "hover" } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
  };

  // Close everything on navigation.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  // Outside click + Escape for the desktop dropdowns.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      triggerRefs.current[open.id]?.focus();
      setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Mobile panel: lock page scroll, close on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener("change", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const menuActive = (m: NavMenu) => m.groups.some((g) => g.links.some((l) => l.href === pathname));

  return (
    <>
      {/* Desktop */}
      <nav ref={navRef} aria-label="Main" className="hidden items-center gap-7 lg:flex">
        {menus.map((m) => {
          const isOpen = open?.id === m.id;
          const panelId = `${baseId}-${m.id}`;
          return (
            <div
              key={m.id}
              // Right-aligned panels position against the header container (chrome.tsx), not the trigger.
              className={m.alignRight ? undefined : "relative"}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                clearTimeout(hoverTimer.current);
                if (open?.by !== "click") setOpen({ id: m.id, by: "hover" });
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse" || open?.by === "click") return;
                hoverTimer.current = setTimeout(() => setOpen(null), 150);
              }}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[m.id] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpen(isOpen && open?.by === "click" ? null : { id: m.id, by: "click" })
                }
                className={`${TRIGGER} py-2 ${isOpen || menuActive(m) ? "text-champagne" : "text-slate"}`}
              >
                {m.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {/* pt-3 (not mt-3) keeps the hover bridge between trigger and panel unbroken */}
              <div id={panelId} hidden={!isOpen} className={`absolute top-full z-50 pt-3 ${m.alignRight ? "right-0" : "left-0"}`}
              >
                <div
                  className={`gold-rule-top rounded-sm border border-white/10 bg-midnight p-4 shadow-2xl shadow-black/40 ${
                    m.columns ? COLUMN_CLASS[m.columns] : "w-80"
                  }`}
                >
                  {m.groups.map((g) => (
                    <GroupList
                      key={g.title || m.id}
                      group={g}
                      pathname={pathname}
                      onNavigate={() => setOpen(null)}
                    />
                  ))}
                  {m.footer && (
                    <div className="col-span-full border-t border-white/10 pt-3">
                      <Link
                        href={m.footer.href}
                        onClick={() => setOpen(null)}
                        className="block px-3 py-1 text-sm font-semibold text-gold hover:underline"
                      >
                        {m.footer.label} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <Link
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
          className={`${TRIGGER} py-2 ${pathname === "/about" ? "text-champagne" : "text-slate"}`}
        >
          About
        </Link>
      </nav>

      {/* Mobile trigger */}
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={`${baseId}-mobile`}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((v) => !v)}
        className="order-last -mr-2 inline-flex h-10 w-10 items-center justify-center text-champagne lg:hidden"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Mobile panel: positioned against the sticky header, fills the rest of the viewport. */}
      <div
        id={`${baseId}-mobile`}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] border-t border-gold/20 bg-obsidian lg:hidden"
      >
        <div className="flex h-full flex-col">
          <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 py-2">
            {menus.map((m) => {
              const expanded = mobileSection === m.id;
              const sectionId = `${baseId}-m-${m.id}`;
              return (
                <div key={m.id} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={sectionId}
                    onClick={() => setMobileSection(expanded ? null : m.id)}
                    className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-wide text-champagne"
                  >
                    {m.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div id={sectionId} hidden={!expanded} className="space-y-4 pb-4">
                    {m.groups.map((g) => (
                      <GroupList
                        key={g.title || m.id}
                        group={g}
                        pathname={pathname}
                        onNavigate={closeAll}
                      />
                    ))}
                    {m.footer && (
                      <Link
                        href={m.footer.href}
                        onClick={closeAll}
                        className="block px-3 py-2 text-sm font-semibold text-gold"
                      >
                        {m.footer.label} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            <Link
              href="/about"
              onClick={closeAll}
              aria-current={pathname === "/about" ? "page" : undefined}
              className="block border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-wide text-champagne"
            >
              About
            </Link>
          </nav>
          <div className="grid gap-3 border-t border-gold/20 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 rounded-sm border border-gold/40 py-3 text-sm font-semibold text-champagne"
            >
              <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={contactHref}
              onClick={closeAll}
              className="rounded-sm bg-gold py-3 text-center text-sm font-semibold uppercase tracking-wide text-obsidian"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
