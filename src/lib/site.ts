export const site = {
  name: "Quantalog",
  tagline: "Real-time analytics you can embed.",
  description:
    "Privacy-first web analytics with a real-time dashboard and a multi-tenant API. Ship analytics to your own users in an afternoon.",
  url: "https://quantalog.daorbit.in",
  app: "https://studio-quantalog.daorbit.in",
  api: "https://quantalog-be.daorbit.in",
  // Public site key for this landing page's own analytics. Not a secret.
  siteId: "hvlZR6aginzuYJiI",
  // Docs now live on this landing page. Relative path works everywhere on the
  // marketing site; the dashboard app links to `${site.url}/docs` absolutely.
  docs: "/docs",
  twitter: "@quantalog",
  github: "https://github.com/quantalog",
  email: "daorbit2k25@gmail.com",
} as const;

export const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#compare", label: "Compare" },
  { href: "/#platform", label: "Platform API" },
  // { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
] as const;
