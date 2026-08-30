import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { SocialHeroVisual } from "@/components/feature-hero-visuals";
import { Orbit } from "@/components/sections/orbit";
import { Scheduling } from "@/components/sections/scheduling";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

const DESCRIPTION =
  "Orbit AI is the assistant built into your dashboard — grounded in the product's own docs, honest about what it can't see. It also writes your scheduled LinkedIn posts from the numbers that are already there.";

const faqs = [
  {
    q: "Is Orbit a chatbot bolted on?",
    a: "No. It answers from Quantalog's own reference and links to the exact docs page. When a question falls outside what it knows, it says so instead of inventing a feature.",
  },
  {
    q: "Which networks can it post to?",
    a: "LinkedIn today, to your own member feed. Instagram support is built but waiting on platform review, so it is not offered to new accounts yet.",
  },
  {
    q: "Does it post without me?",
    a: "Only on the schedule you set, and only after you have approved the draft. Nothing goes out unattended that you have not already read.",
  },
];

export const metadata: Metadata = {
  title: "AI analytics assistant and scheduled social posts",
  description: DESCRIPTION,
  alternates: { canonical: "/social" },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "AI analytics assistant",
    "AI analytics chatbot",
    "in-app support assistant",
    "schedule LinkedIn posts",
    "LinkedIn post scheduler",
    "AI-written social posts",
    "social media scheduling tool",
    "analytics to social content",
    "docs-grounded AI assistant",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}/social`,
    title: "AI analytics assistant and scheduled social posts",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI analytics assistant and scheduled social posts",
    description: DESCRIPTION,
  },
};

export default function SocialPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/social#page`,
      name: "AI analytics assistant and scheduled social posts",
      description: DESCRIPTION,
      url: `${site.url}/social`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: "/social",
      name: "Orbit AI assistant and scheduled social posts",
      description: DESCRIPTION,
      serviceType: "AI assistant and social scheduling",
    }),
    article({
      path: "/social",
      headline: "AI analytics assistant and scheduled social posts",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/social#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Orbit AI & social", path: "/social" },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Orbit AI & social"
        title={
          <>
            An assistant that knows the product,
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">and says what it doesn&apos;t.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Start free" }}
        secondary={{ label: "See the live demo" }}
        visual={<SocialHeroVisual />}
      />

      <Orbit />
      <div className="band mt-16 rounded-2xl">
        <Scheduling />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-[1.75rem] font-bold tracking-tight">
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

      <section className="mt-16 max-w-3xl">
        <p className="text-pretty leading-relaxed text-fg-muted">
          The reports Orbit helps write pull from the same place.
        </p>
        <Link
          href="/reports"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          See scheduled email &amp; WhatsApp reports
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Ask it anything after you sign up
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Orbit is on every plan, free tier included. So is one scheduled post a
          week — enough to keep a feed alive from the numbers you already have.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href={`${site.app}/login`} variant="secondary">
            See the live demo
          </Button>
        </div>
      </section>
    </div>
  );
}
