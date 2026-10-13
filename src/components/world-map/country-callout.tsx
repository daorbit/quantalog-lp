import { CALLOUT, formatShare, type Spotlight } from "./spotlight";

export function CountryCallout({ spot, order }: { spot: Spotlight; order: number }) {
  const [ax, ay] = spot.shape.anchor;

  return (
    <g className="map-callout" style={{ ["--i" as string]: order }}>
      <path d={spot.leader} className="map-callout-line" stroke={spot.tone} />
      <circle cx={ax} cy={ay} r={4 * spot.unit} className="map-callout-halo" fill={spot.tone} />
      <circle cx={ax} cy={ay} r={2.2 * spot.unit} className="map-callout-anchor" />
      <g transform={`translate(${spot.x} ${spot.y}) scale(${spot.unit})`}>
        <rect width={spot.width} height={CALLOUT.height} rx={CALLOUT.radius} className="map-callout-box" stroke={spot.tone} />
        <circle cx={12} cy={14} r={3.6} fill={spot.tone} />
        <text x={CALLOUT.padLeft} y={17.5} className="map-callout-name">
          {spot.label}
        </text>
        <text x={CALLOUT.padLeft} y={33} className="map-callout-value">
          {formatShare(spot.share)}
        </text>
      </g>
    </g>
  );
}
