import Link from "next/link";
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
        <div className="mt-8 flex justify-center gap-2 sm:gap-3">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="max-sm:px-4"
            track="cta_start_free"
            trackProps={{ location: "book_meeting" }}
          >
            Create booking form
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs/forms-booking" variant="secondary" size="lg" className="max-sm:px-4">
            How it works
          </Button>
        </div>

        <div className="mt-14 sm:mt-20">
          <BookingShowcase />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-border pt-8 sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-4 lg:gap-0">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bm-spec">
              <span className="bm-spec-icon">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 text-[14px] font-semibold tracking-[-0.01em] sm:mt-4 sm:text-[15px]">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-muted sm:mt-1.5 sm:text-[14px]">{body}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-[13px] leading-relaxed text-fg-faint">
          Connecting Google Calendar is optional. {site.name} uses it only to check your busy times, add
          bookings with their Meet links and cancel them when you delete an entry.{" "}
          <Link href="/privacy#google-user-data" className="underline underline-offset-2 hover:text-fg">
            How we handle Google data
          </Link>
        </p>
      </div>
    </section>
  );
}
