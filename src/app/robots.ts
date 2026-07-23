import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Deliberately NOT blocking /_next/: Google renders the page before
      // judging it, and the CSS and JS it needs to do that are served from
      // there. Blocking it saves no meaningful crawl budget and makes the
      // rendered page look broken to the crawler.
      disallow: ["/404"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
