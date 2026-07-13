import { ArrowRight } from "lucide-react";
import { CodeCard } from "../code-card";
import { SectionHeading } from "../ui";
import { site } from "@/lib/site";

const createProject = `# 1. Your backend creates a project for one of your users
curl -X POST https://api.quantalog.com/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Jane'\\''s Store", "extUserId": "user_8812" }'

# 2. Register the site they deployed — the snippet comes back
curl -X POST https://api.quantalog.com/v1/projects/prj_31f/sites \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Store", "domain": "jane.shop" }'`;

const readStats = `// 3. Render their numbers inside YOUR product's UI
const res = await fetch(
  \`https://api.quantalog.com/v1/sites/\${siteId}/stats?range=24h\`,
  { headers: { Authorization: \`Bearer \${process.env.QUANTALOG_KEY}\` } }
);

const { visitors, pageviews, live, topPages } = await res.json();`;

const endpoints = [
  { method: "POST", path: "/v1/projects", desc: "Create a project for an end-user" },
  { method: "POST", path: "/v1/projects/:pid/sites", desc: "Register a site, get the snippet" },
  { method: "GET", path: "/v1/sites/:siteId/stats", desc: "Read every dashboard metric" },
  { method: "GET", path: "/v1/sites/:siteId/snippet", desc: "Fetch the snippet again, any time" },
  { method: "DELETE", path: "/v1/sites/:siteId", desc: "Remove a site and its data" },
];

const methodStyle: Record<string, string> = {
  GET: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  POST: "border-accent/30 bg-accent/10 text-accent",
  DELETE: "border-rose-500/30 bg-rose-500/10 text-rose-500",
};

export function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="Platform API"
          title={
            <>
              Give analytics to <span className="text-accent">your</span> users.
            </>
          }
          body="If you run a site builder, an app platform, or an agency, one API key lets you provision a project per customer, inject the tracker into the apps you generate, and read their stats back into your own dashboard. Your users never see Quantalog unless you want them to."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <CodeCard filename="provision.sh" language="bash" code={createProject} />
          <CodeCard filename="dashboard.ts" language="typescript" code={readStats} />
        </div>

        <div className="card mt-4 overflow-hidden">
          <div className="divide-y divide-border">
            {endpoints.map((e) => (
              <div
                key={e.path}
                className="flex flex-col gap-1.5 px-5 py-3.5 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:gap-4"
              >
                <span
                  className={`inline-flex w-fit shrink-0 justify-center rounded border px-1.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wide sm:w-18 ${methodStyle[e.method]}`}
                >
                  {e.method}
                </span>
                <code className="font-mono text-[13px] text-fg">{e.path}</code>
                <span className="text-xs text-fg-muted sm:ml-auto">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={site.docs}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Read the API reference
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
