import { ExploreTile } from "../explore/explore-tile";
import { SectionHeading } from "../ui";
import { exploreItems } from "../explore/explore-items";

export function Explore() {
  return (
    <section id="features" className="section-y">
      <div className="px-4">
        <SectionHeading
          eyebrow="Platform"
          title="Everything your website needs to grow."
          body="Analytics, lead capture, reports, social posts, SEO and AI in one workspace, so nothing has to be copied between tools."
          centered
        />
      </div>

      <div className="mt-10 grid gap-3 px-3 sm:mt-16 sm:px-4 lg:grid-cols-2">
        {exploreItems.map((item) => (
          <div key={item.label}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
