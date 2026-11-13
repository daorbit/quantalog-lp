import { CircleAlert } from "lucide-react";

export function StatusUnavailable() {
  return (
    <div className="rounded-[8px] border border-status-outage bg-surface px-5 py-5">
      <p className="flex items-center gap-2.5 text-[17px] font-semibold text-status-outage">
        <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
        We can't reach Quantalog's servers right now
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
        This page reads its status from the Quantalog API, and the API didn't answer. The dashboard and tracking may be affected. This page
        refreshes every minute.
      </p>
    </div>
  );
}
