import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A scheduled report emails your headline numbers, an SEO summary, and a
        spreadsheet of the detail — on a schedule you choose. It&apos;s built for
        the people who want the numbers but never log in: a client, a manager, a
        stakeholder who reads email and nothing else.
      </P>

      <H2 id="creating">Creating a report</H2>
      <P>
        Open <b>Email reports</b> in the sidebar and choose <b>New report</b>.
        Each report belongs to one workspace and covers either every site in it
        or a specific selection.
      </P>
      <Ul>
        <Li>
          <b>Name</b> — how you&apos;ll tell it apart from your other reports. It
          doesn&apos;t appear in the email.
        </Li>
        <Li>
          <b>How often</b> — daily, weekly, or monthly.
        </Li>
        <Li>
          <b>Sites</b> — leave empty to include every site in the workspace,
          including ones you add later.
        </Li>
      </Ul>

      <H2 id="schedule">When reports arrive</H2>
      <P>
        Reports are sent in the morning, UTC. What each one covers follows from
        its frequency:
      </P>
      <Ul>
        <Li>
          <b>Daily</b> — every morning, covering the previous 24 hours.
        </Li>
        <Li>
          <b>Weekly</b> — Monday mornings, covering the previous week.
        </Li>
        <Li>
          <b>Monthly</b> — the 1st of each month, covering the previous month.
        </Li>
      </Ul>
      <P>
        Daily is the most frequent option available. No report is ever sent more
        than once in a 24-hour period.
      </P>

      <H2 id="recipients">Who receives it</H2>
      <P>
        You always receive your own reports. Beyond that, add any address you
        like — recipients don&apos;t need a Quantalog account, and never see your
        dashboard unless you explicitly include a live link.
      </P>
      <P>
        Every email carries an unsubscribe link, and recipients can remove
        themselves without signing in. Someone who unsubscribes stays visible in
        your recipient list, marked as opted out, so a report that stopped
        arriving is never a mystery. Re-adding them by hand won&apos;t resubscribe
        them — that choice is theirs to reverse.
      </P>

      <Callout>
        How many reports you can schedule, and how many people each can reach,
        depends on your plan. Free includes one monthly report to your own
        address; paid plans add weekly and daily delivery and more recipients.
      </Callout>

      <H2 id="contents">What&apos;s in the email</H2>
      <P>Each section is optional, so a report can be as narrow as you want.</P>
      <Ul>
        <Li>
          <b>Analytics summary</b> — visitors, pageviews, sessions, bounce rate,
          average session, and pages per session, each with its change against
          the previous period.
        </Li>
        <Li>
          <b>SEO scores</b> — the latest score for each audited page, and how
          many points it moved since the last report.
        </Li>
        <Li>
          <b>Spreadsheet attachment</b> — an <Code>.xlsx</Code> file with the
          summary plus a sheet per breakdown: top pages, referrers, channels,
          countries, devices, browsers, goals, and SEO.
        </Li>
        <Li>
          <b>Live dashboard link</b> — a button opening your public dashboard.
        </Li>
      </Ul>

      <Callout>
        The live dashboard link requires your public dashboard to be switched on,
        which makes that workspace&apos;s analytics readable by anyone holding the
        link. Until it&apos;s enabled, reports simply go out without a link rather
        than publishing anything on your behalf.
      </Callout>

      <H2 id="testing">Testing before it goes out</H2>
      <P>
        The send icon on any report mails a copy to you immediately, marked as a
        test. It&apos;s built from exactly the same data and template as the real
        thing, so what you see is what your recipients will get. Test sends go
        only to you — never to the rest of the list.
      </P>

      <H2 id="pausing">Pausing and deleting</H2>
      <P>
        Switching a report to inactive keeps every setting and recipient but
        stops delivery, which is the right move for a client project on hold.
        Deleting removes the schedule and its recipient list for good.
      </P>
      <P>
        If a send fails — a mail server rejecting an address, most often — the
        report shows a warning icon with the reason, and tries again on its next
        scheduled run rather than retrying immediately.
      </P>
    </>
  );
}

export const emailReports: Doc = {
  slug: "email-reports",
  title: "Scheduled email reports",
  description:
    "Email analytics and SEO summaries on a schedule, with a spreadsheet attachment, to anyone you choose.",
  category: "Tracking",
  order: 14,
  Body,
};
