import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";

const SITE_URL = "https://www.birminghaminsuranceaudit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CITIES.map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
