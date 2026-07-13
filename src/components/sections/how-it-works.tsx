import { CodeCard } from "../code-card";

const snippet = `<script
  async
  src="https://cdn.quantalog.com/tracker.js"
  data-site="qs_7f3a9c21"
></script>`;

const steps = [
  {
    n: "01",
    title: "Create a site",
    body: "Sign up, name your workspace, add a domain. You get a public site key immediately.",
  },
  {
    n: "02",
    title: "Drop in the tag",
    body: "Paste one async script into your <head>. It is under a kilobyte and blocks nothing.",
  },
  {
    n: "03",
    title: "Watch it live",
    body: "Open the dashboard. The first pageview lands in about three seconds — including yours.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Setup
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. Roughly two minutes.
            </h2>
            <p className="mt-4 leading-relaxed text-fg-muted">
              No SDK to install, no build step to change, no cookie policy to
              rewrite. The tracker patches <code className="font-mono text-[0.9em] text-fg">history.pushState</code>,
              so single-page apps report route changes on their own.
            </p>

            <ol className="mt-10 space-y-7">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="mt-0.5 font-mono text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pl-6">
            <CodeCard filename="index.html" language="html" code={snippet} />
            <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {[
                { k: "Tracker size", v: "0.9 KB" },
                { k: "Cookies set", v: "0" },
                { k: "Time to first data", v: "~3s" },
              ].map((x) => (
                <div key={x.k} className="bg-surface px-4 py-4">
                  <p className="text-xs text-fg-muted">{x.k}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight">
                    {x.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
