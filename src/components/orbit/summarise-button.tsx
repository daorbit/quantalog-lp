"use client";

import { Sparkles } from "lucide-react";
import { openOrbit, SUMMARISE_PROMPT } from "./orbit-open";

export function SummariseButton() {
  return (
    <button
      type="button"
      onClick={() => openOrbit({ ask: SUMMARISE_PROMPT })}
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3 py-1.5 text-xs font-medium text-fg-muted transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
    >
      <Sparkles
        className="h-3.5 w-3.5 text-accent transition group-hover:rotate-12"
        aria-hidden="true"
      />
      Summarize with Orbit AI
    </button>
  );
}
