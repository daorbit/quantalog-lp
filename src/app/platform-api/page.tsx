import type { Metadata } from "next";
import { ArrowRight, Boxes, Gauge, KeyRound, Palette, Plug, Webhook } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { PlatformHeroVisual } from "@/components/feature-hero-visuals";
import { CodeCard } from "@/components/code-card";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

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

const endpoints = [
  { method: "POST", path: "/v1/projects", desc: "Create a project for an end-user" },
  { method: "GET", path: "/v1/projects", desc: "List projects, filter by your user id" },
  { method: "POST", path: "/v1/projects/:pid/sites", desc: "Register a site, get the snippet" },
  { method: "GET", path: "/v1/projects/:pid/sites", desc: "List the sites under a project" },
  { method: "GET", path: "/v1/sites/:siteId/stats", desc: "Read every dashboard metric" },
  { method: "GET", path: "/v1/sites/:siteId/snippet", desc: "Fetch the snippet again, any time" },
  { method: "DELETE", path: "/v1/sites/:siteId", desc: "Remove a site and its data" },
];

const methodStyle: Record<string, string> = {
  GET: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  POST: "border-accent/30 bg-accent/10 text-accent",
  DELETE: "border-rose-500/30 bg-rose-500/10 text-rose-500",
};

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
  description: DESCRIPTION,
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
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "White label analytics API for your product",
    description: DESCRIPTION,
  },
};

export default function PlatformApiPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/platform-api#page`,
      name: "White label analytics API for your product",
      description: DESCRIPTION,
      url: `${site.url}/platform-api`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: "/platform-api",
      name: "White label analytics API",
      description: DESCRIPTION,
      serviceType: "White label analytics API",
    }),
    article({
      path: "/platform-api",
      headline: "White label analytics API for your product",
      description: DESCRIPTION,
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
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
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
        visual={<PlatformHeroVisual />}
      />

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Three calls, end to end
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          Provision a project, register a site, read the stats back. Everything
          between those three steps — collection, storage, aggregation — is ours
          to run.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal delay={1}>
            <CodeCard filename="provision.sh" language="bash" code={createProject} />
          </Reveal>
          <Reveal delay={2}>
            <CodeCard filename="dashboard.ts" language="typescript" code={readStats} />
          </Reveal>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">Endpoints</h2>
        <Reveal className="card mt-8 overflow-hidden">
          <div className="divide-y divide-border">
            {endpoints.map((e) => (
              <div
                key={`${e.method} ${e.path}`}
                className="flex flex-col gap-1.5 px-5 py-3.5 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:gap-4"
              >
                <span
                  className={`inline-flex w-fit shrink-0 justify-center rounded border px-1.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wide sm:w-18 ${methodStyle[e.method]}`}
                >
                  {e.method}
                </span>
                <code className="font-mono text-[13px] text-fg">{e.path}</code>
                <span className="text-xs text-fg-muted sm:ml-auto">{e.desc}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">Who this is for</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {whoFor.map((w, i) => (
            <Reveal
              key={w.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <w.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{w.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What you can rely on
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {properties.map((p, i) => (
            <Reveal
              key={p.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <p.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Common questions
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2.5 text-pretty leading-relaxed text-fg-muted">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Build it against the real API
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Sign up, generate a key, and provision your first project in a few
          minutes. The free tier is enough to build and test the integration
          before a single customer is on it.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Get an API key</Button>
          <Link
            href="/docs/api-reference"
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-accent"
          >
            Full API reference
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
