import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Eyebrow } from "@/components/ui";
import { Rss } from "lucide-react";
import { PostIndex } from "@/components/blog/post-index";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes and product updates from the Quantalog team — privacy-first analytics, real-time data, and the platform API.",
  alternates: pageAlternates("/blog"),
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: "Blog",
    description:
      "Engineering notes and product updates from the Quantalog team.",
  },
};

export default async function BlogIndexPage() {
  const posts = (await getAllPosts()).filter((post) => !post.noIndex);

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
        dateModified: post.updated ?? post.date,
        url: `${site.url}/blog/${post.slug}`,
        image: `${site.url}/blog/${post.slug}/opengraph-image`,
        author: { "@type": "Person", name: post.author.name },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ])
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
      <JsonLd data={jsonLd} />
      <header className="flex flex-wrap items-end justify-between gap-6 pt-12 sm:pt-20">
        <div className="max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="headline mt-3 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-display sm:text-[3.5rem]">
            Notes from the build
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-muted sm:text-[18px]">
            How we think about privacy, real-time data pipelines, and shipping
            analytics that other products can build on.
          </p>
        </div>
        <a
          href="/feed.xml"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <Rss className="h-4 w-4" aria-hidden="true" />
          RSS feed
        </a>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-[15px] text-fg-muted">
          Nothing published yet. Check back shortly.
        </p>
      ) : (
        <div className="rise mt-10 sm:mt-14">
          <PostIndex posts={posts} />
        </div>
      )}
    </div>
  );
}
