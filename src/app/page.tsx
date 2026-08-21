import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ConsentGap } from "@/components/sections/consent-gap";
import { Demo } from "@/components/sections/demo";
import { Features } from "@/components/sections/features";
import { TryDemo } from "@/components/sections/try-demo";
import { Seo } from "@/components/sections/seo";
import { Reports } from "@/components/sections/reports";
import { Orbit } from "@/components/sections/orbit";
import { Scheduling } from "@/components/sections/scheduling";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Compare } from "@/components/sections/compare";
import { Platform } from "@/components/sections/platform";
import { Pricing } from "@/components/sections/pricing";
import { Faq, faqs } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { ChartDivider } from "@/components/chart-divider";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { graph, organization, website, author, article, ORG_ID, SITE_ID } from "@/lib/schema";

// The homepage inherits title, description and social cards from the root
// layout; only the canonical is page-specific.
/** Kept beside the Article node so the tag and the schema can never disagree. */
const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  // A machine-readable date, in the tag form crawlers read without having to
  // parse the JSON-LD graph first.
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
};

const jsonLd = graph(
  organization,
  website,
  author,
  // The homepage doubles as the product explainer, so it carries an Article
  // node: it is what lets an answer engine quote the page and attribute the
  // quote to a named author and a date.
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
  }
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      {/* Straight after the hero: the tour answers "what is this" faster than
          any amount of copy below it can. */}
      <Demo />
      <Logos />
      {/* The observed line runs into the consent-gap section and the reported
          one runs out of it — the section's whole argument, drawn on its two
          edges. Used sparingly: a divider between every section would be
          wallpaper rather than a device. */}
      <ChartDivider variant="observed" filled />
      {/* The argument, before the feature list: why cookie-based tools
          under-report, then what you get instead. */}
      <div className="band-deep">
        <ConsentGap />
      </div>
      <ChartDivider variant="reported" />
      <Features />
      {/* SEO gets its own section rather than one card in the grid: it is the
          half of the product a pure counter cannot do, so it carries the
          argument for choosing this over one. */}
      <Seo />
      {/* Directly after SEO: both answer "why not just a pageview counter",
          and this one closes with the deliverable a buyer hands to someone
          else. */}
      <Reports />
      {/* Last of the "more than a counter" run, and placed here rather than
          near the top on purpose: an AI section opening a landing page reads as
          the product being sold on the model. It lands better once the visitor
          knows what there is to ask about. */}
      <Orbit />
      {/* Straight after Orbit, because it is Orbit put to work: the assistant
          section explains what it is, and this one shows the thing it does
          that no other analytics product does. */}
      <div className="band">
        <Scheduling />
      </div>
      <ChartDivider variant="observed" />
      {/* After the case is made and before the comparison: the visitor now
          knows what is claimed, and looking is cheaper than reading on. */}
      <TryDemo />
      <HowItWorks />
      <Compare />
      <Platform />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
