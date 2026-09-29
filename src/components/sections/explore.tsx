import { ExploreTile } from "../explore/explore-tile";
import { exploreItems } from "../explore/explore-items";

export function Explore() {
  return (
    <section id="features" className="py-14 sm:py-28">
      <div className="v-rise mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-balance text-h2 font-medium leading-[1.06] tracking-display">
          One place for every number that matters.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          Analytics, search, SEO, forms and AI built on the same data, so nothing has to be copied between tools.
        </p>
      </div>

      <div className="mt-8 grid gap-2 sm:mt-16 lg:grid-cols-2">
        {exploreItems.map((item, i) => (
          <div
            key={item.label}
            className={`v-rise ${i % 2 ? "v-d2" : "v-d1"} ${item.wide ? "lg:col-span-2" : ""}`}
          >
            <ExploreTile item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
