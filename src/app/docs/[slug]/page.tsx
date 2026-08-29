import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import {
  getDoc,
  getDocNav,
  getDocSiblings,
  getDocSlugs,
} from "@/lib/docs";
import { site } from "@/lib/site";
import { DocsNav } from "@/components/docs-nav";
import { DocsToc } from "@/components/docs-toc";
import { DocsCommand } from "@/components/docs-command";
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

  const groups = getDocNav();
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
    <div className="docs-shell">
      <JsonLd data={jsonLd} />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="mb-4">
            <Suspense fallback={null}>
              <DocsCommand groups={groups} />
            </Suspense>
          </div>
          <DocsNav groups={groups} />
        </aside>

        <article className="min-w-0">
          <nav className="docs-breadcrumb" aria-label="Breadcrumb">
            <Link href="/docs">Docs</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span>{doc.category}</span>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-fg-muted">{doc.title}</span>
          </nav>

          <header className="mt-4 border-b border-border pb-6">
            <h1 className="text-balance text-[1.875rem] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[2.25rem]">
              {doc.title}
            </h1>
            <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
              {doc.description}
            </p>
          </header>

          <div className="prose-q mt-8">
            <Body />
          </div>

          <nav className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/docs/${prev.slug}`}
                className="card card-hover group p-4"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-fg-faint">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <p className="mt-1 text-sm font-semibold tracking-tight transition group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/docs/${next.slug}`}
                className="card card-hover group p-4 sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-fg-faint sm:w-full sm:justify-end">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <p className="mt-1 text-sm font-semibold tracking-tight transition group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        </article>

        <DocsToc />
      </div>
    </div>
  );
}
