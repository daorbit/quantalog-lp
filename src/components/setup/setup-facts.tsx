import { setupFacts } from "./setup-steps";

export function SetupFacts() {
  return (
    <ul className="grid gap-10 text-center sm:grid-cols-3 sm:gap-8">
      {setupFacts.map((f, i) => (
        <li key={f.label} className={`v-rise v-d${i + 1}`}>
          <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[4.5rem]">
            {f.value}
            {f.unit && <span className="ml-1 text-[0.45em] tracking-tight text-fg-muted">{f.unit}</span>}
          </p>
          <p className="mt-3 text-[15px] text-fg-muted">{f.label}</p>
        </li>
      ))}
    </ul>
  );
}
