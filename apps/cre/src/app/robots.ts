import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/thank-you",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
