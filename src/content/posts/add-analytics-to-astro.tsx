import type { Post } from "@/lib/blog";
import { A, Callout, H2, H3, P, Pre } from "@/components/prose";
import { site } from "@/lib/site";

const layout = `---
// src/layouts/Base.astro
---
<html lang="en">
  <head>
    <slot name="head" />
  </head>
  <body>
    <slot />
    <script
      is:inline
      src="${site.api}/tracker.js"
      data-site="YOUR_SITE_KEY"
    ></script>
  </body>
</html>`;

const viewTransitions = `---
// With <ClientRouter /> (Astro's view transitions)
import { ClientRouter } from "astro:transitions";
---
<head>
  <ClientRouter />
</head>
<!-- The tracker hooks pushState, which astro:transitions uses,
     so navigations are counted. If you want to be explicit: -->
<script>
  document.addEventListener("astro:page-load", () => {
    window.quantalog?.("pageview");
  });
</script>`;

const goal = `<button id="cta">Start free</button>
<script>
  document.getElementById("cta")?.addEventListener("click", () => {
    window.quantalog?.("cta_clicked");
  });
</script>`;

function Body() {
  return (
    <>
      <P>
        Astro ships almost no JavaScript by default, so an analytics tag is
        often the only script on the page. Keep it that way: one inline tag in
        your base layout, cookieless, no consent banner.
      </P>

      <H2 id="the-tag">The tag</H2>
      <P>
        Put it at the end of <code>&lt;body&gt;</code> in whatever layout every
        page shares. Use <code>is:inline</code> so Astro does not try to bundle
        or process it — you want the tag emitted exactly as written.
      </P>
      <Pre label="src/layouts/Base.astro">{layout}</Pre>
      <P>
        For a fully static Astro site with no client-side routing, that is the
        entire integration. Every page is a real document load and gets counted.
      </P>

      <H2 id="view-transitions">If you use view transitions</H2>
      <P>
        With <code>&lt;ClientRouter /&gt;</code> (formerly{" "}
        <code>&lt;ViewTransitions /&gt;</code>) Astro swaps page content without
        a full reload, the same problem an SPA has. The tracker hooks{" "}
        <code>pushState</code>, which the router uses, so navigations are counted
        automatically. If you would rather be explicit, hook{" "}
        <code>astro:page-load</code>:
      </P>
      <Pre label="src/layouts/Base.astro">{viewTransitions}</Pre>
      <P>
        Do not add both the automatic and the manual call for the same
        navigation or you will double-count. Pick one.
      </P>

      <H2 id="events">Custom events</H2>
      <P>
        Astro islands and inline scripts both reach the same global. Guard it
        with optional chaining so a click before the tracker loads is a no-op.
      </P>
      <Pre label="src/components/Cta.astro">{goal}</Pre>

      <H3 id="no-banner">No consent banner</H3>
      <P>
        No cookies, no browser storage, nothing to disclose for the analytics
        tag. A banner is only back on the table if you add something that does
        set cookies. See{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>
        .
      </P>

      <Callout>
        <A href="/docs">The docs</A> have the script options, and{" "}
        <A href="/seo-audits">the SEO audit tool</A> pairs well with a static
        Astro site — run Lighthouse against the pages you just deployed.
      </Callout>
    </>
  );
}

export const addAnalyticsToAstro: Post = {
  slug: "add-analytics-to-astro",
  title: "Add cookieless analytics to an Astro site",
  description:
    "One inline tag in your base layout, what to do about view transitions, and how to fire events from an island — keeping Astro's near-zero JavaScript promise intact.",
  date: "2026-08-25",
  tags: ["Analytics", "Astro", "Guide"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 4,
  Body,
};
