import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog A/B Tests</b> splits your visitors between the original
        version of a page and up to three variants, and shows which one gets
        more people to your goal. It runs through the Quantalog tracking
        script. It is an official Quantalog app that a workspace admin unlocks
        in <b>Apps</b>.
      </P>

      <H2 id="opt-in">Turning tests on for a site</H2>
      <P>
        Add <Code>data-experiments="on"</Code> to the Quantalog tracking tag on
        the site you want to test. With it, the tracker applies a variant
        before the page shows, so visitors never see the original flash
        first. While it loads the test settings, the page stays hidden for at
        most 0.8 seconds, and after that the settings are reused for five
        minutes. Sites without the attribute are not affected.
      </P>

      <H2 id="types">Three kinds of test</H2>
      <Ul>
        <Li>
          <b>Page changes</b>: pick an element with a CSS selector such as{" "}
          <Code>h1</Code> or <Code>.cta-button</Code>, then replace its text,
          hide it, change a link or image address, or add CSS.
        </Li>
        <Li>
          <b>Split URL</b>: visitors in a variant group are sent to a
          different page as soon as they land, with the address query kept.
        </Li>
        <Li>
          <b>Code</b>: your developer reads the visitor&apos;s group with{" "}
          <Code>rta.variant(&quot;your-test-key&quot;, function (variant) {"{ … }"})</Code>{" "}
          and builds the change. The original group is called{" "}
          <Code>control</Code>, the others <Code>b</Code>, <Code>c</Code> and{" "}
          <Code>d</Code>.
        </Li>
      </Ul>

      <H2 id="goal">Goal and results</H2>
      <P>
        A goal is a page, such as <Code>/thank-you</Code>, or a custom event
        you track with <Code>rta.track()</Code>. A visitor counts as converted
        when they reach the goal in the same visit, after seeing the test. The
        results show visitors, conversions and conversion rate for each group,
        the change against the original, and the chance each variant beats
        it. A winner is called once each group has at least 100 visitors and
        a variant is 95% likely to be better, or the original is 95% likely
        to be better than every variant.
      </P>

      <H2 id="lifecycle">Starting, pausing and ending</H2>
      <Ul>
        <Li>New tests are saved as drafts. Press <b>Start test</b> to begin splitting visitors.</Li>
        <Li>Pause a test to change it. While paused, everyone sees the original.</Li>
        <Li>
          End a test and pick the winner. For page changes and split URL
          tests you can keep showing the winner to every visitor until you
          update your site.
        </Li>
      </Ul>
      <P>
        Each visitor keeps the same group on every visit. Free runs 1 test at
        a time, Starter 3 and Pro 10. Test views do not count towards your
        monthly event allowance.
      </P>
      <Callout>Tests never run for bots, and not at all on sites whose tracking tag does not have <Code>data-experiments="on"</Code>.</Callout>
    </>
  );
}

export const quantalogExperiments: Doc = {
  slug: "quantalog-experiments",
  title: "Quantalog A/B Tests",
  description: "Test page changes, split URLs or code variants against the original and see which one converts better.",
  category: "Tracking",
  order: 13.8,
  Body,
};
