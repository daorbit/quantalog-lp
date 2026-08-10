import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Every number on the dashboard carries a change figure beside it. Comparison
        mode decides what that change is measured against — the period just before,
        the same dates a year ago, or any period you pick.
      </P>

      <H2 id="baselines">Choosing a baseline</H2>
      <P>
        The compare control sits next to the date range. Three options:
      </P>
      <Ul>
        <Li>
          <b>Prev</b> — the period immediately before the one you are viewing. Viewing
          the last 7 days compares against the 7 days before that. This is the default.
        </Li>
        <Li>
          <b>YoY</b> — the same window one year earlier. The right choice for anything
          seasonal, where last week is a worse guide than last year.
        </Li>
        <Li>
          <b>Custom</b> — pick a start date and the baseline runs from there for the
          same length as your current range.
        </Li>
      </Ul>
      <Callout>
        A custom baseline takes only a start date on purpose. The length always
        matches the range you are viewing, so both periods stay the same size —
        comparing 7 days against 30 would report a 70% drop that describes the
        picker rather than your traffic.
      </Callout>

      <H2 id="chart">On the chart</H2>
      <P>
        Picking any baseline other than <b>Prev</b> draws it on the traffic chart as a
        dashed line behind the current period, aligned bucket for bucket. The baseline
        keeps its own dates in the tooltip, so you can see which day you are comparing
        against.
      </P>

      <H2 id="breakdowns">Comparing breakdowns</H2>
      <P>
        Breakdown cards — top pages, referrers, browsers, countries, UTM sources and
        the rest — have a compare toggle in their header. Turning it on replaces the
        percentage-of-total column with each row&apos;s movement against the baseline.
      </P>
      <Ul>
        <Li>
          Rows that did not exist in the baseline are marked <Code>new</Code> rather
          than shown as an infinite increase.
        </Li>
        <Li>
          Rows that existed in the baseline but have no traffic now still appear, at
          zero — usually the most useful row on the card, and the one a
          current-period-only ranking hides.
        </Li>
        <Li>
          Hover a change figure to see the raw baseline count behind it.
        </Li>
      </Ul>

      <H2 id="api">Over the API</H2>
      <P>
        The stats endpoints accept a <Code>compare</Code> parameter, optionally with{" "}
        <Code>compareFrom</Code> for a custom baseline:
      </P>
      <Callout>
        <Code>
          GET /v1/sites/:siteId/stats?range=30d&amp;compare=yoy
        </Code>
      </Callout>
      <P>
        The response gains a <Code>comparison</Code> object holding the baseline&apos;s
        own totals and its resolved bounds, alongside the existing{" "}
        <Code>deltas</Code> percentages.
      </P>

      <H2 id="plans">Plan availability</H2>
      <P>
        Comparison against the previous period is included on every plan, including
        Free. Custom baselines are available from Starter, and year-over-year
        comparison on Pro — a year-ago baseline needs a year of history behind it to
        say anything.
      </P>
    </>
  );
}

export const comparisons: Doc = {
  slug: "comparisons",
  title: "Comparing periods",
  description:
    "Measure every metric against the previous period, the same dates last year, or any baseline you pick — on the chart and inside each breakdown.",
  category: "Tracking",
  order: 4.5,
  Body,
};
