/**
 * A traffic line, run edge to edge between sections.
 *
 * Decoration that is also the argument: the page sells a tool that counts what
 * others miss, and the thing separating its sections is a chart. Two variants,
 * because the pair carries the meaning — `observed` is the accent line, what
 * Quantalog records; `reported` is the muted one beneath it, what a
 * cookie-based tool sees after the banner has taken its cut.
 *
 * Pure inline SVG on a fixed path. No canvas, no animation loop, no data
 * fetch — it renders identically on the server and costs nothing to paint.
 *
 * The `observed` line draws itself in as it scrolls past, via CSS
 * `animation-timeline: view()` (see `.divider-draw` in globals.css). Where
 * scroll-timeline is unsupported the keyframe still runs once on load, so the
 * line is never left half-drawn — and the component stays a server component
 * either way, since none of this needs JavaScript.
 */

/**
 * A deterministic jagged path across a 1200×120 box.
 *
 * Generated from a seeded pseudo-random walk rather than hand-written, so the
 * line looks like traffic instead of a decorative wave, and generated at module
 * scope so the server and the client produce the same string — a random path
 * per render would hydrate mismatched.
 */
function walk(seed: number, points: number, amplitude: number, baseline: number): string {
  let value = baseline;
  let state = seed;
  const step = 1200 / (points - 1);
  const coords: string[] = [];

  for (let i = 0; i < points; i++) {
    // A small xorshift. Cheap, and stable across runtimes in a way that
    // Math.random with a seed library would not be worth the dependency for.
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const drift = ((state >>> 0) % 1000) / 1000 - 0.5;

    value += drift * amplitude;
    // Pulled gently back toward the baseline, so the walk cannot wander off
    // the top or bottom of the box over a long series.
    value += (baseline - value) * 0.18;
    const y = Math.max(6, Math.min(114, value));
    coords.push(`${(i * step).toFixed(1)},${y.toFixed(1)}`);
  }

  return coords.join(" ");
}

const OBSERVED = walk(20260821, 64, 46, 52);
const REPORTED = walk(19980415, 64, 30, 82);

export function ChartDivider({
  /** `observed` is the accent line; `reported` the muted one. */
  variant = "observed",
  /** Fills the area under the line, for the band at the top of a section. */
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
          // Dashed for the reported line, the way a chart marks a modelled
          // series rather than a measured one. The observed line instead uses
          // its dash array to paint in on scroll — see `.divider-draw`.
          strokeDasharray={variant === "reported" ? "5 5" : undefined}
          className={variant === "observed" ? "divider-draw" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
