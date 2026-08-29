import type { Metadata } from "next";
import { Suspense } from "react";
import { getDocNav } from "@/lib/docs";
import { DocsNav } from "@/components/docs-nav";
import { DocsSearch } from "@/components/docs-search";
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

  // A flat list of every doc, in nav order — this is what tells a crawler the
  // shape of the documentation set from the index alone.
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
    <div className="mx-auto max-w-6xl px-5 py-16">
      <JsonLd data={jsonLd} />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <DocsNav groups={groups} />
        </aside>

        <main className="min-w-0">
          <header className="max-w-2xl">
            <Eyebrow>Documentation</Eyebrow>
            <h1 className="mt-4 text-balance text-[2.5rem] font-bold leading-[1.1] tracking-[-0.03em]">
              Ship analytics in an afternoon
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
              Install the tracker, track the events that matter, and — when
              you&apos;re ready — embed the whole thing into your own product.
            </p>
          </header>

          {/* The list, the search box, and the `?q=` handling. Suspense is
              required around anything reading `useSearchParams` in the app
              router. */}
          <Suspense fallback={<div className="mt-14" />}>
            <DocsSearch groups={groups} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
