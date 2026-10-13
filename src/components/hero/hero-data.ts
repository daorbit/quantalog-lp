export const KPIS = [
  { label: "Visitors", value: "12,847", delta: "+18.2%", good: true },
  { label: "Pageviews", value: "41,203", delta: "+11.4%", good: true },
  { label: "Bounce rate", value: "34%", delta: "−6.1%", good: true },
  { label: "Avg. visit", value: "2m 41s", delta: "−0.8%", good: false },
];

export const SERIES = [
  32, 30, 35, 41, 38, 44, 52, 49, 55, 61, 58, 66, 72, 69, 76, 84, 80, 88, 97, 92, 101, 108, 104, 115,
];

export const PREVIOUS = [
  28, 29, 31, 33, 32, 36, 39, 38, 42, 45, 44, 47, 50, 49, 53, 56, 55, 58, 61, 60, 63, 66, 65, 68,
];

export const AXIS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const PAGES = [
  { path: "/pricing", visitors: "4,128", delta: "+24%", trend: [4, 5, 5, 6, 8, 7, 9, 11] },
  { path: "/", visitors: "3,271", delta: "+9%", trend: [6, 6, 7, 6, 7, 8, 8, 9] },
  { path: "/blog/cookieless-analytics", visitors: "1,904", delta: "+61%", trend: [2, 2, 3, 3, 5, 6, 8, 10] },
  { path: "/docs/quickstart", visitors: "1,140", delta: "+4%", trend: [5, 5, 6, 5, 5, 6, 6, 6] },
];

export const THREAD = {
  channel: "growth",
  question: { name: "Maya Chen", initials: "MC", time: "9:41 AM", text: "why did signups jump on Tuesday?" },
  answer: {
    time: "9:41 AM",
    text: "Signups rose 42% after the Product Hunt launch. 61% came from producthunt.com and converted at 6.8%, against 2.9% on a normal day.",
    chips: ["producthunt.com · 1,284", "/pricing · +24%"],
  },
};

export const AGENT_STEPS = [
  { tool: "query-traffic", detail: "range=7d · group=source" },
  { tool: "compare-period", detail: "vs previous 7d" },
  { tool: "find-conversions", detail: "goal=signup" },
  { tool: "create-report", detail: "\"Launch week recap\"" },
];
