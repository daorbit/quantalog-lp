import { Code2, Eye, FlaskConical, Repeat, Split, Trophy } from "lucide-react";
import type { AppPage } from "./types";

export const experimentsApp: AppPage = {
  slug: "ab-tests",
  logo: "quantalog-experiments.svg",
  name: "Quantalog A/B Tests",
  shortName: "A/B Tests",
  group: "Analyze",
  unlock: "once",
  docs: "/docs/quantalog-experiments",
  launched: "2026-11-01",
  title: "Two versions in,",
  accent: "one clear winner out.",
  description:
    "Test a new headline, button or page against the original. Quantalog splits your visitors, counts who reaches your goal and calls the winner when the difference is real.",
  metaDescription:
    "A/B testing for your website: page changes, split URL and code tests with no flicker, conversion and uplift per variant, and a winner called at 95% confidence.",
  keywords: ["ab testing tool", "split url test", "website ab test", "headline test", "conversion rate optimization"],
  chips: [
    { icon: FlaskConical, label: "Page changes" },
    { icon: Split, label: "Split URL" },
    { icon: Code2, label: "Code tests" },
  ],
  stats: [
    { value: "4", label: "Versions per test" },
    { value: "95", unit: "%", label: "Confidence for a winner" },
    { value: "0.8", unit: "s", label: "Longest wait for a variant" },
  ],
  features: [
    {
      icon: FlaskConical,
      title: "Change it without a developer",
      body: "Pick an element by its CSS selector and replace its text, hide it, change a link or image, or add a style.",
    },
    {
      icon: Split,
      title: "Whole-page tests",
      body: "Send part of your visitors to a different page and compare it against the original, with the address query kept.",
    },
    {
      icon: Code2,
      title: "Or in your own code",
      body: "rta.variant() tells your code which group a visitor is in, for changes the page editor cannot make.",
    },
    {
      icon: Eye,
      title: "No flicker",
      body: "Variants apply before the page shows. Each visitor keeps the same version on every visit.",
    },
    {
      icon: Trophy,
      title: "A winner you can trust",
      body: "Conversion, uplift and the chance each variant beats the original. A winner is called at 95% once each group has 100 visitors.",
    },
    {
      icon: Repeat,
      title: "Keep what wins",
      body: "End the test and keep showing the winning page change or page to every visitor until you update your site.",
    },
  ],
  steps: [
    {
      title: "Add one attribute",
      body: "Unlock A/B Tests in Apps and add data-experiments=\"on\" to your Quantalog tracking tag.",
    },
    {
      title: "Set up the test",
      body: "Pick the pages, the goal and up to three variants with their share of visitors, then start it.",
    },
    {
      title: "Keep the winner",
      body: "Watch conversion per group, and end the test once a winner is called.",
    },
  ],
  story: {
    eyebrow: "Built on your analytics",
    title: "The goal is something you already track.",
    paragraphs: [
      "There is no second script and no separate testing account. Tests use the Quantalog tracking script, and a goal is any page or event that is already in your analytics.",
      "Test views never count towards your event allowance, so testing more does not cost you more.",
    ],
  },
  connections: [
    { kind: "product", href: "/analytics", how: "Goals are pages and events your tracking script already records." },
    { kind: "app", id: "funnels", how: "See where the winning version's visitors go next on the way to a sale." },
  ],
  included: [
    "Page change, split URL and code tests",
    "Up to four versions per test",
    "Page and device targeting",
    "Same version on every visit",
    "Variants applied before the page shows",
    "Conversion, uplift and chance to beat",
    "Winner called at 95% confidence",
    "Not counted toward your event allowance",
  ],
  plans: [{ row: "Tests running at once", free: "1", starter: "3", pro: "10" }],
  faqs: [
    {
      q: "Will visitors see the original flash before the variant?",
      a: "No. With data-experiments=\"on\" the tracker applies the variant before the page shows. It waits at most 0.8 seconds for the test settings, then reuses them for five minutes.",
    },
    {
      q: "What counts as a conversion?",
      a: "A visitor who saw the test and then reached your goal page or event in the same visit.",
    },
    {
      q: "Can I change a test while it runs?",
      a: "Pause it first. Changing a running test would mix two versions in one result.",
    },
  ],
  related: ["funnels", "popups", "goals"],
  ctaTitle: "Stop guessing which version works.",
};
