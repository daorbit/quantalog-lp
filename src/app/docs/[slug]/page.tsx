import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getDoc,
  getDocNav,
  getDocSiblings,
  getDocSlugs,
} from "@/lib/docs";
import { site } from "@/lib/site";
import { DocsNav } from "@/components/docs-nav";

type Params = { slug: string };

// Every doc renders at build time; the whole /docs tree ships as static HTML.
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

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <DocsNav groups={groups} />
        </aside>

        <article className="min-w-0">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            All docs
          </Link>

          <header className="mt-6 border-b border-border pb-8">
            <h1 className="text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[2.5rem]">
              {doc.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-fg-muted">
              {doc.description}
            </p>
          </header>

          <div className="prose-q mt-10">
            <Body />
          </div>

          <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/docs/${prev.slug}`}
                className="card card-hover group p-5"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
                <p className="mt-1.5 font-semibold tracking-tight transition group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/docs/${next.slug}`}
                className="card card-hover group p-5 sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted sm:justify-end sm:w-full">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <p className="mt-1.5 font-semibold tracking-tight transition group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
