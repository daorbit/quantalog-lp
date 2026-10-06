"use client";

import { BrandGlyph } from "@/components/compare/brand-badge";
import { AI_ASSISTANTS, summarisePrompt, type AiAssistant } from "@/lib/ai-assistants";
import { openOrbit, SUMMARISE_PROMPT } from "./orbit-open";
import { OrbitMark } from "./orbit-mark";

function openAssistant(assistant: AiAssistant) {
  const url = assistant.url(summarisePrompt(window.location.href.split("#")[0]));
  window.open(url, "_blank", "noopener,noreferrer");
}

export function SummariseWith({ variant = "inline" }: { variant?: "inline" | "stacked" }) {
  const stacked = variant === "stacked";

  return (
    <div
      className={
        stacked
          ? "flex flex-col items-start gap-2"
          : "flex shrink-0 flex-wrap items-center gap-2"
      }
    >
      <span className="text-xs font-medium text-fg-faint">Summarize with</span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => openOrbit({ ask: SUMMARISE_PROMPT })}
          aria-label="Summarize with Orbit AI"
          title="Orbit AI"
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3 text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
        >
          <OrbitMark size={14} />
          Orbit AI
        </button>
        {AI_ASSISTANTS.map((assistant) => (
          <button
            key={assistant.id}
            type="button"
            onClick={() => openAssistant(assistant)}
            aria-label={`Summarize with ${assistant.name}`}
            title={assistant.name}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-subtle text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <BrandGlyph icon={assistant.icon} size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}
