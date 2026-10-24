import { buildWorldMapSvg } from "@/components/world-map/world-map-svg";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(buildWorldMapSvg(), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
