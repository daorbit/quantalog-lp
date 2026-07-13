import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  formatDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
  getSlugs,
} from "@/lib/blog";
import { site } from "@/lib/site";
import { mdxComponents } from "@/components/mdx-components";

type Params = { slug: string };

// Every post is rendered at build time. Nothing is fetched at request time, so
// the whole /blog tree ships as static HTML.
export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

// A slug that is not in generateStaticParams 404s instead of rendering on demand.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
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

const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          themes: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
        },
      ],
    ],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

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
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-fg-muted">
            {post.description}
          </p>

          <div className="mt-7 flex items-center gap-3">
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
                {post.readingTime}
              </p>
            </div>
          </div>
        </header>

        <div className="prose-q mt-10">
          <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
        </div>

        <div className="mt-14 rounded-xl border border-border bg-bg-subtle p-7 text-center">
          <p className="text-base font-semibold tracking-tight">
            Try {site.name} on your own site
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
            One script tag, no cookies, live numbers in about three seconds. Free
            forever on the Hobby plan.
          </p>
          <a
            href={`${site.app}/signup`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-border pt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
              Keep reading
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 transition hover:border-border-strong"
                >
                  <p className="text-sm font-semibold tracking-tight transition group-hover:text-accent">
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
