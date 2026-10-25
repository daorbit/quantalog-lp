import type { PostMeta } from "@/lib/blog";

export const ALL_TOPICS = "All";

const MAX_TOPICS = 6;

export function topTopics(posts: PostMeta[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_TOPICS)
    .map(([tag]) => tag);
}

export function postsInTopic(posts: PostMeta[], topic: string): PostMeta[] {
  return topic === ALL_TOPICS ? posts : posts.filter((post) => post.tags.includes(topic));
}
