"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "./post-card";

const PER_PAGE = 9;
const MAX_TOPICS = 6;
const ALL = "All";

function topTopics(posts: PostMeta[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_TOPICS)
    .map(([tag]) => tag);
}

export function PostGrid({ posts }: { posts: PostMeta[] }) {
  const topics = useMemo(() => topTopics(posts), [posts]);
  const [topic, setTopic] = useState(ALL);
  const [limit, setLimit] = useState(PER_PAGE);

  const matches = (post: PostMeta) => topic === ALL || post.tags.includes(topic);
  const matching = posts.filter(matches);
  const visible = new Set(matching.slice(0, limit).map((p) => p.slug));

  const choose = (next: string) => {
    setTopic(next);
    setLimit(PER_PAGE);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="text-h2 font-semibold leading-[1.06] tracking-display">
          All articles
        </h2>

        {topics.length > 0 && (
          <div className="blog-filter" role="group" aria-label="Filter by topic">
            {[ALL, ...topics].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={t === topic}
                onClick={() => choose(t)}
                className="blog-filter__item"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Off-page cards stay in the DOM so every post keeps a crawlable link from the index. */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} hidden={!visible.has(post.slug)} />
        ))}
      </div>

      {matching.length > limit && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setLimit(limit + PER_PAGE)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-[14px] font-semibold text-fg transition hover:border-border-strong hover:bg-bg-subtle active:scale-[0.99]"
          >
            Load more articles
          </button>
          <p className="text-[13px] text-fg-faint">
            Showing {visible.size} of {matching.length}
          </p>
        </div>
      )}
    </div>
  );
}
