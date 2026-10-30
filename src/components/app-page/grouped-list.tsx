import type { ReactNode } from "react";

export function GroupedList({ groups }: { groups: readonly { key: string; title: string; body: string; content: ReactNode }[] }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {groups.map((group) => (
        <div key={group.key} className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-[1.5rem] font-semibold tracking-tight text-fg">{group.title}</h3>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{group.body}</p>
          </div>
          <div className="min-w-0">{group.content}</div>
        </div>
      ))}
    </div>
  );
}
