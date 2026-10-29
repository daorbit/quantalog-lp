import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocs } from "@/lib/docs";
import { getAllComparisons } from "@/lib/comparisons";
import { comparisonsEditedAt, docEditedAt, routeEditedAt } from "@/lib/page-edit-dates";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: { path: string; changeFrequency: Entry["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.8 },
  { path: "/plans", changeFrequency: "monthly", priority: 0.9 },
  { path: "/analytics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/seo-audits", changeFrequency: "monthly", priority: 0.8 },
  { path: "/search-visibility", changeFrequency: "monthly", priority: 0.8 },
  { path: "/forms", changeFrequency: "monthly", priority: 0.8 },
  { path: "/invoicing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/reports", changeFrequency: "monthly", priority: 0.8 },
  { path: "/social", changeFrequency: "monthly", priority: 0.8 },
  { path: "/platform-api", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/dpa", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const docs = getAllDocs();
  const comparisons = getAllComparisons();
  const comparisonsEdited = comparisonsEditedAt();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: routeEditedAt(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${site.url}/docs/${doc.slug}`,
    lastModified: docEditedAt(doc.slug),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${site.url}/compare/${c.slug}`,
    lastModified: comparisonsEdited,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noIndex)
    .map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...comparisonRoutes, ...docRoutes, ...postRoutes];
}
