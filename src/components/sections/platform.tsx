"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeCard } from "../code-card";
import { SectionHeading } from "../ui";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

const createProject = `# 1. Your backend creates a project for one of your users
curl -X POST ${site.api}/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Jane'\\''s Store", "extUserId": "user_8812" }'

# 2. Register the site they deployed — the snippet comes back
curl -X POST ${site.api}/v1/projects/prj_31f/sites \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Store", "domain": "jane.shop" }'`;

const readStats = `// 3. Render their numbers inside YOUR product's UI
const res = await fetch(
  \`${site.api}/v1/sites/\${siteId}/stats?range=24h\`,
  { headers: { Authorization: \`Bearer \${process.env.QUANTALOG_KEY}\` } }
);

const { visitors, pageviews, live, topPages } = await res.json();`;

// Mirrors src/routes/v1.ts — every route here exists.
const endpoints = [
  { method: "POST", path: "/v1/projects", desc: "Create a project for an end-user" },
  { method: "GET", path: "/v1/projects", desc: "List projects, filter by your user id" },
  { method: "POST", path: "/v1/projects/:pid/sites", desc: "Register a site, get the snippet" },
  { method: "GET", path: "/v1/projects/:pid/sites", desc: "List the sites under a project" },
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
    <section
      id="platform"
      className="relative overflow-hidden border-y border-border bg-bg-subtle"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Platform API"
          align="left"
          className="v-rise"
          title={
            <>
              Give analytics to <span className="text-accent">your</span> users.
            </>
          }
          body="If you run a site builder, an app platform, or an agency, one API key lets you provision a project per customer, inject the tracker into the apps you generate, and read their stats back into your own dashboard. Your users never see Quantalog unless you want them to."
        />

        <div className="mt-12 grid sm:mt-14 gap-3 lg:grid-cols-2">
          <div className="v-rise v-d1 min-w-0">
            <CodeCard filename="provision.sh" language="bash" code={createProject} />
          </div>
          <div className="v-rise v-d2 min-w-0">
            <CodeCard filename="dashboard.ts" language="typescript" code={readStats} />
          </div>
        </div>

        <div className="v-rise v-d3 mt-3 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="divide-y divide-border">
            {endpoints.map((e) => (
              <div
                key={`${e.method} ${e.path}`}
                className="flex flex-col gap-1.5 px-5 py-3.5 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:gap-4"
              >
                <span
                  className={`inline-flex w-fit shrink-0 justify-center rounded-md border px-1.5 py-0.5 font-mono text-[10.5px] font-semibold tracking-wide sm:w-18 ${methodStyle[e.method]}`}
                >
                  {e.method}
                </span>
                <code className="font-mono text-[13px] text-fg">{e.path}</code>
                <span className="text-xs text-fg-muted sm:ml-auto">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/platform-api"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            How the Platform API works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href={site.docs}
            onClick={() => track("read_docs", { location: "platform" })}
            className="group inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition hover:text-fg"
          >
            Read the API reference
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
