import { FileSpreadsheet } from "lucide-react";
import { PreviewFrame } from "../preview-frame";

const kpis = [
  { label: "Visitors", value: "9,204", change: "+22%" },
  { label: "Signups", value: "184", change: "+4%" },
  { label: "Avg. time", value: "1m 42s", change: "−6%" },
];

export function ReportsPreview() {
  return (
    <PreviewFrame title="Inbox" context="Weekly report" meta="Mon 09:00">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta text-[14px] font-semibold text-cta-fg">
          Q
        </span>
        <div className="min-w-0 text-[13px]">
          <p className="font-medium text-fg">Quantalog Reports</p>
          <p className="truncate text-fg-faint">to team@acme.com</p>
        </div>
      </div>

      <p className="mt-5 text-[17px] font-semibold tracking-tight text-fg">
        Your week at acme.com: traffic up 22%
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
        Most of the lift came from organic search, led by your cookieless
        analytics post. Signups held steady, and time on page dipped slightly
        on mobile.
      </p>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <li key={k.label} className="rounded-xl bg-bg-subtle p-3">
            <p className="text-[12px] text-fg-muted">{k.label}</p>
            <p className="mt-1 text-[17px] font-semibold tabular-nums text-fg">{k.value}</p>
            <p className="mt-0.5 text-[12px] tabular-nums text-fg-muted">{k.change}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-border px-3 py-2">
        <FileSpreadsheet className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-[13px] text-fg">acme-weekly.xlsx</span>
        <span className="text-[12px] text-fg-faint">24 KB</span>
      </div>
    </PreviewFrame>
  );
}
