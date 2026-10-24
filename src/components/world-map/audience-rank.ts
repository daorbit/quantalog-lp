import { worldShapes } from "./world-shapes";
import type { Ranked } from "./spotlight";
import { AUDIENCE } from "./audience-data";
import { COUNTRY_CODES } from "./country-codes";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const seed = (key: string) => [...key].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9973, 7);

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
