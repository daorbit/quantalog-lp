import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Alerts</b> watches your sites around the clock and tells
        you when something changes that you would want to know about today,
        not at the end of the month. It is an official Quantalog app: it ships
        with every workspace, but stays off until a workspace admin turns it
        on.
      </P>

      <H2 id="enable">Turning Alerts on</H2>
      <P>
        Open <b>Apps</b>, find <b>Quantalog Alerts</b> in the{" "}
        <b>Quantalog apps</b> group and press <b>Enable</b>. Alerts then
        appears in the sidebar, and the first check runs within a few minutes.
      </P>

      <H2 id="rules">What it watches</H2>
      <Ul>
        <Li>
          <b>Traffic drop.</b> Pageviews in the last 24 hours fall below the
          same 24 hours a week earlier by your chosen percentage. Comparing
          against the same weekday keeps normal weekend dips from firing.
        </Li>
        <Li>
          <b>Tracking stopped.</b> A site sends no events at all for the number
          of hours you choose. This usually means the script was removed in a
          site update.
        </Li>
        <Li>
          <b>Traffic spike.</b> Pageviews rise above last week by your chosen
          percentage, so you can see what is working while it is happening.
        </Li>
        <Li>
          <b>Goal behind pace.</b> A goal is on course to miss its target by
          your chosen percentage. Checked once a third of the period has
          passed. Needs Quantalog Goals turned on.
        </Li>
        <Li>
          <b>Forms gone quiet.</b> Your lead capture forms receive no
          submissions for the number of days you choose.
        </Li>
      </Ul>
      <P>
        Very small sites are skipped for the traffic rules until there is
        enough traffic to compare, so a quiet test site does not raise false
        alarms.
      </P>

      <H2 id="channels">Where alerts go</H2>
      <P>
        Every alert appears in the notification bell. You can also send them
        by email to every editor and admin, to your linked Telegram chats, and
        to your verified WhatsApp numbers on the Pro plan. Telegram and
        WhatsApp are set up once in <b>Apps</b>. Press <b>Send a test</b> on
        the Alerts page to check each channel.
      </P>

      <H2 id="frequency">How often it checks</H2>
      <P>
        Starter and Pro workspaces are checked every hour. Free workspaces are
        checked every 6 hours.
      </P>
      <Callout>
        Each alert fires once when a problem starts and stays quiet until it
        clears, so a long outage is one message rather than one an hour.
      </Callout>
    </>
  );
}

export const quantalogAlerts: Doc = {
  slug: "quantalog-alerts",
  title: "Quantalog Alerts",
  description: "Get told about traffic drops, spikes, stopped tracking, goals behind pace and quiet forms.",
  category: "Tracking",
  order: 13.5,
  Body,
};
