function walk(seed: number, points: number, amplitude: number, baseline: number): string {
  let value = baseline;
  let state = seed;
  const step = 1200 / (points - 1);
  const coords: string[] = [];

  for (let i = 0; i < points; i++) {

    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const drift = ((state >>> 0) % 1000) / 1000 - 0.5;

    value += drift * amplitude;

    value += (baseline - value) * 0.18;
    const y = Math.max(6, Math.min(114, value));
    coords.push(`${(i * step).toFixed(1)},${y.toFixed(1)}`);
  }

  return coords.join(" ");
}

const OBSERVED = walk(20260821, 64, 46, 52);
const REPORTED = walk(19980415, 64, 30, 82);

export function ChartDivider({

  variant = "observed",

  filled = false,
  className = "",
}: {
  variant?: "observed" | "reported";
  filled?: boolean;
  className?: string;
}) {
  const points = variant === "observed" ? OBSERVED : REPORTED;
  const stroke = variant === "observed" ? "var(--accent)" : "var(--fg-faint)";

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block h-16 w-full sm:h-20"
        role="presentation"
      >
        {filled && (
          <polygon
            points={`0,120 ${points} 1200,120`}
            fill={stroke}
            opacity="0.07"
          />
        )}
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={variant === "observed" ? 0.75 : 0.4}

          strokeDasharray={variant === "reported" ? "5 5" : undefined}
          className={variant === "observed" ? "divider-draw" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
