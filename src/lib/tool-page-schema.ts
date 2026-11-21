import type { Metadata } from "next";
import type { Faq } from "@/lib/faqs";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

type ToolPage = {
  path: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  published: string;
  modified: string;
};

export function toolPageMetadata(page: ToolPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(page.path),
    keywords: page.keywords,
    other: {
      "article:published_time": page.published,
      "article:modified_time": page.modified,
    },
    openGraph: {
      type: "website",
      url: `${site.url}${page.path}`,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function toolPageJsonLd(page: Pick<ToolPage, "path" | "name" | "description">, faqs: readonly Faq[]) {
  const url = `${site.url}${page.path}`;
  return graph(
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: page.name,
      description: page.description,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": SITE_ID },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: page.name, path: page.path },
    ])
  );
}
