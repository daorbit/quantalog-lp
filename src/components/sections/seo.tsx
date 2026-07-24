import {
  Braces, FileSearch, Gauge, Link2Off, Layers, TrendingUp,
} from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

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
    <section id="seo" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="SEO audits"
          title={
            <>
              Traffic tells you who came.
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">SEO</span> tells you who didn&apos;t.
            </>
          }
          body="Audit any page on a site you already track. Quantalog reads it the way a crawler would, runs it through Lighthouse, and reports what is holding it back — in the same dashboard as your traffic, not a separate tool with a separate bill."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((c, i) => (
            <Reveal
              key={c.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <c.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
