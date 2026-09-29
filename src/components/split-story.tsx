import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SplitStory({
  eyebrow,
  title,
  children,
  link,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  link?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <div className="v-rise lg:sticky lg:top-24 lg:self-start">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">{eyebrow}</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">{title}</h2>
        </div>

        <div className="v-rise v-d1">
          <div className="space-y-6 text-pretty text-[17px] leading-relaxed text-fg-muted">{children}</div>
          {link && (
            <Link
              href={link.href}
              className="group mt-8 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
            >
              {link.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
