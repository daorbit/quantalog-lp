import { ArrowUp } from "lucide-react";
import { OrbitMark } from "../../orbit/orbit-mark";
import { PreviewFrame } from "../preview-frame";

const sources = ["reddit.com · 1,840 visits", "/pricing · 2,310 views", "Tue 14:00–18:00"];

export function OrbitPreview() {
  return (
    <PreviewFrame title="Orbit AI" context="acme.com" meta="Reads your live data">
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-bg-subtle px-4 py-2.5 text-[14px] text-fg">
          Why did traffic jump on Tuesday?
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <OrbitMark size={28} />
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-fg">Orbit AI</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
            A thread on r/webdev linked your pricing page. It sent{" "}
            <span className="font-medium text-fg">1,840 visitors</span> between 2pm
            and 6pm — 38% of Tuesday&apos;s traffic. Most left within a minute, so
            signups stayed flat.
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
            Want me to draft a LinkedIn post about the spike?
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border py-1.5 pl-4 pr-1.5">
        <span className="flex-1 truncate text-[14px] text-fg-faint">Ask about your traffic…</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta text-cta-fg">
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </PreviewFrame>
  );
}
