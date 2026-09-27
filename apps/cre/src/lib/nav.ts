// Single source for site navigation: header, footer, and sitemap all read from here.
import { programsByCategory, type ProgramCategory } from "@/lib/programs";

export type NavLink = { href: string; label: string };
export type NavGroup = { title: string; links: NavLink[] };

const programLinks = (category: ProgramCategory): NavLink[] =>
  programsByCategory(category).map((p) => ({ href: `/${p.slug}`, label: p.shortName }));

export const COVERAGE_GROUPS: NavGroup[] = [
  { title: "Specialty Programs", links: programLinks("program") },
  { title: "By Asset Class", links: programLinks("asset") },
  { title: "Advisory", links: programLinks("advisory") },
];

export const TOOLS: NavLink[] = [
  { href: "/commercial-insurance-rate-barometer", label: "Commercial Insurance Rate Barometer" },
  { href: "/multifamily-insurance-calculator", label: "Multifamily Insurance Calculator" },
  { href: "/wind-deductible-calculator", label: "Wind & Hail Deductible Calculator" },
  { href: "/hotel-insurance-calculator", label: "Hotel Insurance Calculator" },
  { href: "/coinsurance-penalty-calculator", label: "Coinsurance Penalty Calculator" },
];

export const GUIDES: NavLink[] = [
  { href: "/replacement-cost-value", label: "Replacement Cost Value" },
  { href: "/insurance-document-checklist", label: "Insurance Document Checklist" },
  { href: "/commercial-insurance-claims-strategy", label: "Claims Strategy Guide" },
  { href: "/lender-insurance-requirements", label: "Lender Insurance Requirements" },
  { href: "/hotel-portfolio-insurance", label: "Hotel Portfolio Insurance" },
  { href: "/gulf-coast-hotel-insurance", label: "Gulf Coast Hotel Insurance" },
  { href: "/affordable-housing-insurance", label: "Affordable Housing Insurance" },
];
