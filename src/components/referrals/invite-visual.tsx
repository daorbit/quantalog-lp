import { Copy, Link2 } from "lucide-react";
import { card } from "../setup/setup-visuals";
import { SAMPLE_CODE, shareChannels } from "./referral-data";

export function InviteVisual() {
  return (
    <div className={card}>
      <p className="text-[12px] text-fg-faint">Your invite link</p>
      <div className="mt-1.5 flex items-center gap-2 rounded-full bg-bg-subtle py-1.5 pl-3 pr-1.5 text-[13px] dark:bg-surface-raised">
        <Link2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="min-w-0 truncate text-fg-muted">
          …/signup?ref=<span className="font-mono text-fg">{SAMPLE_CODE}</span>
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-cta px-3 py-1 text-[12px] font-semibold text-cta-fg">
          <Copy className="h-3 w-3" aria-hidden="true" />
          Copy
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-[12px]">
        <div className="flex flex-wrap gap-1.5">
          {shareChannels.map((c) => (
            <span key={c} className="rounded-full border border-border px-2.5 py-1 text-fg-muted">
              {c}
            </span>
          ))}
        </div>
        <span className="text-fg-muted">
          Code <span className="ml-1 font-mono text-fg">{SAMPLE_CODE}</span>
        </span>
      </div>
    </div>
  );
}
