import { Hero } from "@/components/sections/hero";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { Logos } from "@/components/sections/logos";
import { ConsentGap } from "@/components/sections/consent-gap";
import { Demo } from "@/components/sections/demo";
import { Features } from "@/components/sections/features";
import { Orbit } from "@/components/sections/orbit";
import { Explore } from "@/components/sections/explore";
import { TryDemo } from "@/components/sections/try-demo";
import { HowItWorks, steps as setupSteps } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Faq, faqs } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { ChartDivider } from "@/components/chart-divider";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { graph, organization, website, author, article, howTo, ORG_ID, SITE_ID } from "@/lib/schema";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

export const metadata: Metadata = {
  alternates: { canonical: "/" },

  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
};

const jsonLd = graph(
  organization,
  website,
  author,

  article({
    path: "/",
    headline: `${site.name} — ${site.tagline}`,
    description: site.description,
    published: PUBLISHED,
    modified: MODIFIED,
  }),
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
      "Device, browser and country breakdowns",
      "Traffic by hour of day",
      "SEO audits with Lighthouse scores",
      "Broken link and structured data checks",
      "Multi-tenant Platform API",
      "Public shareable dashboards",
      "Shareable SEO audit reports",
      "Scheduled email reports with spreadsheet attachments",
      "Orbit AI in-app support assistant",
      "Scheduled LinkedIn posts written with Orbit AI",
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
  },

  howTo({
    path: "/",
    name: "How to add cookieless web analytics to your site",
    description:
      "Add real-time, consent-free analytics in about two minutes — no SDK, no build step, no cookie policy change.",
    steps: setupSteps.map((s) => ({ name: s.title, text: s.body })),
  })
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <DashboardShowcase />

      <Demo />
      <Reveal as="section">
        <Logos />
      </Reveal>

      <div className="band-deep">
        <ConsentGap />
      </div>
      <ChartDivider variant="reported" />
      <Features />

  
      <Orbit />

      <Explore />

      <TryDemo />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Reveal as="section">
        <Cta />
      </Reveal>
    </>
  );
}
