import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes and product updates from the Quantalog team — privacy-first analytics, real-time data, and the platform API.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Blog
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight">
          Notes from the build
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
          How we think about privacy, real-time data pipelines, and shipping
          analytics that other products can build on.
        </p>
      </header>

      {posts.length === 0 && (
        <p className="mt-16 text-sm text-fg-muted">
          Nothing published yet. Check back shortly.
        </p>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-14 block overflow-hidden rounded-xl border border-border bg-surface p-8 transition hover:border-border-strong"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-medium text-accent">
              Latest
            </span>
            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{featured.readingTime}</span>
          </div>
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight transition group-hover:text-accent">
            {featured.title}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
            {featured.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Read post
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-7 transition hover:bg-bg-subtle"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-2.5 text-balance text-lg font-semibold tracking-tight transition group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
