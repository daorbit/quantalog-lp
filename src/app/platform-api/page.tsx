import type { Metadata } from "next";
import { Boxes, Gauge, KeyRound, Palette, Plug, Webhook } from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { ApiVisual } from "@/components/explore/visuals/api-visual";
import { CodeCard } from "@/components/code-card";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { ApiEndpoints, type ApiEndpoint } from "@/components/product/api-endpoints";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

const META_DESCRIPTION =
  "Embed white label analytics in your own product. One API key provisions a project per customer and reads their stats back — your branding, your UI.";

const DESCRIPTION =
  "Embed white label analytics in your own product. One API key provisions a project per customer, injects the tracker into the sites you generate, and reads their stats back into your dashboard — your branding, your UI, your customers.";

const createProject = `# 1. Your backend creates a project for one of your users
curl -X POST ${site.api}/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Jane'\\''s Store", "extUserId": "user_8812" }'

# 2. Register the site they deployed — the snippet comes back
curl -X POST ${site.api}/v1/projects/prj_31f/sites \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Store", "domain": "jane.shop" }'`;

const readStats = `// 3. Render their numbers inside YOUR product's UI
const res = await fetch(
  \`${site.api}/v1/sites/\${siteId}/stats?range=24h\`,
  { headers: { Authorization: \`Bearer \${process.env.QUANTALOG_KEY}\` } }
);

const { visitors, pageviews, live, topPages } = await res.json();`;

const endpoints: ApiEndpoint[] = [
  { method: "POST", path: "/v1/projects", desc: "Create a project for an end-user" },
  { method: "GET", path: "/v1/projects", desc: "List projects, filter by your user id" },
  { method: "POST", path: "/v1/projects/:pid/sites", desc: "Register a site, get the snippet" },
  { method: "GET", path: "/v1/projects/:pid/sites", desc: "List the sites under a project" },
  { method: "GET", path: "/v1/sites/:siteId/stats", desc: "Read every dashboard metric" },
  { method: "GET", path: "/v1/sites/:siteId/snippet", desc: "Fetch the snippet again, any time" },
  { method: "DELETE", path: "/v1/sites/:siteId", desc: "Remove a site and its data" },
];

const stats = [
  { value: "1", label: "Key for every tenant" },
  { value: "7", label: "Endpoints to learn" },
  { value: "3", label: "Calls, end to end" },
  { value: "0", label: "Pipelines to build" },
] as const;

const whoFor = [
  {
    icon: Boxes,
    title: "Site and app builders",
    body: "Every site your users publish gets analytics automatically. The tracker goes into the template you generate, so the customer never installs anything and never sees a setup step.",
  },
  {
    icon: Palette,
    title: "White label agencies",
    body: "Client dashboards under your own brand. Read the stats through the API and render them in your UI — your customers never encounter the Quantalog name unless you want them to.",
  },
  {
    icon: Plug,
    title: "SaaS products with a dashboard",
    body: "If your product already shows customers a dashboard, traffic and SEO data is a feature you can ship without building a pipeline, a store or a query layer for it.",
  },
];

const properties = [
  {
    icon: KeyRound,
    title: "One key, many tenants",
    body: "A single secret key manages every project. Each project is isolated: a customer's events, sites and stats are never reachable from another project's context.",
  },
  {
    icon: Gauge,
    title: "The same real-time data",
    body: "The stats endpoint returns what the dashboard shows, including the live visitor count. No batch job sits between an event and your API response.",
  },
  {
    icon: Webhook,
    title: "Delete means delete",
    body: "Removing a site removes its data. When your customer leaves your platform, you can honour their deletion request with one call rather than a support ticket.",
  },
];

