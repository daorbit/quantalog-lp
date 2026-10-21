import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog SEO Reports</b> turns any SEO audit into a read-only report
        at its own link. Send it to a client or a teammate and they can open it
        without a Quantalog account. It is an official Quantalog app that a
        workspace admin turns on in <b>Apps</b>.
      </P>

      <H2 id="share">Sharing an audit</H2>
      <Ul>
        <Li>Open <b>Public sharing</b> in the sidebar and choose the <b>SEO reports</b> tab.</Li>
        <Li>Pick the site, then open the audited page you want to share.</Li>
        <Li>Switch the link on, copy it, and send it.</Li>
      </Ul>
      <P>
        Each audited page has its own link, so sharing one never exposes the
        rest of the site&apos;s history. Running the audit again keeps the same
        link and shows the newest result.
      </P>

      <H2 id="sections">Choosing what is visible</H2>
      <P>
        The score, issues, technical checks and performance are on by default.
        Meta tags, content, the full link list, structured data and AI search
        start off, because they can carry internal URLs or staging paths.
        Anything switched off is removed on the server, so it never reaches the
        reader.
      </P>

      <H2 id="opens">Opens and replacing a link</H2>
      <P>
        Each report shows how often its link was opened and when. Use <b>New
        link</b> if a link reached the wrong person: the old address stops
        working at once.
      </P>

      <Callout>
        Turning the app off keeps your links and their settings, but every
        shared report stops opening until you turn it back on.
      </Callout>
    </>
  );
}

export const quantalogSeoReports: Doc = {
  slug: "quantalog-seo-reports",
  title: "Quantalog SEO Reports",
  description: "Share any SEO audit as a read-only report at its own link, and choose which sections a client sees.",
  category: "Tracking",
  order: 12.5,
  Body,
};
