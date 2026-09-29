import { Check, Minus } from "lucide-react";
import type { Verdict } from "@/lib/comparisons";
import { site } from "@/lib/site";

export function VerdictBadge({ verdict, rival }: { verdict: Verdict; rival: string }) {
  const base = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold";

  if (verdict === "quantalog") {
    return (
      <span className={`${base} bg-accent/10 text-accent`}>
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
        {site.name}
      </span>
    );
  }
  if (verdict === "rival") {
    return (
      <span className={`${base} bg-bg-subtle text-fg-muted ring-1 ring-border`}>
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
        {rival}
      </span>
    );
  }
  return (
    <span className={`${base} bg-bg-subtle text-fg-faint`}>
      <Minus className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
      {verdict === "both" ? "Both" : "Neither"}
    </span>
  );
}
