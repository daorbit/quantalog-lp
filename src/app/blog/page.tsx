import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Eyebrow } from "@/components/ui";
import { PostImage } from "@/components/post-image";
import { PostList } from "@/components/post-list";
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
  // The newest post is highlighted alongside the archive, not removed from it —
  // a reader scanning the list should still find it in date order.
  const [featured] = posts;

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
    <div className="mx-auto max-w-7xl px-5 py-14">
      <JsonLd data={jsonLd} />
      <header className="max-w-2xl">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-3 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em]">
          Notes from the build
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
          How we think about privacy, real-time data pipelines, and shipping
          analytics that other products can build on.
        </p>
      </header>

      {posts.length === 0 && (
        <p className="mt-12 text-sm text-fg-muted">
          Nothing published yet. Check back shortly.
        </p>
      )}

      {/* Two columns: the archive pages down the left, the lead post sits to
          the right where it stays put while the list is paged. */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div className="order-2 lg:order-1">
          <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
            All posts
          </h2>
          <PostList posts={posts} />
        </div>

        {featured && (
          <aside className="order-1 lg:order-2 lg:sticky lg:top-20">
            <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
              Highlighted
            </h2>

            <Link
              href={`/blog/${featured.slug}`}
              className="card card-hover group block overflow-hidden"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-bg-subtle">
                <PostImage
                  post={featured}
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-medium text-accent">
                    Latest
                  </span>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingMinutes} min read</span>
                </div>
                <h3 className="mt-2.5 text-balance text-lg font-bold leading-snug tracking-tight transition group-hover:text-accent">
                  {featured.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">
                  {featured.description}
                </p>
                <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read post
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </aside>
        )}
      </div>

    </div>
  );
}
