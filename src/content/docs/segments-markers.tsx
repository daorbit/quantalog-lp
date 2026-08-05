import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Two small things that make the dashboard yours: <b>segments</b> save a
        filter you keep coming back to, and <b>markers</b> put your deploys and
        campaigns on the chart so a change in traffic has a cause next to it.
      </P>

      <H2 id="segments">Saved segments</H2>
      <P>
        Clicking any row on Analytics filters the whole dashboard by it — a
        country, a browser, a landing page. Stack a few and you have a view like
        &quot;mobile visitors from Google&quot;. Without saving, that view has to
        be rebuilt by hand every time you want it.
      </P>
      <P>
        Once a filter is applied, <b>Save segment</b> appears next to it. Name it
        and it joins the segment list at the top of the page.
      </P>
      <Ul>
        <Li>Click a saved segment to apply it. Click again on a different one to switch.</Li>
        <Li>
          <b>Pin</b> the ones you use daily — pinned segments sit in the bar as
          one-click chips, the rest stay in the menu.
        </Li>
        <Li>Segments belong to a workspace, since the pages and campaigns they reference only exist there.</Li>
        <Li>Names are unique per workspace, so an existing name is reused rather than duplicated.</Li>
      </Ul>

      <H2 id="markers">Timeline markers</H2>
      <P>
        Analytics tells you traffic changed on Tuesday. It cannot tell you a
        release went out Tuesday morning. Markers close that gap: a labelled
        vertical line on the traffic chart for anything worth remembering.
      </P>
      <P>
        The flag icon beside <b>Traffic over time</b> opens the marker dialog.
        Give it a label, pick a kind, and it appears on the chart from that
        moment on.
      </P>
      <Ul>
        <Li><b>Deploy</b> — a release. The default, and the common case.</Li>
        <Li><b>Campaign</b> — an ad going live, a newsletter, a launch post.</Li>
        <Li><b>Incident</b> — an outage or a bug. Drawn in red, so it stands out from routine markers.</Li>
        <Li><b>Note</b> — anything else worth annotating.</Li>
      </Ul>
      <P>
        Markers default to the current time and can be backdated, which is what
        you want when recording something that already happened. Several markers
        landing in the same point on the chart collapse into one line labelled
        with how many.
      </P>

      <H2 id="ci">Marking deploys automatically</H2>
      <P>
        Markers are most useful when nobody has to remember them. Post one from
        CI over the Platform API and every release annotates itself:
      </P>
      <Ul>
        <Li>
          <Code>POST /v1/markers</Code> with your API key, a{" "}
          <Code>label</Code>, and optionally <Code>kind</Code>,{" "}
          <Code>description</Code>, and <Code>at</Code>.
        </Li>
        <Li>
          Omit <Code>at</Code> and the marker is stamped with the moment the
          request arrives — right for a deploy hook.
        </Li>
        <Li>
          <Code>GET /v1/markers</Code> lists the most recent hundred.
        </Li>
      </Ul>
      <P>
        A commit sha in <Code>description</Code> is worth the extra field: six
        months later it is the difference between &quot;something shipped&quot;
        and knowing exactly what.
      </P>

      <Callout>
        Markers are scoped to a workspace and appear on every site in it by
        default. Pass <Code>siteIds</Code> to limit one to specific sites — a
        deploy that only touched one product should not annotate the others.
      </Callout>
    </>
  );
}

export const segmentsMarkers: Doc = {
  slug: "segments-markers",
  title: "Segments & markers",
  description:
    "Save the filters you use often, and annotate your charts with deploys, campaigns, and incidents.",
  category: "Tracking",
  order: 15,
  Body,
};
