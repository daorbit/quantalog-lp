import { Cookie, Feather, Gauge, ShieldCheck } from "lucide-react";

/**
 * The credentials, above the headline.
 *
 * Every one is a fact about the product that can be checked from the page
 * itself — no review scores, no user counts, no compliance badges we have not
 * earned. A chip row is the most persuasive real estate on a landing page
 * precisely because it is read as fact rather than marketing, which is why
 * putting anything aspirational in it is a bad trade.
 */

const chips = [
  { icon: Cookie, label: "Cookies", value: "None set" },
  { icon: ShieldCheck, label: "Personal data", value: "Never stored" },
  { icon: Feather, label: "Tracker", value: "Under 1 KB" },
  { icon: Gauge, label: "Consent banner", value: "Not needed" },
];

export function TrustChips() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {chips.map(({ icon: Icon, label, value }) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-2.5 py-1.5 backdrop-blur"
        >
          <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span className="text-left leading-tight">
            <span className="block text-[10px] uppercase tracking-[0.06em] text-fg-faint">
              {label}
            </span>
            <span className="block text-[12px] font-medium">{value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
