import type { Edge, Node } from "@xyflow/react";
import type { CardData } from "./flow-card";

export const FLOW_NODES: Node[] = [
  {
    id: "script",
    type: "card",
    position: { x: 0, y: 190 },
    data: {
      title: "Your website",
      icon: "code",
      order: 0,
      note: '<script src="quantalog.js" defer />',
      source: true,
    } satisfies CardData,
  },
  {
    id: "events",
    type: "card",
    position: { x: 270, y: 150 },
    data: {
      title: "Cookieless events",
      icon: "shield",
      order: 1,
      rows: [
        { label: "Cookies set", value: "0" },
        { label: "Consent banner", value: "None" },
        { label: "Visitors counted", value: "100%" },
      ],
      accent: true,
      target: true,
      source: true,
      flare: "events",
    } satisfies CardData,
  },
  {
    id: "live",
    type: "card",
    position: { x: 540, y: -10 },
    data: {
      title: "Live dashboard",
      icon: "activity",
      order: 2,
      rows: [
        { label: "Online now", live: 48 },
        { label: "Pageviews today", value: "12.4k" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
  {
    id: "seo",
    type: "card",
    position: { x: 540, y: 120 },
    data: {
      title: "SEO audits",
      icon: "search",
      order: 3,
      rows: [
        { label: "Health score", value: "92 / 100" },
        { label: "Issues fixed", value: "14 of 17" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
  {
    id: "orbit",
    type: "card",
    position: { x: 540, y: 250 },
    data: {
      title: "Orbit AI",
      icon: "orbit",
      order: 4,
      note: "Signups up 42% this week, mostly from Product Hunt.",
      target: true,
      flare: "output",
    } satisfies CardData,
  },
  {
    id: "reports",
    type: "card",
    position: { x: 540, y: 365 },
    data: {
      title: "Email reports",
      icon: "mail",
      order: 5,
      rows: [
        { label: "Schedule", value: "Mon · 9:00" },
        { label: "Recipients", value: "6" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
];

export const FLOW_EDGES: Edge[] = [
  { id: "e1", type: "pulse", source: "script", target: "events", data: { stage: 0, order: 0 } },
  { id: "e2", type: "pulse", source: "events", target: "live", data: { stage: 1, order: 1 } },
  { id: "e3", type: "pulse", source: "events", target: "seo", data: { stage: 1, order: 2 } },
  { id: "e4", type: "pulse", source: "events", target: "orbit", data: { stage: 1, order: 3 } },
  { id: "e5", type: "pulse", source: "events", target: "reports", data: { stage: 1, order: 4 } },
];
