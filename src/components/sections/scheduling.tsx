import { CalendarClock, Images, MessageSquareText, Repeat2 } from "lucide-react";
import { SectionHeading, GlowCard } from "../ui";
import { Reveal } from "../reveal";

const points = [
  {
    icon: MessageSquareText,
    title: "Tell Orbit what to post",
    body: "“Announce our new feature next Tuesday morning.” Orbit writes the post, asks for whatever it still needs — the timing, an image — and fills the form for you to check. Nothing publishes until you say so.",
  },
  {
    icon: CalendarClock,
    title: "Pick the moment, once",
    body: "A one-off goes out at a date and time you choose, in your own timezone. The queue and the calendar both show what is coming, and a post can be moved, paused or rewritten right up until it sends.",
  },
  {
    icon: Repeat2,
    title: "Or set a cadence",
    body: "Daily, weekly or monthly, at the hour you pick. A recurring slot survives a daylight saving change — nine in the morning stays nine in the morning — and every run is recorded whether it worked or not.",
  },
  {
    icon: Images,
    title: "Single image or a set",
    body: "Attach one picture, or up to ten as a multi-image post. Reorder them before they go, and see exactly which ones LinkedIn shows without a click.",
  },
];

function ComposerPreview() {
  return (
    <div className="card overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-3">
        <div className="text-[13px] font-semibold tracking-tight">New scheduled post</div>
        <div className="text-[11px] text-fg-faint">LinkedIn</div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-xl rounded-br-sm bg-accent/15 px-3 py-2 text-[13px] leading-relaxed">
            Share this month&rsquo;s traffic milestone, Tuesday morning
          </div>
        </div>

        <p className="text-[13px] leading-relaxed text-fg-muted">
          Here it is, going out Tuesday at 09:00. Want an image with it?
        </p>

        <div className="rounded-lg border border-border bg-bg-subtle p-3">
          <div className="text-[11px] uppercase tracking-[0.04em] text-fg-faint">
            Publishes
          </div>
          <div className="mt-1 text-[13px] font-semibold">Tue 26 Aug at 09:00</div>
        </div>
      </div>
    </div>
  );
}

export function Scheduling() {
  return (
    <section id="scheduling" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Scheduled posts"
          align="left"
          className="v-rise"
          title={
            <>
              Your numbers are already here.
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">Post them without leaving.</span>
            </>
          }
          body="Connect LinkedIn once and write posts where your analytics live. Orbit drafts them from a sentence, you set when they go out, and Quantalog publishes on its own — then keeps a record of every post it sent."
        />

        <div className="mt-12 grid items-start gap-8 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((p, i) => (
              <GlowCard
                key={p.title}
                className={`v-rise v-d${(i % 3) + 1} group bg-surface/60 p-6 sm:p-7`}
              >
                <p.icon
                  className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-h3 font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </GlowCard>
            ))}
          </div>

          <Reveal delay={2} className="tilt-in">
            <div aria-hidden="true">
              <ComposerPreview />
            </div>
          </Reveal>
        </div>

        <div className="v-rise v-d2 mt-10 rounded-2xl border border-border bg-surface p-7 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-[15px] font-semibold tracking-tight">
                You see exactly what went out
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Every publish is kept as a record with the words and the image as they
                were sent, and a link straight to the post. A run that failed says why,
                so a lapsed connection is something you fix rather than discover weeks
                later.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {["Queue", "Calendar", "Drafts", "Sent", "Failed"].map((tab) => (
                <li
                  key={tab}
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-[13px] font-medium"
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
