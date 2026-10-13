import { ArrowRight, CalendarCheck, CreditCard, Timer, Video } from "lucide-react";
import { site } from "@/lib/site";
import { Button, SectionHeading } from "../ui";
import { BookingShowcase } from "../booking-showcase/booking-showcase";

const FEATURES = [
  { icon: CalendarCheck, title: "Google Calendar sync", body: "Busy times are hidden and every booking is added to your calendar." },
  { icon: Video, title: "Meet link included", body: "Each booking can get its own Google Meet room." },
  { icon: Timer, title: "Your rules", body: "Weekly hours, buffers, minimum notice and days off." },
  { icon: CreditCard, title: "Paid bookings", body: "The time is held while they pay and released if they don't." },
];

export function BookMeeting() {
  return (
    <section id="book-a-meeting" className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Lead capture"
          title="Turn a visit into a booked meeting."
          body="Add a booking field to any Quantalog form. Visitors pick a time that suits you both, and the meeting is on your calendar before they close the tab."
          centered
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={`${site.app}/signup`} size="lg" track="cta_start_free" trackProps={{ location: "book_meeting" }}>
            Create a booking form
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs/forms-booking" variant="secondary" size="lg">
            How booking works
          </Button>
        </div>

        <div className="mt-14 sm:mt-20">
          <BookingShowcase />
        </div>

        <ul className="mt-16 grid border-t border-border pt-10 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bm-spec">
              <span className="bm-spec-icon">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-4 text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
