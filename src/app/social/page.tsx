import type { Metadata } from "next";
import {
  BarChart3,
  BookOpenCheck,
  CalendarClock,
  CornerDownRight,
  Eye,
  History,
  LifeBuoy,
  Lock,
  Mic,
  PauseCircle,
  PenLine,
  Shuffle,
  Wrench,
  UserRound,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { OrbitVisual } from "@/components/explore/visuals/orbit-visual";
import { Orbit } from "@/components/sections/orbit";
import { Scheduling } from "@/components/sections/scheduling";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid, type ProductFeature } from "@/components/product/product-feature-grid";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

const DESCRIPTION =
  "Orbit AI is the assistant built into your dashboard — grounded in the product's own docs, honest about what it can't see. It also writes your scheduled LinkedIn posts from the numbers that are already there.";

const stats = [
  { value: "10", label: "Free questions a month" },
  { value: "2,000", label: "Questions a month on Orbit Pro" },
  { value: "3", label: "Suggested follow-ups per answer" },
  { value: "0", label: "Conversations used for training" },
] as const;

const orbitFeatures: ProductFeature[] = [
  {
    icon: BookOpenCheck,
    title: "Grounded in the docs",
    body: "Orbit answers from a reference kept in step with the product, so it never describes a button that doesn't exist.",
  },
  {
    icon: Wrench,
    title: "Fixes SEO issues",
    body: "Paste an audit issue and get the steps to resolve it — including the tag to add and where it goes.",
  },
  {
    icon: BarChart3,
    title: "Reads your analytics",
    body: "On Orbit Pro, a seven-day summary of your workspace goes with each question, so \"why is traffic down?\" gets an answer.",
  },
  {
    icon: CornerDownRight,
    title: "Suggested follow-ups",
    body: "Every answer comes with up to three one-tap follow-ups — each one answerable, so none lead to a dead end.",
  },
  {
    icon: Mic,
    title: "Ask by voice",
    body: "Dictate a question with your browser's speech recognition in Chrome, Edge and Safari, then edit before sending.",
  },
  {
    icon: Shuffle,
    title: "Every model, every plan",
    body: "Pick the model you prefer. If it is busy, Orbit falls through to another and tells you which one answered.",
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

const postFeatures: ProductFeature[] = [
  {
    icon: PenLine,
    title: "Write and preview",
    body: "Write the caption on the left and see it laid out exactly as it will render on the right.",
  },
  {
    icon: CalendarClock,
    title: "Once, or on a repeat",
    body: "Publish at a set date and time, or daily, weekly or monthly at an hour you pick in your own timezone.",
  },
  {
    icon: PauseCircle,
    title: "Pause and resume",
    body: "A paused schedule keeps its cadence and settings, and picks up again the moment you resume it.",
  },
  {
    icon: History,
    title: "A record of every send",
    body: "Each post records whether it published, with a link to it, or exactly why it failed.",
  },
  {
    icon: Eye,
    title: "Engagement figures",
    body: "The Sent tab shows engagement for LinkedIn posts where the permission is available.",
  },
  {
    icon: UserRound,
    title: "Yours alone",
    body: "Schedules belong to you, publish under your own account, and stay invisible to other workspace members.",
  },
];

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
  {
    q: "Can Orbit see my analytics?",
    a: "On Orbit Free and Starter it cannot see your account or data. On Orbit Pro, a short seven-day summary of the workspace you are in is sent with each question. Individual visitors, sessions and raw events are never sent to a model on any plan.",
  },
  {
    q: "How many questions do I get?",
    a: "Orbit Free includes 10 questions a month, Starter 300 and Pro 2,000. A question only counts once Orbit has actually answered it, and question packs never expire.",
  },
  {
    q: "Is Orbit bought separately from analytics?",
    a: "Yes. Orbit is bought per workspace on its own ladder, so a workspace on the free analytics plan can still run Orbit Pro — and the other way round.",
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
    <>
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
        secondary={{ label: "Read the docs", href: "/docs/orbit-ai" }}
        visual={<OrbitVisual />}
        tone="rose"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <Orbit />

      <ProductSection
        eyebrow="What Orbit does"
        title="Fast answers you can trust."
        body="Grounded in the product's own reference, honest about its limits, and one tap away on every page of the dashboard."
        link={{ label: "Read the Orbit AI docs", href: "/docs/orbit-ai" }}
        bordered
      >
        <ProductFeatureGrid features={orbitFeatures} columns={4} />
      </ProductSection>

      <div className="border-t border-border">
        <Scheduling />
      </div>

      <ProductSection
        eyebrow="Post studio"
        title="Write once. Publish on time."
        body="Draft posts where your analytics live, preview them as they will render, and let Quantalog publish — once, or on a repeat in your own timezone."
        link={{ label: "Read the scheduled posts docs", href: "/docs/scheduled-posts" }}
        bordered
      >
        <ProductFeatureGrid features={postFeatures} columns={3} />
      </ProductSection>

      <ProductFaq faqs={faqs} idPrefix="social-faq" />

      <RelatedProducts hrefs={["/analytics", "/seo-audits", "/reports"]} />

      <Cta
        title="Ask it anything after you sign up."
        body="Orbit is on every plan, free tier included. So is one scheduled post a week — enough to keep a feed alive from the numbers you already have."
        secondary={{ label: "Read the docs", href: "/docs/orbit-ai" }}
        location="social_cta"
      />
    </>
  );
}
