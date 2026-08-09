import Link from "next/link";
import {
  ArrowRight, Braces, FileSearch, Gauge, Link2Off, Layers, TrendingUp,
} from "lucide-react";
import { SectionHeading, GlowCard } from "../ui";

/**
 * The SEO module.
 *
 * Analytics tells you how many people arrived; this is the half that explains
 * why more of them didn't. It earns its own section because it is the reason a
 * team would pick Quantalog over a pure counter — and because "we also do SEO"
 * buried in a feature grid reads as an afterthought.
 */

const checks = [
  {
    icon: Gauge,
    title: "Lighthouse, scored and kept",
    body: "Performance, accessibility, best practices and SEO, measured on the mobile profile Google indexes with — stored per run so a fix is provable rather than assumed.",
  },
  {
    icon: FileSearch,
    title: "Meta and content",
    body: "Titles and descriptions measured against what results actually display, heading structure, keyword density, readability and every image missing alt text.",
  },
  {
    icon: Link2Off,
    title: "Broken links, found first",
    body: "Every link on the page is followed and checked, so dead ends and redirect chains surface in your dashboard instead of in a customer's tab.",
  },
  {
    icon: Braces,
    title: "Structured data, validated",
    body: "Your JSON-LD checked against schema.org: what breaks a rich result outright, and the optional properties that would make one stronger.",
  },
  {
    icon: Layers,
    title: "Beyond a single page",
    body: "A site crawl finds the problems one page can't show you — orphaned pages, broken internal links, and content buried too deep to get crawled.",
  },
  {
    icon: TrendingUp,
    title: "Progress you can hand over",
    body: "Scores tracked across runs, competitors side by side, and any report publishable at a link — or printed to PDF — for the person who asked.",
  },
];

export function Seo() {
  return (
    // Full-bleed tinted band. This and the traffic section make the same
    // argument, so putting one on a distinct surface stops the pair reading
    // as one long undifferentiated scroll.
    <section
      id="seo"
      className="relative overflow-hidden border-y border-border bg-bg-subtle"
    >
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="SEO audits"
          align="center"
          className="v-rise"
          title={
            <>
              Traffic tells you who came.
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">SEO</span> tells you who didn&apos;t.
            </>
          }
          body="Audit any page on a site you already track. Quantalog reads it the way a crawler would, runs it through Lighthouse, and reports what is holding it back — in the same dashboard as your traffic, not a separate tool with a separate bill."
        />

        <div className="mt-14 grid sm:mt-16 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((c, i) => (
            <GlowCard
              key={c.title}
              className={`v-rise v-d${(i % 3) + 1} group bg-surface/60 p-6 sm:p-7`}
            >
              <c.icon
                className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-h3 font-medium tracking-[-0.02em]">
                {c.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {c.body}
              </p>
            </GlowCard>
          ))}
        </div>

        <Link
          href="/seo-audits"
          className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Everything the SEO audit checks
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
