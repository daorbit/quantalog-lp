import { CircleCheck } from "lucide-react";
import { AGENT_STEPS } from "./hero-data";

export function HeroAgentLog() {
  return (
    <div className="hero-panel hero-in hero-in--agent overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-[12.5px] font-medium">Orbit agent</span>
        <span className="text-[10.5px] text-fg-faint">4 steps · 2.1s</span>
      </div>
      <ul className="space-y-2.5 p-4 font-mono text-[11px]">
        {AGENT_STEPS.map(({ tool, detail }, i) => (
          <li key={tool} className="hero-step flex items-start gap-2" style={{ ["--i" as string]: i }}>
            <CircleCheck className="mt-px h-3.5 w-3.5 shrink-0 text-fg-faint" />
            <span className="min-w-0">
              <span className="text-fg">{tool}</span>
              <span className="block truncate text-fg-faint">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-4 py-2 text-[10.5px] text-fg-faint">Orbit AI · reads your analytics, not your visitors</div>
    </div>
  );
}
