import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { WhyHero } from "@/components/why/why-hero";
import { WhyDoc } from "@/components/why/why-doc";
import { WhyFaq } from "@/components/why/why-faq";
import { WHY_DESCRIPTION, whyFaqs, whyStats } from "@/components/why/why-data";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

const TITLE = "Why Quantalog";

export const metadata: Metadata = {
  title: TITLE,
  description: WHY_DESCRIPTION,
  alternates: pageAlternates("/why-quantalog"),
  openGraph: {
    type: "website",
    url: `${site.url}/why-quantalog`,
    title: `${TITLE} — one workspace to grow your business`,
    description: WHY_DESCRIPTION,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — one workspace to grow your business`,
    description: WHY_DESCRIPTION,
    images: [site.ogImage],
  },
};

export default function WhyQuantalogPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/why-quantalog#page`,
      name: TITLE,
      description: WHY_DESCRIPTION,
      url: `${site.url}/why-quantalog`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/why-quantalog#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: whyFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: TITLE, path: "/why-quantalog" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <WhyHero />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={whyStats} />
        </div>
      </div>

      <WhyDoc />
      <WhyFaq />

      <section>
        <Cta />
      </section>
    </>
  );
}
