import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, getDocSiblings, getDocSlugs } from "@/lib/docs";
import { site } from "@/lib/site";
import { DocsToc } from "@/components/docs-toc";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import { DocsPager } from "@/components/docs-pager";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getDocSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "Not found" };

  return {
    title: `${doc.title} — Docs`,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/docs/${doc.slug}`,
      title: doc.title,
      description: doc.description,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { prev, next } = getDocSiblings(slug);
  const { Body } = doc;

  const jsonLd = graph(
    {
      "@type": "TechArticle",
      "@id": `${site.url}/docs/${doc.slug}#article`,
      headline: doc.title,
      description: doc.description,
      url: `${site.url}/docs/${doc.slug}`,
      articleSection: doc.category,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      author: { "@id": ORG_ID },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Docs", path: "/docs" },
      { name: doc.title, path: `/docs/${doc.slug}` },
    ])
  );

  return (
    <div className="docs-page">
      <JsonLd data={jsonLd} />
      <article className="docs-article">
        <DocsBreadcrumb trail={[doc.category, doc.title]} />

        <header>
          <h1 className="docs-title">{doc.title}</h1>
          <p className="docs-lead">{doc.description}</p>
        </header>

        <div className="prose-q">
          <Body />
        </div>

        <DocsPager prev={prev} next={next} />
      </article>

      <DocsToc />
    </div>
  );
}
