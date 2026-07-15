import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, A, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        Quantalog is privacy-first web analytics with a real-time dashboard and a
        multi-tenant API. You can use it two ways: track your own sites from the
        dashboard, or embed analytics into your own product and offer it to your
        users — the way Vercel and Lovable do.
      </P>

      <H2 id="how-it-works">How it works</H2>
      <Ul>
        <Li>
          <b>Workspace</b> — your organisation. It owns your sites, your team, and
          your API keys.
        </Li>
        <Li>
          <b>Site</b> — a tracked property. Each site has a public{" "}
          <Code>siteId</Code> that the tracker script reports against.
        </Li>
        <Li>
          <b>Events</b> — pageviews, engagement, clicks, and custom events, sent by
          the tracking script embedded on your site.
        </Li>
      </Ul>

      <H2 id="quickstart">Quickstart</H2>
      <P>
        Sign up, create a site, and paste one script tag into your{" "}
        <Code>&lt;head&gt;</Code>. Real-time numbers appear within seconds.
      </P>
      <Pre label="index.html">{`<script async
  src="${site.api}/tracker.js"
  data-site="YOUR_SITE_ID"></script>`}</Pre>

      <Callout>
        The tracker is under 1&nbsp;KB, sets no cookies, and reports SPA route
        changes automatically. No consent banner required.
      </Callout>

      <H2 id="next">Where to next</H2>
      <Ul>
        <Li>
          <A href="/docs/tracking">Install the tracker</A> — HTML, React, Next.js
          and Vue.
        </Li>
        <Li>
          <A href="/docs/custom-events">Custom events</A> — track signups,
          purchases, and conversions.
        </Li>
        <Li>
          <A href="/docs/platform-api">Platform API</A> — embed analytics into your
          own product.
        </Li>
      </Ul>
    </>
  );
}

export const overview: Doc = {
  slug: "overview",
  title: "Overview",
  description:
    "What Quantalog is, the core concepts, and a 60-second quickstart.",
  category: "Getting started",
  order: 1,
  Body,
};
