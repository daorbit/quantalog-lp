import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

export function PostCta() {
  return (
    <section className="blog-cta">
      <h2 className="text-balance text-h2 font-semibold leading-[1.06] tracking-display">
        See your own numbers, live.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-pretty text-lead leading-normal text-fg-muted">
        One script tag, no cookies, real-time data in about three seconds. The
        Free plan stays free forever.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          href={`${site.app}/signup`}
          size="lg"
          className="group"
          track="cta_start_free"
          trackProps={{ location: "blog_post" }}
        >
          Start free
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
        <Button href="/plans" variant="secondary" size="lg">
          View plans
        </Button>
      </div>
    </section>
  );
}
