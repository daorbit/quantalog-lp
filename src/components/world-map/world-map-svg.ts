import { MAP_HEIGHT, MAP_WIDTH } from "./world-shapes";
import { CALLOUT, buildSpotlights, formatShare, type Spotlight } from "./spotlight";
import { FLAG_PALETTES, GRADIENT_VECTOR, flagAccent } from "./flag-palette";
import { countryName, rankAudience, seed } from "./audience-rank";
import { grouped } from "@/lib/format";
import { escapeXml } from "@/lib/escape-xml";

const SPOTLIGHT_LIMIT = 4;
const GLOW_ID = "wm-spot-glow";

const flagGradientId = (code: string) => `wm-flag-${code}`;

function attrs(values: Record<string, string | number | undefined>): string {
  return Object.entries(values)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => ` ${key}="${escapeXml(String(value))}"`)
    .join("");
}

function gradients(codes: string[]): string {
  return codes
    .map((code) => {
      const palette = FLAG_PALETTES[code];
      if (!palette) return "";
      const { x2, y2 } = GRADIENT_VECTOR[palette.dir];
      const last = palette.colors.length - 1;
      const stops = palette.colors
        .map((color, i) => `<stop${attrs({ offset: last === 0 ? 0 : i / last, "stop-color": color })}/>`)
        .join("");
      return `<linearGradient${attrs({ id: flagGradientId(code), x1: 0, y1: 0, x2, y2 })}>${stops}</linearGradient>`;
    })
    .join("");
}

const GLOW_FILTER =
  `<filter id="${GLOW_ID}" x="-30%" y="-30%" width="160%" height="160%">` +
  `<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>` +
  `<feComponentTransfer in="blur" result="soft"><feFuncA type="linear" slope="0.3"/></feComponentTransfer>` +
  `<feMerge><feMergeNode in="soft"/><feMergeNode in="SourceGraphic"/></feMerge>` +
  `</filter>`;

function callout(spot: Spotlight, order: number): string {
  const [ax, ay] = spot.shape.anchor;
  return (
    `<g class="map-callout" style="--i:${order}">` +
    `<path${attrs({ d: spot.leader, class: "map-callout-line", stroke: spot.tone })}/>` +
    `<circle${attrs({ cx: ax, cy: ay, r: 4 * spot.unit, class: "map-callout-halo", fill: spot.tone })}/>` +
    `<circle${attrs({ cx: ax, cy: ay, r: 2.2 * spot.unit, class: "map-callout-anchor" })}/>` +
    `<g transform="translate(${spot.x} ${spot.y}) scale(${spot.unit})">` +
    `<rect${attrs({ width: spot.width, height: CALLOUT.height, rx: CALLOUT.radius, class: "map-callout-box", stroke: spot.tone })}/>` +
    `<circle${attrs({ cx: 12, cy: 14, r: 3.6, fill: spot.tone })}/>` +
    `<text${attrs({ x: CALLOUT.padLeft, y: 17.5, class: "map-callout-name" })}>${escapeXml(spot.label)}</text>` +
    `<text${attrs({ x: CALLOUT.padLeft, y: 33, class: "map-callout-value" })}>${formatShare(spot.share)}</text>` +
    `</g></g>`
  );
}

export function buildWorldMapSvg(): string {
  const { ranked, total } = rankAudience();
  const spots = buildSpotlights(ranked, total, SPOTLIGHT_LIMIT);
  const spotIds = new Set(spots.map((s) => s.shape.id));
  const max = ranked[0]?.count ?? 1;
  const intensity = (v: number) => Math.log(v + 1) / Math.log(max + 1);
  const ordered = [...ranked.filter((r) => !spotIds.has(r.shape.id)), ...ranked.filter((r) => spotIds.has(r.shape.id))];
  const rankOf = new Map(ranked.map((r, i) => [r, i + 1]));

  const countries = ordered
    .map((r) => {
      const spotlit = spotIds.has(r.shape.id);
      const flag = Boolean(FLAG_PALETTES[r.code]);
      return `<path${attrs({
        d: r.shape.d.replace(/L/g, " "),
        class: `country map-data${spotlit ? " spotlit" : ""}`,
        fill: flag ? `url(#${flagGradientId(r.code)})` : "var(--accent)",
        "fill-opacity": spotlit ? 1 : flag ? 0.55 + 0.45 * intensity(r.count) : 0.25 + 0.5 * intensity(r.count),
        filter: spotlit ? `url(#${GLOW_ID})` : undefined,
        "data-country": countryName(r),
        "data-tone": flagAccent(r.code) ?? undefined,
        "data-rank": rankOf.get(r),
        "data-visitors": grouped(r.count),
        "data-views": grouped(Math.round(r.count * (2 + (seed(r.shape.name) % 12) / 10))),
        "data-share": formatShare(r.count / total),
      })}/>`;
    })
    .join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}" class="world-map" role="img" aria-label="Example map of visitors by country, with the largest countries labelled">` +
    `<defs>${gradients(ranked.map((r) => r.code).filter(Boolean))}${GLOW_FILTER}</defs>` +
    countries +
    spots.map(callout).join("") +
    `</svg>`
  );
}
