export const site = {
  name: "Quantalog",
  tagline: "Real-time analytics you can embed.",
  description:
    "Privacy-first web analytics with real-time dashboards, built-in SEO audits and a multi-tenant API. See who visits, find what's holding your pages back, and ship it all to your own users.",
  url: "https://quantalog.daorbit.in",
  app: "https://studio-quantalog.daorbit.in",
  api: "https://quantalog-be.daorbit.in",

  siteId: "hvlZR6aginzuYJiI",

  docs: "/docs",

  author: "The Quantalog Team",
  twitter: "@quantalog",
  github: "https://github.com/quantalog",
  email: "daorbit2k25@gmail.com",

  contactFormSrc:
    "https://forms.daorbit.in/form/6a89a4af44a2ed606590a54a/view",
} as const;

export const productNav = [
  {
    href: "/analytics",
    label: "Analytics",
    blurb: "Real-time traffic, funnels, goals and retention",
  },
  {
    href: "/seo-audits",
    label: "SEO audits",
    blurb: "Lighthouse scores, broken links and structured data",
  },
  {
    href: "/reports",
    label: "Reports",
    blurb: "Scheduled email and WhatsApp summaries for clients",
  },
  {
    href: "/social",
    label: "Orbit AI & social",
    blurb: "In-app assistant and scheduled LinkedIn posts",
  },
  {
    href: "/forms",
    label: "Forms",
    blurb: "Drag-and-drop forms with per-field drop-off analytics",
  },
  {
    href: "/platform-api",
    label: "Platform API",
    blurb: "White label analytics for your own customers",
  },
] as const;

export const nav = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
