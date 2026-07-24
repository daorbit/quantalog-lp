import { ArrowRight, BarChart3, Search, Share2, Lock } from "lucide-react";
import { Button, SectionHeading } from "../ui";
import { Reveal } from "../reveal";
import { site } from "@/lib/site";

/**
 * The read-only demo.
 *
 * Sits between the feature list and the comparison table: by that point a
 * visitor knows what the product claims to do, and the cheapest way to settle
 * it is to let them look. The section leads on the absence of friction — no
 * account, no card — because that is the actual offer.
 */

const explore = [
  {
    icon: BarChart3,
    title: "A populated dashboard",
    body: "A month of traffic across two sites — live visitors, top pages, referrers, countries, funnels and goals, all filled in.",
  },
  {
    icon: Search,
    title: "A complete SEO audit",
    body: "Scores, issues, meta tags, structured data, broken links and Core Web Vitals, with history across previous runs.",
  },
  {
    icon: Share2,
    title: "The sharing flow",
    body: "See how a public dashboard and a shared audit look to the client on the other end of the link.",
  },
];

export function TryDemo() {
  return (
    <section id="demo-account" className="relative border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="Live demo"
          title={
            <>
              Look around first.
              <br className="hidden sm:block" /> No account required.
            </>
          }
          body="Open a fully populated workspace in one click — real charts, a real SEO report, every page of the product. Nothing to install, nothing to sign up for, and nothing you can break."
          centered
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {explore.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button
            href={`${site.app}/login`}
            size="lg"
            className="group w-full sm:w-auto"
            track="try_demo"
            trackProps={{ location: "demo_section" }}
          >
            Explore the live demo
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-fg-faint">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Read-only — the demo uses sample data and cannot be edited.
          </p>
        </div>
      </div>
    </section>
  );
}
