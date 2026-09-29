"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Search } from "lucide-react";
import { useCycle } from "../../use-cycle";
import { RollingNumber } from "../../rolling-number";

const queries = [
  { q: "cookieless analytics", rank: 2, before: 8 },
  { q: "google analytics alternative", rank: 4, before: 9 },
  { q: "privacy friendly analytics", rank: 3, before: 7 },
];

export function RankVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(queries.length, 3400);
  const query = queries[index];
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    if (!inView) return;
    const id = window.setTimeout(() => setSettled(true), 200);
    return () => window.clearTimeout(id);
  }, [index, inView]);

  return (
    <div ref={ref} className="text-center">
      <p
        key={query.q}
        className="chat-in inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[14px] text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle"
      >
        <Search className="h-4 w-4 text-fg-muted" aria-hidden="true" />
        {query.q}
      </p>
      <p className="mt-5 flex items-start justify-center gap-2">
        <span className="text-[5rem] font-semibold leading-none tracking-[-0.06em] text-fg sm:text-[8.5rem]">
          #<RollingNumber value={settled ? query.rank : query.before} className="roll--slow" />
        </span>
        <span
          key={`a${index}`}
          className="rank-arrow mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"
          data-active={inView || undefined}
        >
          <ArrowUp className="h-5 w-5 text-accent" aria-hidden="true" />
        </span>
      </p>
      <p key={`c${index}`} className="chat-in mt-3 text-[15px] text-fg-muted">
        on Google, up from #{query.before} last month
      </p>
    </div>
  );
}
