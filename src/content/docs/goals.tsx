import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, A } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Goals are monthly or quarterly targets that track themselves — 50,000
        visitors this month, 500 signups this quarter, an average Google
        position under 5. Set the number once and Quantalog keeps score, shows
        whether you are on pace, and flags a miss before the period is over.
      </P>
      <Callout>
        Goals are different from{" "}
        <A href="/docs/conversions">conversion goals</A>. A conversion goal
        defines <i>what</i> counts as a conversion; a goal sets <i>how many</i>{" "}
        you are aiming for in a month or quarter.
      </Callout>

      <H2 id="creating">Setting a goal</H2>
      <P>
        Open <b>Goals</b> in the sidebar and choose <b>New goal</b>. Pick what
        you are measuring:
      </P>
      <Ul>
        <Li><b>Visitors</b> — unique people across your sites.</Li>
        <Li><b>Pageviews</b> — every page loaded.</Li>
        <Li><b>Sessions</b> — distinct visits.</Li>
        <Li><b>Conversions</b> — people who hit one of your conversion goals. You choose which one.</Li>
        <Li><b>Form submissions</b> — responses to your lead-capture forms.</Li>
        <Li><b>Average position</b> — where you rank on Google, where lower is better.</Li>
      </Ul>
      <P>
        Then set the target, choose <b>Monthly</b> or <b>Quarterly</b>, and —
        if the workspace has more than one site — whether it counts one site or
        all of them. Quantalog suggests a name such as &ldquo;10k visitors this
        month&rdquo;; change it to anything you like.
      </P>

      <H2 id="periods">Periods</H2>
      <P>
        Months and quarters follow the calendar in UTC. A quarterly goal set in
        February counts from 1 January to 31 March. When a period ends, every
        goal starts fresh on the next one automatically — there is nothing to
        reset.
      </P>

      <H2 id="pace">Pace and status</H2>
      <P>
        Each goal card shows a progress ring, the current count against the
        target, the days left, and a pace line comparing where you are with
        where you would be on a straight line to the target.
      </P>
      <Ul>
        <Li><b>Achieved</b> — the target is reached, with the days to spare.</Li>
        <Li><b>On track</b> — at the current rate you will hit it by the end of the period.</Li>
        <Li><b>Behind pace</b> — at the current rate you will fall short. The card says by how much.</Li>
        <Li><b>In progress</b> — used for average position, which climbs towards the target rather than adding up.</Li>
        <Li><b>Needs setup</b> — something is missing, such as a site, a conversion goal or a Search Console link. The card says what.</Li>
      </Ul>
      <P>
        The projection is the current count scaled to the full period. It
        stays hidden for the first few percent of a period, so one busy morning
        on the 1st does not promise a record month.
      </P>

      <H2 id="position">Average position goals</H2>
      <P>
        Position is read from Search Console over the last 28 days and counts
        as hit once it drops to your target or below. It needs a linked Search
        Console property with impressions in that window — see{" "}
        <A href="/docs/search-visibility">Search visibility</A>.
      </P>

      <H2 id="dashboards">Goals on dashboards</H2>
      <P>
        Add the <b>Goal progress</b> widget to any{" "}
        <A href="/docs/dashboards">custom dashboard</A> to see every target
        beside your traffic. Several templates, including Executive summary and
        Monthly board report, include it already.
      </P>

      <H2 id="limits">Plan limits</H2>
      <Ul>
        <Li><b>Free</b> — 2 goals.</Li>
        <Li><b>Starter</b> — 10 goals.</Li>
        <Li><b>Pro</b> — 30 goals.</Li>
      </Ul>
      <Callout variant="tip">
        Goal numbers refresh every minute. Editors and owners can create, edit
        and delete goals; viewers see them read-only.
      </Callout>
    </>
  );
}

export const goals: Doc = {
  slug: "goals",
  title: "Goals & targets",
  description:
    "Set monthly and quarterly targets for traffic, conversions, form submissions or Google position, and track pace automatically.",
  category: "Tracking",
  order: 8.5,
  Body,
};
