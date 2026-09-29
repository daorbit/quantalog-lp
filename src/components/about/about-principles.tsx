import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { SectionHeading } from "../ui";
import { exclusions, principles } from "./about-data";

export function AboutPrinciples() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="What we stand for"
        title="Principles we don't trade away."
        body="Four commitments shape every feature we ship — and every one we decline to build."
        centered
        className="v-rise"
      />

      <ul className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4">
        {principles.map((p, i) => (
          <li key={p.title} className={`v-rise v-d${i + 1} tile tile--static flex flex-col p-6 sm:p-9`}>
            <p.icon className="h-7 w-7 text-accent" strokeWidth={1.6} aria-hidden="true" />
            <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight text-fg sm:mt-10 sm:text-[1.5rem]">
              {p.title}
            </h3>
            <p className="mt-2 max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
          </li>
        ))}
      </ul>

      <div className="v-rise tile tile--static mt-3 p-6 sm:mt-4 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-[14px] font-semibold text-accent">By design</p>
            <h3 className="mt-2 text-balance text-[1.375rem] font-semibold leading-[1.18] tracking-tight text-fg sm:text-[2rem]">
              What we deliberately don&apos;t build.
            </h3>
            <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">
              Some of these are useful, and if you need them another tool is the right choice. Each one
              requires following an individual — the one thing Quantalog exists not to do.
            </p>
            <Link
              href="/compare"
              className="group mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
            >
              See how we compare
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="flex flex-wrap gap-2">
            {exclusions.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[14px] text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle"
              >
                <X className="h-3.5 w-3.5 text-fg-faint" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
