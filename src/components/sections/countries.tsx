import { DataShowcase } from "../showcase/data-showcase";
import { WorldMap, rankAudience } from "../world-map/world-map";
import { flagAccent } from "../world-map/flag-palette";
import { formatShare } from "../world-map/spotlight";
import { AUDIENCE } from "../world-map/audience-data";
import { compact } from "@/lib/format";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function Countries() {
  const { ranked, total } = rankAudience();

  return (
    <DataShowcase
      eyebrow="Audience"
      title="See where every visitor comes from."
      body="Each country lights up in its own flag colours as visitors arrive, all counted without cookies."
      pill="Visitors by country · last 30 days"
      stats={[
        { label: "Countries", value: String(AUDIENCE.length) },
        { label: "Visitors", value: compact(total) },
        { label: "Cookies set", value: "0" },
      ]}
      footer={
        <ul className="mt-6 divide-y divide-border sm:hidden">
          {ranked.slice(0, 5).map((r) => (
            <li key={r.code} className="flex items-center justify-between py-2.5 text-[13px]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: flagAccent(r.code) ?? "var(--accent)" }} />
                {regionNames.of(r.code)}
              </span>
              <span className="font-semibold tabular-nums">{formatShare(r.count / total)}</span>
            </li>
          ))}
        </ul>
      }
    >
      <WorldMap />
    </DataShowcase>
  );
}
