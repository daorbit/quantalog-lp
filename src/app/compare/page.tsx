import type { Metadata } from "next";
import { getAllComparisons } from "@/lib/comparisons";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Compare } from "@/components/sections/compare";
import { Cta } from "@/components/sections/cta";
import { CompareCard } from "@/components/compare/compare-card";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const DESCRIPTION =
  "How Quantalog compares to Google Analytics, Plausible, Matomo and other analytics tools — consent banners, real-time reporting, SEO audits, script weight and price, including where the other tool is the better choice.";

export const metadata: Metadata = {
  title: "Analytics tool comparisons",
  description: DESCRIPTION,
  alternates: { canonical: "/compare" },
  openGraph: {
    type: "website",
    url: `${site.url}/compare`,
    title: "Analytics tool comparisons",
    description: DESCRIPTION,
  },
};

export default function ComparisonsIndexPage() {
  const comparisons = getAllComparisons();

  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/compare#page`,
      name: "Analytics tool comparisons",
      description: DESCRIPTION,
      url: `${site.url}/compare`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: comparisons.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${site.url}/compare/${c.slug}`,
        })),
      },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Comparisons", path: "/compare" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-24 sm:pt-28">
        <header className="v-rise mx-auto max-w-3xl text-center">
          <Eyebrow>Compare</Eyebrow>
          <h1 className="mt-4 text-balance text-display font-medium leading-[1.02] tracking-display">
            {site.name} vs the rest.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            {comparisons.length} side-by-side comparisons with the tools teams most often leave — each
            one says plainly where the other tool is the better choice.
          </p>
        </header>

        <ul className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {comparisons.map((c, i) => (
            <li key={c.slug} className={`v-rise v-d${(i % 3) + 1}`}>
              <CompareCard comparison={c} />
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-border">
        <Compare showLinks={false} />
      </div>

      <Reveal as="section">
        <Cta />
      </Reveal>
    </>
  );
}
