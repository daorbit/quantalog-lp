import { Cookie, Database, Gauge, Scale } from "lucide-react";
import { site } from "@/lib/site";

export const ABOUT_DESCRIPTION =
  "Quantalog is privacy-first web analytics for teams that want complete numbers without tracking people. No cookies, no personal data and no consent banner — with SEO audits, reports and an AI assistant in the same dashboard.";

export const aboutStats = [
  { value: "0", label: "Cookies set" },
  { value: "<1", unit: "KB", label: "Tracker size" },
  { value: "0", label: "Raw IPs stored" },
  { value: "100", unit: "%", label: "Of visitors counted" },
] as const;

export const principles = [
  {
    icon: Cookie,
    title: "No cookies, by design",
    body: "There is no setting to switch cookies on. A visitor is a salted hash of IP, user agent and site key that rotates daily, so nobody is recognisable tomorrow or on another site.",
  },
  {
    icon: Database,
    title: "No raw IP addresses",
    body: "IP addresses are hashed the moment a request arrives and then discarded. What is never stored cannot be leaked, sold or disclosed.",
  },
  {
    icon: Scale,
    title: "Customers pay, not advertisers",
    body: "Quantalog is funded by subscriptions. Data is never sold, shared with ad networks or used to build profiles — which is what keeps the numbers honest.",
  },
  {
    icon: Gauge,
    title: "Lightweight on every page",
    body: "The tracker is under a kilobyte and loads asynchronously. Analytics should never slow down the pages it measures.",
  },
] as const;

export const exclusions = [
  "Session recording",
  "Heatmaps",
  "Cross-site tracking",
  "Ad-platform attribution",
  "User-level profiles",
  "Fingerprinting",
] as const;

export const companyFacts = [
  { label: "Product", value: site.name },
  { label: "Operated by", value: site.legalName },
  { label: "Based in", value: "India" },
  { label: "Funding", value: "Independent, self-funded" },
] as const;

export const aboutFaqs = [
  {
    q: "Who is behind Quantalog?",
    a: `Quantalog is built and operated by ${site.legalName}, a small independent team. It is self-funded rather than venture-backed, so the roadmap is set by customers rather than growth targets.`,
  },
  {
    q: "Is Quantalog GDPR compliant?",
    a: "Quantalog sets no cookies and stores no personal data. Visitors are counted with a daily-rotating hash that is never stored in reversible form, which is why no consent banner is needed for it. Your overall obligations still depend on everything else running on your site, so treat this as one fewer disclosure rather than legal advice.",
  },
  {
    q: "What does Quantalog deliberately not do?",
    a: "No session recording, heatmaps, cross-site tracking, ad-platform attribution or user-level profiles. Each of those requires following an individual, which is exactly what Quantalog is designed not to do.",
  },
  {
    q: "How do I get in touch?",
    a: `Email ${site.email} or use the contact page. Every message is answered by a person.`,
  },
] as const;
