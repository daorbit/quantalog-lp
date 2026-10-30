import { FeatureHero } from "../feature-hero";
import { BigStats } from "../big-stats";
import { SplitStory } from "../split-story";
import { Cta } from "../sections/cta";
import { ProductSection } from "../product/product-section";
import { ProductFeatureGrid } from "../product/product-feature-grid";
import { ProductSteps } from "../product/product-steps";
import { ProductChecklist } from "../product/product-checklist";
import { ProductFaq } from "../product/product-faq";
import { AppHeroVisual } from "./app-hero-visual";
import { AppConnections } from "./app-connections";
import { AppAvailability } from "./app-availability";
import { AppCardGrid } from "./app-card-grid";
import { relatedEntries } from "@/lib/quantalog-apps/entries";
import type { AppPage } from "@/lib/quantalog-apps/types";

export function AppPageView({ app }: { app: AppPage }) {
  return (
    <>
      <FeatureHero
        eyebrow={`${app.name} · ${app.group}`}
        title={
          <>
            {app.title} <span className="text-accent">{app.accent}</span>
          </>
        }
        description={app.description}
        primary={{ label: "Start free — no card" }}
        secondary={{ label: "Read the guide", href: app.docs }}
        visual={<AppHeroVisual app={app} />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={app.stats} />
        </div>
      </div>

      <ProductSection eyebrow="What it does" title={`Everything ${app.shortName} does for you.`}>
        <ProductFeatureGrid features={app.features} columns={3} />
      </ProductSection>

      <ProductSection
        id="get-started"
        eyebrow="How to use it"
        title="Up and running in three steps."
        body={`${app.shortName} ships with every Quantalog workspace. A workspace admin switches it on once, and it's there for the whole team.`}
        link={{ label: `The full ${app.shortName} guide`, href: app.docs }}
        bordered
      >
        <ProductSteps steps={app.steps} />
      </ProductSection>

      <SplitStory eyebrow={app.story.eyebrow} title={app.story.title}>
        {app.story.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </SplitStory>

      <ProductSection
        id="integrations"
        eyebrow="Connects with"
        title="Works with the rest of Quantalog."
        body={`${app.shortName} reads from and hands off to the tools already in your workspace, so there's nothing extra to wire up.`}
        bordered
      >
        <AppConnections items={app.connections} />
      </ProductSection>

      <ProductSection eyebrow="Included" title="Everything in the box." bordered>
        <ProductChecklist items={app.included} />
      </ProductSection>

      <ProductSection eyebrow="Availability" title="How you get it." bordered>
        <AppAvailability app={app} />
      </ProductSection>

      <ProductFaq faqs={app.faqs} idPrefix={`${app.slug}-faq`} />

      <ProductSection
        eyebrow="More Quantalog Apps"
        title="Better together."
        link={{ label: "See all Quantalog Apps", href: "/apps" }}
        bordered
      >
        <AppCardGrid apps={relatedEntries(app)} />
      </ProductSection>

      <Cta
        title={app.ctaTitle}
        body={`Create a free workspace, switch on ${app.shortName} in Apps, and try it on your own site today.`}
        secondary={{ label: "Read the guide", href: app.docs }}
        location={`app_${app.slug}_cta`}
      />
    </>
  );
}
