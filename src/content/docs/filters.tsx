import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Filters turn the dashboard into an explorable segment. Click any row in a
        breakdown — a country, a device, a referrer, a page, a UTM source — and
        every number on the page re-scopes to just that slice of traffic.
      </P>

      <H2 id="using">Using filters</H2>
      <Ul>
        <Li>Click a row in any breakdown card to filter by it.</Li>
        <Li>
          Active filters show as chips at the top of the dashboard. Click a chip to
          remove it, or <b>Clear all</b> to reset.
        </Li>
        <Li>
          Stack multiple filters — e.g. <Code>country: US</Code> and{" "}
          <Code>device: mobile</Code> — to narrow to an exact segment.
        </Li>
      </Ul>

      <H2 id="dimensions">Filterable dimensions</H2>
      <P>
        Page, referrer, country, language, device, browser, OS, UTM source, and UTM
        campaign. The real-time &quot;Right now&quot; count stays unfiltered — it
        always reflects everyone currently on the site.
      </P>

      <H2 id="api">Filtering over the API</H2>
      <P>
        The stats endpoints accept a <Code>filter</Code> query parameter in{" "}
        <Code>key:value;key:value</Code> form:
      </P>
      <Callout>
        <Code>
          GET /v1/sites/:siteId/stats?range=7d&amp;filter=country:US;device:mobile
        </Code>
      </Callout>
    </>
  );
}

export const filters: Doc = {
  slug: "filters",
  title: "Filters & segments",
  description:
    "Click any breakdown to re-scope the whole dashboard, stack filters, and query segments over the API.",
  category: "Tracking",
  order: 3,
  Body,
};
