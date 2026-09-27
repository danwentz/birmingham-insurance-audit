import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";
import { GUIDES, TOOLS } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: DOMAIN, changeFrequency: "monthly", priority: 1 },
    ...TOOLS.map((t) => ({
      url: `${DOMAIN}${t.href}`,
      // The barometer's data refreshes more often than the calculators.
      changeFrequency: t.href.endsWith("barometer") ? ("weekly" as const) : ("monthly" as const),
      priority: 0.9,
    })),
    ...GUIDES.map((g) => ({
      url: `${DOMAIN}${g.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${DOMAIN}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${DOMAIN}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${DOMAIN}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ...PROGRAMS.map((p) => ({
      url: `${DOMAIN}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
