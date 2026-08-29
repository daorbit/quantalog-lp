import type { ComponentType } from "react";
import { introducingQuantalog } from "@/content/posts/introducing-quantalog";
import { cookieBannerAnalytics } from "@/content/posts/cookie-banner-analytics";
import { whyAnalyticsUndercountsTraffic } from "@/content/posts/why-analytics-undercounts-traffic";
import { coreWebVitals } from "@/content/posts/core-web-vitals-what-moves-the-score";
import { serverSideVsClientSide } from "@/content/posts/server-side-vs-client-side-tracking";
import { ga4Migration } from "@/content/posts/google-analytics-4-migration-guide";
import { technicalSeoAudit } from "@/content/posts/technical-seo-audit-checklist";
import { embeddedAnalyticsForSaas } from "@/content/posts/embedded-analytics-for-saas";
import { bestGoogleAnalyticsAlternatives } from "@/content/posts/best-google-analytics-alternatives";
import { addAnalyticsToNextjs } from "@/content/posts/add-analytics-to-nextjs";
import { addAnalyticsToAstro } from "@/content/posts/add-analytics-to-astro";
import { addAnalyticsToWordpress } from "@/content/posts/add-analytics-to-wordpress";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  /**
   * ISO date of the last meaningful revision. Search engines and answer engines
   * both weigh `dateModified`, and a post edited long after publication looks
   * stale without it. Omit until the post is actually revised.
   */
  updated?: string;
  tags: string[];
  author: { name: string; role: string };
  readingMinutes: number;
};

export type Post = PostMeta & {
  /** The article body, authored as plain JSX. */
  Body: ComponentType;
};

// The single registry of published posts. Adding a post = write a file under
// src/content/posts and add it here. When a CMS lands, only this array's source
// changes — every consumer below (and the pages) keeps working unchanged.
const POSTS: Post[] = [
  introducingQuantalog,
  cookieBannerAnalytics,
  whyAnalyticsUndercountsTraffic,
  coreWebVitals,
  serverSideVsClientSide,
  ga4Migration,
  technicalSeoAudit,
  embeddedAnalyticsForSaas,
  bestGoogleAnalyticsAlternatives,
  addAnalyticsToNextjs,
  addAnalyticsToAstro,
  addAnalyticsToWordpress,
];

const sorted = () => [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export function getSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): PostMeta[] {
  return sorted().map(({ Body: _Body, ...meta }) => meta);
}

export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const current = getPost(slug);
  const others = getAllPosts().filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);

  // Rank by shared tags; the recency sort from getAllPosts breaks ties.
  return others
    .map((post) => ({
      post,
      score: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
