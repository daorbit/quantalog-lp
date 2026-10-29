export const site = {
  name: "Quantalog",
  tagline: "From first visit to paid invoice.",
  seoTitle: "Analytics, lead forms and invoicing in one workspace",
  ogImage: "/og-image.jpg",
  // Kept under 160 characters so search results show it in full rather than
  // truncating mid-sentence. The longer pitch lives in the footer copy.
  description:
    "Cookieless analytics, lead forms, SEO audits, social posts and GST-ready invoicing in one workspace, from first visit to paid invoice.",
  url: "https://quantalog.daorbit.in",
  app: "https://studio-quantalog.daorbit.in",
  api: "https://quantalog-be.daorbit.in",

  siteId: "hvlZR6aginzuYJiI",

  tracker: {
    api: process.env.NEXT_PUBLIC_TRACKER_API || "https://quantalog-be.daorbit.in",
    siteId: process.env.NEXT_PUBLIC_TRACKER_SITE_ID || "hvlZR6aginzuYJiI",
  },

  docs: "/docs",

  author: "The Quantalog Team",
  twitter: "@quantalog",
  github: "https://github.com/quantalog",
  linkedin: "https://www.linkedin.com/in/da-orbit-32865b388/",
  instagram: "https://www.instagram.com/daorbit/",
  email: "daorbit2k25@gmail.com",
  legalName: "DA Orbit",

  demoCall: "https://forms.daorbit.in/form/6accc4af7ffcc5038e50d43f/view",

  orbitExtension:
    "https://chromewebstore.google.com/detail/orbit-ai/ilmdbgnbkgjldhelepoadfkmpahelmkg",

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
    href: "/search-visibility",
    label: "Search visibility",
    blurb: "Google Search Console clicks, rankings and index status",
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
    href: "/invoicing",
    label: "Invoicing",
    blurb: "Quotations and GST-ready invoices, paid by UPI",
  },
  {
    href: "/platform-api",
    label: "Platform API",
    blurb: "White label analytics for your own customers",
  },
] as const;

export const nav = [
  { href: "/plans", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
