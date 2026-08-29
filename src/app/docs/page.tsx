import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDocNav } from "@/lib/docs";
import { DocsNav } from "@/components/docs-nav";
import { DocsCommand } from "@/components/docs-command";
import { Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Everything you need to install Quantalog, track custom events, and embed analytics into your own product with the Platform API.",
  alternates: { canonical: "/docs" },
  openGraph: {
    type: "website",
    url: `${site.url}/docs`,
    title: "Documentation",
    description:
      "Install the tracker, track custom events, and embed analytics into your own product with the Platform API.",
  },
};

export default function DocsIndexPage() {
  const groups = getDocNav();
  const allDocs = groups.flatMap((g) => g.docs);

  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/docs#page`,
      name: "Documentation",
      description:
        "Everything you need to install Quantalog, track custom events, and embed analytics into your own product.",
      url: `${site.url}/docs`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: allDocs.map((doc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: doc.title,
          description: doc.description,
          url: `${site.url}/docs/${doc.slug}`,
        })),
      },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Docs", path: "/docs" },
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

        <main className="min-w-0">
          <header className="max-w-2xl">
            <Eyebrow>Documentation</Eyebrow>
            <h1 className="mt-3 text-balance text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.25rem]">
              Ship analytics in an afternoon
            </h1>
            <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
              Install the tracker, track the events that matter, and — when
              you&apos;re ready — embed the whole thing into your own product.
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <section key={group.category}>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
                  {group.category}
                </h2>
                <div className="card mt-3 divide-y divide-border overflow-hidden">
                  {group.docs.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      className="group flex items-start justify-between gap-4 p-4 transition hover:bg-bg-subtle"
                    >
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight transition group-hover:text-accent">
                          {doc.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-snug text-fg-muted">
                          {doc.description}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
