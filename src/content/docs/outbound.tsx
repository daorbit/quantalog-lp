import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Quantalog automatically tracks the links that take people <b>off</b> your
        site â€” outbound links to other domains, and clicks that download a file â€”
        so you can see where visitors go when they leave and which resources get
        pulled.
      </P>

      <H2 id="what">What&apos;s tracked</H2>
      <Ul>
        <Li>
          <b>Outbound</b> â€” a click on an <Code>&lt;a&gt;</Code> whose host differs
          from your own.
        </Li>
        <Li>
          <b>Downloads</b> â€” a link to a file: pdf, zip, csv, xlsx, mp4, dmg, and
          other common document, archive, and media types.
        </Li>
      </Ul>
      <P>
        Both are grouped by destination and shown under <b>Analytics â†’ Clicks</b>,
        or add the <b>Outbound &amp; downloads</b> widget to your Home dashboard.
      </P>

      <H2 id="control">Opting out</H2>
      <P>
        This rides on the same click tracking as CTAs. Turn all click tracking off
        with <Code>data-clicks=&quot;off&quot;</Code> on the tracking script, or skip a
        single element with <Code>data-va-ignore</Code>.
      </P>

      <Callout>
        Requires tracker <b>v3</b> or newer. Sites still on an older script keep
        working â€” they just won&apos;t report outbound clicks until the snippet is
        updated.
      </Callout>
    </>
  );
}

export const outbound: Doc = {
  slug: "outbound",
  title: "Outbound & downloads",
  description:
    "Automatically track clicks that leave your site and clicks that download a file.",
  category: "Tracking",
  order: 9,
  Body,
};
