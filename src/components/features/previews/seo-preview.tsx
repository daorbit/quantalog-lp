import { CircleAlert, CircleCheck } from "lucide-react";
import { PreviewFrame } from "../preview-frame";
import { Meter } from "./meter";

const categories = [
  { label: "Performance", score: 94 },
  { label: "Accessibility", score: 98 },
  { label: "Best practices", score: 100 },
  { label: "SEO", score: 92 },
];

const issues = [
  { ok: false, text: "Meta description is 182 characters", page: "/pricing" },
  { ok: false, text: "2 images missing alt text", page: "/blog/launch" },
  { ok: true, text: "No broken links across 148 pages", page: "Site crawl" },
];

export function SeoPreview() {
  return (
    <PreviewFrame title="acme.com" context="SEO audit" meta="Mobile · 2 min ago">
      <div className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="relative mx-auto h-32 w-32">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset="4"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[2rem] font-semibold leading-none tabular-nums text-fg">96</span>
            <span className="mt-1 text-[11px] text-fg-muted">Overall</span>
          </div>
        </div>

        <ul className="space-y-3">
          {categories.map((c) => (
            <li key={c.label}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-fg">{c.label}</span>
                <span className="font-medium tabular-nums text-fg">{c.score}</span>
              </div>
              <div className="mt-1.5">
                <Meter value={c.score} label={`${c.label}: ${c.score}`} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-[13px] font-medium text-fg">What to fix</p>
        <ul className="mt-3 divide-y divide-border">
          {issues.map((i) => (
            <li key={i.text} className="flex items-center gap-3 py-2.5 text-[13px]">
              {i.ok ? (
                <CircleCheck className="h-4 w-4 shrink-0 text-accent" aria-label="Passed" />
              ) : (
                <CircleAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-label="Needs attention" />
              )}
              <span className="min-w-0 flex-1 truncate text-fg">{i.text}</span>
              <span className="shrink-0 text-fg-faint">{i.page}</span>
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