const faqs = [
  {
    q: "Can I white label Quantalog analytics inside my own product?",
    a: "Yes. The Platform API returns raw JSON, so you render the numbers in your own interface with your own branding. Your customers do not need a Quantalog account and never see the Quantalog dashboard unless you link them to it.",
  },
  {
    q: "How do I give each of my customers their own analytics?",
    a: "Create one project per customer with your API key, passing your own user id as extUserId so you can look them up later. Register each site they publish under that project; the tracker snippet comes back in the response, ready to inject into whatever you generate.",
  },
  {
    q: "Is customer data isolated between projects?",
    a: "Yes. A project scopes its sites, events and stats. One customer's data is never returned by a request in the context of another project.",
  },
  {
    q: "What does the stats endpoint return?",
    a: "Every metric the dashboard renders — visitors, pageviews, sessions, bounce rate, live visitor count, top pages, referrers, channels, countries, devices and goals — for whatever range you ask for.",
  },
  {
    q: "What happens when one of my customers leaves?",
    a: "DELETE the site. Its events go with it, which is what lets you answer a deletion request from your own customer without escalating it to us.",
  },
];

export const metadata: Metadata = {
  title: "White label analytics API for your product",
  description: META_DESCRIPTION,
  alternates: { canonical: "/platform-api" },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "white label analytics API",
    "embedded analytics",
    "multi-tenant analytics API",
    "analytics API for SaaS",
    "embed analytics in my product",
    "client dashboard analytics",
    "analytics for site builders",
    "reseller analytics platform",
    "per-customer analytics provisioning",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}/platform-api`,
    title: "White label analytics API for your product",
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "White label analytics API for your product",
    description: META_DESCRIPTION,
  },
};

export default function PlatformApiPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/platform-api#page`,
      name: "White label analytics API for your product",
      description: META_DESCRIPTION,
      url: `${site.url}/platform-api`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: "/platform-api",
      name: "White label analytics API",
      description: META_DESCRIPTION,
      serviceType: "White label analytics API",
    }),
    article({
      path: "/platform-api",
      headline: "White label analytics API for your product",
      description: META_DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/platform-api#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Platform API", path: "/platform-api" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Platform API"
        title={
          <>
            Give analytics to{" "}
            <span className="text-accent">your</span> customers.
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Get an API key" }}
        secondary={{ label: "Read the API reference", href: "/docs/platform-api" }}
        visual={<ApiVisual />}
        tone="indigo"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <ProductSection
        eyebrow="How it works"
        title="Three calls, end to end."
        body="Provision a project, register a site, read the stats back. Everything between those three steps — collection, storage, aggregation — is ours to run."
      >
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          <CodeCard filename="provision.sh" language="bash" code={createProject} />
          <CodeCard filename="dashboard.ts" language="typescript" code={readStats} />
        </div>
      </ProductSection>

      <ProductSection
        eyebrow="Reference"
        title="Seven endpoints. That's the API."
        link={{ label: "Full API reference", href: "/docs/api-reference" }}
        bordered
      >
        <ApiEndpoints endpoints={endpoints} />
      </ProductSection>

      <ProductSection eyebrow="Who it's for" title="Built for products with customers." bordered>
        <ProductFeatureGrid features={whoFor} columns={3} />
      </ProductSection>

      <ProductSection eyebrow="Guarantees" title="What you can rely on." bordered>
        <ProductFeatureGrid features={properties} columns={3} />
      </ProductSection>

      <OrbitStrip
        body="Orbit answers from the API reference itself — the exact endpoint, the parameters it takes, and why a call came back the way it did. It is the same assistant your own customers get if you surface it in your product."
        examples={[
          "Which endpoint returns per-project stats?",
          "Why am I getting a 403 on this key?",
          "Show me the pagination parameters",
        ]}
      />

      <ProductFaq faqs={faqs} idPrefix="api-faq" />

      <RelatedProducts hrefs={["/analytics", "/reports", "/seo-audits"]} />

      <Cta
        title="Build it against the real API."
        body="Sign up, generate a key, and provision your first project in a few minutes. The free tier is enough to build and test the integration before a single customer is on it."
        secondary={{ label: "Full API reference", href: "/docs/api-reference" }}
        location="platform_api_cta"
      />
    </>
  );
}
