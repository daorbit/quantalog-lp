import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllComparisons } from "@/lib/comparisons";
import { Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const DESCRIPTION =
  "How Quantalog compares to Google Analytics, Plausible and Matomo — consent banners, real-time reporting, SEO audits, script weight and price, with the cases where the other tool is the better choice.";

export const metadata: Metadata = {
  title: "Analytics tool comparisons",
  description: DESCRIPTION,
  alternates: { canonical: "/vs" },
  openGraph: {
    type: "website",
    url: `${site.url}/vs`,
    title: "Analytics tool comparisons",
    description: DESCRIPTION,
  },
};

export default function ComparisonsIndexPage() {
  const comparisons = getAllComparisons();

  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/vs#page`,
      name: "Analytics tool comparisons",
      description: DESCRIPTION,
      url: `${site.url}/vs`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: comparisons.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${site.url}/vs/${c.slug}`,
        })),
      },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Comparisons", path: "/vs" },
    ])
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="border-b border-border pb-10">
        <Eyebrow>Comparisons</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          How Quantalog compares
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">
          {DESCRIPTION}
        </p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {comparisons.map((c) => (
          <li key={c.slug}>
            <Link href={`/vs/${c.slug}`} className="card card-hover group block h-full p-6">
              <h2 className="font-semibold tracking-tight transition group-hover:text-accent">
                {c.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {c.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                Read the comparison
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
