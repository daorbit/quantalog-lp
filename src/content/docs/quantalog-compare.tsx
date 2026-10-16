import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Compare</b> puts one page of yours beside up to 10
        competitor pages per site, scores them all the same way, and tells you
        which gaps are worth closing first. It is an official Quantalog app:
        it ships with every workspace, but stays off until a workspace admin
        turns it on.
      </P>

      <H2 id="enable">Turning Compare on</H2>
      <P>Only workspace admins and owners can turn apps on or off. There are two ways:</P>
      <Ul>
        <Li>
          <b>From Connections</b> — open <b>Settings → Connections</b>. The{" "}
          <b>Quantalog apps</b> group sits at the top. Find{" "}
          <b>Quantalog Compare</b> (it carries an <b>Official</b> badge), press{" "}
          <b>Enable</b>, then <b>Enable Compare</b> on the page that opens.
        </Li>
        <Li>
          <b>From the Compare page</b> — open{" "}
          <Code>/app/compare</Code> directly. While the app is off, the page
          shows what Compare does and an <b>Enable Compare</b> button.
        </Li>
      </Ul>
      <P>
        The change is instant for everyone in the workspace — no reload, no
        plan change. Members who are not admins see a note asking them to
        contact an admin instead of the button.
      </P>

      <H2 id="find">Finding Compare in the app</H2>
      <Ul>
        <Li>
          <b>Sidebar</b> — under <b>Analyze</b>, below <b>SEO</b>, with the
          crossed-swords icon. It only appears once the app is on.
        </Li>
        <Li>
          <b>Search</b> — press <Code>Ctrl K</Code> (<Code>⌘ K</Code> on a
          Mac) and type &quot;Compare&quot;.
        </Li>
        <Li>
          <b>On mobile</b> — tap <b>More</b> in the bottom bar; Compare is in
          the <b>Analyze</b> group.
        </Li>
        <Li>
          <b>From Connections</b> — once on, the Quantalog Compare card shows{" "}
          <b>Manage</b>, and its page has an <b>Open Compare</b> button.
        </Li>
      </Ul>
      <Callout>
        Don&apos;t see it in the sidebar? Either the app is still off for this
        workspace, or it was hidden in <b>Settings → Sidebar</b>. Switching
        workspace also switches apps — each workspace turns Compare on for
        itself.
      </Callout>

      <H2 id="use">Using Compare</H2>
      <H3 id="add">Add competitors</H3>
      <P>
        Pick the site at the top of the page if your workspace has more than
        one, then paste a competitor&apos;s page URL and press <b>Add</b>.
        Quantalog fetches their page and yours together, so the two scores are
        measured the same way. Add up to 10 per site; editors and above can
        add and remove them.
      </P>

      <H3 id="read">Read the comparison</H3>
      <Ul>
        <Li>
          <b>Standings</b> — where your page ranks in your set today.
        </Li>
        <Li>
          <b>Score over time</b> — every refresh is kept, so you can follow
          each competitor&apos;s score as it changes.
        </Li>
        <Li>
          <b>Competitor detail</b> — pick a competitor on the left to see
          whether they are ahead, by how much, and a ranked list of what would
          close the gap: missing sections, structured data and prominent terms.
        </Li>
        <Li>
          <b>Ask Orbit</b> — ask what to fix first across every competitor, in
          plain language.
        </Li>
      </Ul>
      <P>
        Press <b>Compare again</b> to re-fetch every competitor and rebuild the
        comparison. The <b>?</b> button at the top explains how scoring works.
      </P>

      <H2 id="disable">Turning Compare off</H2>
      <P>
        In <b>Settings → Connections</b>, open <b>Quantalog Compare</b> and
        press <b>Turn off</b>. Compare leaves the sidebar for everyone, and
        competitor checks stop. Your tracked competitors and their score
        history are kept, so turning it back on picks up where you left off.
      </P>
    </>
  );
}

export const quantalogCompare: Doc = {
  slug: "quantalog-compare",
  title: "Quantalog Compare",
  description:
    "Turn on the Compare app, find it in the sidebar, and see how your pages stack up against up to 10 competitors per site.",
  category: "Tracking",
  order: 13.2,
  Body,
};
