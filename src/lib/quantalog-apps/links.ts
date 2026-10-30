import { AppWindow, ExternalLink, GripVertical, Image, PanelLeft, Users } from "lucide-react";
import type { AppPage } from "./types";

export const linksApp: AppPage = {
  slug: "links",
  logo: "quantalog-links.svg",
  name: "Quantalog Links",
  shortName: "Links",
  group: "Work",
  unlock: "once",
  docs: "/docs/quantalog-links",
  launched: "2026-10-30",
  title: "Your other tools,",
  accent: "one click from the sidebar.",
  description:
    "Put shortcuts to Stripe, Notion, your CRM or anything else your team lives in at the top of the sidebar, opened in a new tab or right inside Quantalog.",
  metaDescription:
    "Custom sidebar links for your team's tools. Open Stripe, Notion or your CRM in a new tab or inside Quantalog, with icons, ordering and up to 10 links.",
  keywords: ["custom sidebar links", "team tool shortcuts", "embedded apps", "workspace links", "internal tools launcher"],
  chips: [
    { icon: PanelLeft, label: "Top of the sidebar" },
    { icon: AppWindow, label: "Opens inside Quantalog" },
    { icon: Image, label: "Site icon added for you" },
  ],
  stats: [
    { value: "10", label: "Links per workspace" },
    { value: "2", label: "Ways to open" },
    { value: "1", label: "Place to manage them" },
  ],
  features: [
    {
      icon: PanelLeft,
      title: "Where you look first",
      body: "Links sit at the top of the sidebar, under Links, for everyone in the workspace.",
    },
    {
      icon: AppWindow,
      title: "Inside or in a new tab",
      body: "Open a tool on a page inside Quantalog, or in a new tab for sites that refuse to be shown inside another app.",
    },
    {
      icon: Image,
      title: "The right icon",
      body: "The site's own icon is used automatically, or upload your logo.",
    },
    {
      icon: GripVertical,
      title: "In your order",
      body: "Drag links to reorder them in Settings → Sidebar.",
    },
    {
      icon: Users,
      title: "Shared by the team",
      body: "Everyone sees the same links. Only admins add, edit or reorder them, so the sidebar stays tidy.",
    },
    {
      icon: ExternalLink,
      title: "Any web address",
      body: "Billing, docs, CRM, design files, a status page. If it has an address, it can be a link.",
    },
  ],
  steps: [
    {
      title: "Unlock Links",
      body: "A workspace admin unlocks Quantalog Links once in Apps, or from Settings → Sidebar.",
    },
    {
      title: "Add a link",
      body: "In Settings → Sidebar, press Add link, give it a name and an address, and choose how it opens.",
    },
    {
      title: "Order and share",
      body: "Drag links into order. They appear at the top of the sidebar for everyone in the workspace.",
    },
  ],
  story: {
    eyebrow: "One home screen",
    title: "Stop hunting through bookmarks.",
    paragraphs: [
      "Every team has five tools it opens twenty times a day. Links puts them where you already are, in the same order for everyone, so new teammates find them on day one.",
      "If a link opened inside Quantalog stays blank, that site refuses to be embedded. Switch it to open in a new tab and it works the same.",
    ],
  },
  connections: [
    { kind: "app", id: "notes", how: "Keep private notes alongside the shared tools your team opens." },
    { kind: "app", id: "tasks", how: "Link a task to the tool where the work actually happens." },
    { kind: "app", id: "media", how: "Upload a custom logo for any link from your media library." },
  ],
  included: [
    "Up to 10 links per workspace",
    "Opens in a new tab or inside Quantalog",
    "Site icon added automatically",
    "Custom logo upload",
    "Drag to reorder",
    "Shared with everyone in the workspace",
    "Admin-only editing",
    "Managed in Settings → Sidebar",
  ],
  faqs: [
    {
      q: "Why is a link blank when it opens inside Quantalog?",
      a: "Some sites refuse to be shown inside another app. Switch that link to open in a new tab.",
    },
    {
      q: "Who can add links?",
      a: "Only workspace admins can add, edit or reorder links. Everyone in the workspace sees them.",
    },
    {
      q: "How many links can I add?",
      a: "Up to 10 per workspace.",
    },
  ],
  related: ["notes", "tasks", "media"],
  ctaTitle: "Bring your team's tools into one sidebar.",
};
