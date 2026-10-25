"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { FeaturedPost } from "./featured-post";
import { PostArchive } from "./post-archive";
import { PostCard } from "./post-card";
import { TopicFilter } from "./topic-filter";
import { ALL_TOPICS, postsInTopic, topTopics } from "./topics";

const GRID_SIZE = 6;
const ARCHIVE_PAGE = 10;

export function PostIndex({ posts }: { posts: PostMeta[] }) {
  const topics = useMemo(() => topTopics(posts), [posts]);
  const [topic, setTopic] = useState(ALL_TOPICS);
  const [archiveLimit, setArchiveLimit] = useState(ARCHIVE_PAGE);

  const matching = postsInTopic(posts, topic);
  const [featured, ...rest] = matching;
  const grid = rest.slice(0, GRID_SIZE);
  const archive = rest.slice(GRID_SIZE);

  const chooseTopic = (next: string) => {
    setTopic(next);
    setArchiveLimit(ARCHIVE_PAGE);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border pb-4">
        {topics.length > 0 && <TopicFilter topics={topics} active={topic} onChange={chooseTopic} />}
        <p className="text-[13px] text-fg-faint">
          {matching.length} {matching.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {featured && (
        <section aria-label="Latest article" className="mt-10 sm:mt-14">
          <FeaturedPost post={featured} />
        </section>
      )}

      {grid.length > 0 && (
        <section aria-labelledby="blog-recent" className="mt-16 sm:mt-24">
          <h2 id="blog-recent" className="text-[1.375rem] font-semibold tracking-[-0.02em] text-fg sm:text-[1.75rem]">
            Recent
          </h2>
          <div className="mt-6 grid gap-y-6 sm:mt-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {archive.length > 0 && (
        <section aria-labelledby="blog-archive" className="mt-16 sm:mt-24">
          <h2 id="blog-archive" className="text-[1.375rem] font-semibold tracking-[-0.02em] text-fg sm:text-[1.75rem]">
            Archive
          </h2>
          <div className="mt-6 sm:mt-8">
            <PostArchive posts={archive} limit={archiveLimit} />
          </div>
          {archive.length > archiveLimit && (
            <div className="mt-10 flex items-center justify-center gap-4 border-t border-border pt-6">
              <p className="text-[13px] text-fg-faint">
                {archiveLimit} of {archive.length}
              </p>
              <button
                type="button"
                onClick={() => setArchiveLimit(archiveLimit + ARCHIVE_PAGE)}
                className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-surface px-4 text-[13px] font-semibold text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                Show {Math.min(ARCHIVE_PAGE, archive.length - archiveLimit)} more
              </button>
            </div>
          )}
        </section>
      )}

      {!featured && (
        <p className="mt-16 text-center text-[15px] text-fg-muted">No articles in this topic yet.</p>
      )}
    </div>
  );
}
