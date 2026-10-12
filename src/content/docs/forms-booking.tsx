import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

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
          <b>Start a slot every</b> spaces the start times. Leave it blank to
          use the duration, so 30-minute meetings start every 30 minutes.
        </Li>
        <Li>
          <b>Buffer before</b> and <b>buffer after</b> keep time free around
          other bookings and calendar events.
        </Li>
        <Li>
          <b>Seats per slot</b> lets more than one person book the same time,
          for a class or a webinar. <b>Max bookings a day</b> caps the day.
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
          <b>Book up to</b> limits how far ahead people can book.
        </Li>
        <Li>
          <b>Days off</b> blocks holidays and other single dates.
        </Li>
      </Ul>

      <H2 id="google-calendar">Google Calendar and Meet</H2>
      <P>
        Click <b>Connect</b> in the field&apos;s Google Calendar section and
        allow access in the window that opens. The connection belongs to the
        workspace, so every booking form in it can use it. Then turn on{" "}
        <b>Sync with Google Calendar</b>:
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
