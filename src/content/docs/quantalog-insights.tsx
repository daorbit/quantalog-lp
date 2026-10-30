import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Insights</b> tells you what changed on your sites this
        week and why it matters, so you don&apos;t have to dig through charts
        to find it. It is an official Quantalog app: it ships with every
        workspace and stays off until a workspace admin turns it on.
      </P>

      <H2 id="enable">Turning Insights on</H2>
      <P>
        Open <b>Apps</b>, find <b>Quantalog Insights</b> in the{" "}
        <b>Quantalog apps</b> group and press <b>Enable</b>. Insights appears
        in the sidebar, and the first week is ready within a few minutes of
        opening it.
      </P>

      <H2 id="what">What it looks for</H2>
      <P>
        Every Monday, Insights compares the last 7 days with the 7 before and
        keeps only what moved enough to matter:
      </P>
      <Ul>
        <Li>Visitors rising or falling by a fifth or more.</Li>
        <Li>New sites sending you traffic, and sources sending much more or less than before.</Li>
        <Li>Pages taking off or slipping.</Li>
        <Li>Visitors from new countries, and big swings from existing ones.</Li>
        <Li>New campaign sources from your UTM links.</Li>
        <Li>More or fewer visitors leaving after one page, and shifts towards mobile.</Li>
      </Ul>
      <P>
        Each change shows this week against last, and Orbit writes a
        two-sentence read on the week at the top. Very small sites are skipped
        until there is enough traffic to compare.
      </P>

      <H2 id="act">Acting on an insight</H2>
      <P>
        Press <b>View in analytics</b> to open the matching report already
        filtered, or <b>Create task</b> to add it to{" "}
        <a href="/docs/quantalog-tasks">Quantalog Tasks</a> with a link back to
        the data.
      </P>
      <Callout>
        You get a notice in the bell when a new week is ready. Starter and Pro
        workspaces can also press <b>Refresh</b> to update the current week on
        demand.
      </Callout>

      <H2 id="history">History</H2>
      <P>
        Use the arrows next to the week&apos;s dates to step back through
        earlier weeks. Free workspaces keep 4 weeks, Starter 12 and Pro a full
        year.
      </P>
    </>
  );
}

export const quantalogInsights: Doc = {
  slug: "quantalog-insights",
  title: "Quantalog Insights",
  description: "Turn on the Insights app for a weekly feed of what changed on your sites, with Orbit's summary.",
  category: "Tracking",
  order: 13.46,
  Body,
};
