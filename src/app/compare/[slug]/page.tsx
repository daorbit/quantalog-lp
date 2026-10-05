import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Scale } from "lucide-react";
import { getComparison, getComparisonSlugs, getAllComparisons } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { Button, SectionHeading } from "@/components/ui";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import { HeadToHead } from "@/components/charts";
import { BigStats } from "@/components/big-stats";
import { BrandBadge, QuantalogBadge } from "@/components/compare/brand-badge";
import { CompareCard } from "@/components/compare/compare-card";
import { CompareCta } from "@/components/compare/compare-cta";
import { FaqList } from "@/components/faq-list";
import { CompareTable } from "@/components/compare/compare-table";
import { tally } from "@/components/compare/compare-utils";
import { JsonLd } from "@/components/json-ld";
import { ProviderSignup } from "@/components/provider-signup";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";

type Params = { slug: string };

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

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const others = getAllComparisons().filter((o) => o.slug !== c.slug).slice(0, 3);
  const score = tally(c);

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
      image: `${site.url}/new-og-image.webp`,
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
    <>
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <DocsBreadcrumb root={{ label: "Compare", href: "/compare" }} trail={[c.rival]} />
      </div>

      <section className="mx-auto max-w-4xl px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-16">
        <div className="v-rise">
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <QuantalogBadge size="lg" />
            <span className="text-[15px] font-medium text-fg-faint">vs</span>
            <BrandBadge icon={c.logo} size="lg" />
          </div>
          <h1 className="mt-8 text-balance text-display font-medium leading-[1.02] tracking-display">
            {site.name} <span className="text-fg-faint">vs</span> {c.rival}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            {c.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={`${site.app}/signup`}
              size="lg"
              className="group"
              track="cta_start_free"
              trackProps={{ location: "compare_hero", rival: c.rival }}
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button href="/docs/demo" variant="secondary" size="lg">
              See the live demo
            </Button>
          </div>
          <ProviderSignup location="compare_hero" className="mt-6" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats
            stats={[
              { value: String(score.ours), label: `Points to ${site.name}` },
              { value: String(score.tied), label: "Tied or neither" },
              { value: String(score.theirs), label: `Points to ${c.rival}` },
            ]}
          />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-[17px] leading-relaxed text-fg-muted">
          {c.intro}
        </p>
      </div>

      {c.metrics && c.metrics.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-28">
          <SectionHeading
            eyebrow="Measured"
            title="The numbers you can check yourself."
            centered
            className="v-rise"
          />
          <div className="v-rise v-d1 tile tile--static mt-10 grid gap-10 p-6 sm:mt-14 sm:grid-cols-2 sm:p-10">
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Point by point"
          title={`${site.name} vs ${c.rival}, side by side.`}
          centered
          className="v-rise"
        />
        <div className="v-rise v-d1 mt-10 sm:mt-14">
          <CompareTable rows={c.rows} rival={c.rival} logo={c.logo} />
        </div>

        <div className="v-rise tile tile--static mt-3 p-6 sm:mt-4 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
            <div>
              <Scale className="h-7 w-7 text-accent" strokeWidth={1.6} aria-hidden="true" />
              <p className="mt-5 text-[14px] font-semibold text-accent">In fairness</p>
              <h2 className="mt-2 text-balance text-[1.375rem] font-semibold leading-[1.18] tracking-tight text-fg sm:text-[1.75rem]">
                When {c.rival} is the better choice.
              </h2>
            </div>
            <p className="text-pretty text-[16px] leading-relaxed text-fg-muted lg:pt-12 lg:text-[17px]">
              {c.whenTheirs}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="v-rise">
            <p className="text-[15px] font-semibold text-accent sm:text-[17px]">FAQ</p>
            <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
              Common questions.
            </h2>
          </div>
          <div className="v-rise v-d1 min-w-0">
            <FaqList faqs={c.faqs} idPrefix={`faq-${c.slug}`} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[1.5rem] font-semibold tracking-tight text-fg sm:text-[1.75rem]">
              More comparisons
            </h2>
            <Link
              href="/compare"
              className="group inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <CompareCard comparison={o} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <CompareCta rival={c.rival} />
    </>
  );
}
