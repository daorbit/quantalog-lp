import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Broken pages cost you visitors silently. Quantalog forwards uncaught
        JavaScript errors and failed page resources so you can see which pages are
        breaking, and how often, without wiring up a separate error monitor.
      </P>

      <H2 id="what">What&apos;s captured</H2>
      <Ul>
        <Li>Uncaught exceptions (<Code>window.onerror</Code>).</Li>
        <Li>Unhandled promise rejections.</Li>
        <Li>Failed resource loads — an image or script that 404s.</Li>
      </Ul>
      <P>
        Errors are grouped by message and the page they happened on, and shown
        under <b>Analytics → Errors</b> or the <b>JS errors</b> Home widget, newest
        and most frequent first.
      </P>

      <H2 id="privacy">Privacy &amp; limits</H2>
      <P>
        Only the error <b>message</b> and the page path are sent — never stack
        contents, variable values, or personal data. Each page reports at most a
        handful of errors so a single broken page can&apos;t flood your dashboard.
      </P>

      <Callout>
        Requires tracker <b>v3</b> or newer. Turn error reporting off with{" "}
        <Code>data-errors=&quot;off&quot;</Code> on the tracking script if you already
        run a dedicated error monitor.
      </Callout>
    </>
  );
}

export const errorTracking: Doc = {
  slug: "error-tracking",
  title: "Error tracking",
  description:
    "Surface uncaught JavaScript errors and broken resources per page, straight from the tracker.",
  category: "Tracking",
  order: 9,
  Body,
};
