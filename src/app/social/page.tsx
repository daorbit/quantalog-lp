import { BUILD_DATE } from "@/lib/build-date";
import type { Metadata } from "next";
import { CalendarClock, Eye, History, PauseCircle, PenLine, UserRound } from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { BigStats } from "@/components/big-stats";
import { Cta } from "@/components/sections/cta";
import { SocialVisual } from "@/components/explore/visuals/social-visual";
import { Scheduling } from "@/components/sections/scheduling";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid, type ProductFeature } from "@/components/product/product-feature-grid";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

const PATH = "/social";
const PUBLISHED = "2025-11-01";
const MODIFIED = BUILD_DATE;

const TITLE = "LinkedIn post scheduler with AI-written posts";

const META_DESCRIPTION =
  "Schedule LinkedIn posts once or on a repeat in your own timezone. Orbit drafts the post from what you tell it, and nothing publishes until you approve it.";

const DESCRIPTION =
  "Write LinkedIn posts ahead of time, preview them as they will render, and let Quantalog publish them once or on a repeat. Orbit can draft the post for you.";

const stats = [
  { value: "3", label: "Scheduled posts on Free" },
  { value: "30", label: "On Starter, with repeats" },
  { value: "3", label: "Repeat cadences" },
  { value: "0", label: "Posts sent without your approval" },
] as const;

const features: ProductFeature[] = [
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
    title: "Private to you",
    body: "Only you see the schedules you create. They publish through the LinkedIn account connected to your workspace.",
  },
];

const faqs = [
  {
    q: "Which networks can it post to?",
    a: "LinkedIn today. Instagram support is built but waiting on platform review, so it is not offered to new accounts yet.",
  },
  {
    q: "Does it post without me?",
    a: "Only on the schedule you set, and only after you have approved the draft. Nothing goes out unattended that you have not already read.",
  },
  {
    q: "Can Orbit write the post for me?",
    a: "Yes. Tell Orbit what to announce and when, and it writes the post, asks for anything it still needs, such as an image, and fills in the form for you to check.",
  },
  {
    q: "How many posts can I schedule?",
    a: "The Free plan holds 3 scheduled posts at a time. Starter holds 30 and adds repeating posts, and Pro holds 500.",
  },
  {
    q: "Who can see my scheduled posts?",
    a: "Only you. Other members of the workspace cannot see or change your schedules. Posts publish through the LinkedIn account an editor connected to the workspace.",
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
    "LinkedIn post scheduler",
    "schedule LinkedIn posts",
    "recurring LinkedIn posts",
    "AI-written LinkedIn posts",
    "social media scheduling tool",
    "analytics to social content",
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

export default function SocialPage() {
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
      name: "Scheduled LinkedIn posts",
      description: META_DESCRIPTION,
      serviceType: "Social media scheduling",
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
      { name: "Scheduled posts", path: PATH },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Scheduled posts"
        title={
          <>
            Schedule LinkedIn posts
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">written from what you tell Orbit.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Start free" }}
        secondary={{ label: "Read the docs", href: "/docs/scheduled-posts" }}
        visual={<SocialVisual />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <Scheduling />

      <ProductSection
        eyebrow="Post studio"
        title="Write once. Publish on time."
        body="Draft posts where your analytics live, preview them as they will render, and let Quantalog publish, once or on a repeat in your own timezone."
        link={{ label: "Read the scheduled posts docs", href: "/docs/scheduled-posts" }}
        bordered
      >
        <ProductFeatureGrid features={features} columns={3} />
      </ProductSection>

      <ProductFaq faqs={faqs} idPrefix="social-faq" />

      <RelatedProducts hrefs={["/orbit-ai", "/analytics", "/reports"]} />

      <Cta
        title="Schedule your first post free."
        body="The Free plan holds three scheduled posts at a time, and Orbit can draft each one. No card needed."
        secondary={{ label: "Read the docs", href: "/docs/scheduled-posts" }}
        location="social_cta"
      />
    </>
  );
}
