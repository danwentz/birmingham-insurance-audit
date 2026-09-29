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

export const GUIDES: DatedLink[] = [
  { href: "/replacement-cost-value", label: "Replacement Cost Value", updated: "2026-09-27" },
  { href: "/insurance-document-checklist", label: "Insurance Document Checklist", updated: "2026-09-29" },
  { href: "/commercial-insurance-claims-strategy", label: "Claims Strategy Guide", updated: "2026-09-27" },
  { href: "/lender-insurance-requirements", label: "Lender Insurance Requirements", updated: "2026-09-29" },
  { href: "/hotel-portfolio-insurance", label: "Hotel Portfolio Insurance", updated: "2026-09-27" },
  { href: "/gulf-coast-hotel-insurance", label: "Gulf Coast Hotel Insurance", updated: "2026-09-29" },
  { href: "/franchise-hotel-insurance-requirements", label: "Franchise Hotel Insurance Requirements", updated: "2026-09-29" },
  { href: "/wind-deductible-buy-down", label: "Wind Deductible Buy-Downs", updated: "2026-09-29" },
  { href: "/affordable-housing-insurance", label: "Affordable Housing Insurance", updated: "2026-09-27" },
  { href: "/certificate-of-insurance", label: "Certificates of Insurance", updated: "2026-09-29" },
];
