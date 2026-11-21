import { Check } from "lucide-react";
import { Eyebrow } from "./ui";

export function ToolPageHeader({
  title,
  lead,
  promises,
}: {
  title: string;
  lead: string;
  promises: readonly string[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-20">
      <Eyebrow>Free tool</Eyebrow>
      <h1 className="mt-4 text-balance text-display font-bold leading-[1.2] tracking-display">{title}</h1>
      <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">{lead}</p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-fg-muted">
        {promises.map((promise) => (
          <li key={promise} className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
            {promise}
          </li>
        ))}
      </ul>
    </section>
  );
}
