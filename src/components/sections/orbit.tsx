import Image from "next/image";
import { BookOpen, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

/**
 * Orbit AI — the assistant built into the dashboard.
 *
 * Shown as a conversation rather than described, for the same reason the
 * reports section renders an email: the feature *is* the exchange, and a mock
 * of one explains it faster than a paragraph claiming it is helpful.
 *
 * The argument is deliberately narrow. Every product now claims an AI, and the
 * claim is worth nothing — so this section says what Orbit is grounded in, what
 * it cannot see, and that a person is still behind it. The honest limits are
 * the differentiator, because they are what the competing claims leave out.
 */

const points = [
  {
    icon: Clock,
    title: "Answers at 2am",
    body: "Installing the tracker, what a metric means, why a number moved — the questions that would otherwise wait for a support reply are answered while you are still on the page.",
  },
  {
    icon: BookOpen,
    title: "Grounded in the product",
    body: "Orbit answers from Quantalog's own reference, not from whatever a general model half-remembers. If something is outside it, it says so and points you at a person.",
  },
  {
    icon: ShieldCheck,
    title: "It cannot read your data",
    body: "Orbit knows how the product works, not what is in your account. Your analytics are never sent to a model to answer a support question.",
  },
  {
    icon: MessageSquare,
    title: "A person is still there",
    body: "Every plan keeps human support. Orbit handles the questions that have an answer already and hands over the ones that don't.",
  },
];

/** The mocked exchange. A real question, and an answer Orbit actually gives. */
function ChatPreview() {
  return (
    <div className="card overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-2.5">
        {/* Two files, swapped by theme in CSS rather than by a hook: the
            artwork is not transparent, so the dark mark on a light page would
            be a black square — and doing it in CSS avoids a wrong-mark flash
            before hydration. */}
        <Image
          src="/da-ai-dark-mode.png"
          alt=""
          width={20}
          height={20}
          className="hidden rounded-md dark:block"
        />
        <Image
          src="/da-ai-light-mode.png"
          alt=""
          width={20}
          height={20}
          className="rounded-md dark:hidden"
        />
        <div className="text-[13px] font-semibold tracking-tight">Orbit AI</div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-xl rounded-br-sm bg-accent/15 px-3 py-2 text-[13px] leading-relaxed">
            Why is my site showing no data?
          </div>
        </div>

        <p className="text-[13px] leading-relaxed text-fg-muted">
          Usually the snippet is missing from the deployed page rather than the
          local one, or it is on a different site ID. The Verify button on the
          Workspaces page reports what the server has actually received.
        </p>

        {/* The follow-ups are part of the feature, not decoration — Orbit
            offers the next question rather than leaving a blank input. */}
        <div className="space-y-1.5 pt-1">
          {["How do I verify the tracker?", "Does it work with Next.js?"].map((q) => (
            <div
              key={q}
              className="rounded-lg border border-border px-3 py-2 text-[12px] text-fg-muted"
            >
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Orbit() {
  return (
    <section id="orbit" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="Orbit AI"
          title={
            <>
              Support that answers
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">before you finish asking.</span>
            </>
          }
          body="Orbit is built into the dashboard, on every page. It knows how Quantalog works — how to install the tracker, what a metric means, which role can do what — and answers in seconds. It cannot see your data, and it will tell you when a question needs a person."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal
                key={p.title}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="card card-hover group p-7"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <p.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Decorative: the copy beside it already states everything this
              shows, so a screen reader gains nothing from re-reading a mock. */}
          <Reveal delay={2} aria-hidden="true">
            <ChatPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
