"use client";

import { useCycle } from "../../use-cycle";

const rivals = ["Google Analytics", "Plausible", "Matomo"];

export function CompareVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(rivals.length, 2400);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p className="rounded-full bg-cta px-5 py-2.5 text-[16px] font-semibold text-cta-fg">Quantalog</p>
      <p className="mt-4 text-[1.25rem] font-medium text-fg-faint">vs</p>
      <p className="relative mt-1 h-11 w-full overflow-hidden sm:h-13">
        <span
          key={rivals[index]}
          className="word-flip absolute inset-x-0 text-[1.875rem] font-semibold leading-[1.2] tracking-tight text-fg sm:text-[2.75rem]"
        >
          {rivals[index]}
        </span>
      </p>
      <ul className="stagger-in mt-5 flex flex-wrap justify-center gap-2" data-active={inView || undefined}>
        {rivals.map((r, i) => (
          <li
            key={r}
            className={`rounded-full px-4 py-2 text-[14px] shadow-soft transition-all duration-300 ${
              i === index
                ? "bg-accent/10 font-medium text-fg ring-2 ring-accent"
                : "bg-surface text-fg-muted ring-1 ring-border dark:bg-bg-subtle"
            }`}
          >
            {r}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[15px] text-fg-muted">Including where they win.</p>
    </div>
  );
}
