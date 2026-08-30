import { Cookie, Feather, Gauge, ShieldCheck } from "lucide-react";

const chips = [
  { icon: Cookie, label: "Cookies", value: "None set" },
  { icon: ShieldCheck, label: "Personal data", value: "Never stored" },
  { icon: Feather, label: "Tracker", value: "Under 1 KB" },
  { icon: Gauge, label: "Consent banner", value: "Not needed" },
];

export function TrustChips() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
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
