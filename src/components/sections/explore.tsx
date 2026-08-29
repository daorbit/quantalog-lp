import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  FileSearch,
  LayoutGrid,
  Mails,
  Plug,
  Swords,
} from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

/**
 * The one section that replaced seven.
 *
 * Every capability that used to have a full-length section on the homepage now
 * has its own page — better for search, and it keeps this page short. This grid
 * is the hand-off: a line each, and a link out to the page that makes the whole
 * argument.
 */
const cards = [
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Analytics",
    body: "Live visitor dashboard, funnels, goals, retention cohorts and every breakdown — nothing sampled.",
  },
  {
    href: "/seo-audits",
    icon: FileSearch,
    title: "SEO audits",
    body: "Lighthouse scores, broken-link and structured-data checks, kept over time so a fix is provable.",
  },
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

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.href} delay={(Math.min(i, 4) as 0 | 1 | 2 | 3 | 4)}>
            <Link
              href={c.href}
              className="group card flex h-full flex-col p-6 transition-colors hover:border-accent/40"
            >
              <c.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-fg-muted">
                {c.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
