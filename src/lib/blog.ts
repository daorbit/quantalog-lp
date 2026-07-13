import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: { name: string; role: string };
  cover?: string;
  readingTime: string;
  content: string;
};

export type PostMeta = Omit<Post, "content">;

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Everything below is async on purpose: a future CMS (Sanity/Contentful/our own
// Mongo API) can replace the fs reads without any caller changing.

async function readPostFile(slug: string): Promise<Post> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: new Date(data.date ?? Date.now()).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: {
      name: String(data.author?.name ?? "Quantalog"),
      role: String(data.author?.role ?? "Team"),
    },
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: readingTime(content).text,
    content,
  };
}

export async function getSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR).catch(() => [] as string[]);
  return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    return await readPostFile(slug);
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getSlugs();
  const posts = await Promise.all(slugs.map(readPostFile));
  return posts
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<PostMeta[]> {
  const current = await getPost(slug);
  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);

  // Rank by shared tags, then recency (the sort from getAllPosts is stable).
  return others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
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
  });
}
