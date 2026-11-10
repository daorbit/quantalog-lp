import { SectionHeading } from "../ui";
import { whyJourney } from "./why-data";

export function WhyJourney() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <SectionHeading
        eyebrow="How it works"
        title="How Quantalog helps you grow."
        body="Each step hands its data to the next, so you always know which effort brought in which customer."
        centered
      />
      <ol className="tile tile--static mt-10 grid overflow-hidden sm:mt-16 lg:grid-cols-5">
        {whyJourney.map((step, index) => (
          <li
            key={step.key}
            className="flex flex-col gap-3 border-t border-border p-6 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-[12px] font-bold text-accent">
              {index + 1}
            </span>
            <h3 className="text-[1.0625rem] font-semibold tracking-tight text-fg">{step.title}</h3>
            <p className="text-pretty text-[14px] leading-relaxed text-fg-muted">{step.body}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {step.tools.map((tool) => (
                <span key={tool} className="rounded-lg border border-border px-2 py-0.5 text-[12px] font-medium text-fg-muted">
                  {tool}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
