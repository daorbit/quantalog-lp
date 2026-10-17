import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Links</b> puts shortcuts to your team&apos;s other tools,
        such as Stripe, Notion or your CRM, at the top of the sidebar under{" "}
        <b>Links</b>. It is an official Quantalog app: it ships with every
        workspace, but stays off until a workspace admin turns it on.
      </P>

      <H2 id="enable">Turning Links on</H2>
      <P>
        A workspace admin opens <b>Apps</b> in the sidebar, finds{" "}
        <b>Quantalog Links</b> under <b>Quantalog apps</b> and presses{" "}
        <b>Enable</b>. It can also be turned on from{" "}
        <b>Settings → Sidebar</b>, where the links are managed.
      </P>

      <H2 id="adding">Adding a link</H2>
      <Ul>
        <Li>
          Open <b>Settings → Sidebar</b> and press <b>Add link</b> under{" "}
          <b>Custom links</b>.
        </Li>
        <Li>
          Give it a name and a web address. Choose whether it opens in a new
          tab or on a page inside Quantalog.
        </Li>
        <Li>
          The site&apos;s icon is used automatically, or upload your own logo.
          Drag links to reorder them. A workspace can have up to 10.
        </Li>
      </Ul>
      <P>
        Links are shared by everyone in the workspace, and only admins can add,
        edit or reorder them.
      </P>
      <Callout>
        Some sites refuse to be shown inside another app. If a link opened
        inside Quantalog stays blank, switch it to open in a new tab.
      </Callout>
    </>
  );
}

export const quantalogLinks: Doc = {
  slug: "quantalog-links",
  title: "Quantalog Links",
  description: "Turn on the Links app and add shortcuts to your team's other tools at the top of the sidebar.",
  category: "Tracking",
  order: 13.5,
  Body,
};
