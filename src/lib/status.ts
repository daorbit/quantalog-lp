import { site } from "@/lib/site";

export type ComponentState = "operational" | "degraded" | "outage" | "maintenance";
export type DayState = ComponentState | "none";
export type IncidentImpact = "minor" | "major" | "maintenance";

export type IncidentUpdate = { id: string; status: string; statusLabel: string; body: string; at: string };

export type Incident = {
  id: string;
  title: string;
  impact: IncidentImpact;
  components: string[];
  status: string;
  statusLabel: string;
  startedAt: string;
  resolvedAt: string | null;
  updates: IncidentUpdate[];
};

export type StatusComponent = {
  id: string;
  name: string;
  description: string;
  state: ComponentState;
  uptime: number | null;
  bars: { day: string; state: DayState; uptime: number | null }[];
};

export type StatusSummary = {
  overall: ComponentState;
  overallLabel: string;
  components: StatusComponent[];
  active: Incident[];
  recent: Incident[];
  updatedAt: string;
};

export type IncidentPage = { incidents: Incident[]; nextBefore: string | null };

const REVALIDATE = 60;
const TIMEOUT_MS = 5_000;

async function read<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${site.api}/api/public/status${path}`, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function getStatus() {
  return read<StatusSummary>("");
}

export function getIncident(id: string) {
  return /^[a-f0-9]{24}$/i.test(id) ? read<Incident>(`/incidents/${id}`) : Promise.resolve(null);
}

export function getIncidentPage(before?: string) {
  const query = before && !Number.isNaN(Date.parse(before)) ? `?before=${encodeURIComponent(before)}` : "";
  return read<IncidentPage>(`/incidents${query}`);
}

export const STATE_LABEL: Record<DayState, string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  outage: "Outage",
  maintenance: "Under maintenance",
  none: "No data",
};

export const IMPACT_LABEL: Record<IncidentImpact, string> = {
  minor: "Degraded performance",
  major: "Outage",
  maintenance: "Maintenance",
};

export const COMPONENT_NAME: Record<string, string> = {
  dashboard: "Dashboard",
  api: "API",
  tracking: "Tracking",
  forms: "Lead capture",
  invoicing: "Invoicing",
  jobs: "Scheduled jobs",
};

const UTC_DATE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const UTC_TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });

export function utcStamp(value: string): string {
  const date = new Date(value);
  return `${UTC_DATE.format(date)} · ${UTC_TIME.format(date)} UTC`;
}

export function utcDay(value: string): string {
  return UTC_DATE.format(new Date(value));
}

export function dayOf(value: string): string {
  return new Date(value).toISOString().slice(0, 10);
}

export function recentDays(updatedAt: string, count: number): string[] {
  const end = Date.parse(`${dayOf(updatedAt)}T00:00:00.000Z`);
  return Array.from({ length: count }, (_, i) => new Date(end - i * 86_400_000).toISOString().slice(0, 10));
}
