// Single source for site navigation: header, footer, and sitemap all read from here.
import { programsByCategory, type ProgramCategory } from "@/lib/programs";

export type NavLink = { href: string; label: string };
// `updated` (YYYY-MM-DD) feeds sitemap lastmod; bump it when the page or its calculator/data changes.
export type DatedLink = NavLink & { updated: string };
export type NavGroup = { title: string; links: NavLink[] };

const programLinks = (category: ProgramCategory): NavLink[] =>
  programsByCategory(category).map((p) => ({ href: `/${p.slug}`, label: p.shortName }));

export const COVERAGE_GROUPS: NavGroup[] = [
  { title: "Specialty Programs", links: programLinks("program") },
  { title: "By Asset Class", links: programLinks("asset") },
  { title: "Advisory", links: programLinks("advisory") },
];

export const TOOLS: DatedLink[] = [
  { href: "/commercial-insurance-rate-barometer", label: "Commercial Insurance Rate Barometer", updated: "2026-09-28" },
  { href: "/multifamily-insurance-calculator", label: "Multifamily Insurance Calculator", updated: "2026-09-28" },
  { href: "/wind-deductible-calculator", label: "Wind & Hail Deductible Calculator", updated: "2026-09-29" },
  { href: "/hotel-insurance-calculator", label: "Hotel Insurance Calculator", updated: "2026-09-28" },
  { href: "/coinsurance-penalty-calculator", label: "Coinsurance Penalty Calculator", updated: "2026-09-28" },
];

// `menu: false` keeps a guide off the header dropdown (still on /guides and in the sitemap).
export type GuideLink = DatedLink & { blurb: string; menu?: false };
export type GuideGroup = { title: string; links: GuideLink[] };

export const GUIDE_GROUPS: GuideGroup[] = [
  {
    title: "Lenders & Debt",
    links: [
      { href: "/lender-insurance-requirements", label: "Lender Requirements", updated: "2026-09-30", blurb: "What CRE lenders require, how Fannie and Freddie differ, and where to find it." },
      { href: "/fannie-mae-freddie-mac-named-storm-deductible", label: "Fannie/Freddie Named Storm", updated: "2026-09-30", blurb: "The 7.5% named storm deductible cap and where multifamily programs fail it." },
      { href: "/force-placed-insurance-commercial-property", label: "Force-Placed Insurance", updated: "2026-09-30", blurb: "Why lenders force place coverage, what it costs you, and how to get it removed." },
      { href: "/insurance-increase-dscr-covenant", label: "DSCR & Premium Increases", updated: "2026-09-30", blurb: "How a premium increase can pull DSCR under your covenant, and what to do first." },
    ],
  },
  {
    title: "Property & Wind",
    links: [
      { href: "/replacement-cost-value", label: "Replacement Cost Value", updated: "2026-09-27", blurb: "How replacement cost is set, and why a stale value shrinks your claim." },
      { href: "/wind-deductible-buy-down", label: "Wind Deductible Buy-Downs", updated: "2026-09-29", blurb: "How a wind deductible buy-back works, a worked example, and when it pays." },
      { href: "/affordable-housing-insurance", label: "Affordable Housing", updated: "2026-09-27", blurb: "Insuring Section 8, HUD, and LIHTC portfolios, and how to present the account." },
    ],
  },
  {
    title: "Hotels",
    links: [
      { href: "/hotel-portfolio-insurance", label: "Hotel Portfolios", updated: "2026-09-27", blurb: "Insuring three or more hotels under one program, and adding acquisitions mid-term." },
      { href: "/gulf-coast-hotel-insurance", label: "Gulf Coast Hotels", updated: "2026-09-29", blurb: "Why Gulf Coast hotels land in E&S, and the steps to take before a refi or PIP." },
      { href: "/franchise-hotel-insurance-requirements", label: "Franchise Requirements", updated: "2026-09-29", blurb: "What franchisors require your hotel to carry, and how to negotiate grandfathering." },
    ],
  },
  {
    title: "Liability & Claims",
    links: [
      { href: "/negligent-security-lawsuit-apartments", label: "Negligent Security", updated: "2026-09-30", blurb: "How negligent security suits against apartment owners work, and what your GL policy covers." },
      { href: "/negligent-security-lawsuit-alabama-apartments", label: "Negligent Security: Alabama", updated: "2026-09-30", blurb: "How Alabama courts treat crime-on-premises suits, and what to check in your GL policy.", menu: false },
      { href: "/negligent-security-lawsuit-florida-apartments", label: "Negligent Security: Florida", updated: "2026-09-30", blurb: "Florida's presumption against liability for multifamily owners, and the records that prove it.", menu: false },
      { href: "/negligent-security-lawsuit-georgia-apartments", label: "Negligent Security: Georgia", updated: "2026-09-30", blurb: "Georgia's 2025 negligent security statute, fault apportionment, and what owners should do.", menu: false },
      { href: "/certificate-of-insurance", label: "Certificates of Insurance", updated: "2026-09-29", blurb: "Certificate holder vs. additional insured, and what to check on a contractor's COI." },
      { href: "/commercial-insurance-claims-strategy", label: "Claims Strategy", updated: "2026-09-27", blurb: "When to report, which claims to file, and how open claims affect your renewal." },
      { href: "/insurance-document-checklist", label: "Document Checklist", updated: "2026-09-29", blurb: "Which insurance documents to keep, how to file them, and what to update at renewal." },
    ],
  },
];

export const GUIDES: GuideLink[] = GUIDE_GROUPS.flatMap((g) => g.links);

export const GUIDE_MENU_GROUPS: GuideGroup[] = GUIDE_GROUPS.map((g) => ({
  ...g,
  links: g.links.filter((l) => l.menu !== false),
}));

// Anchor id for a group on /guides ("Lenders & Debt" -> "lenders-debt").
export const groupId = (title: string) =>
  title.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
