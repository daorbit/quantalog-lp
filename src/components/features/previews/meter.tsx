export function Meter({ value, label }: { value: number; label: string }) {
  return (
    <svg className="block h-1.5 w-full" role="img" aria-label={label}>
      <rect width="100%" height="100%" rx="3" fill="var(--border)" />
      <rect width={`${value}%`} height="100%" rx="3" fill="var(--accent)" />
    </svg>
  );
}
