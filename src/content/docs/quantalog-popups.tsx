import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Popups</b> shows any published lead capture form as a
        popup or a corner slide-in on your website. It runs through the
        Quantalog tracking script you already installed, so there is no new
        code to add. It is an official Quantalog app that a workspace admin
        turns on in <b>Apps</b>.
      </P>

      <H2 id="create">Creating a popup</H2>
      <Ul>
        <Li>Open <b>Popups</b> in the sidebar and press <b>New popup</b>.</Li>
        <Li>Pick the site and a published form from Lead capture.</Li>
        <Li>Choose when it opens, its style, the pages and the devices.</Li>
      </Ul>
      <P>New popups and changes reach your site within five minutes.</P>

      <H2 id="triggers">When it opens</H2>
      <Ul>
        <Li><b>After a delay</b>: a set number of seconds after the page loads.</Li>
        <Li><b>On scroll</b>: once a visitor reaches a chosen depth of the page.</Li>
        <Li>
          <b>On exit intent</b>: when the cursor leaves towards the browser
          tabs. Phones have no cursor, so there it opens after 20 seconds.
        </Li>
      </Ul>

      <H2 id="targeting">Pages, devices and frequency</H2>
      <P>
        Show a popup on every page, only on some, or everywhere except some.
        Pages are paths such as <Code>/pricing</Code>, and <Code>*</Code> works
        as a wildcard, so <Code>/blog/*</Code> covers every post. <b>Show again
        after</b> sets how many days pass before the same visitor sees it
        again. Anyone who submits the form never sees that popup again.
      </P>

      <H2 id="stats">Views and conversion</H2>
      <P>
        Each popup card shows its views, submissions and conversion rate for
        the last 30 days. These are recorded by the tracking script and do not
        count towards your monthly event allowance.
      </P>
      <Callout>
        Popups load only after the page has finished loading, never for bots,
        and not at all when the script tag has <Code>data-popups="off"</Code>.
      </Callout>
    </>
  );
}

export const quantalogPopups: Doc = {
  slug: "quantalog-popups",
  title: "Quantalog Popups",
  description: "Show your lead capture forms as popups or slide-ins on your site, with timing and page targeting.",
  category: "Tracking",
  order: 13.6,
  Body,
};
