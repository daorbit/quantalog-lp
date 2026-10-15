import { A, Callout, Code, H2, H3, Li, P, Ul } from "@/components/prose";
import { site } from "@/lib/site";

const USER_DATA_POLICY = "https://developers.google.com/terms/api-services-user-data-policy";
const GOOGLE_PERMISSIONS = "https://myaccount.google.com/connections";

export function GoogleDataSection() {
  return (
    <>
      <H2 id="google-user-data">8. Google API Services and Google Calendar data</H2>
      <P>
        Some features let you connect a Google account. Each connection is optional, is started by
        you, and is used only for the feature you connected it for. This section explains what we
        access from Google, why, how long we keep it and how to remove it.
      </P>
      <Callout title="Limited Use">
        {site.name}&apos;s use and transfer to any other app of information received from Google
        APIs will adhere to the{" "}
        <A href={USER_DATA_POLICY}>Google API Services User Data Policy</A>, including the Limited Use
        requirements. Google user data is used only to provide and improve the user-facing features
        described below, as permitted by that policy and by your consent.
      </Callout>

      <H3 id="google-calendar">Google Calendar for booking forms</H3>
      <P>
        A {site.name} form can include a booking field that lets the people filling it in pick a
        time with you. A member of your workspace can connect a Google Calendar under{" "}
        <b>Lead capture → Apps → Google Calendar</b>. The connection belongs to that workspace, and
        every booking field in it can use it. Booking forms work without it; connecting is optional.
      </P>

      <H3 id="google-calendar-permissions">What we access and why</H3>
      <P>When you connect, Google asks you to allow the following. Each permission maps to one feature:</P>
      <Ul>
        <Li>
          <b>Your email address</b> (<Code>openid</Code>, <Code>email</Code>) — to show which Google
          account is connected to the workspace.
        </Li>
        <Li>
          <b>The list of your calendars</b> (<Code>calendar.calendarlist.readonly</Code>) — calendar
          names, ids, which one is primary and whether you can add events to it, so you can choose
          where bookings go and which calendars to check for conflicts.
        </Li>
        <Li>
          <b>Availability on your calendars</b> (<Code>calendar.events.freebusy</Code>) — only the
          start and end of busy periods on the calendars you choose. We never receive event titles,
          descriptions, guests or locations through this permission.
        </Li>
        <Li>
          <b>Events on your calendars</b> (<Code>calendar.events</Code>) — to create an event for each
          confirmed booking in the calendar you pick, with a Google Meet link if you turn that on, and
          to delete that event when you delete the entry. We do not read, change or delete any event
          that {site.name} did not create.
        </Li>
      </Ul>
      <P>
        Workspaces that connected before October 2026 granted the broader{" "}
        <Code>calendar.readonly</Code> permission instead of the calendar list and availability
        permissions. We use it only for the same two purposes. Disconnecting and connecting again
        replaces it with the narrower permissions above.
      </P>

      <H3 id="google-calendar-features">How the Calendar features work</H3>
      <Ul>
        <Li>
          <b>Availability.</b> When someone opens a booking form, our server asks Google for busy
          periods on the calendars you chose, for the dates being shown, and hides any time that
          overlaps. Respondents see only the open times, never your events or why a time is taken.
          Busy periods are held in server memory for at most 30 seconds so the same request is not
          repeated, are checked again just before a booking is confirmed, and are never written to
          our database.
        </Li>
        <Li>
          <b>Event creation.</b> When a booking is confirmed, we create an event in the calendar you
          picked. Its title and description come from your booking settings and include the
          respondent&apos;s answers. If the form has an email field, the respondent is added as a
          guest and Google sends them the invitation.
        </Li>
        <Li>
          <b>Google Meet links.</b> If <b>Add a Google Meet link</b> is on, Google creates a Meet
          conference for the event. We show the Meet link on the thank-you screen, in notification
          emails and in the entry.
        </Li>
        <Li>
          <b>Synchronisation.</b> Sync is one-way. We add and remove only the events we create. We do
          not import your events or watch your calendars for changes. Deleting an entry in{" "}
          {site.name} deletes its event, and Google notifies the guests.
        </Li>
      </Ul>

      <H3 id="google-calendar-storage">What we store, where and for how long</H3>
      <P>
        Google Calendar data is stored in our database, hosted on MongoDB Atlas. We keep only the
        following:
      </P>
      <Ul>
        <Li>
          <b>The connection</b> — the Google account&apos;s email address, the access and refresh
          tokens (encrypted), when the access token expires, the permissions granted, which member
          connected it and whether it is active. It is kept until you disconnect, the workspace is
          deleted or your account is closed. If Google tells us access was revoked, we delete both
          tokens straight away and keep only the email address and an &ldquo;expired&rdquo; status, so
          the dashboard can ask you to reconnect. That remaining record is deleted when you remove the
          connection or delete the workspace.
        </Li>
        <Li>
          <b>Booking settings</b> — the ids of the calendars you chose, saved in the form.
        </Li>
        <Li>
          <b>Each booking we add to Google Calendar</b> — the calendar id and event id, so we can
          remove the event later, and the Meet link and event link, saved with the entry. These are
          kept as long as the entry is, which is until you delete it, the form or the workspace.
        </Li>
      </Ul>
      <P>
        We do not store the contents of your calendar events, your busy periods or your list of
        calendars. The list is fetched from Google each time you open the settings that show it.
      </P>

      <H3 id="google-calendar-sharing">Who can see it and whether it is shared</H3>
      <Ul>
        <Li>
          The connected email address and your calendar names are visible to members of the
          workspace in Apps and in the booking field settings.
        </Li>
        <Li>
          The respondent sees the booked time and, if enabled, the Meet link. Notification emails
          containing the booking and Meet link are sent through our email delivery providers.
        </Li>
        <Li>
          Our hosting providers (MongoDB Atlas and Vercel) store and process the data on our behalf.
          We may also disclose it where the law requires.
        </Li>
      </Ul>
      <P>
        We do not sell Google user data, use it for advertising or to build profiles, or transfer it
        to data brokers. We do not use it to develop, improve or train generalised AI or machine
        learning models, and it is not sent to Orbit or any other AI feature. Our staff do not read
        it, except with your explicit permission for a support request, where it is necessary for
        security purposes such as investigating abuse, or to comply with the law.
      </P>

      <H3 id="google-security">How Google data is protected</H3>
      <Ul>
        <Li>
          Access and refresh tokens are encrypted at rest with AES-256-GCM. The key is kept in our
          server environment, separate from the database.
        </Li>
        <Li>
          Tokens stay on our servers. They are never sent to your browser, placed in a URL or written
          to our logs, and they are left out of database reads unless a request to Google needs them.
        </Li>
        <Li>
          Requests to Google go directly from our servers over TLS. Each connection attempt carries a
          signed state value that expires after 10 minutes and ties the result to your workspace.
        </Li>
        <Li>Access to production systems is limited to the people who need it.</Li>
      </Ul>

      <H3 id="google-disconnect">Disconnecting and revoking access</H3>
      <Ul>
        <Li>
          <b>In {site.name}:</b> open <b>Lead capture → Apps → Google Calendar</b> and choose{" "}
          <b>Disconnect</b>. We ask Google to revoke the token, then delete the stored tokens and the
          connection record immediately.
        </Li>
        <Li>
          <b>In your Google Account:</b> remove {site.name} under{" "}
          <A href={GOOGLE_PERMISSIONS}>Third-party apps &amp; services</A>. The next time we try to
          use the connection, Google refuses it, we delete the tokens and the dashboard shows the
          connection as expired.
        </Li>
      </Ul>
      <P>
        After you disconnect, we no longer access your Google Calendar. Busy-time checks and new
        events stop, and booking forms keep working using only the weekly hours you set. Events we
        already created stay in your Google Calendar, where you control them. The event ids, Meet
        links and event links saved with existing entries stay until you delete those entries.
        Deleting an entry after disconnecting no longer removes its Google event, so delete it in
        Google Calendar yourself.
      </P>

      <H3 id="google-deletion">Deleting Google data and contacting us</H3>
      <P>
        Deleting an entry deletes its saved Meet and event links. Deleting a workspace, or your
        account under Settings → Security, deletes the Google connection, revokes its tokens with
        Google and deletes every booking record. You can also email{" "}
        <A href={`mailto:${site.email}`}>{site.email}</A> to ask us to delete the Google data
        associated with your account or workspace, or with any other question about it. We will
        confirm when it is done.
      </P>

      <H3 id="google-other">Other Google services</H3>
      <P>The same Limited Use commitment applies to these optional features:</P>
      <Ul>
        <Li>
          <b>Sign in with Google</b> (<Code>openid</Code>, <Code>email</Code>, <Code>profile</Code>) —
          we receive your name, email address, Google account id and profile picture address, and use
          them only to create your account and sign you in.
        </Li>
        <Li>
          <b>Google Search Console</b> (<Code>webmasters</Code>) — we show clicks, impressions,
          rankings, index status and sitemaps for the properties you link. The only change we make
          to your Search Console account is submitting or removing a sitemap, and only when you ask
          us to. We store the connected email address, encrypted tokens, the properties you link and
          cached reports, which expire automatically.
        </Li>
        <Li>
          <b>Google Business Profile</b> (<Code>business.manage</Code>) — we read your locations and
          reviews to show them in the dashboard. We store the connected email address, encrypted
          tokens, each location&apos;s name, address and rating summary, and its reviews as Google
          returns them, including the reviewer&apos;s public name and photo, the rating, the text and
          any reply. We do not post replies or change your profile.
        </Li>
      </Ul>
      <P>
        Disconnecting Search Console or Business Profile in {site.name} revokes the token with Google
        and deletes the tokens and all the data listed for that service.
      </P>
    </>
  );
}
