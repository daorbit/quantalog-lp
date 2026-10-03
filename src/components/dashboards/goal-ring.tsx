export function GoalRing({
  r,
  progress,
  className,
  active,
}: {
  r: number;
  progress: number;
  className: string;
  active: boolean;
}) {
  return (
    <g>
      <circle cx="60" cy="60" r={r} fill="none" className="stroke-border" strokeWidth="9" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        className={`goal-ring ${className}`}
        strokeWidth="9"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset={100 - progress}
        transform="rotate(-90 60 60)"
        data-active={active || undefined}
      />
    </g>
  );
}
