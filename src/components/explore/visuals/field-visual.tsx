"use client";

import { useCycle } from "../../use-cycle";
import { useCountTo } from "../../use-count-to";
import { TypedText } from "../../typed-text";

const fields = [
  { label: "Work email", kept: 91, value: "jane@acme.com" },
  { label: "Phone number", kept: 58, value: "+91 98", flagged: true },
  { label: "Company size", kept: 54, value: "11–50 people" },
];

function FieldRow({
  field,
  focused,
  filled,
  shown,
}: {
  field: (typeof fields)[number];
  focused: boolean;
  filled: boolean;
  shown: boolean;
}) {
  const pct = useCountTo(shown ? field.kept : 0, 1300);

  return (
    <div
      className={`rounded-2xl bg-surface px-4 py-3 shadow-soft transition-shadow duration-300 dark:bg-bg-subtle ${
        focused ? "ring-2 ring-accent" : "ring-1 ring-border"
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-[13px]">
        <span className="flex items-center gap-2 font-medium text-fg">
          {field.label}
          {field.flagged && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
              Biggest drop
            </span>
          )}
        </span>
        <span className={`shrink-0 tabular-nums ${field.flagged ? "font-semibold text-accent" : "text-fg-muted"}`}>
          {pct}% still here
        </span>
      </div>
      <div className="mt-2 flex h-8 items-center rounded-lg bg-bg-subtle px-3 text-left text-[13px] text-fg dark:bg-surface-raised">
        {filled && field.value}
        {focused && <TypedText key={field.label} text={field.value} speed={field.flagged ? 140 : 60} />}
      </div>
    </div>
  );
}

export function FieldVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(fields.length, 2400);

  return (
    <div ref={ref} className="stagger-in w-full max-w-xs space-y-3" data-active={inView || undefined}>
      {fields.map((f, i) => (
        <FieldRow
          key={f.label}
          field={f}
          focused={inView && i === index}
          filled={inView && i < index}
          shown={inView}
        />
      ))}
    </div>
  );
}
