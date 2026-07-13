import { CodeCard } from "../code-card";
import { Eyebrow } from "../ui";

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

const facts = [
  { k: "Tracker size", v: "0.9 KB" },
  { k: "Cookies set", v: "0" },
  { k: "First data", v: "~3s" },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Setup</Eyebrow>
            <h2 className="mt-4 text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem]">
              Three steps.
              <br />
              Roughly two minutes.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-fg-muted">
              No SDK to install, no build step to change, no cookie policy to
              rewrite. The tracker patches{" "}
              <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
                history.pushState
              </code>
              , so single-page apps report route changes on their own.
            </p>

            <ol className="relative mt-12 space-y-8">
              {/* The rail that turns three list items into a sequence. */}
              <span
                className="absolute bottom-4 left-[15px] top-4 w-px bg-border"
                aria-hidden="true"
              />
              {steps.map((s) => (
                <li key={s.n} className="relative flex gap-5">
                  <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[11px] font-semibold text-accent shadow-soft">
                    {s.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[15px] font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pl-4">
            <CodeCard filename="app/layout.tsx" language="html" code={snippet} />

            <div className="mt-4 grid grid-cols-3 gap-4">
              {facts.map((x) => (
                <div key={x.k} className="card px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-fg-faint">
                    {x.k}
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tabular-nums tracking-tight">
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
