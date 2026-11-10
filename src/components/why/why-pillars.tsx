import { Check } from "lucide-react";
import { SectionHeading } from "../ui";
import { whyPillars, type WhyTone } from "./why-data";

const TONES: Record<WhyTone, string> = {
  blue: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  teal: "text-teal-600 bg-teal-500/10 dark:text-teal-400",
  violet: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
  orange: "text-orange-600 bg-orange-500/10 dark:text-orange-400",
  green: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  indigo: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400",
};

const CHECK_TONES: Record<WhyTone, string> = {
  blue: "text-sky-600 dark:text-sky-400",
  teal: "text-teal-600 dark:text-teal-400",
  violet: "text-violet-600 dark:text-violet-400",
  orange: "text-orange-600 dark:text-orange-400",
  green: "text-emerald-600 dark:text-emerald-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
};

export function WhyPillars() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <SectionHeading
        eyebrow="What you get"
        title="Everything a growing business runs on."
        body="Six jobs most teams cover with a different tool each. In Quantalog they share the same data, so a visit, a lead and an invoice are one story."
        centered
      />
      <ul className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {whyPillars.map(({ key, icon: Icon, tone, title, body, features }) => (
          <li key={key} className="tile tile--static flex flex-col p-6 sm:p-8">
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${TONES[tone]}`}>
              <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight text-fg">{title}</h3>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{body}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-[14px] text-fg">
                  <Check className={`h-4 w-4 shrink-0 ${CHECK_TONES[tone]}`} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
