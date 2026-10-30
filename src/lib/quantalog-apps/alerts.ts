import { BellRing, Clock, MailWarning, Send, TrendingDown, TrendingUp } from "lucide-react";
import type { AppPage } from "./types";

export const alertsApp: AppPage = {
  slug: "alerts",
  logo: "quantalog-alerts.svg",
  name: "Quantalog Alerts",
  shortName: "Alerts",
  group: "Analyze",
  unlock: "once",
  docs: "/docs/quantalog-alerts",
  launched: "2026-10-30",
  title: "Know today,",
  accent: "not at month end.",
  description:
    "Alerts watches your sites around the clock and tells you when traffic drops or spikes, tracking stops, a goal falls behind or your forms go quiet.",
  metaDescription:
    "Website alerts for traffic drops, spikes, stopped tracking, goals behind pace and quiet forms. Delivered to the bell, email, Telegram and WhatsApp.",
  keywords: ["website traffic alerts", "analytics anomaly alerts", "tracking stopped alert", "telegram website alerts", "whatsapp analytics alert"],
  chips: [
    { icon: TrendingDown, label: "Traffic down 38% vs last Tuesday" },
    { icon: Send, label: "Sent to Telegram" },
    { icon: Clock, label: "Checked every hour" },
  ],
  stats: [
    { value: "5", label: "Things it watches" },
    { value: "4", label: "Places alerts go" },
    { value: "1", unit: "h", label: "Between checks on paid plans" },
  ],
  features: [
    {
      icon: TrendingDown,
      title: "Traffic drop",
      body: "The last 24 hours against the same 24 hours a week earlier, so a normal weekend dip never fires.",
    },
    {
      icon: MailWarning,
      title: "Tracking stopped",
      body: "No events for the hours you choose. Usually a site update that removed the script, caught the same day.",
    },
    {
      icon: TrendingUp,
      title: "Traffic spike",
      body: "See what's working while it's happening, not in next month's report.",
    },
    {
      icon: Clock,
      title: "Goal behind pace",
      body: "Checked once a third of the period has passed, when a goal is on course to miss by your chosen margin.",
    },
    {
      icon: BellRing,
      title: "Forms gone quiet",
      body: "Your lead capture forms receive nothing for the number of days you choose.",
    },
    {
      icon: Send,
      title: "Once per incident",
      body: "An alert fires when a problem starts and stays quiet until it clears, so a long outage is one message, not one an hour.",
    },
  ],
  steps: [
    {
      title: "Unlock Alerts",
      body: "A workspace admin unlocks Quantalog Alerts once in Apps. The first check runs within a few minutes.",
    },
    {
      title: "Pick the rules",
      body: "Choose the percentage for drops and spikes, the hours for stopped tracking, and the days for quiet forms.",
    },
    {
      title: "Choose where they go",
      body: "The bell always, plus email, Telegram and WhatsApp. Press Send a test to check each channel.",
    },
  ],
  story: {
    eyebrow: "No false alarms",
    title: "Quiet until something is actually wrong.",
    paragraphs: [
      "Comparing against the same weekday last week keeps ordinary weekly rhythm from firing. Very small sites are skipped for the traffic rules until there is enough to compare, so a test site never wakes you up.",
      "When something does go wrong, you hear once, in the place you actually read, and again only when it's fixed.",
    ],
  },
  connections: [
    { kind: "app", id: "telegram", how: "Link a chat once in Apps and alerts arrive from the Quantalog bot or your own." },
    { kind: "app", id: "whatsapp", how: "Verified numbers get alerts on the Pro plan." },
    { kind: "app", id: "goals", how: "Turn on Goals to get warned when a target is falling behind." },
    { kind: "product", href: "/forms", how: "Watches your lead capture forms for days without a response." },
  ],
  included: [
    "Traffic drop and spike rules",
    "Tracking stopped detection",
    "Goal behind pace warnings",
    "Quiet form warnings",
    "Notification bell for every alert",
    "Email to every editor and admin",
    "Telegram chats and WhatsApp numbers",
    "Send a test for each channel",
  ],
  plans: [
    { row: "Check interval", free: "Every 6 hours", starter: "Every hour", pro: "Every hour" },
    { row: "WhatsApp delivery", free: "—", starter: "—", pro: "Yes" },
  ],
  faqs: [
    {
      q: "Will I get an alert every hour during an outage?",
      a: "No. Each alert fires once when the problem starts and stays quiet until it clears.",
    },
    {
      q: "Why compare with last week rather than yesterday?",
      a: "Comparing the same 24 hours a week earlier keeps normal weekday and weekend patterns from firing alerts.",
    },
    {
      q: "Do I need a Telegram bot of my own?",
      a: "No. Use the Quantalog bot, or connect your own bot in Apps → Telegram if you prefer.",
    },
  ],
  related: ["goals", "insights", "reviews"],
  ctaTitle: "Hear about it the same day.",
};
