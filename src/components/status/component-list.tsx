import { STATE_LABEL, type StatusComponent } from "@/lib/status";
import { STATE_BG, STATE_TEXT } from "./state-style";
import { UptimeBars } from "./uptime-bars";

export function ComponentList({ components }: { components: StatusComponent[] }) {
  const hasHistory = components.some((c) => c.uptime !== null);
  return (
    <div className="rounded-[8px] border border-border bg-surface">
      {components.map((component) => (
        <div key={component.id} className="border-t border-border px-5 py-4 first:border-t-0 sm:px-6">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <h3 className="min-w-0 text-[15px] font-medium text-fg" title={component.description}>
              {component.name}
            </h3>
            <div className="flex shrink-0 items-center gap-4 text-[13px]">
              {component.uptime !== null && <span className="hidden tabular-nums text-fg-muted sm:inline">{component.uptime}%</span>}
              <span className={`inline-flex items-center gap-1.5 font-medium ${STATE_TEXT[component.state]}`}>
                <span className={`h-2 w-2 rounded-full ${STATE_BG[component.state]}`} aria-hidden="true" />
                {STATE_LABEL[component.state]}
              </span>
            </div>
          </div>
          <UptimeBars component={component} />
        </div>
      ))}
      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-[12px] text-fg-muted sm:px-6">
        <span>
          <span className="sm:hidden">30 days ago</span>
          <span className="hidden sm:inline">90 days ago</span>
        </span>
        {!hasHistory && <span className="text-center">History starts with the first check</span>}
        <span>Today</span>
      </div>
    </div>
  );
}
