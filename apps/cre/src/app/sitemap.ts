import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";
import { GUIDES, TOOLS } from "@/lib/nav";

// Bump when these pages change. Program, tool, and guide dates live with their data.
const HOME_UPDATED = "2026-09-27";
const ABOUT_UPDATED = "2026-09-25";
const LEGAL_UPDATED = "2026-09-27";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: DOMAIN, lastModified: HOME_UPDATED, changeFrequency: "monthly", priority: 1 },
    ...TOOLS.map((t) => ({
      url: `${DOMAIN}${t.href}`,
      lastModified: t.updated,
      // The barometer's data refreshes more often than the calculators.
      changeFrequency: t.href.endsWith("barometer") ? ("weekly" as const) : ("monthly" as const),
      priority: 0.9,
    })),
    ...GUIDES.map((g) => ({
      url: `${DOMAIN}${g.href}`,
      lastModified: g.updated,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${DOMAIN}/about`, lastModified: ABOUT_UPDATED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${DOMAIN}/privacy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${DOMAIN}/terms`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    ...PROGRAMS.map((p) => ({
      url: `${DOMAIN}/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
