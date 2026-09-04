import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * A compact Orbit mention for the product pages.
 *
 * The full `sections/orbit` block is the home page's argument for the
 * assistant; this is the one-paragraph version that belongs at the foot of a
 * page about something else. Each page passes the sentence that connects Orbit
 * to what that page is actually about — a generic "we have AI" strip repeated
 * six times reads as filler, and says nothing a buyer can act on.
 */
export function OrbitStrip({
  body,
  examples,
}: {
  /** What Orbit does for this page's subject, in one sentence. */
  body: string;
  /** Two or three questions a visitor to this page would plausibly ask. */
  examples: string[];
}) {
  return (
    <section className="mt-16">
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/da-ai-dark-mode.png"
                alt=""
                width={28}
                height={28}
                className="hidden rounded-lg dark:block"
              />
              <Image
                src="/da-ai-light-mode.png"
                alt=""
                width={28}
                height={28}
                className="rounded-lg dark:hidden"
              />
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.09em] text-fg-faint">
                <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
                Orbit AI
              </span>
            </div>

            <h2 className="mt-4 text-[1.0625rem] font-semibold tracking-tight">
              Ask instead of hunting for it
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-fg-muted">
              {body}
            </p>

            <Link
              href="/social"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-fg"
            >
              How Orbit works
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* The questions do the selling: an assistant is abstract until you
              see the shape of what it answers. */}
          <ul className="w-full shrink-0 space-y-1.5 lg:max-w-xs">
            {examples.map((q) => (
              <li
                key={q}
                className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-[12.5px] leading-snug text-fg-muted"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
