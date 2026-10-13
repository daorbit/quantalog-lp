import { Lock, PanelRight } from "lucide-react";
import { OrbitMark } from "../../orbit/orbit-mark";

const PAGE_LINES = ["w-3/4", "w-full", "w-5/6", "w-2/3", "w-full", "w-1/2"];

export function ExtensionVisual() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-surface text-left shadow-soft ring-1 ring-border dark:bg-bg-subtle" aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-bg-subtle px-3 py-1.5 text-[12px] text-fg-faint dark:bg-surface-raised">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate">yoursite.com/pricing</span>
        </span>
        <PanelRight className="h-4 w-4 shrink-0 text-accent" />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-2.5 p-4 sm:p-5">
          <span className="block h-4 w-1/2 rounded-md bg-fg/10" />
          {PAGE_LINES.map((w, i) => (
            <span key={i} className={`block h-2 rounded-full bg-fg/6 ${w}`} />
          ))}
          <span className="mt-4 block h-7 w-24 rounded-full bg-fg/10" />
        </div>

        <div className="border-l border-border p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <OrbitMark size={22} />
            <span className="text-[13px] font-semibold text-fg">Orbit</span>
          </div>
          <p className="mt-4 ml-auto w-fit max-w-full rounded-2xl rounded-br-md bg-accent px-3 py-2 text-[12.5px] text-white">
            Why did signups dip on this page?
          </p>
          <p className="mt-2.5 rounded-2xl rounded-bl-md bg-bg-subtle px-3 py-2 text-[12.5px] leading-snug text-fg-muted dark:bg-surface-raised">
            Mobile visits rose 38%, but the plan table overflows on small screens.
          </p>
        </div>
      </div>
    </div>
  );
}
