import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ReviewAuthor } from "../testimonials/review-author";
import { featured, reviews } from "../testimonials/reviews";
import { site } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="testimonials">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <h2 className="v-rise mx-auto max-w-3xl text-balance text-center text-h2 font-medium leading-[1.06] tracking-display">
          In their words.
        </h2>

        <figure className="v-rise v-d1 tile tile--static mt-8 p-6 sm:mt-16 sm:p-14">
          <blockquote>
            <p className="text-balance text-[1.3125rem] font-medium leading-[1.25] tracking-tight text-fg sm:text-[2.25rem]">
              &ldquo;{featured.pull}&rdquo;
            </p>
            <p className="mt-5 max-w-3xl text-pretty text-[15px] leading-relaxed text-fg-muted sm:mt-6 sm:text-[17px]">
              {featured.quote}
            </p>
          </blockquote>
          <div className="mt-8">
            <ReviewAuthor review={featured} />
          </div>
        </figure>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {reviews.map((r, i) => (
            <figure key={r.name} className={`v-rise v-d${i + 2} tile tile--static flex flex-col p-6 sm:p-10`}>
              <blockquote className="flex-1 text-pretty text-[15px] leading-relaxed text-fg sm:text-[18px]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <ReviewAuthor review={r} />
              </div>
            </figure>
          ))}
        </div>

        <div className="v-rise mt-10 flex flex-col items-center sm:mt-12 gap-4 text-center">
          <p className="text-[15px] text-fg-muted">
            Join the teams measuring their traffic without a consent banner.
          </p>
          <Button
            href={`${site.app}/signup`}
            className="group"
            track="cta_start_free"
            trackProps={{ location: "testimonials" }}
          >
            Get started free
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
