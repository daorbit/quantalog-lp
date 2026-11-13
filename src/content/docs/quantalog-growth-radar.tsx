import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Growth Radar</b> looks across your website analytics, lead
        capture forms, bookings and Google Search data, and lists the changes
        that deserve your attention. Every finding shows the numbers behind it,
        explains why it matters, suggests what to check next and says how far
        to trust it. When you act on one, Growth Radar measures the same number
        again afterwards. It is free on every plan and stays off until a
        workspace admin turns it on.
      </P>

      <H2 id="enable">Turning Growth Radar on</H2>
      <P>
        Open <b>Apps</b>, find <b>Quantalog Growth Radar</b> in the{" "}
        <b>Quantalog apps</b> group and press <b>Enable</b>. Growth Radar then
        appears in the sidebar. The first scan runs when you open it, and after
        that every morning at 06:00 UTC.
      </P>

      <H2 id="sources">Where the data comes from</H2>
      <Ul>
        <Li>
          <b>Website analytics</b>: sessions, and the pages sessions start on.
        </Li>
        <Li>
          <b>Lead capture</b>: form views, responses, and the page each lead
          landed on.
        </Li>
        <Li>
          <b>Bookings</b>: forms with a booking field, and how many bookings
          they take.
        </Li>
        <Li>
          <b>Google Search Console</b>: impressions, clicks and click-through,
          once it is connected and linked to a site.
        </Li>
      </Ul>
      <P>
        The Overview shows each source and when its data was last updated. A
        check only runs when the sources it needs are connected and current, so
        missing data is never read as a zero.
      </P>

      <H2 id="checks">What it checks</H2>
      <Ul>
        <Li>
          <b>Traffic without enquiries.</b> Sessions rose week on week, but
          leads did not rise with them. Compares the last two complete weeks.
        </Li>
        <Li>
          <b>Pages with weak lead conversion.</b> A landing page with plenty of
          sessions brings far fewer leads than your site average over 28 days.
          Needs most leads to record the page they came from.
        </Li>
        <Li>
          <b>Form submission rate drops.</b> A form turns fewer views into
          responses than in the 30 days before.
        </Li>
        <Li>
          <b>More impressions, lower click-through.</b> You appear in more
          Google searches, but a smaller share of searchers click.
        </Li>
        <Li>
          <b>Booking drops.</b> A booking form takes fewer bookings while the
          number of people opening it stays steady.
        </Li>
      </Ul>
      <P>
        Each check has a minimum amount of data before it says anything, and a
        threshold you can change under <b>Settings</b>. Lower thresholds find
        more, with more false alarms.
      </P>

      <H2 id="priority">How findings are ranked</H2>
      <P>
        Each finding is rated High, Medium or Low priority from three plain
        factors: <b>impact</b> (how much is at stake), <b>confidence</b> (how
        much data backs it) and <b>urgency</b> (how recent and sharp the change
        is). A rough <b>effort</b> rating sits beside them. Open a finding to
        read the reason behind every rating.
      </P>

      <H2 id="acting">Acting on a finding</H2>
      <Ul>
        <Li>Mark it as planned, start investigating, or mark it as resolved.</Li>
        <Li>Pick an owner from the workspace members.</Li>
        <Li>Add notes for the team.</Li>
        <Li>Snooze it until a date, or dismiss it with a reason.</Li>
        <Li>Turn it into a task when Quantalog Tasks is on.</Li>
      </Ul>
      <P>
        A finding that stops showing up is marked as no longer detected, and
        is archived after 14 days. A resolved finding that comes back reopens
        on its own.
      </P>

      <H2 id="outcomes">Did it help?</H2>
      <P>
        Press <b>Record what you changed</b> on a finding, describe the change
        and when it went live. Growth Radar keeps the current value of the
        finding&apos;s main measure, and once a full period has passed after
        your change it shows the value before and after.
      </P>
      <Callout>
        The result is an observed change, not proof that your change caused it.
        Note anything else that changed at the same time, such as a campaign or
        a holiday, so the result is read fairly.
      </Callout>

      <H2 id="orbit">Plain-language summaries</H2>
      <P>
        Orbit can rewrite each finding in two sentences. It only sees the
        finding&apos;s own numbers, never names or answers from your forms, and
        any summary that adds a number or a cause is thrown away. You can turn
        this off under <b>Settings</b> to keep the rule-based wording.
      </P>

      <H2 id="plans">Plans</H2>
      <P>
        Growth Radar is free on every plan. Starter and Pro can also press{" "}
        <b>Scan now</b> up to three times an hour, and keep 180 days (Starter)
        or a year (Pro) of history. Free keeps 30 days.
      </P>
    </>
  );
}

export const quantalogGrowthRadar: Doc = {
  slug: "quantalog-growth-radar",
  title: "Quantalog Growth Radar",
  description: "Find what deserves attention across analytics, forms, bookings and search, see the evidence, and track whether the fix helped.",
  category: "Tracking",
  order: 13.47,
  Body,
};
