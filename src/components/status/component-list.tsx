import { STATE_LABEL, type StatusComponent } from "@/lib/status";
import { STATE_TEXT } from "./state-style";
import { UptimeBars } from "./uptime-bars";

export function ComponentList({ components }: { components: StatusComponent[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-surface">
      {components.map((component) => (
        <div key={component.id} className="border-t border-border px-5 py-5 first:border-t-0">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-[15px] font-semibold text-fg">{component.name}</h3>
              <p className="mt-0.5 text-[13px] text-fg-muted">{component.description}</p>
            </div>
            <span className={`text-[14px] font-medium ${STATE_TEXT[component.state]}`}>{STATE_LABEL[component.state]}</span>
          </div>
          <UptimeBars component={component} />
        </div>
      ))}
    </div>
  );
}
