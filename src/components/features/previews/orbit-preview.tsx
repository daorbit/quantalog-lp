import { ArrowUp } from "lucide-react";
import { OrbitMark } from "../../orbit/orbit-mark";
import { PreviewFrame } from "../preview-frame";

const sources = ["Last 7 days vs previous week", "Top referrers", "Top pages"];

export function OrbitPreview() {
  return (
    <PreviewFrame title="Orbit AI" context="acme.com" meta="Orbit Pro">
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-bg-subtle px-4 py-2.5 text-[14px] text-fg">
          Why is traffic up this week?
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <OrbitMark size={28} />
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-fg">Orbit AI</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
            Visitors are up <span className="font-medium text-fg">22%</span> on last
            week. Most of the lift came from{" "}
            <span className="font-medium text-fg">reddit.com</span>, now your
            second-largest referrer, landing on{" "}
            <span className="font-medium text-fg">/pricing</span>. Bounce rate rose
            too, so those visits are shorter than usual.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {sources.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-2.5 py-1 text-[12px] text-fg-muted"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">
            Want a checklist to make /pricing keep them longer?
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border py-1.5 pl-4 pr-1.5">
        <span className="flex-1 truncate text-[14px] text-fg-faint">Ask Orbit anything…</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta text-cta-fg">
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </PreviewFrame>
  );
}
