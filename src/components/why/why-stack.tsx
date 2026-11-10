import Link from "next/link";
import { ArrowRight, Check, Scale } from "lucide-react";
import { SectionHeading } from "../ui";
import { WHY_HONEST, WHY_STACK_NOTE, whyStack } from "./why-data";

export function WhyStack() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 section-y">
      <SectionHeading
        eyebrow="Compared"
        title="One workspace instead of a stack of tools."
        body="Most teams pay for, log into and copy data between separate apps. Here is what Quantalog covers on its own."
        centered
      />

      <div className="tile tile--static mt-10 overflow-hidden sm:mt-16">
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 bg-bg-subtle px-5 py-3 text-[12.5px] font-semibold text-fg-muted sm:grid-cols-[1.2fr_0.8fr_1.2fr] sm:px-6">
          <span>What you need</span>
          <span>Quantalog</span>
          <span className="hidden sm:block">Without it</span>
        </div>
        {whyStack.map((row) => (
          <div
            key={row.need}
            className="grid grid-cols-[1.2fr_1fr] items-center gap-4 border-t border-border px-5 py-3.5 text-[14.5px] sm:grid-cols-[1.2fr_0.8fr_1.2fr] sm:px-6"
          >
            <span className="font-medium text-fg">{row.need}</span>
            <span className="flex items-center gap-2 font-semibold text-fg">
              <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Included
            </span>
            <span className="hidden text-fg-muted sm:block">{row.elsewhere}</span>
          </div>
        ))}
        <p className="border-t border-border px-5 py-4 text-[14.5px] text-fg-muted sm:px-6">
          {WHY_STACK_NOTE}{" "}
          <Link href="/compare" className="inline-flex items-center gap-1 font-medium text-accent hover:underline hover:underline-offset-4">
            See detailed comparisons
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>

      <div className="tile tile--static mt-4 flex gap-4 p-6">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <div>
          <h3 className="text-[15px] font-semibold text-fg">{WHY_HONEST.title}</h3>
          <p className="mt-1 text-pretty text-[14.5px] leading-relaxed text-fg-muted">{WHY_HONEST.body}</p>
        </div>
      </div>
    </section>
  );
}
