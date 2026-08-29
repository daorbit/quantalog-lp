import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import {
  getComparison,
  getComparisonSlugs,
  getAllComparisons,
  type Verdict,
} from "@/lib/comparisons";
import { site } from "@/lib/site";
import { Button } from "@/components/ui";
import { HeadToHead, VerdictBar } from "@/components/charts";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";

type Params = { slug: string };

// Every comparison renders at build time; /compare ships entirely as static HTML.
export function generateStaticParams(): Params[] {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return { title: "Not found" };

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/compare/${c.slug}` },
    keywords: [
      `${site.name} vs ${c.rival}`,
      `${c.rival} alternative`,
      `${c.rival} vs ${site.name}`,
      `switch from ${c.rival}`,
      `${c.rival} comparison`,
      "privacy-first analytics",
      "cookieless analytics",
    ],
    openGraph: {
      type: "article",
      url: `${site.url}/compare/${c.slug}`,
      title: c.title,
      description: c.description,
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
    },
  };
}

/** Which side a row favours. `both` and `neither` are load-bearing: a table
 *  where every row points one way reads as marketing and gets believed less. */
function Badge({ verdict, rival }: { verdict: Verdict; rival: string }) {
  if (verdict === "quantalog") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
        Quantalog
      </span>
    );
  }
  if (verdict === "rival") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-bg-subtle px-2 py-0.5 text-[11px] font-semibold text-fg-muted">
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
        {rival}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-bg-subtle px-2 py-0.5 text-[11px] font-semibold text-fg-faint">
      <Minus className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
      {verdict === "both" ? "Both" : "Neither"}
    </span>
  );
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const others = getAllComparisons().filter((o) => o.slug !== c.slug);

  const jsonLd = graph(
    {
      "@type": "Article",
      "@id": `${site.url}/compare/${c.slug}#article`,
      headline: c.title,
      description: c.description,
      url: `${site.url}/compare/${c.slug}`,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      author: { "@id": ORG_ID },
      image: `${site.url}/OgImage.png`,
      // The rival is a real entity with its own knowledge-graph node. Saying so
      // is what tells a search engine this page is about that comparison rather
      // than one that merely mentions the name.
      about: [
        { "@type": "SoftwareApplication", name: site.name },
        { "@type": "SoftwareApplication", name: c.rival },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/compare/${c.slug}#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Comparisons", path: "/compare" },
      { name: c.title, path: `/compare/${c.slug}` },
    ])
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="border-b border-border pb-10">
        <Link
          href="/compare"
          className="text-sm text-fg-muted transition hover:text-fg"
        >
          All comparisons
        </Link>
        <h1 className="mt-6 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          {c.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">
          {c.description}
        </p>
        <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
          {c.intro}
        </p>
        <div className="mt-8 max-w-md">
          <VerdictBar
            ourName={site.name}
            rival={c.rival}
            ours={c.rows.filter((r) => r.verdict === "quantalog").length}
            tied={c.rows.filter((r) => r.verdict === "both" || r.verdict === "neither").length}
            theirs={c.rows.filter((r) => r.verdict === "rival").length}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free — 10k pageviews</Button>
          <Button href={`${site.app}/login`} variant="secondary">
            See the live demo
          </Button>
        </div>
      </header>

      {/* The measurable claims, before the table of prose ones. Only quantities
          both vendors publish appear here — see ComparisonMetric. */}
      {c.metrics && c.metrics.length > 0 && (
        <section className="mt-14">
          <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">
            The numbers you can check yourself
          </h2>
          <div className="card mt-8 grid gap-8 p-7 sm:grid-cols-2">
            {c.metrics.map((m, i) => (
              <HeadToHead
                key={m.label}
                label={m.label}
                ours={m.ours}
                theirs={m.theirs}
                ourName={site.name}
                rivalName={c.rival}
                format={m.format}
                lowerIsBetter={m.lowerIsBetter}
                source={m.source}
                delay={0.2 + i * 0.15}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">
          {site.name} vs {c.rival}, point by point
        </h2>
        <div className="card mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Feature comparison between {site.name} and {c.rival}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    What you are comparing
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    {site.name}
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    {c.rival}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.point} className="border-b border-border last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-4 align-top font-medium"
                    >
                      {row.point}
                      <span className="mt-1.5 block">
                        <Badge verdict={row.verdict} rival={c.rival} />
                      </span>
                    </th>
                    <td className="px-5 py-4 align-top leading-relaxed text-fg-muted">
                      {row.ours}
                    </td>
                    <td className="px-5 py-4 align-top leading-relaxed text-fg-muted">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stated plainly rather than buried: a comparison page that cannot say
          when the other product wins is not a comparison. */}
      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">
          When {c.rival} is the better choice
        </h2>
        <p className="mt-5 text-pretty leading-relaxed text-fg-muted">
          {c.whenTheirs}
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">
          Common questions
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {c.faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2.5 text-pretty leading-relaxed text-fg-muted">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card mt-14 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Try it against your own traffic
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Run {site.name} alongside {c.rival} for a couple of weeks and compare
          the numbers yourself. The free tier covers 10,000 pageviews a month and
          needs no card.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href="/docs" variant="secondary">
            Read the docs
          </Button>
        </div>
      </section>

      {others.length > 0 && (
        <nav className="mt-14 border-t border-border pt-8">
          <h2 className="text-sm font-semibold text-fg-muted">
            Other comparisons
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/compare/${o.slug}`} className="card card-hover group block p-5">
                  <span className="font-semibold tracking-tight transition group-hover:text-accent">
                    {o.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1 text-sm text-fg-muted">
                    Read the comparison
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
