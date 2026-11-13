import { utcStamp, type IncidentUpdate } from "@/lib/status";

export function IncidentTimeline({ updates }: { updates: IncidentUpdate[] }) {
  return (
    <ol className="divide-y divide-border">
      {updates.map((update) => (
        <li key={update.id} className="py-4 first:pt-0 last:pb-0">
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-fg">
            <span className="font-semibold">{update.statusLabel}</span>
            <span className="text-fg-muted"> · </span>
            {update.body}
          </p>
          <p className="mt-1.5 text-[13px] text-fg-muted">{utcStamp(update.at)}</p>
        </li>
      ))}
    </ol>
  );
}
