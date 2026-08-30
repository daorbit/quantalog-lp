export function ConsentFlow() {
  return (
    <svg
      viewBox="0 0 520 260"
      className="h-auto w-full"
      role="img"
      aria-label="A visitor's path splits in two. The route to cookie-based analytics passes through a consent banner and an ad-blocker, losing visitors at each. The route to Quantalog passes through neither and arrives whole."
    >

      <path
        d="M96 130 C 140 130, 150 62, 196 62"
        fill="none"
        stroke="var(--fg-faint)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M264 62 H 316"
        fill="none"
        stroke="var(--fg-faint)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M384 62 H 436"
        fill="none"
        stroke="var(--fg-faint)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="4 7"
        opacity="0.3"
      />

      <path
        d="M96 130 C 150 130, 160 198, 436 198"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.85"
      />

      <Node x={40} y={112} label="Your site" />
      <Node x={196} y={44} label="Cookie banner" muted />
      <Node x={316} y={44} label="Ad-blocker" muted />
      <Node x={436} y={44} label="Cookie tool" muted />
      <Node x={436} y={180} label="Quantalog" accent />

      <text
        x={230}
        y={104}
        className="fill-fg-faint"
        fontSize="10.5"
        textAnchor="middle"
      >
        visitors lost at each step
      </text>
      <text
        x={250}
        y={228}
        className="fill-accent"
        fontSize="10.5"
        textAnchor="middle"
      >
        every visit counted
      </text>
    </svg>
  );
}

function Node({
  x,
  y,
  label,
  muted = false,
  accent = false,
}: {
  x: number;
  y: number;
  label: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={68}
        height={36}
        rx={9}
        fill="var(--surface)"
        stroke={accent ? "var(--accent)" : "var(--border)"}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + 34}
        y={y + 22}
        textAnchor="middle"
        fontSize="9.5"
        className={accent ? "fill-accent" : muted ? "fill-fg-faint" : "fill-fg"}
        fontWeight={accent ? 600 : 500}
      >
        {label}
      </text>
    </g>
  );
}
