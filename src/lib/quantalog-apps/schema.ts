import { BUILD_DATE } from "@/lib/build-date";
import { article, breadcrumbs, graph, ORG_ID, service, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";
import type { AppPage } from "./types";

export function faqPage(path: string, faqs: readonly Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}${path}#faq`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function appPageJsonLd(app: AppPage, path: string) {
  const name = `${app.name}: ${app.title} ${app.accent}`;
  return graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}${path}#page`,
      name,
      description: app.metaDescription,
      url: `${site.url}${path}`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}${path}/opengraph-image` },
    },
    service({ path, name: app.name, description: app.metaDescription, serviceType: `${app.group} app` }),
    article({ path, headline: name, description: app.metaDescription, published: app.launched, modified: BUILD_DATE }),
    faqPage(path, app.faqs),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Quantalog Apps", path: "/apps" },
      { name: app.shortName, path },
    ]),
  );
}
