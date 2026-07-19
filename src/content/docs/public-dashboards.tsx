import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A public dashboard is a read-only view of one workspace at a link anyone
        can open — no account, no login. Use it to give a client their numbers,
        put traffic on an office screen, or publish stats openly without handing
        out access to your Quantalog account.
      </P>

      <H2 id="enable">Turning it on</H2>
      <P>
        Open <b>Public dashboard</b> in the sidebar, pick the workspace you want
        to publish, and switch it on. Quantalog mints a link and shows it
        straight away. Copy it, or open it in a new tab to see exactly what a
        visitor sees.
      </P>
      <P>
        Sharing is per workspace. A workspace covers every site inside it, and
        the public page shows those sites combined rather than broken out
        individually.
      </P>

      <H2 id="panels">Choosing what is visible</H2>
      <P>
        Fourteen panels can be published, grouped by what they tell you:
      </P>
      <Ul>
        <Li><b>Overview</b> — headline numbers, traffic chart, engagement, new vs returning.</Li>
        <Li><b>Content</b> — top pages, entry pages, exit pages.</Li>
        <Li><b>Acquisition</b> — top sources, channels.</Li>
        <Li><b>Audience</b> — countries, languages, devices, browsers, operating systems.</Li>
      </Ul>
      <P>
        Anything switched off is never sent to the public page at all. It is
        left out of the response on the server, not hidden in the browser, so a
        visitor cannot recover it by reading the network tab or the page source.
      </P>

      <Callout>
        Page paths are the panel worth a second thought. Top pages, entry pages
        and exit pages publish real URLs from your site — if those include
        internal routes like <code>/admin/invoices/acme-corp</code>, leave the
        Content panels off.
      </Callout>

      <H2 id="never-shared">What is never shared</H2>
      <P>
        Some things are withheld no matter how the panels are set:
      </P>
      <Ul>
        <Li>Your site keys — these are the tracking credentials, and a leaked one lets anyone write events into your analytics.</Li>
        <Li>Workspace and site settings, and your team members.</Li>
        <Li>Raw events, visitor hashes, and IP addresses.</Li>
        <Li>Per-site breakdowns within the workspace.</Li>
      </Ul>
      <P>
        The public page is read-only. It cannot send events, change settings, or
        reach any other part of your account.
      </P>

      <H2 id="link">Treat the link like a password</H2>
      <P>
        The token in the URL is the entire credential. Anyone holding it sees
        the dashboard, so a link pasted into a public channel or an indexed page
        is effectively public. Quantalog asks search engines not to index shared
        dashboards, but that is a request, not a guarantee.
      </P>
      <P>
        If a link reaches someone it should not have, use <b>New link</b>. The
        old URL stops working immediately, and everyone you sent it to will need
        the replacement. Switching sharing off instead keeps the token, so the
        same URL works again when you switch it back on — that is usually what
        you want for a temporary pause.
      </P>

      <H2 id="range">Ranges and freshness</H2>
      <P>
        Visitors can switch between 24 hours, 7 days and 30 days. Any other
        range falls back to 30 days. Numbers are live — the page reflects the
        same data your own dashboard does, including visitors online right now.
      </P>

      <H2 id="views">Seeing who opened it</H2>
      <P>
        The settings page counts how many times the link has been opened and
        when it was last viewed. Only the first load of a session counts, so a
        visitor clicking between ranges registers once rather than four times.
        The count resets when you replace the link.
      </P>

      <Callout>
        Panels added after a workspace started sharing default to off. An
        existing public link never begins showing new data because Quantalog
        shipped a release — new panels are always yours to turn on.
      </Callout>
    </>
  );
}

export const publicDashboards: Doc = {
  slug: "public-dashboards",
  title: "Public dashboards",
  description:
    "Share a read-only view of a workspace at a link anyone can open, and control exactly which panels are visible.",
  category: "Tracking",
  order: 12,
  Body,
};
