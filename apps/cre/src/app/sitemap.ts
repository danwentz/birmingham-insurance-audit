import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: DOMAIN, changeFrequency: "monthly", priority: 1 },
    {
      url: `${DOMAIN}/multifamily-insurance-calculator`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/wind-deductible-calculator`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/hotel-insurance-calculator`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/coinsurance-penalty-calculator`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/insurance-document-checklist`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    { url: `${DOMAIN}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...PROGRAMS.map((p) => ({
      url: `${DOMAIN}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
