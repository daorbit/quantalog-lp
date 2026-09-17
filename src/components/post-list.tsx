"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";
import { PostImage } from "@/components/post-image";

/**
 * The archive list, paged in the browser.
 *
 * Every post is fetched at build time, so paging is a slice of an array the
 * page already holds — no request and no loading state.
 *
 * Every row is rendered; the off-page ones are hidden rather than dropped. A
 * slice would leave most of the archive with no link pointing at it from
 * anywhere on the site, which leaves the sitemap as its only route in — the
 * weakest one there is. Hidden links are still followed by crawlers.
 */

const PER_PAGE = 6;

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const onPage = (index: number) => index >= start && index < start + PER_PAGE;

  return (
    <div>
      <div className="card divide-y divide-border overflow-hidden">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            // `hidden` alone loses to the `flex` utility on specificity, so the
            // display is switched by class and the attribute is kept for
            // assistive tech.
            hidden={!onPage(index)}
            aria-hidden={!onPage(index) || undefined}
            tabIndex={onPage(index) ? undefined : -1}
            className={`group gap-3.5 p-3.5 transition hover:bg-bg-subtle ${
              onPage(index) ? "flex" : "hidden"
            }`}
          >
            <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-bg-subtle">
              <PostImage post={post} sizes="5rem" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-fg-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3 className="mt-1 text-pretty text-[15px] font-semibold leading-snug tracking-tight transition group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-fg-muted">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <nav
          className="mt-4 flex items-center justify-between"
          aria-label="Blog pagination"
        >
          <p className="text-xs text-fg-muted">
            {start + 1}–{Math.min(start + PER_PAGE, posts.length)} of{" "}
            {posts.length}
          </p>

          <div className="flex items-center gap-1">
            <PageButton
              label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </PageButton>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-current={n === current ? "page" : undefined}
                onClick={() => setPage(n)}
                className={`h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition ${
                  n === current
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-border text-fg-muted hover:bg-bg-subtle"
                }`}
              >
                {n}
              </button>
            ))}

            <PageButton
              label="Next page"
              disabled={current === pageCount}
              onClick={() => setPage(current + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </PageButton>
          </div>
        </nav>
      )}
    </div>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-fg-muted transition hover:bg-bg-subtle disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
