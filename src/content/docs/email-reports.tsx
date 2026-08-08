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
        Open <b>Reports</b> in the sidebar and choose <b>New report</b>.
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

      <H2 id="channels">Email and WhatsApp</H2>
      <P>
        A report can go out by email, by WhatsApp, or both. They carry the same
        numbers in the form each medium suits:
      </P>
      <Ul>
        <Li>
          <b>Email</b> — the full summary, the SEO table, and the spreadsheet
          attached.
        </Li>
        <Li>
          <b>WhatsApp</b> — headline numbers, the top three SEO movers, and the
          dashboard link. No attachment: a spreadsheet in a chat thread is
          rarely opened.
        </Li>
      </Ul>
      <P>
        WhatsApp reports are delivered to <b>your own mobile number</b>, taken
        from your profile — add it under Settings before turning the channel on.
        To share a report with a client or colleague, add their email address
        instead.
      </P>
      <Callout>
        WhatsApp delivery is deliberately limited to your own number. Messages
        send from a shared platform number, and a chat has nowhere to put an
        unsubscribe link — so a report arriving on a client&apos;s phone would
        come from an unfamiliar sender they couldn&apos;t opt out of. Email is the
        channel built for sharing, and it carries the spreadsheet too.
      </Callout>

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
          <b>AI summary</b> — a short plain-language read of the period at the
          top of the email. See <a href="#ai-summary">below</a>.
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

      <H2 id="ai-summary">The AI summary</H2>
      <P>
        Above the numbers, each report opens with two or three sentences in plain
        language: what changed over the period, the most likely reason for it,
        and one thing worth doing about it. It exists because a table of figures
        tells you <i>what</i> happened and leaves the <i>why</i> as homework —
        and most people reading a forwarded report never get that far.
      </P>
      <P>A real example, from a week where a link did well:</P>
      <Callout>
        Your visitor count increased significantly this week, likely driven by a
        surge in traffic from Reddit. However, this new audience appears to be
        less engaged, as evidenced by your rising bounce rate and shorter session
        durations.
        <br />
        <br />
        <b>Worth doing:</b> Review the mobile experience for your pricing page to
        ensure it is optimised for the high volume of mobile users arriving from
        social referrals.
      </Callout>
      <P>
        It is written by a language model reading the same figures you can see in
        the email, and it is labelled <b>AI summary</b> wherever it appears. That
        label is deliberate: the paragraph draws conclusions about cause, and a
        conclusion drawn from traffic data can be wrong. Treat it as a starting
        point for a look at the dashboard, not as a finding.
      </P>
      <Ul>
        <Li>
          <b>It only uses your own figures.</b> The model sees the same headline
          numbers and breakdowns that appear in the report, and nothing else — no
          data from other workspaces, and nothing from outside Quantalog.
        </Li>
        <Li>
          <b>It stays quiet when the data is thin.</b> Below about thirty
          visitors in the period, every percentage swing is noise, so the summary
          is left out rather than inventing a story about a handful of visits.
        </Li>
        <Li>
          <b>It says so when nothing happened.</b> A quiet week gets one sentence
          saying exactly that, with no recommendation attached.
        </Li>
        <Li>
          <b>It never delays your report.</b> If the summary can&apos;t be
          written, the report goes out on time without it.
        </Li>
      </Ul>
      <P>
        The summary is on by default and needs the analytics section switched on,
        since it&apos;s written from those figures. Turn it off per report with
        the <b>AI summary</b> checkbox under <b>What to include</b> — worth doing
        if you send reports to clients under your own name and would rather write
        the commentary yourself.
      </P>
      <P>
        It doesn&apos;t count against your Orbit AI question allowance. A report
        you scheduled shouldn&apos;t spend the questions you were going to ask.
      </P>

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
  title: "Reports",
  description:
    "Send analytics and SEO summaries on a schedule by email or WhatsApp, opening with a plain-language AI read of the period.",
  category: "Tracking",
  order: 14,
  Body,
};
