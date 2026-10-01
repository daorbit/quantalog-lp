const RINGS = [
  { r: 52, progress: 0.82, className: "stroke-accent" },
  { r: 40, progress: 0.62, className: "stroke-[#f59e0b]" },
  { r: 28, progress: 1, className: "stroke-[#3b82f6]" },
];

const GOALS = [
  { name: "Monthly visitors", value: "41.2k / 50k", bar: "w-[82%] bg-accent", status: "On pace", pill: "bg-accent-quiet text-accent" },
  { name: "Q4 signups", value: "312 / 500", bar: "w-[62%] bg-[#f59e0b]", status: "Behind", pill: "bg-[#f59e0b]/15 text-[#d97706]" },
  { name: "Demo requests", value: "128 / 120", bar: "w-full bg-[#3b82f6]", status: "Hit", pill: "bg-[#3b82f6]/15 text-[#3b82f6]" },
];

function Ring({ r, progress, className }: { r: number; progress: number; className: string }) {
  const length = 2 * Math.PI * r;
  return (
    <>
      <circle cx="60" cy="60" r={r} fill="none" className="stroke-border" strokeWidth="9" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        className={className}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${length * progress} ${length}`}
        transform="rotate(-90 60 60)"
      />
    </>
  );
}

export function GoalsVisual() {
  return (
    <span className="block rounded-2xl border border-border bg-surface p-4 shadow-soft dark:bg-bg-subtle">
      <span className="flex items-center gap-4">
        <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-hidden="true">
          {RINGS.map((ring) => (
            <Ring key={ring.r} {...ring} />
          ))}
        </svg>
        <span className="block min-w-0">
          <span className="block text-[12px] text-fg-muted">This month</span>
          <span className="mt-0.5 block text-[22px] font-semibold tracking-tight text-fg">2 of 3 on track</span>
          <span className="mt-1 block text-[12px] text-fg-muted">Day 21 of 30 · the line marks today&apos;s pace</span>
        </span>
      </span>

      <span className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
        {GOALS.map((g) => (
          <span key={g.name} className="block">
            <span className="flex items-center gap-2 text-[13px]">
              <span className="truncate font-medium text-fg">{g.name}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${g.pill}`}>{g.status}</span>
              <span className="ml-auto shrink-0 text-[12px] tabular-nums text-fg-muted">{g.value}</span>
            </span>
            <span className="relative mt-1.5 block h-1.5 overflow-hidden rounded-full bg-bg-subtle dark:bg-surface-raised">
              <span className={`block h-full rounded-full ${g.bar}`} />
              <span className="absolute inset-y-0 left-[70%] w-px bg-fg-faint" aria-hidden="true" />
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
