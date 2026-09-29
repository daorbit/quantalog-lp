import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, getPost, getRelatedPosts, getSlugs } from "@/lib/blog";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { PostImage } from "@/components/post-image";
import { DocsToc } from "@/components/docs-toc";
import { SummariseButton } from "@/components/orbit/summarise-button";
import { PostCard } from "@/components/blog/post-card";
import { PostCta } from "@/components/blog/post-cta";
import { ShareLinks } from "@/components/blog/share-links";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getSlugs()).map((slug) => ({ slug }));
}

 
export const dynamicParams = true;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    // Honours the CMS SEO panel; the sitemap leaves these out to match.
    ...(post.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
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
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${post.slug}#post`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: post.author.name },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": SITE_ID },
      mainEntityOfPage: `${site.url}/blog/${post.slug}`,
      image: `${site.url}/OgImage.png`,
      inLanguage: "en",
      keywords: post.tags.join(", "),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ])
  );

  const url = `${site.url}/blog/${post.slug}`;
  const [topic] = post.tags;

  return (
    <div className="blog-post">
      <JsonLd data={jsonLd} />
      <div className="blog-progress scroll-progress" aria-hidden="true" />

      <article>
        <header className="rise mx-auto max-w-3xl px-5 pt-12 text-center sm:pt-20">
          <Link href="/blog" className="blog-back group">
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Blog
          </Link>

          <p className="blog-kicker mt-8 justify-center">
            {topic && <span>{topic}</span>}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </p>

          <h1 className="mt-5 text-balance text-display font-semibold leading-[1.06] tracking-display">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            {post.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3 text-left">
              <Image
                src="/favicon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full ring-1 ring-hairline"
                aria-hidden="true"
              />
              <div className="text-[13px] leading-tight">
                <p className="font-semibold text-fg">{post.author.name}</p>
                {post.author.role && (
                  <p className="mt-0.5 text-fg-muted">{post.author.role}</p>
                )}
              </div>
            </div>
            <SummariseButton />
          </div>
        </header>

        {post.image.url && (
          <figure className="rise rise-2 mx-auto mt-12 max-w-5xl px-4 sm:mt-16 sm:px-6">
            <div className="blog-hero">
              <PostImage post={post} sizes="(min-width: 1024px) 64rem, 100vw" />
            </div>
          </figure>
        )}

        <div className="blog-layout mt-12 px-5 sm:mt-16">
          <aside className="blog-layout__rail" aria-label="Share this article">
            <ShareLinks url={url} title={post.title} vertical />
          </aside>

          <div className="min-w-0">
            <div
              className="prose-q blog-prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-fg-muted">Share</span>
                <ShareLinks url={url} title={post.title} />
              </div>
            </footer>
          </div>

          <DocsToc
            contentSelector=".blog-prose"
            headingSelector="h1, h2, h3"
          />
        </div>
      </article>

      <div className="mx-auto mt-24 max-w-6xl px-4 sm:mt-32 sm:px-6">
        <PostCta />
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-h2 font-semibold leading-[1.06] tracking-display">
              Keep reading
            </h2>
            <Link href="/blog" className="blog-back group">
              All articles
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
