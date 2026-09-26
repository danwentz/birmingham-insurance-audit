// Pings IndexNow (Bing, Yandex, Seznam, etc.) with every sitemap URL after a
// production build on Vercel. Runs as the npm "postbuild" hook. It never fails
// the build: a missed ping just means Bing finds the change by crawling.
//
// The key must match public/<key>.txt, which IndexNow fetches to verify the host.

import { readFile } from "node:fs/promises";

const KEY = "80a88c5277314e69f891b48a1f799267";
const HOST = "www.acreinsure.com";

if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] skipped (not a Vercel production build)");
  process.exit(0);
}

try {
  // Next prerenders app/sitemap.ts here, so new pages in this deploy are included.
  const xml = await readFile(".next/server/app/sitemap.xml.body", "utf8");
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) throw new Error("no URLs found in built sitemap");

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`[indexnow] submitted ${urlList.length} URLs: HTTP ${res.status}`);
} catch (err) {
  console.warn("[indexnow] ping failed:", err.message);
}
