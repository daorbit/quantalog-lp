import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ConsentGap } from "@/components/sections/consent-gap";
import { Demo } from "@/components/sections/demo";
import { Features } from "@/components/sections/features";
import { TryDemo } from "@/components/sections/try-demo";
import { Seo } from "@/components/sections/seo";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Compare } from "@/components/sections/compare";
import { Platform } from "@/components/sections/platform";
import { Pricing } from "@/components/sections/pricing";
import { Faq, faqs } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { graph, organization, website, ORG_ID, SITE_ID } from "@/lib/schema";

// The homepage inherits title, description and social cards from the root
// layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = graph(
  organization,
  website,
  {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Web Analytics",
    operatingSystem: "Web",
    description: site.description,
    url: site.url,
    image: `${site.url}/OgImage.png`,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    // Named so a rich result can say what the free tier actually includes
    // rather than just "$0".
    offers: {
      "@type": "Offer",
      name: "Hobby",
      price: "0",
      priceCurrency: "USD",
      description: "10k pageviews per month, free forever",
      availability: "https://schema.org/InStock",
      url: site.url,
    },
    featureList: [
      "Real-time visitor dashboard",
      "Cookieless, consent-free tracking",
      "Funnels and conversion goals",
      "Retention cohorts",
      "SEO audits with Lighthouse scores",
      "Broken link and structured data checks",
      "Multi-tenant Platform API",
      "Public shareable dashboards",
      "Shareable SEO audit reports",
    ],
  },
  {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      {/* Straight after the hero: the tour answers "what is this" faster than
          any amount of copy below it can. */}
      {/* <Demo /> */}
      <Logos />
      {/* The argument, before the feature list: why cookie-based tools
          under-report, then what you get instead. */}
      <ConsentGap />
      <Features />
      {/* SEO gets its own section rather than one card in the grid: it is the
          half of the product a pure counter cannot do, so it carries the
          argument for choosing this over one. */}
      <Seo />
      {/* After the case is made and before the comparison: the visitor now
          knows what is claimed, and looking is cheaper than reading on. */}
      <TryDemo />
      <HowItWorks />
      <Compare />
      <Platform />
      {/* <Pricing /> */}
      <Faq />
      <Cta />
    </>
  );
}
