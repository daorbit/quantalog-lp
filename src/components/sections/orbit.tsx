import Image from "next/image";
import { BookOpen, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { SectionHeading, GlowCard } from "../ui";
import { Reveal } from "../reveal";

const points = [
  {
    icon: Clock,
    title: "Answers at 2am",
    body: "Installing the tracker, what a metric means, how to fix something an audit flagged — the questions that would otherwise wait for a support reply are answered while you are still on the page.",
  },
  {
    icon: BookOpen,
    title: "Grounded in the product",
    body: "Orbit answers from Quantalog's own reference and links to the exact documentation page. If something falls outside it, it says so rather than inventing a feature you would then go looking for.",
  },
  {
    icon: ShieldCheck,
    title: "It cannot read your data",
    body: "Orbit knows how the product works, not what is in your account. Your analytics are never sent to a model to answer a support question, and conversations are not stored.",
  },
  {
    icon: MessageSquare,
    title: "A person is still there",
    body: "Every plan keeps human support. Orbit handles the questions that have an answer already and hands over the ones that don't.",
  },
];

const models = [
  { name: "Gemini Flash", vendor: "Google" },
  { name: "Nemotron Ultra", vendor: "NVIDIA" },
  { name: "DeepSeek V4", vendor: "DeepSeek" },
  { name: "GPT-OSS", vendor: "OpenAI" },
  { name: "Gemma 4", vendor: "Google" },
  { name: "North Mini", vendor: "Cohere" },
];

function OrbitMark() {
  return (
    <div className="relative shrink-0">

      <div
        className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <Image
        src="/da-ai-dark-mode.png"
        alt="Orbit AI"
        width={128}
        height={128}
        className="relative hidden h-24 w-24 rounded-2xl shadow-soft dark:block"
      />
      <Image
        src="/da-ai-light-mode.png"
        alt="Orbit AI"
        width={128}
        height={128}
        className="relative h-24 w-24 rounded-2xl shadow-soft dark:hidden"
      />
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="card overflow-hidden p-0">
      <div className="flex items-center gap-2.5 border-b border-border bg-bg-subtle px-4 py-3">
        <Image
          src="/da-ai-dark-mode.png"
          alt=""
          width={26}
          height={26}
          className="hidden rounded-lg dark:block"
        />
        <Image
          src="/da-ai-light-mode.png"
          alt=""
          width={26}
          height={26}
          className="rounded-lg dark:hidden"
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
    <section
      id="orbit"
      className="relative overflow-hidden border-y border-border bg-bg-subtle"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">

        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
          <div className="v-rise">
            <OrbitMark />
          </div>
          <SectionHeading
            eyebrow="Orbit AI"
            align="left"
            className="v-rise v-d2"
            title={
              <>
                Support that answers
                <br className="hidden sm:block" />{" "}
                <span className="text-accent">before you finish asking.</span>
              </>
            }
            body="Orbit is built into the dashboard, on every page. It knows how Quantalog works — how to install the tracker, what a metric means, which role can do what — and answers in seconds. It cannot see your data, and it will tell you when a question needs a person."
          />
        </div>

        <div className="mt-12 grid sm:mt-14 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
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
                <h3 className="mt-5 text-h3 font-medium tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </GlowCard>
            ))}
          </div>

          <Reveal delay={2} className="tilt-in">
            <div aria-hidden="true">
              <ChatPreview />
            </div>
          </Reveal>
        </div>

        <div className="v-rise v-d2 mt-10 rounded-2xl border border-border bg-surface p-7 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-[15px] font-semibold tracking-tight">
                Six models, so one being busy is never your problem
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Pick the one you prefer from the chat window. If it is rate-limited or
                slow, Orbit answers with the next one automatically — you get an answer
                either way.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {models.map((m) => (
                <li
                  key={m.name}
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2"
                >
                  <div className="text-[13px] font-medium leading-tight">{m.name}</div>
                  <div className="text-[11px] leading-tight text-fg-faint">{m.vendor}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
