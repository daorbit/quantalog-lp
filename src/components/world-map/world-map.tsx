import { MAP_HEIGHT, MAP_WIDTH, worldShapes } from "./world-shapes";
import { buildSpotlights, formatShare, type Ranked } from "./spotlight";
import { FlagGradients, flagGradientId } from "./flag-gradients";
import { FLAG_PALETTES, flagAccent } from "./flag-palette";
import { CountryCallout } from "./country-callout";
import { AUDIENCE } from "./audience-data";
import { COUNTRY_CODES } from "./country-codes";
import { grouped } from "@/lib/format";

const SPOTLIGHT_LIMIT = 4;
const GLOW_ID = "wm-spot-glow";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const seed = (key: string) => [...key].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9973, 7);

const fillerVisitors = (key: string) => 6 + (seed(key) % 22);

export function rankAudience(): { ranked: Ranked[]; total: number } {
  const byId = new Map(AUDIENCE.map((row) => [row.id, row]));
  const ranked = worldShapes()
    .map((shape) => {
      const row = byId.get(shape.id);
      return { shape, code: row?.code ?? COUNTRY_CODES[shape.id] ?? COUNTRY_CODES[shape.name] ?? "", count: row?.visitors ?? fillerVisitors(shape.id + shape.name) };
    })
    .sort((a, b) => b.count - a.count);
  return { ranked, total: ranked.reduce((sum, r) => sum + r.count, 0) };
}

export function countryName(r: Ranked) {
  const name = r.code ? regionNames.of(r.code) : undefined;
  return name && name !== r.code ? name : r.shape.name;
}

export function WorldMap() {
  const { ranked, total } = rankAudience();
  const spots = buildSpotlights(ranked, total, SPOTLIGHT_LIMIT);
  const spotIds = new Set(spots.map((s) => s.shape.id));
  const max = ranked[0]?.count ?? 1;
  const intensity = (v: number) => Math.log(v + 1) / Math.log(max + 1);
  const ordered = [...ranked.filter((r) => !spotIds.has(r.shape.id)), ...ranked.filter((r) => spotIds.has(r.shape.id))];
  const rankOf = new Map(ranked.map((r, i) => [r, i + 1]));

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="world-map"
      role="img"
      aria-label="Example map of visitors by country, with the largest countries labelled"
    >
      <FlagGradients codes={ranked.map((r) => r.code).filter(Boolean)} />
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

      {ordered.map((r) => {
        const spotlit = spotIds.has(r.shape.id);
        const flag = Boolean(FLAG_PALETTES[r.code]);
        return (
          <path
            key={r.shape.id + r.shape.name}
            d={r.shape.d}
            className={`country map-data${spotlit ? " spotlit" : ""}`}
            fill={flag ? `url(#${flagGradientId(r.code)})` : "var(--accent)"}
            fillOpacity={spotlit ? 1 : flag ? 0.55 + 0.45 * intensity(r.count) : 0.25 + 0.5 * intensity(r.count)}
            filter={spotlit ? `url(#${GLOW_ID})` : undefined}
            data-country={countryName(r)}
            data-tone={flagAccent(r.code) ?? undefined}
            data-rank={rankOf.get(r)}
            data-visitors={grouped(r.count)}
            data-views={grouped(Math.round(r.count * (2 + (seed(r.shape.name) % 12) / 10)))}
            data-share={formatShare(r.count / total)}
          />
        );
      })}

      {spots.map((spot, i) => (
        <CountryCallout key={spot.shape.id} spot={spot} order={i} />
      ))}
    </svg>
  );
}
