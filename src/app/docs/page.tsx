import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDocNav } from "@/lib/docs";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
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
    <div className="docs-page">
      <JsonLd data={jsonLd} />
      <div className="docs-article">
        <DocsBreadcrumb trail={[]} />

        <header>
          <h1 className="docs-title">Ship analytics in an afternoon</h1>
          <p className="docs-lead">
            Install the tracker, track the events that matter, and — when
            you&apos;re ready — embed the whole thing into your own product.
          </p>
        </header>

        {groups.map((group) => (
          <section key={group.category} className="docs-index-group">
            <h2 className="docs-index-heading">{group.category}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="card card-hover group flex items-start justify-between gap-4 p-4"
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
    </div>
  );
}
