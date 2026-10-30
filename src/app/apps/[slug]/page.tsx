import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPageView } from "@/components/app-page/app-page-view";
import { JsonLd } from "@/components/json-ld";
import { APP_PAGES, appPath, getAppPage } from "@/lib/quantalog-apps";
import { appPageJsonLd } from "@/lib/quantalog-apps/schema";
import { pageAlternates } from "@/lib/alternates";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return APP_PAGES.map((app) => ({ slug: app.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppPage(slug);
  if (!app) return { title: "Not found" };

  const path = appPath(app.slug);
  const title = `${app.name}: ${app.title} ${app.accent}`;
  return {
    title,
    description: app.metaDescription,
    alternates: pageAlternates(path),
    keywords: app.keywords,
    other: { "article:published_time": app.launched },
    openGraph: { type: "website", url: `${site.url}${path}`, title, description: app.metaDescription },
    twitter: { card: "summary_large_image", title, description: app.metaDescription },
  };
}

export default async function AppPageRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const app = getAppPage(slug);
  if (!app) notFound();

  return (
    <>
      <JsonLd data={appPageJsonLd(app, appPath(app.slug))} />
      <AppPageView app={app} />
    </>
  );
}
