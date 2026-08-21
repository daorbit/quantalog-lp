import {
  Activity,
  CalendarClock,
  Code2,
  Globe2,
  Layers,
  MousePointerClick,
  Search,
  Share2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SectionHeading, GlowCard } from "../ui";

/**
 * `span` drives the bento layout: the three features that carry the argument
 * get width, the rest fill in around them. Nine equally sized cards read as a
 * checklist — the point of a feature grid is that some features matter more.
 */
const features = [
  {
    span: "lg:col-span-2",
    icon: Activity,
    title: "Live in 3 seconds",
    body: "Visitors, pageviews and active sessions stream in as they happen. No overnight batch job, no stale numbers, no sampling.",
  },
  {
    span: "lg:col-span-1 lg:row-span-2",
    icon: ShieldCheck,
    title: "Cookieless by design",
    body: "Visitors are a rotating daily hash of IP and user agent. Nothing persists in the browser, so no consent banner is required.",
  },
  {
    span: "lg:col-span-1",
    icon: Zap,
    title: "Sub-kilobyte tracker",
    body: "One async script tag. It patches history.pushState, so React and Next apps report route changes with zero extra code.",
  },
  {
    span: "lg:col-span-1",
    icon: Globe2,
    title: "The dimensions that matter",
    body: "Pages, referrers, UTM campaigns, devices, browsers and countries — derived server-side from the request, not the client.",
  },
  {
    span: "lg:col-span-1",
    icon: MousePointerClick,
    title: "Custom events and goals",
    body: "One line — rta.track(\"signup\", { plan: \"pro\" }) — turns any action into a tracked event with its own conversion rate. No dashboards to wire up.",
  },
  {
    span: "lg:col-span-2",
    icon: Search,
    title: "SEO audits built in",
    body: "Run a Lighthouse-backed audit on any page you track: meta tags, content, structured data, broken links and Core Web Vitals, scored and kept over time so you can prove a fix worked.",
  },
  {
    span: "lg:col-span-1",
    icon: Layers,
    title: "Workspaces and sites",
    body: "Group properties under a workspace, invite the team, and keep every site's data cleanly scoped and isolated.",
  },
  {
    span: "lg:col-span-1",
    icon: Share2,
    title: "Dashboards you can share",
    body: "Publish a read-only view at a link anyone can open — no account needed. You pick which panels are visible, and everything else never leaves the server.",
  },
  {
    span: "lg:col-span-2",
    icon: Code2,
    title: "An API, not just a UI",
    body: "Every number in the dashboard is reachable over REST with an API key. Build your own views — or resell them.",
  },
  {
    span: "lg:col-span-3",
    icon: CalendarClock,
    title: "Post to LinkedIn on a schedule",
    body: "Write a post from a sentence with Orbit, pick when it goes out — once, or on a repeating slot — and Quantalog publishes it unattended. Every send is kept with the words and image as they went, and a link to the post.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Features"
          align="left"
          title={
            <>
              Everything you need.
              <br className="hidden sm:block" /> Nothing you have to explain to legal.
            </>
          }
          body="Quantalog answers the questions a product team actually asks — who is here right now, where did they come from, what did they read — without following anyone around the internet."
          className="v-rise"
        />

        <div className="mt-14 grid sm:mt-16 auto-rows-[minmax(0,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <GlowCard
              key={f.title}
              // Stagger across the row, then restart — a uniform delay on a
              // 3-column grid makes the third column feel broken.
              className={`v-rise v-d${(i % 3) + 1} group flex flex-col p-6 sm:p-7 ${f.span}`}
            >
              <f.icon
                className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-h3 font-medium tracking-[-0.02em]">
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {f.body}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
