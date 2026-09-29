import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { OrbitMark } from "./orbit/orbit-mark";

export function OrbitStrip({
  body,
  examples,
}: {
  body: string;
  examples: string[];
}) {
  return (
    <section className="mt-16">
      <div className="explore-tile tone-rose grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <OrbitMark size={40} />
            <span className="text-[15px] font-semibold text-accent">Orbit AI</span>
          </div>
          <h2 className="mt-4 text-balance text-[1.5rem] font-semibold leading-tight tracking-tight sm:text-[1.875rem]">
            Ask instead of hunting for it.
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
            {body}
          </p>
          <Link
            href="/social"
            className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-fg hover:text-fg-muted"
          >
            How Orbit works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="space-y-2">
          {examples.map((q) => (
            <li
              key={q}
              className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-[14px] leading-snug text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle"
            >
              <MessageSquareText className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {q}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
