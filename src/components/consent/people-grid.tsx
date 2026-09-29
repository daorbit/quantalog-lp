"use client";

import { useEffect, useState } from "react";
import { useReveal } from "../use-reveal";

function Person({ on, lost }: { on: boolean; lost: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="person h-full w-full" data-on={on || undefined} data-lost={lost || undefined} aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0z" />
    </svg>
  );
}

export function PeopleGrid({ total, lost, active }: { total: number; lost: number[]; active: boolean }) {
  const shown = useReveal(total, active);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (shown < total) {
      setDropped(false);
      return;
    }
    const id = window.setTimeout(() => setDropped(true), 700);
    return () => window.clearTimeout(id);
  }, [shown, total]);

  return (
    <div
      className="mx-auto grid w-full max-w-md grid-cols-10 gap-x-2 gap-y-4 sm:gap-x-3"
      role="img"
      aria-label={`${total - lost.length} of ${total} visitors counted`}
    >
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="aspect-square">
          <Person on={i < shown} lost={dropped && lost.includes(i)} />
        </div>
      ))}
    </div>
  );
}
