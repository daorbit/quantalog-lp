import { ArrowRight } from "lucide-react";
import { CodeCard } from "../code-card";
import { site } from "@/lib/site";

const createProject = `# 1. Your backend creates a project for one of your users
curl -X POST https://api.quantalog.com/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Jane'\\''s Store", "extUserId": "user_8812" }'

# 2. Register the site they just deployed — you get the snippet back
curl -X POST https://api.quantalog.com/v1/projects/prj_31f/sites \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Store", "domain": "jane.shop", "framework": "next" }'`;

const readStats = `// 3. Render their numbers inside YOUR product's UI
const res = await fetch(
  \`https://api.quantalog.com/v1/sites/\${siteId}/stats?range=24h\`,
  { headers: { Authorization: \`Bearer \${process.env.QUANTALOG_KEY}\` } }
);

const { visitors, pageviews, live, topPages, countries } = await res.json();`;

const endpoints = [
  { method: "POST", path: "/v1/projects", desc: "Create a project for one of your end-users" },
  { method: "POST", path: "/v1/projects/:pid/sites", desc: "Register a site, get the embed snippet" },
  { method: "GET", path: "/v1/sites/:siteId/stats", desc: "Read every metric the dashboard shows" },
  { method: "GET", path: "/v1/sites/:siteId/snippet", desc: "Fetch the snippet again, any time" },
];

const methodColor: Record<string, string> = {
  GET: "text-sky-500",
  POST: "text-accent",
  DELETE: "text-rose-500",
};

export function Platform() {
  return (
    <section id="platform" className="relative border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Platform API
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Give analytics to <em className="not-italic text-accent">your</em> users.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
            If you run a site builder, an app platform, or an agency, one API key
            lets you provision a project per customer, inject the tracker into the
            apps you generate, and read their stats back into your own dashboard.
            Your users never see Quantalog unless you want them to.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <CodeCard filename="provision.sh" language="bash" code={createProject} />
          <CodeCard filename="dashboard.ts" language="typescript" code={readStats} />
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="divide-y divide-border">
            {endpoints.map((e) => (
              <div
                key={e.path}
                className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-5"
              >
                <span
                  className={`w-14 shrink-0 font-mono text-xs font-semibold ${methodColor[e.method]}`}
                >
                  {e.method}
                </span>
                <code className="font-mono text-sm text-fg">{e.path}</code>
                <span className="text-xs text-fg-muted sm:ml-auto">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={site.docs}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:gap-3"
        >
          Read the API reference
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
