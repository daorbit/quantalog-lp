import { ArrowUp, TrendingDown } from "lucide-react";
import { stageStyle } from "@/lib/stage";
import { OrbitMark } from "../orbit-mark";

const HOST = "yourstore.com";

const SUGGESTIONS = ["Which page converts best?", "Fix my SEO score", "Draft a LinkedIn post"];

export function SidePanel() {
  return (
    <div className="orbit-mock-panel stage-item flex min-h-120 w-full flex-col" style={stageStyle({ delay: 1.3, fromY: "24px", fromScale: 0.98 })}>
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <OrbitMark size={22} />
        <span className="text-[14px] font-semibold tracking-tight">Orbit AI</span>
        <span className="ml-auto rounded-full bg-fg/6 px-2.5 py-0.5 text-[11.5px] text-fg-muted">{HOST}</span>
      </div>

      <div className="flex-1 space-y-5 p-5 text-[13.5px] leading-relaxed">
        <div className="stage-item flex justify-end" style={stageStyle({ delay: 1.8, fromY: "8px" })}>
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-accent-fg">
            Why did signups drop this week?
          </div>
        </div>

        <div className="grid">
          <div className="orbit-typing flex items-center gap-2.5 [grid-area:1/1] self-start">
            <OrbitMark size={18} />
            <span className="flex gap-1 rounded-full border border-border px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
              <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
            </span>
          </div>

          <div className="stage-item flex gap-2.5 [grid-area:1/1]" style={stageStyle({ delay: 3, fromY: "6px" })}>
            <OrbitMark size={18} className="mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-fg-muted">
                Visits held steady, but the <b className="font-semibold text-fg">Growth plan</b> button lost 31% of its clicks
                after Tuesday&apos;s deploy. On mobile it moved below the fold.
              </p>
              <div className="stage-item mt-3 rounded-xl border border-border p-3" style={stageStyle({ delay: 3.4, fromY: "6px" })}>
                <p className="flex items-center justify-between text-[12px] text-fg-faint">
                  Growth plan clicks
                  <span className="orbit-drop flex items-center gap-1 font-semibold">
                    <TrendingDown className="h-3.5 w-3.5" />
                    −31%
                  </span>
                </p>
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-14 text-fg-faint">Last week</span>
                    <span className="orbit-bar orbit-bar--before h-2 rounded-full" />
                    <span className="tabular-nums text-fg-muted">248</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-14 text-fg-faint">This week</span>
                    <span className="orbit-bar orbit-bar--after h-2 rounded-full" />
                    <span className="tabular-nums text-fg">171</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s, i) => (
            <span
              key={s}
              className="stage-item rounded-full border border-border px-3 py-1.5 text-[12px] text-fg-muted"
              style={stageStyle({ delay: 4, i, stagger: 110, fromY: "6px" })}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="m-4 mt-0 flex items-center justify-between rounded-xl border border-border bg-bg-subtle py-2.5 pl-4 pr-2">
        <span className="text-[13px] text-fg-faint">Ask anything</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-cta text-cta-fg">
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
