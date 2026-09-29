import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Eyebrow } from "@/components/ui";
import { PostGrid } from "@/components/blog/post-grid";
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
  // A noindex post is left off the archive as well as the sitemap — linking it
  // from an indexable page is the thing the flag is trying to prevent.
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
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
      <JsonLd data={jsonLd} />
      <header className="mx-auto max-w-3xl pt-16 text-center sm:pt-24">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="headline mt-4 text-balance text-display font-semibold leading-[1.04] tracking-display">
          Notes from the build
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lead leading-normal text-fg-muted">
          How we think about privacy, real-time data pipelines, and shipping
          analytics that other products can build on.
        </p>
      </header>

      {posts.length === 0 && (
        <p className="mt-16 text-center text-sm text-fg-muted">
          Nothing published yet. Check back shortly.
        </p>
      )}

      {posts.length > 0 && (
        <section className="rise mt-16 sm:mt-24">
          <PostGrid posts={posts} />
        </section>
      )}
    </div>
  );
}
