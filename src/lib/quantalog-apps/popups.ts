import { Bot, Clock, Code2, MousePointerClick, PanelBottomOpen, Repeat } from "lucide-react";
import type { AppPage } from "./types";

export const popupsApp: AppPage = {
  slug: "popups",
  logo: "quantalog-popups.svg",
  name: "Quantalog Popups",
  shortName: "Popups",
  group: "Grow",
  unlock: "once",
  docs: "/docs/quantalog-popups",
  launched: "2026-10-30",
  title: "Your best form,",
  accent: "at the right moment.",
  description:
    "Show any published lead capture form as a popup or a corner slide-in, triggered by time, scroll or exit intent. It runs through the script you already installed.",
  metaDescription:
    "Website popups and slide-ins for your lead forms. Delay, scroll and exit-intent triggers, page and device targeting, and conversion per popup. No new code.",
  keywords: ["website popup builder", "exit intent popup", "slide-in form", "lead capture popup", "popup conversion tracking"],
  chips: [
    { icon: MousePointerClick, label: "On exit intent" },
    { icon: PanelBottomOpen, label: "Corner slide-in" },
    { icon: Code2, label: "No new code" },
  ],
  stats: [
    { value: "3", label: "Ways to trigger" },
    { value: "0", label: "Lines of new code" },
    { value: "5", unit: "min", label: "For changes to go live" },
  ],
  features: [
    {
      icon: Clock,
      title: "Delay, scroll or exit intent",
      body: "Open after a few seconds, once a visitor reaches a scroll depth, or as the cursor heads for the tabs. On phones, exit intent opens after 20 seconds.",
    },
    {
      icon: PanelBottomOpen,
      title: "Popup or slide-in",
      body: "A centred popup for the big ask, a quiet corner slide-in for everything else.",
    },
    {
      icon: MousePointerClick,
      title: "The right pages",
      body: "Every page, only some, or everywhere except some. Paths like /pricing, with * as a wildcard so /blog/* covers every post.",
    },
    {
      icon: Repeat,
      title: "Polite by design",
      body: "Choose how many days pass before the same visitor sees it again. Anyone who submits never sees that popup again.",
    },
    {
      icon: Bot,
      title: "Never for bots",
      body: "Popups load after the page has finished loading, skip bots, and stay off entirely with data-popups=\"off\".",
    },
    {
      icon: Code2,
      title: "Views and conversion",
      body: "Every popup shows views, submissions and conversion for the last 30 days, and none of it counts toward your event allowance.",
    },
  ],
  steps: [
    {
      title: "Publish a form",
      body: "Build the form in Lead capture and publish it. Any published form can become a popup.",
    },
    {
      title: "Create the popup",
      body: "Unlock Popups in Apps, open Popups and press New popup. Pick the site, the form, the trigger, the style, pages and devices.",
    },
    {
      title: "It's live in minutes",
      body: "New popups and changes reach your site within five minutes, through the tracking script already on it.",
    },
  ],
  story: {
    eyebrow: "No new code",
    title: "The script you already installed does the work.",
    paragraphs: [
      "There is no popup plugin, no second snippet and no tag manager change. Popups ride on the Quantalog tracking script, so turning one on is a setting, not a deployment.",
      "Submissions land in Lead capture with everything else, so the follow-up, the alerts and the invoice all happen in the same place.",
    ],
  },
  connections: [
    { kind: "product", href: "/forms", how: "Any published lead capture form can be shown as a popup or slide-in." },
    { kind: "product", href: "/analytics", how: "Runs through your existing tracking script and reports views and conversion." },
    { kind: "app", id: "slack", how: "Submissions trigger the same form alerts as the full-page form." },
    { kind: "app", id: "google-sheets", how: "Every popup submission becomes a row, like any other response." },
  ],
  included: [
    "Popup and corner slide-in styles",
    "Delay, scroll depth and exit intent triggers",
    "Page rules with wildcards",
    "Phone and desktop targeting",
    "Frequency control per visitor",
    "Hidden for visitors who already submitted",
    "Views, submissions and conversion",
    "Not counted toward your event allowance",
  ],
  plans: [{ row: "Popups", free: "1", starter: "5", pro: "25" }],
  faqs: [
    {
      q: "Do I need to add anything to my site?",
      a: "No. Popups run through the Quantalog tracking script you already installed. New popups reach your site within five minutes.",
    },
    {
      q: "Will popups slow my page down?",
      a: "They load only after the page has finished loading, and never for bots.",
    },
    {
      q: "Can I switch popups off on one page?",
      a: "Use page rules to exclude it, or add data-popups=\"off\" to the script tag to turn popups off wherever that tag is.",
    },
  ],
  related: ["link-in-bio", "funnels", "alerts"],
  ctaTitle: "Turn more visitors into leads.",
};
