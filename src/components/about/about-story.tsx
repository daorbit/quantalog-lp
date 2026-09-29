import Link from "next/link";
import { SplitStory } from "../split-story";

export function AboutStory() {
  return (
    <SplitStory eyebrow="Our story" title="Why we built Quantalog.">
      <p>
        <span className="font-semibold text-fg">Cookie-based analytics has a gap it cannot close.</span>{" "}
        It needs consent before it records anything, a large share of visitors decline, and those
        who decline are systematically different from those who accept. The result is not a smaller
        sample of your audience — it is a biased one, and every decision built on it inherits that bias.
      </p>
      <p>
        <span className="font-semibold text-fg">We removed the need for consent instead.</span>{" "}
        When nothing is stored in the browser and no personal data leaves it, there is nothing to ask
        permission for, nothing to decline and nobody missing from the count.
      </p>
      <p>
        <span className="font-semibold text-fg">Then we put the rest of the picture beside it.</span>{" "}
        Traffic shows who arrived, not who never did. Instead of paying for separate analytics and SEO
        tools and correlating them by hand, Quantalog places{" "}
        <Link href="/seo-audits" className="font-medium text-accent hover:underline">
          SEO audits
        </Link>
        ,{" "}
        <Link href="/search-visibility" className="font-medium text-accent hover:underline">
          search visibility
        </Link>{" "}
        and{" "}
        <Link href="/reports" className="font-medium text-accent hover:underline">
          scheduled reports
        </Link>{" "}
        in the same dashboard as the traffic they explain.
      </p>
    </SplitStory>
  );
}
