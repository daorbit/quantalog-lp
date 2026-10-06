export const LEGAL_UPDATED = "September 29, 2026";

export const LEGAL_PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/dpa", label: "DPA" },
] as const;

export type LegalHighlight = { title: string; body: string };
