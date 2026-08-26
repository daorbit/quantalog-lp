import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const parallel = `<!-- Run both for one full reporting cycle before you switch.
     Two trackers on one page is fine; they do not interfere. -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
<script defer src="https://analytics.example.com/tracker.js"
        data-site="abc123"></script>`;

const eventMapping = `// GA4: every interaction is an "event" with up to 25 parameters.
gtag("event", "purchase", {
  transaction_id: "T-1234",
  value: 49.0,
  currency: "USD",
  items: [{ item_id: "pro", item_name: "Pro plan" }],
});

// Most alternatives: a named goal plus a small, flat property bag.
// The nesting is what does not survive — flatten it deliberately
// rather than letting a migration tool guess.
track("purchase", {
  transactionId: "T-1234",
  valueCents: 4900,
  currency: "USD",
  plan: "pro",
});`;

const exportQuery = `-- If you have the BigQuery export, your raw events are already
-- outside GA4 and this is the only history that survives properly.
SELECT
  event_date,
  event_name,
  COUNT(*) AS events,
  COUNT(DISTINCT user_pseudo_id) AS visitors
FROM \`project.analytics_123456789.events_*\`
WHERE _TABLE_SUFFIX BETWEEN '20240101' AND '20241231'
GROUP BY event_date, event_name
ORDER BY event_date;`;

