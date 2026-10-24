import { BUILD_DATE } from "@/lib/build-date";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Countries } from "@/components/sections/countries";
import { BookMeeting } from "@/components/sections/book-meeting";
import { ConsentGap } from "@/components/sections/consent-gap";
import { Explore } from "@/components/sections/explore";
import { AiAssistants } from "@/components/sections/ai-assistants";
import { OrbitAi } from "@/components/sections/orbit-ai";
import { DashboardsGoals } from "@/components/sections/dashboards-goals";
import { QuantalogApps } from "@/components/sections/quantalog-apps";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Referrals } from "@/components/sections/referrals";
import { Faq } from "@/components/sections/faq";
import { faqs } from "@/lib/faqs";
import { Cta } from "@/components/sections/cta";
import { PageDate } from "@/components/page-date";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { graph, organization, website, author, ORG_ID, SITE_ID, AUTHOR_ID } from "@/lib/schema";
import { pageAlternates } from "@/lib/alternates";

const PUBLISHED = "2025-11-01";
const MODIFIED = BUILD_DATE;

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
};

const jsonLd = graph(
  organization,
  website,
  author,
  {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Web Analytics",
    operatingSystem: "Web",
    description: site.description,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
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
      "Orbit AI Chrome extension in the browser side panel",
      "Orbit AI natural-language analytics questions",
      "Orbit AI image generation and image reading",
      "Orbit AI competitor analysis and SEO briefs",
      "Scheduled LinkedIn posts written with Orbit AI",
      "Booking forms with Google Calendar sync and Google Meet links",
      "Form payments through Razorpay, Cashfree and PayU",
      "Form notification email through Brevo or your own SMTP server",
      "Submission webhooks for Zapier, Make and custom endpoints",
      "Read-only Claude and ChatGPT connectors for forms, leads, bookings and traffic",
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
  }
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Logos />
      <Countries />
      <ConsentGap />
      <Explore />
      <BookMeeting />
      <DashboardsGoals />
      <AiAssistants />
      <QuantalogApps />
      <OrbitAi />
      <HowItWorks />
      <Pricing />
      <Referrals />
      <Faq />
      <section>
        <Cta />
      </section>
      <PageDate published={PUBLISHED} modified={MODIFIED} />
    </>
  );
}
