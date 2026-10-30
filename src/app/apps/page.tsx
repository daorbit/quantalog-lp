import type { Metadata } from "next";
import { FeatureHero } from "@/components/feature-hero";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { ProductSection } from "@/components/product/product-section";
import { ProductSteps } from "@/components/product/product-steps";
import { ProductFaq } from "@/components/product/product-faq";
import { AppsMosaic } from "@/components/app-page/apps-mosaic";
import { AppDirectory } from "@/components/app-page/app-directory";
import { IntegrationDirectory } from "@/components/app-page/integration-directory";
import { JsonLd } from "@/components/json-ld";
import { integrationApps, officialApps } from "@/lib/quantalog-apps/entries";
import { faqPage } from "@/lib/quantalog-apps/schema";
import { breadcrumbs, graph, ORG_ID, SITE_ID } from "@/lib/schema";
import { pageAlternates } from "@/lib/alternates";
import { site } from "@/lib/site";

const PATH = "/apps";
const TITLE = "Quantalog Apps and integrations";
const META_DESCRIPTION =
  "Built-in Quantalog Apps for goals, funnels, alerts, popups, tasks and more, switched on in one click, plus Slack, WhatsApp, Razorpay, Google Sheets and other integrations.";

const enableSteps = [
  {
    title: "Open Apps",
    body: "In your workspace, open Apps from the sidebar. Quantalog Apps sit at the top, with an Official badge.",
  },
  {
    title: "Switch it on",
    body: "A workspace admin presses Enable on a free app, or unlocks a paid one once. No subscription and no reload.",
  },
  {
    title: "Find it in the sidebar",
    body: "The app appears for everyone in the workspace straight away. Each workspace chooses its own apps.",
  },
];

const connectSteps = [
  {
    title: "Pick the tool",
    body: "In Apps, choose the tool you use: Slack, WhatsApp, Razorpay, Google Sheets, Claude or any other.",
  },
  {
    title: "Connect once",
    body: "Sign in with Google, verify a number, link a chat or paste a key. Secrets are encrypted and never shown again in full.",
  },
  {
    title: "Use it everywhere",
    body: "Forms, reports and alerts can all use the connection. Press Send a test to check it before it matters.",
  },
];

const faqs = [
  {
    q: "Are Quantalog Apps included in my plan?",
    a: "Some apps are free on every plan, including Free. Others are a one-time unlock per workspace in Apps, with no subscription. Every app page says which it is.",
  },
  {
    q: "Who can turn apps on?",
    a: "Workspace admins and owners. Other members see a note asking them to contact an admin.",
  },
  {
    q: "What happens to my data if I turn an app off?",
    a: "Turning an app off hides it but keeps everything it holds. Turn it back on and it picks up where you left off.",
  },
  {
    q: "Are apps per workspace?",
    a: "Yes. Each workspace switches on its own apps, so an agency can give each client workspace exactly the apps it needs.",
  },
  {
    q: "Where do I connect Slack, WhatsApp or Razorpay?",
    a: "In the same Apps page. Connections are set up once per workspace and used by your forms, reports and alerts.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  alternates: pageAlternates(PATH),
  keywords: [
    "analytics apps",
    "website analytics integrations",
    "lead form integrations",
    "slack form notifications",
    "whatsapp form alerts",
    "razorpay form payments",
    "google sheets form integration",
  ],
  openGraph: { type: "website", url: `${site.url}${PATH}`, title: TITLE, description: META_DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: META_DESCRIPTION },
};

export default function AppsPage() {
  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${site.url}${PATH}#page`,
      name: TITLE,
      description: META_DESCRIPTION,
      url: `${site.url}${PATH}`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    faqPage(PATH, faqs),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Quantalog Apps", path: PATH },
    ]),
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Quantalog Apps"
        title={
          <>
            Switch on what you need. <span className="text-accent">Connect what you use.</span>
          </>
        }
        description="Official Quantalog Apps for targets, funnels, alerts, popups, tasks and more, one switch each. And the tools your team already relies on, connected once."
        primary={{ label: "Start free — no card" }}
        secondary={{ label: "See how apps work", href: "#how" }}
        visual={<AppsMosaic apps={officialApps} />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats
            stats={[
              { value: String(officialApps.length), label: "Official Quantalog Apps" },
              { value: String(integrationApps.length), label: "Tools you can connect" },
              { value: "1", label: "Switch to turn one on" },
              { value: "0", label: "Data lost turning one off" },
            ]}
          />
        </div>
      </div>

      <ProductSection
        id="how"
        eyebrow="How apps work"
        title="On in one click. For the whole team."
        body="Every Quantalog workspace ships with every app. An admin chooses which ones the team sees."
      >
        <ProductSteps steps={enableSteps} />
      </ProductSection>

      <ProductSection
        id="official"
        eyebrow="Official apps"
        title="Built by Quantalog, made to fit."
        body="They read the same data as the rest of your workspace, so there's nothing to sync and nothing to set up twice."
        bordered
      >
        <AppDirectory />
      </ProductSection>

      <SplitStory eyebrow="Why built in" title="One workspace instead of eight logins.">
        <p>
          A goal tracker, a funnel tool, an alerting service, a popup plugin, a task board: each one is another login,
          another bill and another copy of your data that drifts out of date.
        </p>
        <p>
          Quantalog Apps run on the numbers you already track. An insight becomes a task in one click, an alert knows
          about your goals, and a popup sends its leads straight to the same forms, alerts and invoices.
        </p>
      </SplitStory>

      <ProductSection
        id="connect"
        eyebrow="How to connect"
        title="Connect your tools in three steps."
        body="Integrations live on the same Apps page, set up once per workspace."
        bordered
      >
        <ProductSteps steps={connectSteps} />
      </ProductSection>

      <ProductSection
        id="integrations"
        eyebrow="Integrations"
        title="The tools you already use."
        body="From Claude and ChatGPT to Slack, WhatsApp, Razorpay and Google Sheets."
        bordered
      >
        <IntegrationDirectory />
      </ProductSection>

      <ProductFaq faqs={faqs} idPrefix="apps-faq" />

      <Cta
        title="Every app is waiting in your workspace."
        body="Create a free workspace, open Apps, and switch on the first one in a click."
        secondary={{ label: "Read the docs", href: "/docs" }}
        location="apps_cta"
      />
    </>
  );
}
