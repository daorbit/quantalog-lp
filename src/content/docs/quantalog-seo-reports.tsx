import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog SEO Reports</b> gives every SEO audit a read-only report at
        its own link. Send it to a client or a teammate and they can open it
        without a Quantalog account. It is an official Quantalog app that a
        workspace admin turns on in <b>Apps</b>.
      </P>

      <H2 id="share">Sharing an audit</H2>
      <Ul>
        <Li>Open <b>Apps</b> and select <b>Quantalog SEO Reports</b>.</Li>
        <Li>Every audited page is listed with its own live link.</Li>
        <Li>Copy a link and send it, or open it to see exactly what the reader sees.</Li>
      </Ul>
      <P>
        Running the audit on a page again keeps the same link, and the link
        shows the newest result. Each page has its own link, so sharing one
        never exposes the rest of the site&apos;s history.
      </P>

      <H2 id="sections">Choosing what is visible</H2>
      <P>
        One set of choices under <b>What readers see</b> applies to every report
        link. The score, issues, technical checks and performance are on by
        default. Meta tags, content, the full link list, structured data and AI
        search start off, because they can carry internal URLs or staging paths.
        Anything switched off is removed on the server, so it never reaches the
        reader.
      </P>

      <H2 id="opens">Opens and replacing a link</H2>
      <P>
        Each page shows how often its link was opened. Choose <b>Replace
        link</b> from the row&apos;s menu if a link reached the wrong person: the
        old address stops working at once. <b>Remove page</b> deletes every
        audit of that page, for example one audited by mistake, and its link
        stops working.
      </P>

      <Callout>
        Turning the app off keeps your links and settings, but every report link
        stops opening until you turn it back on.
      </Callout>
    </>
  );
}

export const quantalogSeoReports: Doc = {
  slug: "quantalog-seo-reports",
  title: "Quantalog SEO Reports",
  description: "Every SEO audit gets a read-only report link, and you choose which sections readers see.",
  category: "Tracking",
  order: 12.5,
  Body,
};
