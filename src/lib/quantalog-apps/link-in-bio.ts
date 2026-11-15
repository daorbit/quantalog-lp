import { AtSign, ChartSpline, Link2, Music, Palette, QrCode } from "lucide-react";
import type { AppPage } from "./types";

export const linkInBioApp: AppPage = {
  slug: "link-in-bio",
  logo: "quantalog-bio.svg",
  name: "Quantalog Link-in-bio & Smart Links",
  shortName: "Link-in-bio & Smart Links",
  group: "Grow",
  unlock: "once",
  docs: "/docs/quantalog-bio",
  launched: "2026-10-30",
  title: "One link for your bio,",
  accent: "and one for every release.",
  description:
    "A bio page for your Instagram, TikTok and YouTube profiles, and a smart link for each song, video or product with a button for every service it is on. Each gets a short link, a QR code and stats on where visitors came from.",
  metaDescription:
    "Make a link-in-bio page and a smart link for every song, video or product, each with a short link, a QR code and stats on where visitors came from.",
  keywords: [
    "link in bio",
    "smart link",
    "music smart link",
    "linktree alternative",
    "link in bio with analytics",
    "short link with QR code",
    "instagram link in bio",
  ],
  chips: [
    { icon: AtSign, label: "/l/your-name" },
    { icon: QrCode, label: "QR code for print" },
    { icon: Music, label: "Spotify, Apple Music, YouTube" },
  ],
  stats: [
    { value: "40+", label: "Services recognised" },
    { value: "200", label: "Smart links on Pro" },
    { value: "0", label: "Bots in your counts" },
  ],
  features: [
    {
      icon: AtSign,
      title: "A bio page for every profile",
      body: "Your photo, a short bio, up to 30 links and icons for 12 social networks, in five layouts: Classic, Cover, Tiles, Editorial and Cards.",
    },
    {
      icon: Music,
      title: "A smart link for every release",
      body: "One page per song, video, podcast or product, with a button for each service it is on, in six layouts from a plain list to Vinyl and Spotlight.",
    },
    {
      icon: Link2,
      title: "Paste a link, get the details",
      body: "Paste a Spotify, Apple Music, YouTube, SoundCloud or Deezer link and the title, artist and artwork fill themselves in. Links from more than 40 services, including JioSaavn, Gaana, Amazon and Flipkart, get the right name and icon.",
    },
    {
      icon: QrCode,
      title: "Short links and QR codes",
      body: "Every page gets a short address you can rename, such as /l/your-name, and a QR code for posters and packaging. Scans are counted as their own source.",
    },
    {
      icon: ChartSpline,
      title: "See what people tap",
      body: "Views, visitors and taps per button by day, with where visitors came from, their campaign, country, city, device and browser. Bots are filtered out.",
    },
    {
      icon: Palette,
      title: "Looks like you",
      body: "Light or dark, eight accent colours, four fonts and three button shapes, with a live phone preview beside the editor.",
    },
  ],
  steps: [
    {
      title: "Unlock the app",
      body: "A workspace admin unlocks it once in Apps, and Link-in-bio appears in the sidebar.",
    },
    {
      title: "Make a page",
      body: "Create a bio page and add your links and social icons, or create a smart link and paste a release link to fill it in.",
    },
    {
      title: "Share it everywhere",
      body: "Publish, then put the short link in your bio and posts, and the QR code on anything printed.",
    },
  ],
  story: {
    eyebrow: "Why it's here",
    title: "Your links, next to the traffic they send.",
    paragraphs: [
      "A separate link tool tells you about taps. Quantalog also shows what those visitors did on your site, because your links and your analytics live in the same workspace.",
      "Setting a page to draft or turning the app off takes its short link offline but keeps the page and its stats, ready for the next release.",
    ],
  },
  connections: [
    { kind: "app", id: "instagram", how: "Paste the short link into your bio, and schedule the posts that point to it." },
    { kind: "app", id: "linkedin", how: "Use one link in your profile and posts for every campaign." },
    { kind: "app", id: "media", how: "Photos and artwork come from the workspace media library." },
    { kind: "product", href: "/analytics", how: "See what visitors from your links do once they reach your site." },
  ],
  included: [
    "Bio pages with a photo, a short bio, up to 30 links and 12 social icons",
    "Smart links with a button for every service",
    "Title, artist and artwork filled in from Spotify, Apple Music, YouTube, SoundCloud and Deezer links",
    "Short links you can rename",
    "A QR code for every page, counted as its own source",
    "Five bio page layouts and six smart link layouts",
    "Light or dark, eight colours, four fonts and three button shapes",
    "Views, visitors and taps per button",
    "Sources, campaigns, countries, cities, devices and browsers",
    "Draft to take a page offline",
  ],
  plans: [
    { row: "Bio pages", free: "1", starter: "3", pro: "20" },
    { row: "Smart links", free: "3", starter: "25", pro: "200" },
    { row: "Stats history", free: "30 days", starter: "90 days", pro: "365 days" },
  ],
  faqs: [
    {
      q: "What is a smart link?",
      a: "A page for one song, video, podcast or product with a button for every service it is on, so people open it where they already listen or shop. Paste one link to fill in the title and artwork, then add the other services.",
    },
    {
      q: "What address does my page get?",
      a: "A short address such as /l/your-name, using lowercase letters, numbers and dashes. You can rename it, and each address can only be used once across Quantalog.",
    },
    {
      q: "How does the QR code work?",
      a: "Every page has its own QR code for posters, packaging or a stage screen. Scans are counted as their own source, so you can tell print from social.",
    },
    {
      q: "How quickly do changes show?",
      a: "Changes reach your public page within a minute.",
    },
    {
      q: "Do views and taps count toward my event allowance?",
      a: "No. They are counted separately and never touch your monthly allowance.",
    },
  ],
  related: ["media", "campaigns", "public-dashboard"],
  ctaTitle: "Make every link you share work harder.",
};
