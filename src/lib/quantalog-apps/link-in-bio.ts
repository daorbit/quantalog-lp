import { AtSign, Eye, Link2, MousePointerClick, Palette, Smartphone } from "lucide-react";
import type { AppPage } from "./types";

export const linkInBioApp: AppPage = {
  slug: "link-in-bio",
  logo: "quantalog-bio.svg",
  name: "Quantalog Link-in-bio",
  shortName: "Link-in-bio",
  group: "Grow",
  unlock: "once",
  docs: "/docs/quantalog-bio",
  launched: "2026-10-30",
  title: "One link for your bio,",
  accent: "every tap counted.",
  description:
    "A short page of your most important links for Instagram, LinkedIn, TikTok or X, with your photo, bio and social icons, and the clicks on every link.",
  metaDescription:
    "A link-in-bio page with your photo, links and social icons, light or dark, with views and clicks on every link. Built into your analytics workspace.",
  keywords: ["link in bio", "bio link page", "instagram link in bio", "linktree alternative", "link click tracking"],
  chips: [
    { icon: AtSign, label: "/bio/your-name" },
    { icon: MousePointerClick, label: "Click rate 31%" },
    { icon: Smartphone, label: "Made for phones" },
  ],
  stats: [
    { value: "20", label: "Pages on Pro" },
    { value: "1", unit: "min", label: "For changes to go live" },
    { value: "0", label: "Bots in your counts" },
  ],
  features: [
    {
      icon: Link2,
      title: "Your links, in order",
      body: "Add links, reorder them with the arrows, and hide one without deleting it when a campaign ends.",
    },
    {
      icon: Palette,
      title: "Looks like you",
      body: "Your photo, a short bio, social icons, light or dark, and the button colour and shape you choose.",
    },
    {
      icon: Smartphone,
      title: "What they'll see",
      body: "The phone preview beside the editor shows exactly what visitors get before you publish.",
    },
    {
      icon: Eye,
      title: "Views and clicks",
      body: "Each page shows views, clicks and click rate for the last 30 days, and the editor shows clicks per link.",
    },
    {
      icon: MousePointerClick,
      title: "Honest numbers",
      body: "Bots and link previews aren't counted, and none of it counts toward your monthly event allowance.",
    },
    {
      icon: AtSign,
      title: "A clean address",
      body: "Every page gets its own address, such as /bio/your-name, ready to paste into your profile.",
    },
  ],
  steps: [
    {
      title: "Unlock Link-in-bio",
      body: "A workspace admin unlocks it once in Apps. Link in bio appears in the sidebar.",
    },
    {
      title: "Build the page",
      body: "Press New page, add a photo from your media library, a title, a bio, links and social icons, then pick a look.",
    },
    {
      title: "Paste it in your profile",
      body: "Press Publish, copy the address from the page card, and paste it into your Instagram, LinkedIn, TikTok or X bio.",
    },
  ],
  story: {
    eyebrow: "Why it's here",
    title: "Your bio link, next to the traffic it sends.",
    paragraphs: [
      "A separate link-in-bio tool tells you about taps. Quantalog also shows what those visitors did on your site, because the page and your analytics live in the same workspace.",
      "Drafting a page or turning the app off takes the address offline but keeps the page and its stats, ready for the next launch.",
    ],
  },
  connections: [
    { kind: "app", id: "instagram", how: "Paste the address into your bio, and schedule the posts that point to it." },
    { kind: "app", id: "linkedin", how: "Use one link in your profile and posts for every campaign." },
    { kind: "app", id: "media", how: "Your photo comes from the workspace media library." },
    { kind: "product", href: "/analytics", how: "See what visitors from your bio do once they reach your site." },
  ],
  included: [
    "Photo, title and short bio",
    "Reorderable links you can hide",
    "Social icons",
    "Light or dark, button colour and shape",
    "Live phone preview",
    "Views, clicks and click rate",
    "Clicks per link",
    "Draft to take a page offline",
  ],
  plans: [{ row: "Pages", free: "1", starter: "3", pro: "20" }],
  faqs: [
    {
      q: "What address does my page get?",
      a: "Its own path, such as /bio/your-name, using lowercase letters, numbers and dashes. Each address can only be used once across Quantalog.",
    },
    {
      q: "How quickly do changes show?",
      a: "Changes reach your public page within a minute.",
    },
    {
      q: "Do clicks count toward my event allowance?",
      a: "No. Page views and link clicks are counted separately and never touch your monthly allowance.",
    },
  ],
  related: ["popups", "media", "public-dashboard"],
  ctaTitle: "Make the link in your bio work harder.",
};
