import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  formatDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
  getSlugs,
} from "@/lib/blog";
import { site } from "@/lib/site";
import { Button } from "@/components/ui";

type Params = { slug: string };

// Every post is rendered at build time. Nothing is fetched at request time, so
// the whole /blog tree ships as static HTML.
export function generateStaticParams(): Params[] {
  return getSlugs().map((slug) => ({ slug }));
}

// A slug outside generateStaticParams 404s instead of rendering on demand.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const { Body } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-2xl px-5 py-16">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          All posts
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-bg-subtle px-2.5 py-0.5 text-[11px] font-medium text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[2.5rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-fg-muted">
            {post.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent"
              aria-hidden="true"
            >
              {post.author.name.charAt(0)}
            </div>
            <div className="text-xs">
              <p className="font-medium text-fg">{post.author.name}</p>
              <p className="text-fg-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {" · "}
                {post.readingMinutes} min read
              </p>
            </div>
          </div>
        </header>

        <div className="prose-q mt-10">
          <Body />
        </div>

        <div className="card mt-16 p-8 text-center">
          <p className="text-base font-semibold tracking-tight">
            Try {site.name} on your own site
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
            One script tag, no cookies, live numbers in about three seconds. Free
            forever on the Hobby plan.
          </p>
          <Button href={`${site.app}/signup`} className="group mt-6">
            Start free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
              Keep reading
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card card-hover group p-5"
                >
                  <p className="text-sm font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-fg-muted">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
