import { FileSpreadsheet, Mail, MessageCircle } from "lucide-react";

export function ReportVisual() {
  return (
    <span className="block rounded-2xl border border-border bg-surface p-4 shadow-soft dark:bg-bg-subtle">
      <span className="flex items-center justify-between gap-3 text-[12px] text-fg-faint">
        <span>Weekly report</span>
        <span className="flex gap-1.5">
          <Mail className="h-4 w-4 text-accent" aria-label="Email" />
          <MessageCircle className="h-4 w-4 text-accent" aria-label="WhatsApp" />
        </span>
      </span>
      <span className="mt-2 block text-[15px] font-semibold tracking-tight text-fg">
        Your week at acme.com: traffic up 22%
      </span>
      <span className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Visitors", "9,204"],
          ["Audit score", "96"],
          ["Signups", "184"],
        ].map(([l, v]) => (
          <span key={l} className="rounded-xl bg-bg-subtle px-3 py-2 dark:bg-surface-raised">
            <span className="block text-[11px] text-fg-muted">{l}</span>
            <span className="block text-[15px] font-semibold tabular-nums text-fg">{v}</span>
          </span>
        ))}
      </span>
      <span className="mt-3 inline-flex items-center gap-2 text-[12px] text-fg-muted">
        <FileSpreadsheet className="h-4 w-4 text-accent" aria-hidden="true" />
        acme-weekly.xlsx attached
      </span>
    </span>
  );
}
