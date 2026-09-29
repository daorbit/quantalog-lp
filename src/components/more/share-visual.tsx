import { Eye, Link2, Lock } from "lucide-react";

const panels = ["Visitors", "Top pages", "Countries", "Referrers"];

export function ShareVisual() {
  return (
    <span className="block rounded-2xl border border-border bg-surface p-4 shadow-soft dark:bg-bg-subtle">
      <span className="flex items-center gap-2 rounded-full bg-bg-subtle px-3 py-2 text-[13px] dark:bg-surface-raised">
        <Link2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate text-fg">acme.com — public dashboard</span>
        <span className="ml-auto shrink-0 text-[12px] font-medium text-accent">Copy link</span>
      </span>
      <span className="mt-3 flex flex-wrap gap-2">
        {panels.map((p) => (
          <span key={p} className="rounded-full border border-border px-2.5 py-1 text-[12px] text-fg-muted">
            {p}
          </span>
        ))}
      </span>
      <span className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-[12px] text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Read-only
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          No login needed
        </span>
      </span>
    </span>
  );
}
