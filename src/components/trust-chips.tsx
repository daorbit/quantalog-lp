const chips = ["No cookies set", "No personal data stored", "Under 1 KB tracker", "No consent banner"];

export function TrustChips({ className = "justify-center lg:justify-start" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-fg-faint ${className}`}>
      {chips.map((label, i) => (
        <li key={label} className="flex items-center gap-3">
          {i > 0 && <span className="h-0.75 w-0.75 rounded-full bg-border-strong" aria-hidden="true" />}
          {label}
        </li>
      ))}
    </ul>
  );
}
