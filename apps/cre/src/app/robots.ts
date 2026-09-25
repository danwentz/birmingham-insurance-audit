import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /thank-you is kept out of the index by its own noindex tag, not by a
    // disallow here: a disallowed URL is never crawled, so the noindex is never
    // read, and a stray inbound link can still get the bare URL indexed.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
