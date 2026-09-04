import type { Post } from "@/lib/blog";
import { A, Callout, H2, H3, Li, P, Ul } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Every list of Google Analytics alternatives is written by someone with a
        product to sell, and this one is no exception. What follows is honest
        about where each tool fits and where it does not, because a
        recommendation that only ever points one way is worth nothing.
      </P>

      <Callout>
        The short version: pick a cookieless tool if the consent banner is
        costing you data, pick a self-hosted one if data ownership is a hard
        requirement, and pick a product-analytics platform if you need session
        replay and experiments. Most teams leaving GA4 want the first.
      </Callout>

      <H2 id="why-leave">Why teams leave GA4 at all</H2>
      <P>Three reasons, in roughly the order people hit them:</P>
      <Ul>
        <Li>
          <strong>The consent banner.</strong> GA4 sets identifiers, so in the
          EU and UK it needs a banner. Everyone who clicks &quot;reject&quot; is
          never measured, and a technical or EU-heavy audience can hide a large
          share of real sessions. See{" "}
          <A href="/blog/why-your-analytics-undercounts-traffic">
            why your analytics undercounts traffic
          </A>
          .
        </Li>
        <Li>
          <strong>The interface.</strong> GA4 replaced a familiar report layout
          with an exploration model that takes real time to learn.
        </Li>
        <Li>
          <strong>Where the data goes.</strong> A legal or procurement review
          asks where visitor data is processed, and the honest answer sends
          people looking.
        </Li>
      </Ul>

      <H2 id="cookieless">Cookieless, no-banner analytics</H2>
      <P>
        The largest category, and the right fit for most GA4 refugees. No
        cookies, no browser storage, no banner, a small script.
      </P>

      <H3 id="quantalog">Quantalog</H3>
      <P>
        Cookieless real-time analytics with SEO audits, funnels, retention
        cohorts and scheduled email and WhatsApp reports in one dashboard, plus
        a multi-tenant API for agencies and platforms that want to give
        analytics to their own customers. Free to 10k pageviews a month. It does
        not do ad-platform attribution or session replay.{" "}
        <A href="/compare/google-analytics-alternative">
          Full comparison against Google Analytics
        </A>
        .
      </P>

      <H3 id="plausible">Plausible</H3>
      <P>
        The best-known name in the category. A deliberately simple single-page
        dashboard, open source, self-hostable. If you want the least product
        that still answers &quot;how much traffic and from where&quot;, this is
        it.{" "}
        <A href="/compare/plausible-alternative">
          Where Quantalog and Plausible differ
        </A>
        .
      </P>

      <H3 id="fathom">Fathom Analytics</H3>
      <P>
        A mature, focused tool with a long track record and an EU-isolated data
        option. Paid only, no free tier.{" "}
        <A href="/compare/fathom-analytics-alternative">
          Quantalog vs Fathom
        </A>
        .
      </P>

      <H3 id="simple-analytics">Simple Analytics</H3>
      <P>
        Privacy-first, EU-hosted, a deliberately minimal dashboard. Paid only.
        The right pick if EU-only data hosting is a hard requirement.{" "}
        <A href="/compare/simple-analytics-alternative">
          Quantalog vs Simple Analytics
        </A>
        .
      </P>

      <H3 id="cloudflare">Cloudflare Web Analytics</H3>
      <P>
        Free, zero-configuration, privacy-first. A pageview and referrer counter
        with no custom events, funnels or real-time data. Easiest if your site
        is already behind Cloudflare.{" "}
        <A href="/compare/cloudflare-web-analytics-alternative">
          Quantalog vs Cloudflare Web Analytics
        </A>
        .
      </P>

      <H2 id="self-hosted">Self-hosted, full data ownership</H2>
      <P>
        Pick one of these when the database has to live on your own
        infrastructure and you are willing to run it.
      </P>

      <H3 id="matomo">Matomo</H3>
      <P>
        The most complete open-source analytics suite there is — heatmaps,
        session recording, A/B testing and tag management under one roof. That
        breadth is also the reason teams look elsewhere: it is a lot to run and
        keep upgraded. A hosted Cloud plan exists.{" "}
        <A href="/compare/matomo-alternative">Quantalog vs Matomo</A>.
      </P>

      <H3 id="umami">Umami</H3>
      <P>
        MIT-licensed, lightweight, cookieless, well-liked. Needs a Node host and
        a Postgres or MySQL database, or pay Umami Cloud to host it.{" "}
        <A href="/compare/umami-alternative">Quantalog vs Umami</A>.
      </P>

      <H2 id="product-analytics">Product analytics platforms</H2>
      <H3 id="posthog">PostHog</H3>
      <P>
        Session replay, feature flags, experiments and a SQL data warehouse
        alongside the analytics. The right choice if you use those; more than
        you need if you adopted it for pageviews and funnels. It sets cookies by
        default, so a consent banner generally applies.{" "}
        <A href="/compare/posthog-alternative">Quantalog vs PostHog</A>.
      </P>

      <H2 id="choosing">How to choose in one paragraph</H2>
      <P>
        If the banner is the problem and you want more than a counter, look at
        Quantalog. If you want the simplest possible dashboard, Plausible or
        Fathom. If your site is already on Cloudflare and pageviews are enough,
        their free tool. If the data must be on your servers, Matomo or Umami.
        If you need replay and experiments, PostHog. Whatever you pick, run it
        alongside GA4 for one full reporting cycle before you switch anything
        off — the numbers will not match, and you need to know by how much.
      </P>

      <Callout>
        Migrating specifically off GA4?{" "}
        <A href="/blog/migrating-from-google-analytics-4">
          The migration guide
        </A>{" "}
        covers what happens to your history and the order to do it in.
      </Callout>
    </>
  );
}

export const bestGoogleAnalyticsAlternatives: Post = {
  slug: "best-google-analytics-alternatives",
  title: "The Google Analytics alternatives worth considering",
  description:
    "Cookieless, self-hosted and product-analytics options compared honestly — which fits which team, and the one migration rule that applies to all of them.",
  date: "2026-08-29",
  tags: ["Analytics", "Google Analytics", "Comparison"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 8,
  Body,
};
