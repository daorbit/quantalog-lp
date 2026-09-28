"use client";

import { openOrbit, SUMMARISE_PROMPT } from "./orbit-open";
import { OrbitMark } from "./orbit-mark";

export function SummariseButton() {
  return (
    <button
      type="button"
      onClick={() => openOrbit({ ask: SUMMARISE_PROMPT })}
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3 py-1.5 text-xs font-medium text-fg-muted transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
    >
      <OrbitMark size={14} />
      Summarize with Orbit AI
    </button>
  );
}
