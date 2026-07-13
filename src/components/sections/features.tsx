import {
  Activity,
  Code2,
  Globe2,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Live in 3 seconds",
    body: "Visitors, pageviews and active sessions stream into the dashboard as they happen. No overnight batch job, no stale numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Cookieless by design",
    body: "Visitors are identified by a rotating daily hash of IP + user agent. Nothing persists in the browser, so no consent banner is required.",
  },
  {
    icon: Zap,
    title: "Sub-kilobyte tracker",
    body: "One async script tag. It handles SPA route changes by patching history.pushState, so React and Next apps work with zero extra code.",
  },
  {
    icon: Globe2,
    title: "The dimensions that matter",
    body: "Top pages, referrers, UTM campaigns, devices, browsers and countries — derived server-side from the request, not from the client.",
  },
  {
    icon: Layers,
    title: "Workspaces and sites",
    body: "Group properties under a workspace, invite the team, and keep every site's data cleanly scoped and isolated.",
  },
  {
    icon: Code2,
    title: "An API, not just a UI",
    body: "Every number in the dashboard is reachable over REST with an API key. Build your own views, or resell analytics to your users.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need. Nothing you have to explain to legal.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
            Quantalog answers the questions a product team actually asks — who is
            here right now, where did they come from, what did they read — without
            following anyone around the internet.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-surface p-7">
              <f.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
