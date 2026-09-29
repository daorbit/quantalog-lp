import { ArrowUpRight, CircleCheck } from "lucide-react";
import { PreviewFrame } from "../preview-frame";

const totals = [
  { label: "Clicks", value: "12,480", change: "14%" },
  { label: "Impressions", value: "384K", change: "9%" },
  { label: "Avg. position", value: "8.4", change: "2.1" },
];

const queries = [
  { q: "cookieless analytics", clicks: "1,204", pos: "2.1" },
  { q: "google analytics alternative", clicks: "862", pos: "4.8" },
  { q: "privacy friendly analytics", clicks: "511", pos: "6.3" },
];

export function SearchPreview() {
  return (
    <PreviewFrame title="acme.com" context="Search visibility" meta="Search Console · 28 days">
      <dl className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border">
        {totals.map((t) => (
          <div key={t.label} className="px-3 py-3 sm:px-4">
            <dt className="text-[12px] text-fg-muted">{t.label}</dt>
            <dd className="mt-1 text-[1.25rem] font-semibold leading-none tracking-tight tabular-nums text-fg sm:text-[1.5rem]">
              {t.value}
            </dd>
            <dd className="mt-1.5 inline-flex items-center gap-0.5 text-[12px] font-medium text-fg-muted">
              <ArrowUpRight className="h-3 w-3 text-accent" aria-hidden="true" />
              {t.change}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 rounded-xl bg-bg-subtle p-4">
        <p className="text-[12px] font-medium text-accent">Insight</p>
        <p className="mt-1 text-[14px] leading-relaxed text-fg">
          &ldquo;privacy friendly analytics&rdquo; sits at position 6.3 — a few places
          from the top three.
        </p>
      </div>

      <table className="mt-5 w-full text-[13px]">
        <thead>
          <tr className="text-left text-[12px] text-fg-faint">
            <th className="pb-2 font-normal">Top queries</th>
            <th className="pb-2 text-right font-normal">Clicks</th>
            <th className="pb-2 text-right font-normal">Position</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {queries.map((r) => (
            <tr key={r.q}>
              <td className="max-w-0 truncate py-2.5 pr-3 text-fg">{r.q}</td>
              <td className="py-2.5 text-right tabular-nums text-fg-muted">{r.clicks}</td>
              <td className="py-2.5 text-right tabular-nums font-medium text-fg">{r.pos}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-[13px] text-fg">
        <CircleCheck className="h-4 w-4 shrink-0 text-accent" aria-label="Indexed" />
        /pricing is indexed by Google
        <span className="ml-auto text-fg-faint">Page detail</span>
      </p>
    </PreviewFrame>
  );
}
