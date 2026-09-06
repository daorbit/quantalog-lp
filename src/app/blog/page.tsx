import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Eyebrow } from "@/components/ui";
import { PostImage } from "@/components/post-image";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes and product updates from the Quantalog team — privacy-first analytics, real-time data, and the platform API.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: "Blog",
    description:
      "Engineering notes and product updates from the Quantalog team.",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  const jsonLd = graph(
    {
      "@type": "Blog",
      "@id": `${site.url}/blog#blog`,
      name: `${site.name} Blog`,
      description:
        "Engineering notes and product updates from the Quantalog team.",
      url: `${site.url}/blog`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${site.url}/blog/${post.slug}`,
        author: { "@type": "Person", name: post.author.name },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ])
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <JsonLd data={jsonLd} />
      <header className="max-w-2xl">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.5rem] font-bold leading-[1.1] tracking-[-0.03em]">
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
          className="card card-hover group mt-14 block overflow-hidden"
        >
          {/* The lead post gets the wide crop; the rest sit in the grid below. */}
          <div className="aspect-[2/1] w-full overflow-hidden bg-bg-subtle">
            <PostImage
              post={featured}
              sizes="(min-width: 896px) 896px, 100vw"
              className="transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-medium text-accent">
                Latest
              </span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{featured.readingMinutes} min read</span>
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
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-bg-subtle">
                <PostImage
                  post={post}
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-2.5 text-balance text-lg font-semibold tracking-tight transition group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-pretty text-sm leading-relaxed text-fg-muted">
                  {post.description}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2 py-0.5 text-[11px] text-fg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
