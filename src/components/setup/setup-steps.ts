export const SITE_KEY = "qs_7f3a9c21";

export const steps = [
  {
    n: 1,
    title: "Create a site",
    body: "Sign up, name your workspace, add a domain. You get a public site key immediately.",
  },
  {
    n: 2,
    title: "Drop in the tag",
    body: "Paste one async script into your <head>. It is under a kilobyte and blocks nothing.",
  },
  {
    n: 3,
    title: "Watch it live",
    body: "Open the dashboard. The first pageview lands in about three seconds — including yours.",
  },
] as const;

export const setupFacts = [
  { value: "0.9", unit: "KB", label: "Tracker size" },
  { value: "0", unit: "", label: "Cookies set" },
  { value: "~3", unit: "s", label: "Until the first pageview" },
] as const;
