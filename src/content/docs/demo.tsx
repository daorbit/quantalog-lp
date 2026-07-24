import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        The live demo opens a fully populated workspace without an account. It is
        the fastest way to see what the dashboard looks like with real traffic in
        it, before deciding whether to install anything.
      </P>

      <H2 id="starting">Starting the demo</H2>
      <P>
        On the login page, choose <b>Explore the live demo</b>. You are taken
        straight into the app — no email, no password, no card.
      </P>
      <P>
        To leave, use <b>Exit demo</b> in the sidebar. That ends the session and
        returns you to the login page; nothing is kept on your machine afterwards
        beyond the usual sign-in token, which is discarded.
      </P>

      <H2 id="whats-in-it">What you can look at</H2>
      <Ul>
        <Li>
          <b>The dashboard</b> — a month of traffic across two sample sites, with
          live visitors, top pages, referrers, countries, devices, funnels and
          conversion goals all populated.
        </Li>
        <Li>
          <b>A full SEO audit</b> — scores, issues, meta tags, content analysis,
          structured data, a link check and Core Web Vitals, plus history across
          earlier runs so the trend chart has something to show.
        </Li>
        <Li>
          <b>Sharing</b> — the public dashboard and shared-report screens, so you
          can see what a client receives on the other end of a link.
        </Li>
        <Li>
          <b>Everything else</b> — workspaces, sites, the developer/API page and
          the settings screens, all reachable.
        </Li>
      </Ul>

      <H2 id="read-only">It is read-only</H2>
      <P>
        Creating, editing and deleting are turned off throughout. Buttons still
        appear where they normally would — hiding them would misrepresent the
        product — but using one tells you the demo is read-only rather than doing
        anything. The sidebar carries a <b>Demo mode</b> note for as long as the
        session lasts.
      </P>

      <H2 id="data">The data is not real</H2>
      <P>
        Every figure in the demo is generated in your browser. There is no demo
        account on our servers, no shared database behind it, and nothing you do
        is recorded or visible to anyone else. Two consequences worth knowing:
      </P>
      <Ul>
        <Li>
          The numbers are illustrative. They are shaped to look like plausible
          traffic, not to benchmark anything.
        </Li>
        <Li>
          Nothing carries over. Starting the demo again gives you the same sample
          workspace from scratch.
        </Li>
      </Ul>

      <Callout>
        The demo is limited to a few sessions per address per day, so it stays
        available. If you hit the limit, the login page tells you when you can
        start another — or you can create a free account, which has no such cap.
      </Callout>
    </>
  );
}

export const demo: Doc = {
  slug: "demo",
  title: "Live demo",
  description:
    "Open a fully populated, read-only workspace without an account — what it contains, what is disabled, and why the data is not real.",
  category: "Getting started",
  order: 3,
  Body,
};
