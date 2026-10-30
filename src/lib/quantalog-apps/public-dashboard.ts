import { Eye, EyeOff, Globe, KeyRound, LayoutGrid, RefreshCw } from "lucide-react";
import type { AppPage } from "./types";

export const publicDashboardApp: AppPage = {
  slug: "public-dashboard",
  logo: "quantalog-public-dashboard.svg",
  name: "Quantalog Public Dashboard",
  shortName: "Public Dashboard",
  group: "Share",
  unlock: "once",
  docs: "/docs/public-dashboards",
  launched: "2026-10-30",
  title: "Live numbers at a link",
  accent: "anyone can open.",
  description:
    "A read-only view of your workspace that needs no account and no login. Give a client their numbers, put traffic on an office screen, or publish stats openly.",
  metaDescription:
    "Share a live, read-only analytics dashboard by link. No login for viewers, 14 panels you choose, server-side privacy and a new link whenever you need one.",
  keywords: ["public analytics dashboard", "share analytics with clients", "read-only dashboard link", "open startup stats", "client dashboard"],
  chips: [
    { icon: Globe, label: "No login for viewers" },
    { icon: LayoutGrid, label: "14 panels you choose" },
    { icon: KeyRound, label: "New link any time" },
  ],
  stats: [
    { value: "14", label: "Panels you can publish" },
    { value: "0", label: "Accounts viewers need" },
    { value: "3", label: "Ranges viewers can pick" },
  ],
  features: [
    {
      icon: LayoutGrid,
      title: "Choose what's visible",
      body: "Overview, content, acquisition and audience panels, fourteen in all. Switch on only the ones you want to share.",
    },
    {
      icon: EyeOff,
      title: "Hidden means never sent",
      body: "A panel that's off is left out on the server, not hidden in the browser, so nobody can recover it from the page source.",
    },
    {
      icon: RefreshCw,
      title: "Live, not a snapshot",
      body: "The same data your own dashboard shows, including visitors online right now. Viewers switch between 24 hours, 7 and 30 days.",
    },
    {
      icon: KeyRound,
      title: "Replace the link",
      body: "If a link reaches the wrong person, press New link and the old address stops working immediately.",
    },
    {
      icon: Eye,
      title: "See it was opened",
      body: "A count of how often the link was opened and when it was last viewed, once per visit.",
    },
    {
      icon: Globe,
      title: "Never your keys",
      body: "Site keys, settings, team members, raw events, visitor hashes and IP addresses are never shared, whatever you switch on.",
    },
  ],
  steps: [
    {
      title: "Unlock Public Dashboard",
      body: "A workspace admin unlocks it once in Apps. Quantalog mints the link straight away.",
    },
    {
      title: "Pick the panels",
      body: "In the same Apps panel, switch on the panels to publish. Leave page paths off if they include internal URLs.",
    },
    {
      title: "Send the link",
      body: "Copy it, or open it to see exactly what a viewer sees. Treat it like a password.",
    },
  ],
  story: {
    eyebrow: "Privacy by default",
    title: "New panels start off. Always.",
    paragraphs: [
      "Panels added after you started sharing default to off, so a release never makes an existing public link start showing new data. What is public is always your decision.",
      "Turning the app off pauses the link but keeps it, so the same address works again when you turn it back on. Use New link when you want the old one gone for good.",
    ],
  },
  connections: [
    { kind: "product", href: "/analytics", how: "Shows the same live numbers as your own dashboard, combined across the workspace." },
    { kind: "product", href: "/reports", how: "Scheduled reports link to the public dashboard while it's on." },
    { kind: "app", id: "seo-reports", how: "Pair with SEO Reports so a client sees traffic and audits without an account." },
  ],
  included: [
    "Read-only page at a private link",
    "Fourteen panels to choose from",
    "Server-side removal of hidden panels",
    "24 hours, 7 and 30 day ranges",
    "Visitors online right now",
    "Open count and last viewed",
    "New link to revoke the old one",
    "Asks search engines not to index it",
  ],
  faqs: [
    {
      q: "Does a viewer need a Quantalog account?",
      a: "No. Anyone with the link can open it. That's why the link should be treated like a password.",
    },
    {
      q: "Can I share one site from a workspace with several?",
      a: "Sharing is per workspace. The public page shows the workspace's sites combined rather than broken out individually.",
    },
    {
      q: "What's the difference between turning the app off and New link?",
      a: "Turning the app off pauses the link and keeps it, so it works again later. New link replaces it, and the old address stops working for good.",
    },
  ],
  related: ["seo-reports", "goals", "link-in-bio"],
  ctaTitle: "Share the numbers, not the account.",
};
