import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ConsentGap } from "@/components/sections/consent-gap";
import { MoreFeatures } from "@/components/sections/more-features";
import { Explore } from "@/components/sections/explore";
import { DashboardsGoals } from "@/components/sections/dashboards-goals";
import { HowItWorks } from "@/components/sections/how-it-works";
import { steps as setupSteps } from "@/components/setup/setup-steps";
import { Pricing } from "@/components/sections/pricing";
import { Referrals } from "@/components/sections/referrals";
import { Faq } from "@/components/sections/faq";
import { faqs } from "@/lib/faqs";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { PageDate } from "@/components/page-date";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { graph, organization, website, author, article, howTo, ORG_ID, SITE_ID, AUTHOR_ID } from "@/lib/schema";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-10-07";

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
    image: `${site.url}/new-og-image.webp`,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    author: { "@id": AUTHOR_ID },
    datePublished: PUBLISHED,
    dateModified: MODIFIED,

    offers: {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "10k pageviews per month, free forever",
      availability: "https://schema.org/InStock",
      url: site.url,
    },
    featureList: [
      "Real-time visitor dashboard",
      "Custom dashboards from 20 templates",
      "Monthly and quarterly goal targets with pace tracking",
      "Embeddable live widgets",
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
      "Orbit AI natural-language analytics questions",
      "Orbit AI image generation and image reading",
      "Orbit AI competitor analysis and SEO briefs",
      "Scheduled LinkedIn posts written with Orbit AI",
      "Form payments through Razorpay, Cashfree and PayU",
      "Form notification email through Brevo or your own SMTP server",
      "Submission webhooks for Zapier, Make and custom endpoints",
      "Referral program with discount coupons for every invite that joins",
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
      <Logos />
      <Explore />
      <ConsentGap />
      <MoreFeatures />
      <HowItWorks />
      <DashboardsGoals />
      <Pricing />
      <Referrals />
      <Faq />
      <Reveal as="section">
        <Cta />
      </Reveal>
      <PageDate published={PUBLISHED} modified={MODIFIED} />
    </>
  );
}
