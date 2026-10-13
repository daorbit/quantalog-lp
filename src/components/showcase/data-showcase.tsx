import type { ReactNode } from "react";
import { SectionHeading } from "../ui";

export type ShowcaseStat = { label: string; value: string };

export function DataShowcase({
  eyebrow,
  title,
  body,
  pill,
  stats,
  children,
  footer,
  scroll = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  pill: string;
  stats: ShowcaseStat[];
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
}) {
  return (
    <section className="relative overflow-hidden section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} centered />
        <div className="mt-6 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[12.5px] text-fg-muted">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {pill}
          </span>
        </div>
      </div>

      <div className={`mx-auto mt-10 w-full sm:mt-14 ${scroll ? "overflow-x-auto px-4 sm:px-6" : ""}`}>
        {children}
      </div>

      <div className="mx-auto max-w-360 px-4 sm:px-6">
        {footer}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 text-center">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[1.75rem] font-semibold tracking-[-0.03em] tabular-nums sm:text-[2rem]">{value}</p>
              <p className="mt-1 text-[13px] text-fg-faint">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
