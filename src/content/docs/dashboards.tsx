import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code, Pre, A } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A custom dashboard is a focused view built from the same widgets you see
        on Home and in Analytics, arranged the way you work. Keep one for the
        weekly leadership check-in, one per client, one for a launch — each with
        its own widgets, layout and date range.
      </P>

      <H2 id="creating">Creating a dashboard</H2>
      <P>
        Open <b>Dashboards</b> in the sidebar and choose how to start:
      </P>
      <Ul>
        <Li>
          <b>From a template</b> — twenty ready-made layouts grouped into
          Business, Marketing, Search, Content and Product. Preview one to see
          its widgets, name it, and it is ready.
        </Li>
        <Li>
          <b>Blank</b> — an empty canvas where you pick every widget yourself.
        </Li>
        <Li>
          <b>Build with Orbit</b> — describe the dashboard you want in plain
          words. Orbit drafts a layout in a full-page studio with a live preview
          and follow-up suggestions, and you keep refining it in conversation
          before you save.
        </Li>
      </Ul>
      <P>
        Templates include Executive summary, E-commerce, Agency client, SEO
        client report, Campaign performance, SaaS metrics, Product launch and
        more.
      </P>

      <H2 id="editing">Arranging widgets</H2>
      <Ul>
        <Li>
          <b>Add widgets</b> opens the picker. Everything on Home and in
          Analytics is available, including Google Search widgets and goal
          progress.
        </Li>
        <Li>
          <b>Edit layout</b> lets you drag any widget by its handle and set how
          many columns wide it is. Changes stay local until you hit{" "}
          <b>Save changes</b>, or throw them away with <b>Discard</b>.
        </Li>
        <Li>
          <b>Edit with Orbit</b> reopens the studio on an existing dashboard, so
          you can ask for changes like &ldquo;add a world map and drop the
          browsers panel&rdquo;.
        </Li>
        <Li>
          Rename a dashboard by clicking its title, and use the menu to{" "}
          <b>Duplicate</b> or <b>Delete</b> it.
        </Li>
      </Ul>

      <H2 id="range">Range and sites</H2>
      <P>
        Each dashboard remembers its own range — 24 hours, 7 days or 30 days.
        Editors who change the range save it for everyone in the workspace;
        viewers can switch it for themselves without changing the saved
        dashboard. Use the site filter to narrow every widget to one site or
        view all sites together.
      </P>
      <Callout>
        If a dashboard was saved with a range your plan does not include, it
        shows the last 24 hours instead and says so under the title.
      </Callout>

      <H2 id="search">Google Search widgets</H2>
      <P>
        Clicks, impressions, rankings, top queries and quick wins can sit beside
        your traffic on the same grid. They need a linked Search Console
        property — until one is connected, the dashboard shows a banner with
        the next step instead of empty panels. See{" "}
        <A href="/docs/search-visibility">Search visibility</A> for how to
        connect it.
      </P>

      <H2 id="embeds">Embedding a widget</H2>
      <P>
        An embed puts a single live chart or number on another website — your
        own site, a client portal or a Notion page. Open the <b>Embeds</b> tab
        on the Dashboards page, or use <b>Embed a widget</b> from any
        dashboard&apos;s menu.
      </P>
      <Ul>
        <Li>Pick a widget: headline numbers, the traffic chart, the world map, the hour-of-day heatmap, or any top list such as pages, referrers, countries, channels or campaigns.</Li>
        <Li>Choose the period (24h, 7d or 30d), a light, dark or automatic theme, and which sites it covers.</Li>
        <Li>Copy the code as an iframe, or as a script tag that resizes the widget to fit its content.</Li>
      </Ul>
      <Pre label="Script tag">{`<div data-quantalog-embed="YOUR_EMBED_TOKEN"></div>
<script async src="https://studio-quantalog.daorbit.in/embed.js"></script>`}</Pre>
      <P>
        Add one <Code>div</Code> per widget; the script only needs to load once
        per page. Embedded widgets refresh themselves every minute, and the
        Embeds tab counts how often each one has been viewed.
      </P>
      <Callout variant="warn">
        Anyone who can see the page you embed on can read that widget&apos;s
        numbers. Only the chosen widget&apos;s data is published — never your
        site keys, settings or other panels. Switch an embed off to stop it
        loading straight away.
      </Callout>

      <H2 id="limits">Plan limits</H2>
      <Ul>
        <Li><b>Free</b> — 1 custom dashboard, no embeds.</Li>
        <Li><b>Starter</b> — 10 dashboards and 5 embeds.</Li>
        <Li><b>Pro</b> — 50 dashboards and 100 embeds.</Li>
      </Ul>
      <P>
        Home and Analytics are always available and do not count towards the
        dashboard limit.
      </P>
    </>
  );
}

export const dashboards: Doc = {
  slug: "dashboards",
  title: "Dashboards & embeds",
  description:
    "Build focused dashboards from templates, a blank canvas or Orbit, and embed live widgets on any website.",
  category: "Tracking",
  order: 11.5,
  Body,
};
