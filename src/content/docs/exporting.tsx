import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Every dashboard view can be narrowed to a custom date range and downloaded
        as a spreadsheet, so you can slice a specific week and take the raw data
        into Excel, Sheets, or your own analysis.
      </P>

      <H2 id="dates">Custom date ranges</H2>
      <P>
        Alongside the <b>1h / 24h / 7d / 30d</b> presets, the <b>Custom</b> button
        opens a calendar where you pick a start and end date. Every number on the
        page — headline metrics, breakdowns, goals — re-scopes to that window, and
        the comparison automatically uses the equal-length period just before it.
      </P>
      <Ul>
        <Li>Available on both the Home dashboard and Analytics.</Li>
        <Li>The range works together with the site filter and any row filters.</Li>
        <Li>A custom window can span up to a year.</Li>
      </Ul>

      <H2 id="export">Downloading your data</H2>
      <P>
        The <b>Export</b> button downloads the raw events in the current window as{" "}
        <b>Excel</b> (<Code>.xlsx</Code>) or <b>CSV</b> (<Code>.csv</Code>). The
        export honours the same range, site filter, and row filters that are
        active on screen, so you get exactly the slice you&apos;re looking at.
      </P>
      <P>Each row is one event, with columns for:</P>
      <Ul>
        <Li>Timestamp, type (pageview, click, custom, error), and event name.</Li>
        <Li>Path and referrer.</Li>
        <Li>Device, OS, browser, country, and language.</Li>
        <Li>UTM source, medium, and campaign.</Li>
        <Li>Visible duration and scroll depth.</Li>
      </Ul>

      <Callout>
        Exports are privacy-preserving by design: they never include the visitor
        hash, IP address, or session id, so a downloaded file can&apos;t be used to
        re-identify anyone. Large windows are capped at 50,000 rows per download.
      </Callout>
    </>
  );
}

export const exporting: Doc = {
  slug: "exporting",
  title: "Date ranges & export",
  description:
    "Scope any view to a custom date range and download the raw events as Excel or CSV.",
  category: "Tracking",
  order: 10,
  Body,
};
