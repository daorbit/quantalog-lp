import type { DayState, IncidentImpact } from "@/lib/status";

export const STATE_BG: Record<DayState, string> = {
  operational: "bg-status-ok",
  degraded: "bg-status-degraded",
  outage: "bg-status-outage",
  maintenance: "bg-status-maintenance",
  none: "bg-status-none",
};

export const STATE_TEXT: Record<DayState, string> = {
  operational: "text-status-ok",
  degraded: "text-status-degraded",
  outage: "text-status-outage",
  maintenance: "text-status-maintenance",
  none: "text-fg-muted",
};

export const IMPACT_BG: Record<IncidentImpact, string> = {
  minor: "bg-status-degraded",
  major: "bg-status-outage",
  maintenance: "bg-status-maintenance",
};

export const IMPACT_TEXT: Record<IncidentImpact, string> = {
  minor: "text-status-degraded",
  major: "text-status-outage",
  maintenance: "text-status-maintenance",
};

export const IMPACT_BORDER: Record<IncidentImpact, string> = {
  minor: "border-status-degraded",
  major: "border-status-outage",
  maintenance: "border-status-maintenance",
};
