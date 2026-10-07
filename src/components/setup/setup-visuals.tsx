import { Check, Globe, Zap } from "lucide-react";
import { SITE_KEY } from "./setup-steps";

export const card = "rounded-2xl border border-border bg-surface p-4 shadow-soft dark:bg-bg-subtle";

const BARS = ["h-3", "h-5", "h-4", "h-7", "h-5", "h-8", "h-6", "h-9", "h-7", "h-10"];

export function SiteVisual() {
  return (
    <div className={card}>
      <p className="text-[12px] text-fg-faint">Domain</p>
      <div className="mt-1.5 flex items-center gap-2 rounded-full bg-bg-subtle px-3 py-2 text-[13px] dark:bg-surface-raised">
        <Globe className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate text-fg">yoursite.com</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[12px]">
        <span className="text-fg-muted">Site key</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-fg">
          {SITE_KEY}
          <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export function TagVisual() {
  return (
    <div className={card}>
      <pre className="overflow-x-auto font-mono text-[12px] leading-[1.8] text-fg-muted">
        <span className="text-fg-faint">{"<head>"}</span>
        {"\n  "}
        <span className="text-accent">{"<script"}</span>
        {" async\n    src="}
        <span className="text-fg">&quot;…/tracker.js&quot;</span>
        {"\n    data-site="}
        <span className="text-fg">&quot;{SITE_KEY}&quot;</span>
        <span className="text-accent">{" />"}</span>
        {"\n"}
        <span className="text-fg-faint">{"</head>"}</span>
      </pre>
      <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-[12px] text-fg-muted">
        <Zap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        Async · never blocks rendering
      </p>
    </div>
  );
}

export function LiveVisual() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between text-[12px]">
        <span className="inline-flex items-center gap-1.5 font-medium text-fg">
          <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          Live
        </span>
        <span className="text-fg-faint">just now</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-fg">1</p>
          <p className="mt-1.5 text-[12px] text-fg-muted">visitor on /pricing</p>
        </div>
        <div className="flex h-10 items-end gap-1" aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full ${h} ${i === BARS.length - 1 ? "bg-accent" : "bg-accent/25"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
