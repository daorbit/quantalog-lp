const RAYS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const point = (r: number) => ({ x: +(Math.cos(angle) * r).toFixed(2), y: +(Math.sin(angle) * r).toFixed(2) });
  return { from: point(5), to: point(12.5), tip: point(15.5) };
});

export function Firework({
  tone,
  delay,
  className = "",
}: {
  tone: "gold" | "rose" | "marigold";
  delay: 0 | 1 | 2 | 3;
  className?: string;
}) {
  return (
    <svg
      viewBox="-20 -20 40 40"
      className={`offer-firework offer-firework--${tone} offer-firework--d${delay} ${className}`}
      aria-hidden="true"
    >
      <path className="offer-firework__trail" d="M0 8v8" />
      <g className="offer-firework__burst">
        {RAYS.map(({ from, to, tip }, i) => (
          <g key={i}>
            <path className="offer-firework__ray" d={`M${from.x} ${from.y}L${to.x} ${to.y}`} />
            <circle className="offer-firework__spark" cx={tip.x} cy={tip.y} r="1.1" />
          </g>
        ))}
        <circle className="offer-firework__core" r="1.8" />
      </g>
    </svg>
  );
}
