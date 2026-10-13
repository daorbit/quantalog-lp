import { ExploreTile } from "../explore/explore-tile";
import { exploreItems } from "../explore/explore-items";

export function Explore() {
  return (
    <section id="features" className="section-y">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Everything your website needs to grow.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          Analytics, lead capture, reports, social posts, SEO and AI in one workspace, so nothing has to be copied between tools.
        </p>
      </div>

      <div className="mt-8 grid gap-2 sm:mt-16 lg:grid-cols-2">
        {exploreItems.map((item) => (
          <div
            key={item.label}
            className={item.wide ? "lg:col-span-2" : undefined}
          >
            <ExploreTile item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
