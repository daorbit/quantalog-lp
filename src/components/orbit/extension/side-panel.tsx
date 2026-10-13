import { ArrowUp } from "lucide-react";
import { stageStyle } from "@/lib/stage";
import { OrbitMark } from "../orbit-mark";

export const PREVIEW_HOST = "yourstore.com";

const SUGGESTIONS = ["Which page converts best?", "Fix my SEO score", "Draft a LinkedIn post"];

export function SidePanel() {
  return (
    <div
      className="stage-item flex w-full flex-col border-border bg-surface sm:w-76 sm:border-l"
      style={stageStyle({ delay: 1.7, fromX: "28px" })}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <OrbitMark size={20} />
        <span className="text-[13px] font-semibold tracking-tight">Orbit AI</span>
        <span className="ml-auto rounded-full bg-fg/6 px-2 py-0.5 text-[10.5px] text-fg-muted">{PREVIEW_HOST}</span>
      </div>

      <div className="flex-1 space-y-4 p-4 text-[12.5px] leading-relaxed">
        <div className="stage-item flex justify-end" style={stageStyle({ delay: 2.2, fromY: "8px" })}>
          <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-accent-fg">
            Why did signups drop this week?
          </div>
        </div>

        <div className="grid">
          <div className="orbit-typing flex items-center gap-2 [grid-area:1/1] self-start">
            <OrbitMark size={16} />
            <span className="flex gap-1 rounded-full border border-border px-2.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
            </span>
          </div>
          <div className="stage-item flex gap-2 [grid-area:1/1]" style={stageStyle({ delay: 3.4, fromY: "6px" })}>
            <OrbitMark size={16} className="mt-0.5 shrink-0" />
            <p className="text-fg-muted">
              Visits held steady, but the <b className="font-semibold text-fg">Growth plan</b> card lost 31% of its clicks after
              Tuesday&apos;s deploy. The button moved below the fold on mobile.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s, i) => (
            <span
              key={s}
              className="stage-item rounded-full border border-border px-2.5 py-1 text-[11.5px] text-fg-muted"
              style={stageStyle({ delay: 4.1, i, stagger: 110, fromY: "6px" })}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="m-3 flex items-center justify-between rounded-xl border border-border bg-bg-subtle py-2 pl-3.5 pr-1.5">
        <span className="text-[12px] text-fg-faint">Ask anything</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-cta text-cta-fg">
          <ArrowUp className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
