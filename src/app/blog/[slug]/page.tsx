import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getPost, getRelatedPosts, getSlugs } from "@/lib/blog";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { PostImage } from "@/components/post-image";
import { PostCard } from "@/components/blog/post-card";
import { PostCta } from "@/components/blog/post-cta";
import { PostHeader } from "@/components/blog/post-header";
import { PostShare } from "@/components/blog/post-share";
import { SummariseWith } from "@/components/orbit/summarise-with";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { pageAlternates } from "@/lib/alternates";

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
    alternates: pageAlternates(`/blog/${post.slug}`),
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
  const url = `${site.url}/blog/${post.slug}`;

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
      image: `${site.url}/blog/${post.slug}/opengraph-image`,
      inLanguage: "en",
      keywords: post.tags.join(", "),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ])
  );

  return (
    <div>
      <JsonLd data={jsonLd} />
      <div className="blog-progress scroll-progress" aria-hidden="true" />

      <article className="mx-auto max-w-6xl px-4 sm:px-6">
        <PostHeader post={post} />

        {post.image.url && (
          <figure className="rise rise-2 mx-auto mt-10 max-w-5xl sm:mt-14">
            <div className="blog-cover aspect-video">
              <PostImage post={post} priority sizes="(min-width: 1024px) 64rem, 100vw" />
            </div>
          </figure>
        )}

        <div className="post-layout mt-10 sm:mt-16">
          <div className="min-w-0">
            <div className="prose-q" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span />
              )}
              <PostShare url={url} title={post.title} />
            </div>
          </div>

          <aside className="post-rail">
            <p className="post-rail__label">Share</p>
            <PostShare url={url} title={post.title} />
            <div className="mt-8 border-t border-border pt-6">
              <SummariseWith variant="stacked" />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4 sm:mt-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-fg sm:text-[1.75rem]">
              Keep reading
            </h2>
            <Link href="/blog" className="blog-back group">
              All articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto mt-16 max-w-6xl px-4 pb-16 sm:mt-24 sm:px-6 sm:pb-24">
        <PostCta />
      </div>
    </div>
  );
}
