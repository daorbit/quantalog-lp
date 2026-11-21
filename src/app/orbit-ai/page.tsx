import { BUILD_DATE } from "@/lib/build-date";
import type { Metadata } from "next";
import {
  BarChart3,
  BookOpenCheck,
  CornerDownRight,
  LifeBuoy,
  Lock,
  Mic,
  Shuffle,
  Wrench,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { OrbitVisual } from "@/components/explore/visuals/orbit-visual";
import { Orbit } from "@/components/sections/orbit";
import { OrbitExtension } from "@/components/sections/orbit-extension";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid, type ProductFeature } from "@/components/product/product-feature-grid";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

const PATH = "/orbit-ai";
const PUBLISHED = "2026-11-21";
const MODIFIED = BUILD_DATE;

const TITLE = "AI analytics assistant built into your dashboard";

const META_DESCRIPTION =
  "Orbit is the AI analytics assistant inside Quantalog. It answers from the product's own docs, explains SEO issues, and on Pro reads your workspace numbers.";

const DESCRIPTION =
  "Orbit answers from the product's own docs, tells you how to fix an SEO issue, and on the Pro plan reads a summary of your workspace before it answers.";

const stats = [
  { value: "10", label: "Questions a month on Free" },
  { value: "2,000", label: "Questions a month on Pro" },
  { value: "3", label: "Suggested follow-ups per answer" },
  { value: "0", label: "Conversations used for training" },
] as const;

const features: ProductFeature[] = [
  {
    icon: BookOpenCheck,
    title: "Grounded in the docs",
    body: "Orbit answers from a reference kept in step with the product, so it never describes a button that doesn't exist.",
  },
  {
    icon: Wrench,
    title: "Fixes SEO issues",
    body: "Paste an audit issue and get the steps to resolve it, including the tag to add and where it goes.",
  },
  {
    icon: BarChart3,
    title: "Reads your analytics",
    body: "On the Pro plan, a seven-day summary of your workspace goes with each question, so \"why is traffic down?\" gets an answer.",
  },
  {
    icon: CornerDownRight,
    title: "Suggested follow-ups",
    body: "Every answer comes with up to three one-tap follow-ups, each one answerable, so none lead to a dead end.",
  },
  {
    icon: Mic,
    title: "Ask by voice",
    body: "Dictate a question with your browser's speech recognition in Chrome, Edge and Safari, then edit it before sending.",
  },
  {
    icon: Shuffle,
    title: "Pick the model",
    body: "Every plan reaches every model. Choose one in the chat window, and if it is busy, Orbit hands the question to another.",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "Individual visitors and raw events are never sent to a model, and nothing you type is used for training.",
  },
  {
    icon: LifeBuoy,
    title: "A person behind it",
    body: "When a question is outside what Orbit knows, it says so and points you to Help & support, where a person replies.",
  },
];

const faqs = [
  {
    q: "Is Orbit a chatbot bolted on?",
    a: "No. It answers from Quantalog's own reference and links to the exact docs page. When a question falls outside what it knows, it says so instead of inventing a feature.",
  },
  {
    q: "Can Orbit see my analytics?",
    a: "On the Free and Starter plans it cannot see your account or data. On Pro, a short seven-day summary of the workspace you are in is sent with each question. Individual visitors, sessions and raw events are never sent to a model on any plan.",
  },
  {
    q: "How many questions do I get?",
    a: "The Free plan includes 10 questions a month, Starter 300 and Pro 2,000. A question only counts once Orbit has actually answered it, and question packs never expire.",
  },
  {
    q: "Is Orbit included in my plan?",
    a: "Yes. Every plan includes Orbit, the free one too. The plan decides how many questions you get each month.",
  },
  {
    q: "Can Orbit write my LinkedIn posts?",
    a: "Yes. In the post studio, tell Orbit what to announce and it drafts the post and fills in the schedule for you to check. Nothing publishes until you approve it.",
  },
  {
    q: "Can I ask Claude or ChatGPT about my workspace instead?",
    a: "Yes. Quantalog's connector lets Claude and ChatGPT read your forms, leads, bookings and traffic, and create tasks and notes. They cannot delete anything.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  alternates: pageAlternates(PATH),
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "AI analytics assistant",
    "AI analytics chatbot",
    "in-app support assistant",
    "docs-grounded AI assistant",
    "ask AI about website traffic",
    "AI SEO assistant",
    "Orbit AI Chrome extension",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}${PATH}`,
    title: TITLE,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: META_DESCRIPTION,
  },
};

export default function OrbitAiPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}${PATH}#page`,
      name: TITLE,
      description: META_DESCRIPTION,
      url: `${site.url}${PATH}`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: PATH,
      name: "Orbit AI assistant",
      description: META_DESCRIPTION,
      serviceType: "AI analytics assistant",
    }),
    article({
      path: PATH,
      headline: TITLE,
      description: META_DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}${PATH}#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Orbit AI", path: PATH },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Orbit AI"
        title={
          <>
            An AI analytics assistant that knows the product,
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">and says what it doesn&apos;t.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Start free" }}
        secondary={{ label: "Read the docs", href: "/docs/orbit-ai" }}
        visual={<OrbitVisual />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <Orbit />

      <OrbitExtension location="orbit_ai" />

      <ProductSection
        eyebrow="What Orbit does"
        title="Fast answers you can trust."
        body="Grounded in the product's own reference, honest about its limits, and one tap away on every page of the dashboard."
        link={{ label: "Read the Orbit AI docs", href: "/docs/orbit-ai" }}
        bordered
      >
        <ProductFeatureGrid features={features} columns={4} />
      </ProductSection>

      <ProductFaq faqs={faqs} idPrefix="orbit-faq" />

      <RelatedProducts hrefs={["/analytics", "/seo-audits", "/social"]} />

      <Cta
        title="Ask it anything after you sign up."
        body="Orbit is on every plan, the free one included, with 10 questions a month to start."
        secondary={{ label: "Read the docs", href: "/docs/orbit-ai" }}
        location="orbit_ai_cta"
      />
    </>
  );
}
