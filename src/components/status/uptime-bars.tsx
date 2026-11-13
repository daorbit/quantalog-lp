import { STATE_LABEL, utcDay, type StatusComponent } from "@/lib/status";
import { STATE_BG } from "./state-style";

const MOBILE_DAYS = 30;

function tip(bar: StatusComponent["bars"][number]): string {
  return bar.uptime === null ? STATE_LABEL[bar.state] : `${STATE_LABEL[bar.state]} · ${bar.uptime}% uptime`;
}

export function UptimeBars({ component }: { component: StatusComponent }) {
  const total = component.bars.length;
  return (
    <div className="flex h-7 items-stretch gap-[2px]" role="img" aria-label={`${component.name}: daily uptime for the last ${total} days`}>
      {component.bars.map((bar, i) => (
        <span key={bar.day} className={`group relative flex-1 ${i < total - MOBILE_DAYS ? "hidden sm:flex" : "flex"}`}>
          <span className={`w-full rounded-[2px] transition-opacity duration-150 group-hover:opacity-60 ${STATE_BG[bar.state]}`} />
          <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-max max-w-[220px] -translate-x-1/2 rounded-[8px] border border-border bg-surface-raised px-3 py-2 text-left shadow-float group-hover:block">
            <span className="block text-[12px] font-semibold text-fg">{utcDay(`${bar.day}T00:00:00.000Z`)}</span>
            <span className="block text-[12px] text-fg-muted">{tip(bar)}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
