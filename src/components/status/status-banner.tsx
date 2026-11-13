import { CircleAlert, CircleCheck, Wrench } from "lucide-react";
import type { ComponentState } from "@/lib/status";
import { utcStamp } from "@/lib/status";
import { STATE_TEXT } from "./state-style";

const ICON = { operational: CircleCheck, degraded: CircleAlert, outage: CircleAlert, maintenance: Wrench } as const;

export function StatusBanner({ state, label, updatedAt }: { state: ComponentState; label: string; updatedAt: string }) {
  const Icon = ICON[state];
  return (
    <section className="flex items-center gap-4 rounded-[8px] border border-border bg-surface px-5 py-5 sm:px-6" aria-live="polite">
      <Icon className={`h-9 w-9 shrink-0 ${STATE_TEXT[state]}`} strokeWidth={1.8} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[21px] font-semibold leading-tight tracking-tight text-fg">{label}</p>
        <p className="mt-1 text-[13px] text-fg-muted">Checked every 5 minutes · updated {utcStamp(updatedAt)}</p>
      </div>
    </section>
  );
}
