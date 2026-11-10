export type FlowRow = { label: string; value?: string; live?: number; count?: number };

export type FlowTone = "accent" | "blue" | "teal" | "violet" | "orange";

export type FlowIcon = "code" | "shield" | "search" | "mail" | "activity" | "orbit";

export type FlowCardData = {
  id: string;
  title: string;
  icon: FlowIcon;
  tone: FlowTone;
  rows?: FlowRow[];
  note?: string;
  notes?: string[];
};

export const FLOW_SOURCE: FlowCardData = {
  id: "script",
  title: "Your website",
  icon: "code",
  tone: "accent",
  note: '<script src="quantalog.js" defer />',
};

export const FLOW_EVENTS: FlowCardData = {
  id: "events",
  title: "Cookieless events",
  icon: "shield",
  tone: "accent",
  rows: [
    { label: "Cookies set", value: "0" },
    { label: "Consent banner", value: "None" },
    { label: "Visitors counted", value: "100%" },
  ],
};

export const FLOW_OUTPUTS: FlowCardData[] = [
  {
    id: "live",
    title: "Live dashboard",
    icon: "activity",
    tone: "blue",
    rows: [
      { label: "Online now", live: 48 },
      { label: "Pageviews today", count: 12408 },
    ],
  },
  {
    id: "seo",
    title: "SEO audits",
    icon: "search",
    tone: "teal",
    rows: [
      { label: "Health score", value: "92 / 100" },
      { label: "Issues fixed", value: "14 of 17" },
    ],
  },
  {
    id: "orbit",
    title: "Orbit AI",
    icon: "orbit",
    tone: "violet",
    notes: [
      "Signups up 42% this week, mostly from Product Hunt.",
      "Your pricing page converts 3x better from Google.",
      "Bounce rate on /blog fell 18% after the last fix.",
    ],
  },
  {
    id: "reports",
    title: "Email reports",
    icon: "mail",
    tone: "orange",
    rows: [
      { label: "Schedule", value: "Mon · 9:00" },
      { label: "Recipients", value: "6" },
    ],
  },
];
