import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
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
 * The three headline claims, carried as wide cards with a supporting metric.
 *
 * Previously all ten features were rendered identically — same icon size, same
 * weight, same accent — so the bento spans changed the shape of the grid
 * without changing what the eye landed on first. Splitting the list by
 * importance is what makes a bento layout mean anything: these three are the
 * argument, the rest is the specification.
 */
const headline = [
  {
    icon: Activity,
    fx: "fx-pulse",
    stat: "~3s",
    statLabel: "to first data",
    title: "Live in 3 seconds",
    body: "Visitors, pageviews and active sessions stream in as they happen. No overnight batch job, no stale numbers, no sampling.",
  },
  {
    icon: ShieldCheck,
    fx: "fx-bob",
    stat: "0",
    statLabel: "cookies set",
    title: "Cookieless by design",
    body: "Visitors are a rotating daily hash of IP and user agent. Nothing persists in the browser, so no consent banner is required.",
  },
  {
    icon: Zap,
    fx: "fx-pulse",
    stat: "<1 KB",
    statLabel: "tracker size",
    title: "Sub-kilobyte tracker",
    body: "One async script tag. It patches history.pushState, so React and Next apps report route changes with zero extra code.",
  },
];

/** Everything else: same weight as each other, quieter than the three above. */
const features = [
  {
    icon: Globe2,
    fx: "fx-spin",
    title: "The dimensions that matter",
    body: "Pages, referrers, UTM campaigns, devices, browsers and countries — derived server-side from the request, not the client.",
  },
  {
    icon: MousePointerClick,
    fx: "fx-tick",
    title: "Custom events and goals",
    body: "One line — rta.track(\"signup\", { plan: \"pro\" }) — turns any action into a tracked event with its own conversion rate.",
  },
  {
    icon: Search,
    fx: "fx-nudge",
    title: "SEO audits built in",
    body: "Lighthouse-backed audits on any page you track: meta tags, structured data, broken links and Core Web Vitals, kept over time.",
  },
  {
    icon: Layers,
    fx: "fx-bob",
    title: "Workspaces and sites",
    body: "Group properties under a workspace, invite the team, and keep every site's data cleanly scoped and isolated.",
  },
  {
    icon: Share2,
    fx: "fx-nudge",
    title: "Dashboards you can share",
    body: "Publish a read-only view at a link anyone can open — no account needed. You pick which panels are visible.",
  },
  {
    icon: Code2,
    fx: "fx-tick",
    title: "An API, not just a UI",
    body: "Every number in the dashboard is reachable over REST with an API key. Build your own views — or resell them.",
  },
  {
    icon: CalendarClock,
    fx: "fx-bob",
    title: "Scheduled LinkedIn posts",
    body: "Write a post from a sentence with Orbit, pick when it goes out, and Quantalog publishes it unattended.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
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

        {/* Tier one: the three claims, each anchored by the number that proves
            it. The stat is the largest thing in the card — a feature grid that
            opens with prose reads as a list of assertions, one that opens with
            a measurement reads as evidence. */}
        <div className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {headline.map((f, i) => (
            <GlowCard
              key={f.title}
              className={`v-rise v-d${(i % 3) + 1} group flex flex-col p-6 sm:p-7`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-raised/60">
                  <f.icon
                    className={`feature-icon ${f.fx} h-[18px] w-[18px] text-accent`}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-right">
                  <span className="block text-[1.75rem] font-medium leading-none tracking-[-0.04em] tabular-nums">
                    {f.stat}
                  </span>
                  <span className="mt-1.5 block text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">
                    {f.statLabel}
                  </span>
                </span>
              </div>

              <h3 className="mt-6 text-[1.0625rem] font-medium tracking-[-0.02em]">
                {f.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">
                {f.body}
              </p>
            </GlowCard>
          ))}
        </div>

        {/* Tier two: no glow, no card chrome, no accent icons. These are the
            specification — they need to be readable and countable, and giving
            them the same treatment as the three above is what flattened the
            whole section. A hairline grid holds them together instead. */}
        <div className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`v-rise v-d${(i % 3) + 1} group flex flex-col bg-surface p-5 transition-colors duration-200 hover:bg-surface-raised sm:p-6`}
            >
              <div className="flex items-center gap-2.5">
                <f.icon
                  className={`feature-icon ${f.fx} h-4 w-4 shrink-0 text-fg-faint transition-colors duration-200 group-hover:text-accent`}
                  aria-hidden="true"
                />
                <h3 className="text-[14px] font-medium tracking-[-0.01em]">
                  {f.title}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                {f.body}
              </p>
            </div>
          ))}

          {/* Seven items in a three-column grid leaves two empty cells in the
              last row, and an unfilled hairline grid reads as a rendering
              fault. This closes it and gives the section somewhere to go. */}
          <Link
            href="/docs"
            className="group flex flex-col justify-between bg-surface p-5 transition-colors duration-200 hover:bg-surface-raised sm:col-span-1 sm:p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen
                className="h-4 w-4 shrink-0 text-fg-faint transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              />
              <h3 className="text-[14px] font-medium tracking-[-0.01em]">
                And the rest, in the docs
              </h3>
            </div>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-fg-muted">
              Funnels, retention cohorts, segments, webhooks and the full event
              schema.
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
