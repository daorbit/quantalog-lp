import type { DashboardFact } from "./dashboard-facts";

export function FactTile({ fact }: { fact: DashboardFact }) {
  return (
    <div className="tile tile--static flex h-full flex-col p-6 sm:p-7">
      <fact.icon className="h-7 w-7 text-accent" strokeWidth={1.6} aria-hidden="true" />
      <span className="mt-auto block pt-6 text-[1.0625rem] font-semibold tracking-tight text-fg sm:pt-10 sm:text-[1.125rem]">
        {fact.title}
      </span>
      <span className="mt-1.5 block text-pretty text-[14px] leading-relaxed text-fg-muted">{fact.body}</span>
    </div>
  );
}
