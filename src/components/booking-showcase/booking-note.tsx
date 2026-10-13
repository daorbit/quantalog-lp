import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  tone: "green" | "blue" | "violet";
  app: string;
  title: string;
  body: string;
};

export function BookingNote({ icon: Icon, tone, app, title, body }: Props) {
  return (
    <div className="bm-note">
      <span className={`bm-note-icon bm-note-icon--${tone}`}>
        <Icon className="h-4 w-4" strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-fg-faint">{app}</p>
          <p className="shrink-0 text-[11px] text-fg-faint">now</p>
        </div>
        <p className="mt-0.5 text-[13.5px] font-semibold tracking-[-0.01em]">{title}</p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-fg-muted">{body}</p>
      </div>
    </div>
  );
}
