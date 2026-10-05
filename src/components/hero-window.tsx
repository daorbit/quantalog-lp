import { ArrowRight, Lock } from "lucide-react";
import { site } from "@/lib/site";
import { HeroFlowLazy } from "./hero-flow-lazy";

export function HeroWindow() {
  return (
    <div className="hero-window mx-auto w-full max-w-6xl">
      <div className="hero-frame">
        <div className="grid h-12 grid-cols-[1fr_auto_1fr] items-center border-b border-border px-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border border-border-strong bg-bg-subtle" />
            <span className="h-3 w-3 rounded-full border border-border-strong bg-bg-subtle" />
            <span className="h-3 w-3 rounded-full border border-border-strong bg-bg-subtle" />
          </div>

          <div className="flex h-7 w-56 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-hairline bg-bg-subtle px-3 text-[12px] text-fg-faint sm:w-72">
            <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{new URL(site.app).host}</span>
          </div>

          <span className="flex items-center justify-end gap-1.5 text-[11.5px] font-medium text-fg-muted">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="hidden sm:inline">Live</span>
          </span>
        </div>

        <div className="hero-canvas">
          <div className="hidden sm:block">
            <HeroFlowLazy className="h-[400px] w-full lg:h-[480px]" />
          </div>
          <div className="sm:hidden">
            <HeroFlowLazy compact className="h-[300px] w-full" />
          </div>
        </div>
      </div>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[12.5px] text-fg-faint">
        <span className="hidden sm:inline">Drag any card. This is the whole pipeline.</span>
        <span className="sm:hidden">One script tag in, three surfaces out.</span>
        <a
          href={`${site.app}/login`}
          className="inline-flex items-center gap-1 font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          Open the live demo
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
