import type { ComponentType } from "react";
import { introducingQuantalog } from "@/content/posts/introducing-quantalog";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
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
const POSTS: Post[] = [introducingQuantalog];

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
