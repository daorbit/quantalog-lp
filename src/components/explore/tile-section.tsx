import type { ReactNode } from "react";
import { SectionHeading } from "../ui";
import { ExploreTile } from "./explore-tile";
import type { ExploreItem } from "./explore-items";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  items: ExploreItem[];
  children?: ReactNode;
};

export function TileSection({ id, eyebrow, title, body, items, children }: Props) {
  const odd = items.length % 2 === 1;
  const loneClass = "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.375rem)]";

  return (
    <section id={id} className="section-y">
      <div className="px-4">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} centered />
      </div>

      <div className="mt-10 grid gap-3 px-3 sm:mt-16 sm:px-4 lg:grid-cols-2">
        {items.map((item, i) => (
          <div key={item.label} className={odd && i === items.length - 1 ? loneClass : undefined}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>

      {children}
    </section>
  );
}
