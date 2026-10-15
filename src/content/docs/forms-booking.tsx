import type { Doc } from "@/lib/docs";
import { A, H2, H3, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        The <b>Booking</b> field, in the Scheduling group, turns a form into a
        booking page. Respondents pick a day on a calendar and then one of your
        open times. With Google Calendar connected, times you are already busy
        are hidden, every booking lands in your calendar, and each one can get
        its own Google Meet link.
      </P>

      <H2 id="meeting">Meeting length and slots</H2>
      <Ul>
        <Li>
          <b>Duration</b> is how long each booking lasts.
        </Li>
        <Li>
          <b>Slot interval</b> spaces the start times. Leave it blank to use
          the duration, so 30-minute meetings start every 30 minutes.
        </Li>
        <Li>
          <b>Buffer before</b> and <b>buffer after</b> keep time free around
          other bookings and calendar events.
        </Li>
        <Li>
          <b>Seats per slot</b> lets more than one person book the same time,
          for a class or a webinar. <b>Daily limit</b> caps the day.
        </Li>
      </Ul>

      <H2 id="availability">Availability</H2>
      <P>
        Set your weekly hours in your own timezone. A day can have several
        ranges, for example 09:00–12:00 and 14:00–17:00. Respondents always
        see times converted to their own timezone.
      </P>
      <Ul>
        <Li>
          <b>Minimum notice</b> stops last-minute bookings, in hours.
        </Li>
        <Li>
          <b>Booking window</b> limits how many days ahead people can book.
        </Li>
        <Li>
          <b>Days off</b> blocks holidays and other single dates.
        </Li>
      </Ul>

      <H2 id="google-calendar">Google Calendar and Meet</H2>
      <P>
        Open <b>Settings → Connections</b> in Quantalog, find{" "}
        <b>Google Calendar</b> under Scheduling and click{" "}
        <b>Connect Google Calendar</b>. The page lists what Google will ask you
        to allow; choose <b>Continue to Google</b> and allow access in the
        window that opens. The connection belongs to the workspace, so every
        booking form in it can use it. The booking field&apos;s Google Calendar
        section shows which account is connected, and its <b>Connect</b> or{" "}
        <b>Manage</b> link opens that page. Then turn on{" "}
        <b>Sync with Google Calendar</b> on the field:
      </P>
      <Ul>
        <Li>
          <b>Add bookings to</b> picks the calendar new events are created in.
        </Li>
        <Li>
          <b>Check these calendars for conflicts</b> hides any time that is
          busy in the calendars you pick.
        </Li>
        <Li>
          <b>Add a Google Meet link</b> creates a Meet room for every event.
          The link appears on the thank-you screen, in notification emails and
          in the entry.
        </Li>
        <Li>
          <b>Event title</b> and <b>description</b> accept{" "}
          <code>{"{{Field Label}}"}</code> to use answers. All answers are
          added to the event description.
        </Li>
        <Li>
          <b>Invite the respondent using</b> picks the email field whose
          address gets the calendar invite.
        </Li>
      </Ul>

      <H3 id="google-access">What Quantalog can access</H3>
      <P>
        Google asks you to allow four things. Each one is used only for the
        booking features above:
      </P>
      <Ul>
        <Li>
          <b>Your email address</b> shows which Google account is connected.
        </Li>
        <Li>
          <b>The list of your calendars</b> lets you pick where bookings go and
          which calendars to check.
        </Li>
        <Li>
          <b>Availability on your calendars</b> gives free and busy times only,
          never event titles or details. Respondents see only your open times.
        </Li>
        <Li>
          <b>Events on your calendars</b> adds each booking with its Meet link
          and cancels it when you delete the entry. Quantalog never reads,
          changes or deletes events it did not create.
        </Li>
      </Ul>
      <P>
        Leave a calendar permission unticked and the connection is not saved,
        because bookings cannot be checked or added without it. Google tokens are
        encrypted and never leave our servers. See the{" "}
        <A href="/privacy#google-user-data">privacy policy</A> for what is
        stored and for how long.
      </P>

      <H3 id="google-disconnect">Disconnecting</H3>
      <P>
        Open <b>Settings → Connections</b>, choose <b>Google Calendar</b> and
        click <b>Disconnect</b>. Quantalog revokes its access with Google and deletes
        the stored tokens straight away. You can also remove Quantalog from{" "}
        <A href="https://myaccount.google.com/connections">your Google Account</A>
        ; the connection then shows as expired until you reconnect or remove it.
      </P>
      <P>
        After disconnecting, booking forms keep working with your weekly hours
        only: busy times are no longer checked and no new events are added.
        Events already created stay in your Google Calendar, and deleting an
        entry no longer cancels its event, so remove it in Google Calendar.
      </P>

      <H2 id="entries">Entries, payments and cancelling</H2>
      <P>
        The booked time shows in entries along with links to the Meet room and
        the calendar event. Two people can never book the same seat: if
        someone takes a time first, the other respondent is asked to pick
        again. On a form with a payment, the time is held while they pay and
        released if the payment is abandoned. Deleting an entry frees its time
        and cancels the calendar event.
      </P>

      <Callout>
        A form can have one booking field. Responses that include a booking
        can&apos;t be edited from the respondent&apos;s edit link. Delete the
        entry and ask them to book again instead.
      </Callout>
    </>
  );
}

export const formsBooking: Doc = {
  slug: "forms-booking",
  title: "Forms: booking and Google Calendar",
  description:
    "Let respondents book a time, block your busy hours from Google Calendar and send a Google Meet link with every booking.",
  category: "Tracking",
  order: 17.35,
  Body,
};
