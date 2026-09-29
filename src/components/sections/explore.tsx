import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExploreCarousel } from "../explore/explore-carousel";

export function Explore() {
  return (
    <section id="explore" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <h2 className="v-rise text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Get to know every part.
        </h2>
        <Link
          href="/docs"
          className="v-rise group inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
        >
          Read the docs
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="v-rise v-d2 mt-10 sm:mt-12">
        <ExploreCarousel />
      </div>
    </section>
  );
}
