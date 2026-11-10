import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui";
import { whyTrust } from "./why-data";

export function WhyTrust() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <SectionHeading
        eyebrow="Trust"
        title="Built to be trusted."
        body="Your visitors, your team and your data are treated with care from day one."
        centered
      />
      <ul className="mx-auto mt-10 grid max-w-4xl gap-x-10 sm:mt-14 sm:grid-cols-2">
        {whyTrust.map((point) => (
          <li key={point.title} className="flex gap-4 border-t border-border py-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h3 className="text-[15px] font-semibold text-fg">{point.title}</h3>
              <p className="mt-1 text-pretty text-[14.5px] leading-relaxed text-fg-muted">{point.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
