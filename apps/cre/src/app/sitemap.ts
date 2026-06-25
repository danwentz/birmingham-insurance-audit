import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: DOMAIN, changeFrequency: "monthly", priority: 1 },
    ...PROGRAMS.map((p) => ({
      url: `${DOMAIN}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
