import { SectionHeading } from "../ui";
import { WorldMap, rankAudience } from "../world-map/world-map";
import { flagAccent } from "../world-map/flag-palette";
import { formatShare } from "../world-map/spotlight";
import { AUDIENCE } from "../world-map/audience-data";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function compact(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function Countries() {
  const { ranked, total } = rankAudience();
  const stats = [
    { label: "Countries", value: String(AUDIENCE.length) },
    { label: "Visitors", value: compact(total) },
    { label: "Cookies set", value: "0" },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Audience"
          title="See where every visitor comes from."
          body="Each country lights up in its own flag colours as visitors arrive, all counted without cookies."
          centered
        />
        <div className="v-rise mt-6 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[12.5px] text-fg-muted">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Visitors by country · last 30 days
          </span>
        </div>
      </div>

      <div className="map-stage mx-auto mt-10 w-full max-w-400 sm:mt-14">
        <WorldMap />
      </div>

      <div className="mx-auto max-w-360 px-4 sm:px-6">
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

        <div className="v-rise mx-auto mt-12 grid max-w-2xl grid-cols-3 text-center">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[1.75rem] font-semibold tracking-[-0.03em] tabular-nums sm:text-[2rem]">{value}</p>
              <p className="mt-1 text-[13px] text-fg-faint">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
