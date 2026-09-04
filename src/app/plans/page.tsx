import type { Metadata } from "next";
import { PlansPage } from "@/components/plans-page";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const DESCRIPTION =
  "Compare every Quantalog plan side by side — audit and crawl quotas, report recipients, and the full feature matrix. Every plan includes the whole dashboard and SEO audit suite.";

export const metadata: Metadata = {
  title: "Plans and pricing",
  description: DESCRIPTION,
  alternates: { canonical: "/plans" },
  openGraph: {
    title: `Plans and pricing — ${site.name}`,
    description: DESCRIPTION,
    url: "/plans",
  },
};

const jsonLd = graph(
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]),
  {
    "@type": "WebPage",
    "@id": `${site.url}/plans#page`,
    url: `${site.url}/plans`,
    name: `Plans and pricing — ${site.name}`,
    description: DESCRIPTION,
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  }
);

export default function Plans() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PlansPage />
    </>
  );
}
