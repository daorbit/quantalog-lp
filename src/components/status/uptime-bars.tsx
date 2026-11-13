import { STATE_LABEL, utcDay, type StatusComponent } from "@/lib/status";
import { STATE_BG } from "./state-style";

function title(bar: StatusComponent["bars"][number]): string {
  const uptime = bar.uptime === null ? "" : ` · ${bar.uptime}% uptime`;
  return `${utcDay(`${bar.day}T00:00:00.000Z`)}: ${STATE_LABEL[bar.state]}${uptime}`;
}

export function UptimeBars({ component }: { component: StatusComponent }) {
  const days = component.bars.length;
  return (
    <div>
      <div className="flex h-8 items-stretch gap-[2px]" role="img" aria-label={`${component.name}, last ${days} days`}>
        {component.bars.map((bar) => (
          <span
            key={bar.day}
            title={title(bar)}
            className={`flex-1 rounded-[2px] transition-opacity duration-150 hover:opacity-70 ${STATE_BG[bar.state]}`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-fg-muted">
        <span>{days} days ago</span>
        <span>{component.uptime === null ? "No data yet" : `${component.uptime}% uptime`}</span>
        <span>Today</span>
      </div>
    </div>
  );
}
