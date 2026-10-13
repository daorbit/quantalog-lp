import { MAP_HEIGHT, MAP_WIDTH, worldShapes } from "./world-shapes";
import { buildSpotlights, type Ranked } from "./spotlight";
import { FlagGradients, flagGradientId } from "./flag-gradients";
import { FLAG_PALETTES } from "./flag-palette";
import { CountryCallout } from "./country-callout";
import { AUDIENCE } from "./audience-data";

const SPOTLIGHT_LIMIT = 6;
const GLOW_ID = "wm-spot-glow";

export function rankAudience(): { ranked: Ranked[]; total: number } {
  const shapes = worldShapes();
  const byId = new Map(AUDIENCE.map((row) => [row.id, row]));
  const ranked = shapes
    .filter((shape) => byId.has(shape.id))
    .map((shape) => {
      const row = byId.get(shape.id)!;
      return { shape, code: row.code, count: row.visitors };
    })
    .sort((a, b) => b.count - a.count);
  return { ranked, total: AUDIENCE.reduce((sum, row) => sum + row.visitors, 0) };
}

export function WorldMap() {
  const shapes = worldShapes();
  const { ranked, total } = rankAudience();
  const spots = buildSpotlights(ranked, total, SPOTLIGHT_LIMIT);
  const spotIds = new Set(spots.map((s) => s.shape.id));
  const dataIds = new Set(ranked.map((r) => r.shape.id));
  const max = ranked[0]?.count ?? 1;
  const intensity = (v: number) => Math.log(v + 1) / Math.log(max + 1);
  const ordered = [...ranked.filter((r) => !spotIds.has(r.shape.id)), ...ranked.filter((r) => spotIds.has(r.shape.id))];

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="world-map"
      role="img"
      aria-label="Example map of visitors by country, with the six largest countries labelled"
    >
      <FlagGradients codes={ranked.map((r) => r.code)} />
      <defs>
        <filter id={GLOW_ID} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={2} result="blur" />
          <feComponentTransfer in="blur" result="soft">
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="soft" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {shapes
        .filter((s) => !dataIds.has(s.id))
        .map((s) => (
          <path key={s.id + s.name} d={s.d} className="country" />
        ))}

      {ordered.map((r, i) => {
        const spotlit = spotIds.has(r.shape.id);
        return (
          <path
            key={r.shape.id}
            d={r.shape.d}
            className={`country map-data stage-item${spotlit ? " spotlit" : ""}`}
            fill={FLAG_PALETTES[r.code] ? `url(#${flagGradientId(r.code)})` : "var(--accent)"}
            fillOpacity={spotlit ? 1 : 0.4 + 0.6 * intensity(r.count)}
            filter={spotlit ? `url(#${GLOW_ID})` : undefined}
            style={{ ["--i" as string]: i }}
          />
        );
      })}

      {spots.map((spot, i) => (
        <CountryCallout key={spot.shape.id} spot={spot} order={i} />
      ))}
    </svg>
  );
}
