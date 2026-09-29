export type BigStat = { value: string; unit?: string; label: string };

export function BigStats({ stats }: { stats: readonly BigStat[] }) {
  const cols = stats.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return (
    <ul className={`grid gap-x-6 gap-y-10 text-center sm:gap-8 ${cols}`}>
      {stats.map((s, i) => (
        <li key={s.label} className={`v-rise v-d${i + 1}`}>
          <p className="text-[3rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[4.5rem]">
            {s.value}
            {s.unit && <span className="ml-1 text-[0.45em] tracking-tight text-fg-muted">{s.unit}</span>}
          </p>
          <p className="mt-3 text-[14px] text-fg-muted sm:text-[15px]">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
