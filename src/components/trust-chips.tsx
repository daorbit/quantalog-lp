import { Cookie, Feather, Gauge, ShieldCheck } from "lucide-react";

const chips = [
  { icon: Cookie, label: "No cookies set" },
  { icon: ShieldCheck, label: "No personal data stored" },
  { icon: Feather, label: "Under 1 KB tracker" },
  { icon: Gauge, label: "No consent banner" },
];

export function TrustChips() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
      {chips.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-1.5 text-[13px] font-medium text-fg-muted"
        >
          <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
