export const site = {
  name: "Quantalog",
  tagline: "Real-time analytics you can embed.",
  description:
    "Privacy-first web analytics with a real-time dashboard and a multi-tenant API. Ship analytics to your own users in an afternoon.",
  url: "https://quantalog.com",
  app: "https://studio-quantalog.daorbit.in",
  api: "https://real-ana-be.vercel.app",
  // Public site key for this landing page's own analytics. Not a secret.
  siteId: "eLizHKCwJNNVxFQY",
  docs: "https://studio-quantalog.daorbit.in/docs",
  twitter: "@quantalog",
  github: "https://github.com/quantalog",
  email: "hello@quantalog.com",
} as const;

export const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#platform", label: "Platform API" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
] as const;
