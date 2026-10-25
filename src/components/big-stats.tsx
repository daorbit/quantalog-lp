export type BigStat = { value: string; unit?: string; label: string };

export function BigStats({ stats }: { stats: readonly BigStat[] }) {
  const cols = stats.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3";
  return (
    <ul className={`grid gap-x-3 gap-y-10 text-center sm:gap-8 ${cols}`}>
      {stats.map((s) => (
        <li key={s.label}>
          <p className="text-[2.25rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[4.5rem]">
            {s.value}
            {s.unit && <span className="ml-0.5 text-[0.45em] tracking-tight text-fg-muted sm:ml-1">{s.unit}</span>}
          </p>
          <p className="mt-2 text-[12px] leading-snug text-fg-muted sm:mt-3 sm:text-[15px]">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
