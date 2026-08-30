import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocs } from "@/lib/docs";
import { getAllComparisons } from "@/lib/comparisons";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const docs = getAllDocs();
  const comparisons = getAllComparisons();

  const built = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: built, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/docs`, lastModified: built, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: built, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/compare`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },

    { url: `${site.url}/analytics`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/seo-audits`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/forms`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/reports`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/social`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/platform-api`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: built, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/contact`, lastModified: built, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/privacy`, lastModified: built, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: built, changeFrequency: "yearly", priority: 0.3 },
  ];

  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${site.url}/docs/${doc.slug}`,
    lastModified: built,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${site.url}/compare/${c.slug}`,
    lastModified: built,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...comparisonRoutes, ...docRoutes, ...postRoutes];
}
