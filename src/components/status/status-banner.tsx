import { CircleAlert, CircleCheck, Wrench } from "lucide-react";
import type { ComponentState } from "@/lib/status";
import { utcStamp } from "@/lib/status";
import { STATE_BG } from "./state-style";

const ICON = { operational: CircleCheck, degraded: CircleAlert, outage: CircleAlert, maintenance: Wrench } as const;

export function StatusBanner({ state, label, updatedAt }: { state: ComponentState; label: string; updatedAt: string }) {
  const Icon = ICON[state];
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 rounded-[8px] px-5 py-4 text-white ${STATE_BG[state]}`}>
      <p className="flex items-center gap-2.5 text-[17px] font-semibold">
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {label}
      </p>
      <p className="text-[13px] opacity-90">Updated {utcStamp(updatedAt)}</p>
    </div>
  );
}
