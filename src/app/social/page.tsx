import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { Orbit } from "@/components/sections/orbit";
import { Scheduling } from "@/components/sections/scheduling";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Orbit AI and scheduled social posts, as a page rather than two homepage
 * sections.
 *
 * Both answer "what does the AI do here", and putting an AI pitch at the top
 * of a landing page reads as the product being sold on the model. Lifted onto
 * their own route, they get a title that can rank for "AI analytics assistant"
 * and "schedule LinkedIn posts from analytics", and the homepage gets shorter.
 */

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
  openGraph: {
    type: "website",
    url: `${site.url}/social`,
    title: "AI analytics assistant and scheduled social posts",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI analytics assistant and scheduled social posts",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
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
    <div className="mx-auto max-w-5xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl border-b border-border pb-12">
        <Eyebrow>Orbit AI &amp; social</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          An assistant that knows the product,
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">and says what it doesn&apos;t.</span>
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          {DESCRIPTION}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`} size="lg">
            Start free
          </Button>
          <Button href={`${site.app}/login`} variant="secondary" size="lg">
            See the live demo
          </Button>
        </div>
      </header>

      <Orbit />
      <div className="band mt-16 rounded-2xl">
        <Scheduling />
      </div>

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

      <section className="mt-16">
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
