export type ApiEndpoint = { method: "GET" | "POST" | "DELETE"; path: string; desc: string };

const METHOD_STYLE: Record<ApiEndpoint["method"], string> = {
  GET: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  POST: "border-accent/30 bg-accent/10 text-accent",
  DELETE: "border-rose-500/30 bg-rose-500/10 text-rose-500",
};

export function ApiEndpoints({ endpoints }: { endpoints: readonly ApiEndpoint[] }) {
  return (
    <div className="tile tile--static overflow-hidden">
      <ul className="divide-y divide-border">
        {endpoints.map((e) => (
          <li
            key={`${e.method} ${e.path}`}
            className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:gap-5 sm:px-8"
          >
            <span
              className={`inline-flex w-fit shrink-0 justify-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide sm:w-18 ${METHOD_STYLE[e.method]}`}
            >
              {e.method}
            </span>
            <code className="min-w-0 break-all font-mono text-[14px] text-fg">{e.path}</code>
            <span className="text-[14px] text-fg-muted sm:ml-auto sm:text-right">{e.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
