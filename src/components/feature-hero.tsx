import type { ReactNode } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export function FeatureHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary: { label: string; href?: string };
  secondary: { label: string; href?: string };

  visual: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-14">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
            {title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primary.href ?? `${site.app}/signup`} size="lg">
              {primary.label}
            </Button>
            <Button
              href={secondary.href ?? `${site.app}/login`}
              variant="secondary"
              size="lg"
            >
              {secondary.label}
            </Button>
          </div>
        </div>

        <div className="fhv-frame relative w-full">
          <div className="fhv-frame__inner">{visual}</div>
        </div>
      </div>
    </header>
  );
}
