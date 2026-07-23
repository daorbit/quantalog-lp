import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Next's build artefacts carry no content worth crawling, and letting a
      // bot walk them only spends crawl budget that should go to docs.
      disallow: ["/_next/", "/404"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
