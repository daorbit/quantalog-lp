import { ArrowRight, CalendarCheck, CreditCard, Timer, Video } from "lucide-react";
import { site } from "@/lib/site";
import { Button, SectionHeading } from "../ui";
import { BookingShowcase } from "../booking-showcase/booking-showcase";

const FEATURES = [
  { icon: CalendarCheck, title: "Google Calendar sync", body: "Busy times are hidden and every booking is added to your calendar." },
  { icon: Video, title: "Meet link included", body: "Each booking can get its own Google Meet room." },
  { icon: Timer, title: "Your rules", body: "Buffers, minimum notice, daily limits and days off." },
  { icon: CreditCard, title: "Paid bookings", body: "The time is held while they pay and released if they don't." },
];

export function BookMeeting() {
  return (
    <section id="book-a-meeting" className="bm-band relative overflow-hidden section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Lead capture"
          title="Turn a visit into a booked meeting."
          body="Add a booking field to any Quantalog form. Visitors pick a time that suits you both, and the meeting is on your calendar before they close the tab."
          centered
        />
      </div>

      <div className="mt-12 sm:mt-16">
        <BookingShowcase />
      </div>

      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <ul className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className={`v-rise v-d${i + 1}`}>
              <Icon className="h-5 w-5 text-accent" />
              <p className="mt-3 text-[15px] font-semibold">{title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">{body}</p>
            </li>
          ))}
        </ul>

        <div className="v-rise mt-12 flex flex-wrap justify-center gap-3">
          <Button href={`${site.app}/signup`} size="lg" track="cta_start_free" trackProps={{ location: "book_meeting" }}>
            Create a booking form
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs/forms-booking" variant="secondary" size="lg">
            How booking works
          </Button>
        </div>
      </div>
    </section>
  );
}
