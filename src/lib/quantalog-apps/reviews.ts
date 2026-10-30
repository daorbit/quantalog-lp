import { BarChart3, MapPin, MessageSquareReply, RefreshCw, ShieldCheck, Star } from "lucide-react";
import type { AppPage } from "./types";

export const reviewsApp: AppPage = {
  slug: "reviews",
  logo: "quantalog-reviews.svg",
  name: "Quantalog Reviews",
  shortName: "Reviews",
  group: "Grow",
  unlock: "once",
  docs: "/docs/reviews",
  launched: "2026-10-30",
  title: "Your Google reviews,",
  accent: "next to your traffic.",
  description:
    "Sync your Google Business Profile reviews into Quantalog and see your rating, the star-by-star breakdown and the latest reviews beside your analytics.",
  metaDescription:
    "Google reviews in your analytics workspace. Rating summary, star breakdown, latest reviews and your replies, synced from Google Business Profile.",
  keywords: ["google reviews dashboard", "google business profile reviews", "review monitoring", "rating tracker", "local SEO reviews"],
  chips: [
    { icon: Star, label: "4.8 average rating" },
    { icon: MessageSquareReply, label: "Owner replies included" },
    { icon: RefreshCw, label: "Sync on demand" },
  ],
  stats: [
    { value: "5", label: "Star breakdown" },
    { value: "1", label: "Google connection" },
    { value: "0", label: "Changes made on Google" },
  ],
  features: [
    {
      icon: Star,
      title: "Rating at a glance",
      body: "Your average rating and a star-by-star breakdown, without opening a separate Google dashboard.",
    },
    {
      icon: MessageSquareReply,
      title: "Reviews and replies",
      body: "The latest reviews, with the replies you posted from your Business Profile shown as the owner's response.",
    },
    {
      icon: MapPin,
      title: "Pick the location",
      body: "Quantalog lists every Business Profile location the connected Google account can see. Choose the one to sync.",
    },
    {
      icon: RefreshCw,
      title: "Sync when you want",
      body: "Press Sync reviews to pull the latest. Everything shown reflects the last successful sync.",
    },
    {
      icon: ShieldCheck,
      title: "Read-only on Google",
      body: "Disconnecting removes the cached reviews from Quantalog only. Nothing on your Business Profile changes.",
    },
    {
      icon: BarChart3,
      title: "Beside your numbers",
      body: "Reviews sit in the same workspace as your traffic, so you can see whether a bad week of reviews matched a bad week of visits.",
    },
  ],
  steps: [
    {
      title: "Unlock Reviews",
      body: "A workspace admin unlocks Quantalog Reviews once in Apps, or presses Enable Reviews on the Reviews page.",
    },
    {
      title: "Connect Google",
      body: "Press Connect Google and sign in with the account that manages your Business Profile.",
    },
    {
      title: "Choose the location",
      body: "Pick the location to sync, then use Sync reviews whenever you want the latest.",
    },
  ],
  story: {
    eyebrow: "Who can do what",
    title: "Admins connect. Everyone can read.",
    paragraphs: [
      "Connecting Google, switching locations and syncing are limited to workspace admins. Everyone else in the workspace can read the reviews once a location is set up.",
      "If Google access expires or is revoked, the connection shows a reconnect prompt instead of quietly going stale.",
    ],
  },
  connections: [
    { kind: "product", href: "/social", how: "Orbit can see your reviews when you ask it about traffic and reputation." },
    { kind: "app", id: "tasks", how: "Turn a review that needs a reply into a task for the right person." },
    { kind: "product", href: "/reports", how: "Share how the business is doing alongside the traffic numbers." },
    { kind: "app", id: "alerts", how: "Pair with Alerts so a traffic drop and a run of reviews don't go unnoticed." },
  ],
  included: [
    "Google Business Profile connection",
    "Location picker",
    "Average rating and star breakdown",
    "Latest reviews with owner replies",
    "Sync on demand",
    "Reconnect prompt when access expires",
    "Read access for every member",
    "Connection kept when the app is off",
  ],
  faqs: [
    {
      q: "Can I reply to reviews from Quantalog?",
      a: "Replies are shown, but you post them from your Google Business Profile. Quantalog doesn't change anything on Google.",
    },
    {
      q: "What if my Google account has no locations?",
      a: "Quantalog points you to business.google.com to add one first, then you can come back and pick it.",
    },
    {
      q: "What happens if I disconnect?",
      a: "The cached reviews are removed from Quantalog only. Your Business Profile and its reviews are untouched.",
    },
  ],
  related: ["alerts", "tasks", "insights"],
  ctaTitle: "See your reputation beside your traffic.",
};
