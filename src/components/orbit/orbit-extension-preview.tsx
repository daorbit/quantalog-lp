import { ArrowUp, Lock } from "lucide-react";
import { OrbitMark } from "./orbit-mark";

const HOST = "yourstore.com";

function PageSkeleton() {
  return (
    <div className="hidden flex-1 space-y-3 p-5 sm:block" aria-hidden="true">
      <div className="h-24 rounded-lg bg-bg-subtle" />
      <div className="h-2.5 w-3/4 rounded-full bg-bg-subtle" />
      <div className="h-2.5 w-1/2 rounded-full bg-bg-subtle" />
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="h-16 rounded-lg bg-bg-subtle" />
        <div className="h-16 rounded-lg bg-bg-subtle" />
        <div className="h-16 rounded-lg bg-bg-subtle" />
      </div>
      <div className="h-2.5 w-2/3 rounded-full bg-bg-subtle" />
    </div>
  );
}

function SidePanel() {
  return (
    <div className="flex w-full flex-col border-border bg-surface sm:w-[15.5rem] sm:border-l">
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
        <OrbitMark size={18} />
        <span className="text-[12px] font-semibold tracking-tight">Orbit AI</span>
      </div>

      <div className="flex-1 space-y-3 p-3.5">
        <p className="text-[11px] leading-relaxed text-fg-muted">
          Ask anything, or about <b className="font-semibold text-fg">{HOST}</b>.
        </p>
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-xl rounded-br-sm bg-accent/15 px-2.5 py-1.5 text-[11px] leading-relaxed">
            Why did signups drop this week?
          </div>
        </div>
        <div className="flex gap-2">
          <OrbitMark size={14} className="mt-0.5" />
          <p className="text-[11px] leading-relaxed text-fg-muted">
            Visits held steady, but the pricing page lost 31% of its clicks after Tuesday&apos;s deploy.
          </p>
        </div>
      </div>

      <div className="m-3 flex items-center justify-between rounded-xl border border-border bg-bg-subtle py-1.5 pl-3 pr-1.5">
        <span className="text-[11px] text-fg-faint">Ask anything</span>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-cta text-cta-fg">
          <ArrowUp className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

export function OrbitExtensionPreview() {
  return (
    <div className="card overflow-hidden p-0" aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] text-fg-muted ring-1 ring-border">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate">{HOST}</span>
        </div>
        <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/15">
          <OrbitMark size={14} />
        </span>
      </div>

      <div className="flex min-h-[19rem]">
        <PageSkeleton />
        <SidePanel />
      </div>
    </div>
  );
}
