import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import type { ExploreTone } from "@/components/explore/explore-items";
import { site } from "@/lib/site";

export function FeatureHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  visual,
  tone,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary: { label: string; href?: string };
  secondary: { label: string; href?: string };
  visual: ReactNode;
  tone: ExploreTone;
}) {
  return (
    <header className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rise rise-1 flex justify-center">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="rise rise-2 mt-3 text-balance text-display font-semibold leading-[1.04] tracking-display">
          {title}
        </h1>
        <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          {description}
        </p>
        <div className="rise rise-4 mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href ?? `${site.app}/signup`} size="lg" className="group">
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button href={secondary.href ?? `${site.app}/login`} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        </div>
      </div>

      <div
        className={`rise rise-5 explore-tile tone-${tone} mt-12 flex min-h-88 items-center justify-center px-5 py-14 sm:mt-16 sm:min-h-112 sm:py-20`}
      >
        {visual}
      </div>
    </header>
  );
}
