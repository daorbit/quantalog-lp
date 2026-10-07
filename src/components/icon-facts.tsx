import type { LucideIcon } from "lucide-react";

export type IconFact = { icon: LucideIcon; title: string; body: string };

export function IconFacts({ facts, className = "" }: { facts: readonly IconFact[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-8 ${className}`}>
      {facts.map((f) => (
        <li key={f.title} className="text-center">
          <f.icon className="mx-auto h-6 w-6 text-accent" strokeWidth={1.6} aria-hidden="true" />
          <p className="mt-3 text-[15px] font-semibold tracking-tight text-fg">{f.title}</p>
          <p className="mt-1 text-[13px] leading-snug text-fg-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
