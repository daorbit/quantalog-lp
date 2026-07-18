import {
  Activity,
  Code2,
  Globe2,
  Layers,
  MousePointerClick,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

const features = [
  {
    icon: Activity,
    title: "Live in 3 seconds",
    body: "Visitors, pageviews and active sessions stream in as they happen. No overnight batch job, no stale numbers, no sampling.",
  },
  {
    icon: ShieldCheck,
    title: "Cookieless by design",
    body: "Visitors are a rotating daily hash of IP and user agent. Nothing persists in the browser, so no consent banner is required.",
  },
  {
    icon: Zap,
    title: "Sub-kilobyte tracker",
    body: "One async script tag. It patches history.pushState, so React and Next apps report route changes with zero extra code.",
  },
  {
    icon: Globe2,
    title: "The dimensions that matter",
    body: "Pages, referrers, UTM campaigns, devices, browsers and countries — derived server-side from the request, not the client.",
  },
  {
    icon: MousePointerClick,
    title: "Custom events and goals",
    body: "One line — rta.track(\"signup\", { plan: \"pro\" }) — turns any action into a tracked event with its own conversion rate. No dashboards to wire up.",
  },
  {
    icon: Layers,
    title: "Workspaces and sites",
    body: "Group properties under a workspace, invite the team, and keep every site's data cleanly scoped and isolated.",
  },
  {
    icon: Code2,
    title: "An API, not just a UI",
    body: "Every number in the dashboard is reachable over REST with an API key. Build your own views — or resell them.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything you need.
              <br className="hidden sm:block" /> Nothing you have to explain to legal.
            </>
          }
          body="Quantalog answers the questions a product team actually asks — who is here right now, where did they come from, what did they read — without following anyone around the internet."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              // Stagger across the row, then restart — a uniform delay on a
              // 3-column grid makes the third column feel broken.
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <f.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