function Body() {
  return (
    <>
      <P>
        Most GA4 migration guides are written by the people you are migrating
        to, which makes them optimistic about how much of your setup transfers.
        This one is too — but the parts below that will cost you a weekend are
        marked as such, because discovering them mid-migration is worse than
        knowing up front.
      </P>

      <Callout>
        The single most important step: run both tools in parallel for at least
        one full reporting cycle before you turn anything off. Your new numbers
        will not match GA4, and you need to know by how much before you are
        relying on them.
      </Callout>

      <H2 id="expect-different-numbers">Your numbers will not match. That is normal.</H2>
      <P>
        Every migration produces a moment of alarm when the new tool reports
        fewer sessions than GA4 did, or more. Before you debug anything, know
        that an exact match is not achievable and not the goal — the two tools
        define their terms differently.
      </P>
      <Ul>
        <Li>
          <strong>Sessions.</strong> GA4 restarts a session after 30 minutes of
          inactivity by default, and also on a new campaign source mid-visit.
          Tools that do not do the campaign-restart part will report fewer
          sessions from identical traffic.
        </Li>
        <Li>
          <strong>Users.</strong> GA4 counts a cookie-backed identity that
          persists for months. A cookieless tool counts a daily-rotating hash,
          which means a person visiting on Monday and Thursday is two visitors,
          not one. Expect a higher user count and a lower &quot;returning&quot;
          rate.
        </Li>
        <Li>
          <strong>Bounce rate.</strong> GA4 does not have one in the classic
          sense — it reports engagement rate and derives the inverse. If your
          new tool uses the traditional definition, the two are not comparable
          at all.
        </Li>
        <Li>
          <strong>Sampling.</strong> GA4 samples large or complex reports.
          Alternatives generally do not. On a high-traffic site the new numbers
          may be more accurate while looking wrong.
        </Li>
      </Ul>
      <P>
        The useful check is not whether the totals match. It is whether the two
        tools agree on the <em>shape</em> — same top pages in the same order,
        same traffic sources in the same proportion, same daily rhythm. If the
        shape agrees and only the absolute numbers differ, your setup is fine.
      </P>

      <H2 id="history">Historical data does not come with you</H2>
      <P>
        Nothing exports your GA4 history into another tool in a form that tool
        can report on. This is the genuinely painful part and no vendor can fix
        it, because the underlying models differ too much for the transfer to
        mean anything.
      </P>
      <P>Three realistic options, in order of how much they preserve:</P>
      <Ul>
        <Li>
          <strong>BigQuery export, if you already have it.</strong> Raw
          event-level data you own outright, queryable forever. If you enabled
          this at any point, you have real history.
        </Li>
        <Li>
          <strong>Scheduled CSV exports of the reports you actually use.</strong>{" "}
          Not the whole property — the eight or ten reports anyone opens. This
          takes an afternoon and covers most of what people miss later.
        </Li>
        <Li>
          <strong>Screenshots of your annual summaries.</strong> Unserious
          sounding, entirely sufficient for the once-a-year question of what
          traffic looked like in 2024.
        </Li>
      </Ul>
      <Pre label="bigquery.sql">{exportQuery}</Pre>
      <P>
        Do this <em>before</em> you delete the property. Google retains GA4 data
        for a maximum of 14 months by default, and a deleted property is not
        recoverable.
      </P>

      <H2 id="events">Re-map the events by hand</H2>
      <P>
        GA4&apos;s event model — an event name plus up to 25 arbitrary
        parameters, with nested arrays for commerce — is more elaborate than
        most alternatives. Automatic conversion tends to produce a flattened
        mess of unused fields.
      </P>
      <Pre label="tracking.ts">{eventMapping}</Pre>
      <P>
        Take the opportunity. In practice most GA4 properties have accumulated
        dozens of events, of which perhaps six are ever looked at. List the ones
        that have informed a decision in the past year, port those, and leave
        the rest behind.
      </P>

      <H3 id="conversions">Conversions become goals</H3>
      <P>
        GA4 marks an existing event as a conversion. Most alternatives define a
        goal as a URL pattern or a named event. URL-based goals are usually
        simpler and less fragile — a thank-you page path does not change when
        someone refactors the frontend, whereas an event name in a click handler
        does.
      </P>

      <H2 id="parallel">Running both at once</H2>
      <P>
        Two analytics scripts on one page is not a problem. They do not share
        state, and the second one costs a few kilobytes. Keep the overlap long
        enough to cover a full business cycle including a weekend — a week
        minimum, a month if your traffic is seasonal.
      </P>
      <Pre label="layout.html">{parallel}</Pre>
      <P>
        During the overlap, check the shape agreement described above weekly. If
        a specific page or source disagrees badly between tools, that is worth
        investigating before you commit; a uniform offset across everything is
        not.
      </P>

      <H2 id="consent">What you can turn off afterwards</H2>
      <P>
        If you move to a cookieless tool, the consent banner GA4 required may no
        longer be necessary — and removing it typically recovers more measured
        traffic than the migration itself costs, because everyone who would have
        clicked &quot;reject&quot; is now counted.
      </P>
      <P>
        Confirm it applies to your full stack before removing anything: the
        banner covers every cookie on the site, not just the analytics one. If
        you still run ad pixels or a session recorder, the banner stays. See{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>{" "}
        for the specifics.
      </P>

      <H2 id="checklist">The order to do it in</H2>
      <Ul>
        <Li>Export the history you care about, while the property still exists.</Li>
        <Li>List the events that have actually informed a decision.</Li>
        <Li>Install the new tracker alongside GA4. Change nothing else.</Li>
        <Li>Wait one full reporting cycle.</Li>
        <Li>Compare shape, not totals. Investigate disagreements per-page.</Li>
        <Li>Re-create the six goals that matter. Not all thirty.</Li>
        <Li>Point your dashboards and reports at the new source.</Li>
        <Li>Remove the GA4 tag. Keep the property read-only for a quarter.</Li>
        <Li>Only then, revisit the consent banner.</Li>
      </Ul>

      <Callout>
        <A href="/compare/google-analytics-alternative">
          Quantalog against Google Analytics
        </A>{" "}
        covers the feature-by-feature differences, and the{" "}
        <A href="/docs">docs</A> have the tracker install. Both tools can run
        side by side for as long as you want to compare them.
      </Callout>
    </>
  );
}

export const ga4Migration: Post = {
  slug: "migrating-from-google-analytics-4",
  title: "Migrating off Google Analytics 4 without losing the plot",
  description:
    "Why your new numbers will never match GA4, what happens to your history, and the order to run a migration in so you find the expensive surprises early.",
  date: "2026-08-18",
  tags: ["Analytics", "Migration", "Google Analytics"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 10,
  Body,
};
