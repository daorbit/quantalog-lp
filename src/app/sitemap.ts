import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocs } from "@/lib/docs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const docs = getAllDocs();

  // The site is statically exported, so "last modified" is build time. That is
  // honest for pages without their own date, and it stops every URL from
  // shipping with no lastmod at all.
  const built = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: built, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/docs`, lastModified: built, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: built, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: built, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: built, changeFrequency: "yearly", priority: 0.3 },
  ];

  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${site.url}/docs/${doc.slug}`,
    lastModified: built,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes, ...postRoutes];
}
