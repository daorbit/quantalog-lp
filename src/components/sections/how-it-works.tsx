import { CodeCard } from "../code-card";
import { Eyebrow } from "../ui";
import { site } from "@/lib/site";

// The real tracker URL — someone will paste this straight into their <head>.
const snippet = `<script
  async
  src="${site.api}/tracker.js"
  data-site="qs_7f3a9c21"
></script>`;

/** Exported so the homepage can emit these as a `HowTo` node without restating them. */
export const steps = [
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
    <section className="border-y border-border bg-bg-subtle">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="v-rise">
            <Eyebrow>Setup</Eyebrow>
            <h2 className="mt-5 text-balance text-h2 font-medium leading-[1.08] tracking-[-0.03em]">
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
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className={`v-rise v-d${i + 1} group relative flex gap-5`}
                >
                  <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[11px] font-medium text-accent shadow-soft transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/8">
                    {s.n}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-[15px] font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="v-rise v-d2 min-w-0 lg:pl-4">
            <CodeCard filename="app/layout.tsx" language="html" code={snippet} />

            {/* Three across is too tight on a phone: the labels wrap to two
                lines and the cards spill past the viewport. */}
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((x) => (
                <div
                  key={x.k}
                  className="rounded-xl border border-border bg-surface px-4 py-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                    {x.k}
                  </p>
                  <p className="mt-2 text-xl font-medium tabular-nums tracking-[-0.03em]">
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
