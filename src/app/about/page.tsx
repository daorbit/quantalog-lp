import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutPrinciples } from "@/components/about/about-principles";
import { AboutCompany } from "@/components/about/about-company";
import { ABOUT_DESCRIPTION, aboutFaqs, aboutStats } from "@/components/about/about-data";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    title: "About Quantalog",
    description: ABOUT_DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Quantalog",
    description: ABOUT_DESCRIPTION,
    images: ["/OgImage.png"],
  },
};

export default function AboutPage() {
  const jsonLd = graph(
    {
      "@type": "AboutPage",
      "@id": `${site.url}/about#page`,
      name: "About Quantalog",
      description: ABOUT_DESCRIPTION,
      url: `${site.url}/about`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/about#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: aboutFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutHero />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={aboutStats} />
        </div>
      </div>

      <AboutStory />
      <AboutPrinciples />
      <AboutCompany />

      <Reveal as="section">
        <Cta />
      </Reveal>
    </>
  );
}
