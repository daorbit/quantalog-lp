import { geoArea, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from "geojson";
import topo from "world-atlas/countries-110m.json";

export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 380;

export type CountryShape = {
  id: string;
  name: string;
  d: string;
  anchor: [number, number];
  bounds: [[number, number], [number, number]];
};

function mainland(geometry: Geometry): Polygon | MultiPolygon {
  if (geometry.type !== "MultiPolygon") return geometry as Polygon;
  let best = geometry.coordinates[0];
  let bestArea = -1;
  for (const coordinates of geometry.coordinates) {
    const area = geoArea({ type: "Polygon", coordinates });
    if (area > bestArea) {
      bestArea = area;
      best = coordinates;
    }
  }
  return { type: "Polygon", coordinates: best };
}

let cache: CountryShape[] | null = null;

export function worldShapes(): CountryShape[] {
  if (cache) return cache;
  const atlas = topo as unknown as Parameters<typeof feature>[0] & { objects: { countries: never } };
  const countries = feature(atlas, atlas.objects.countries) as unknown as FeatureCollection;
  const projection = geoMercator()
    .scale(MAP_WIDTH / (2 * Math.PI))
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 1.55]);
  const path = geoPath(projection).digits(1);

  cache = countries.features
    .filter((f: Feature) => f.geometry && f.properties?.name !== "Antarctica")
    .map((f: Feature) => {
      const main = mainland(f.geometry as Geometry);
      return {
        id: String(f.id),
        name: String(f.properties?.name ?? ""),
        d: path(f) ?? "",
        anchor: path.centroid(main),
        bounds: path.bounds(main),
      };
    });
  return cache;
}
