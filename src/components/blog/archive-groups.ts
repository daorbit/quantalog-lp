import { formatMonth, type PostMeta } from "@/lib/blog";

export type ArchiveEntry = { post: PostMeta; index: number };
export type ArchiveGroup = { month: string; entries: ArchiveEntry[] };

export function groupByMonth(posts: PostMeta[]): ArchiveGroup[] {
  const groups: ArchiveGroup[] = [];
  posts.forEach((post, index) => {
    const month = formatMonth(post.date);
    const last = groups[groups.length - 1];
    if (last?.month === month) last.entries.push({ post, index });
    else groups.push({ month, entries: [{ post, index }] });
  });
  return groups;
}
