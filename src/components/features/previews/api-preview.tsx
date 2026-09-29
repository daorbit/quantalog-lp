import { PreviewFrame } from "../preview-frame";

const exchanges = [
  {
    method: "POST",
    path: "/v1/projects",
    status: "201 Created",
    body: `{
  "name": "Jane's Store",
  "domain": "janes.store"
}`,
    response: `{
  "id": "prj_31f",
  "siteId": "site_9a",
  "tracker": "injected"
}`,
  },
  {
    method: "GET",
    path: "/v1/sites/site_9a/stats",
    status: "200 OK",
    body: null,
    response: `{ "visitors": 1284, "live": 7 }`,
  },
];

export function ApiPreview() {
  return (
    <PreviewFrame title="Platform API" context="v1" meta="REST · JSON">
      <div className="space-y-4">
        {exchanges.map((e) => (
          <div key={e.path} className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center gap-2.5 border-b border-border bg-bg-subtle px-4 py-2.5">
              <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                {e.method}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-fg">{e.path}</span>
              <span className="shrink-0 text-[12px] text-fg-muted">{e.status}</span>
            </div>
            <div className={`grid ${e.body ? "sm:grid-cols-2 sm:divide-x" : ""} divide-border`}>
              {e.body && (
                <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-fg-muted">
                  {e.body}
                </pre>
              )}
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-fg">
                {e.response}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}
