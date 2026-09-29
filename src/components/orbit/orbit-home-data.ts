import { site } from "@/lib/site";

export const ORBIT_HELP_LINKS = [
  { label: "Browse the docs", href: site.docs },
  { label: "Talk to a person", href: "/contact" },
] as const;

export const ORBIT_QUESTION_POOL = [
  "Do I need a cookie banner?",
  "How is this different from Google Analytics?",
  "Is there a free plan?",
  "How do I install the tracker on Next.js?",
  "Can I share a dashboard with a client?",
  "How do SEO audits work?",
  "Can I track custom events and goals?",
  "Does it work with single-page apps?",
  "Can I get weekly email reports?",
  "How is Orbit AI priced?",
  "Can I white-label analytics for my customers?",
  "How do forms and lead capture work?",
];

export const SUGGESTIONS_PER_SET = 3;
export const SUGGESTION_ROTATE_MS = 6000;
