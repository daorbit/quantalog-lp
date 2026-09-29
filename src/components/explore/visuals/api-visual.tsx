"use client";

import { useCycle } from "../../use-cycle";
import { TypedText } from "../../typed-text";

const calls = [
  { method: "POST", path: "/v1/projects", status: "201 Created", body: '{ "id": "prj_31f", "tracker": "injected" }' },
  { method: "GET", path: "/v1/sites/site_9a/stats", status: "200 OK", body: '{ "visitors": 1284, "live": 7 }' },
];

export function ApiVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(calls.length, 4200);
  const call = calls[index];

  return (
    <div
      ref={ref}
      className="w-full max-w-xl overflow-hidden rounded-2xl bg-surface text-left shadow-soft ring-1 ring-border dark:bg-bg-subtle"
    >
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5 font-mono text-[13px] sm:text-[14px]">
        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[12px] font-semibold text-accent">{call.method}</span>
        <span className="min-w-0 truncate text-fg">
          {inView ? <TypedText key={call.path} text={call.path} speed={35} /> : call.path}
        </span>
      </div>
      <div key={`r${index}`} className="api-response px-5 py-4 font-mono text-[13px] sm:text-[14px]">
        <p className="text-[12px] font-semibold text-accent">{call.status}</p>
        <p className="mt-1.5 break-all text-fg-muted">{call.body}</p>
      </div>
    </div>
  );
}
