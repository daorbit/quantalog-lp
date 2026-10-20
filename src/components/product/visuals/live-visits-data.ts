export type Visit = { id: number; code: string; country: string; page: string; source: string; age: number };

export const VISIT_POOL: Omit<Visit, "id" | "age">[] = [
  { code: "in", country: "India", page: "/pricing", source: "Google" },
  { code: "us", country: "United States", page: "/blog/cookieless-analytics", source: "Direct" },
  { code: "de", country: "Germany", page: "/docs/tracking", source: "Newsletter" },
  { code: "gb", country: "United Kingdom", page: "/", source: "LinkedIn" },
  { code: "br", country: "Brazil", page: "/features", source: "Google" },
  { code: "jp", country: "Japan", page: "/pricing", source: "X" },
  { code: "au", country: "Australia", page: "/blog/ga4-alternative", source: "Bing" },
  { code: "fr", country: "France", page: "/signup", source: "Email" },
  { code: "ca", country: "Canada", page: "/docs/funnels", source: "Google" },
  { code: "ae", country: "United Arab Emirates", page: "/", source: "ChatGPT" },
];

export const SEED_AGES = [3, 8, 14, 22, 31];

export const LIVE_SEED = 47;
export const LIVE_MIN = 41;
export const LIVE_MAX = 56;

export const ARRIVAL_MS = 2600;

export function seedVisits(): Visit[] {
  return SEED_AGES.map((age, i) => ({ ...VISIT_POOL[i], id: i, age }));
}

export function formatAge(age: number) {
  return age < 2 ? "now" : `${age}s ago`;
}
