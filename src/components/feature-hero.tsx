import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { ProviderSignup } from "@/components/provider-signup";
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
    <header className="mx-auto grid w-full max-w-360 items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:py-20">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="rise rise-1">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="rise rise-2 mt-4 text-balance text-[2.375rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[3rem] xl:text-[3.5rem]">
          {title}
        </h1>
        <p className="rise rise-3 mt-6 max-w-lg text-pretty text-[1.0625rem] leading-[1.6] text-fg-muted sm:text-[1.1875rem]">
          {description}
        </p>
        <div className="rise rise-4 mt-9 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
          <Button href={primary.href ?? `${site.app}/signup`} size="lg" className="group">
            {primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={secondary.href ?? "/docs/demo"} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        </div>
        {!primary.href && (
          <ProviderSignup location="feature_hero" align="responsiveLg" className="rise rise-5 mt-7" />
        )}
      </div>

      <div className="rise rise-5 feature-stage">{visual}</div>
    </header>
  );
}
