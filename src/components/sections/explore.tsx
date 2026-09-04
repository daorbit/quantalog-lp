import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookText,
  Bot,
  ChevronRight,
  FileSearch,
  LayoutGrid,
  Mails,
  Plug,
  Swords,
} from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

/**
 * The two pages that carry the product, given room to say more.
 *
 * The seven links were previously rendered as one uniform grid, which made the
 * flagship analytics page and the comparison page look like equally weighted
 * siblings. They are not — these two are where most visitors should go.
 */
const primary = [
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Analytics",
    body: "Live visitor dashboard, funnels, goals, retention cohorts and every breakdown — nothing sampled, nothing withheld.",
    points: ["Real-time dashboard", "Funnels & goals", "Retention cohorts"],
  },
  {
    href: "/seo-audits",
    icon: FileSearch,
    title: "SEO audits",
    body: "Lighthouse scores, broken-link and structured-data checks, kept over time so a fix is provable rather than asserted.",
    points: ["Core Web Vitals", "Structured data", "Scored over time"],
  },
];

/** The rest: one line each, in a compact list. */
const secondary = [
  {
    href: "/reports",
    icon: Mails,
    title: "Reports",
    body: "Scheduled email and WhatsApp summaries that open with a plain-language read of what changed.",
  },
  {
    href: "/social",
    icon: Bot,
    title: "Orbit AI & social",
    body: "An in-app assistant grounded in the docs, and scheduled LinkedIn posts written from your numbers.",
  },
  {
    href: "/forms",
    icon: LayoutGrid,
    title: "Forms",
    body: "Drag-and-drop multi-step forms with per-field drop-off analytics attached from the start.",
  },
  {
    href: "/platform-api",
    icon: Plug,
    title: "Platform API",
    body: "One key provisions a project per customer and reads their stats back into your own product.",
  },
  {
    href: "/compare",
    icon: Swords,
    title: "Compare",
    body: "Side by side with Google Analytics, Plausible and Matomo — including where they win.",
  },
];

export function Explore() {
  return (
    <section id="explore" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading
        eyebrow="Explore"
        title="Every part, on its own page"
        body="The homepage is the overview. Each of these opens the full argument for one piece of the product."
      />

      {/* Two feature cards, then a compact list. The old grid gave a
          seven-item menu no point of entry — every tile had an accent icon and
          an accent "Learn more", so nothing was first. */}
      <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2">
        {primary.map((c, i) => (
          <Reveal key={c.href} delay={(i as 0 | 1)}>
            <Link
              href={c.href}
              className="group card card-hover flex h-full flex-col p-6 sm:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-raised/60">
                <c.icon className="h-[19px] w-[19px] text-accent" />
              </span>

              <span className="mt-5 block text-lg font-semibold tracking-tight">
                {c.title}
              </span>
              <span className="mt-2 block text-pretty text-sm leading-relaxed text-fg-muted">
                {c.body}
              </span>

              <span className="mt-5 flex flex-wrap gap-1.5">
                {c.points.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border bg-bg-subtle px-2 py-1 text-[11.5px] text-fg-muted"
                  >
                    {p}
                  </span>
                ))}
              </span>

              <span className="mt-auto pt-6">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* One hairline-separated block rather than five floating cards: at this
          weight the links read as a menu, which is what they are. */}
      <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {secondary.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex items-start gap-3 bg-surface p-5 transition-colors duration-200 hover:bg-surface-raised"
          >
            <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint transition-colors duration-200 group-hover:text-accent" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="text-[14px] font-medium tracking-[-0.01em]">
                  {c.title}
                </span>
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-fg-faint transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
                {c.body}
              </span>
            </span>
          </Link>
        ))}

        {/* Five items, three columns — the sixth cell would otherwise sit
            empty and read as a rendering fault. */}
        <Link
          href="/docs"
          className="group hidden items-start gap-3 bg-surface p-5 transition-colors duration-200 hover:bg-surface-raised lg:flex"
        >
          <BookText className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint transition-colors duration-200 group-hover:text-accent" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span className="text-[14px] font-medium tracking-[-0.01em]">Docs</span>
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-fg-faint transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
              Install guides for every framework, the event schema and the full
              REST reference.
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
