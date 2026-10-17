import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Notes</b> is a private notepad that floats over any page
        while you work. Jot down ideas, to-dos and findings without leaving the
        report you are looking at. It is an official Quantalog app: it ships
        with every workspace, but stays off until a workspace admin turns it
        on.
      </P>

      <H2 id="enable">Turning Notes on</H2>
      <P>Only workspace admins and owners can turn apps on or off.</P>
      <Ul>
        <Li>
          Open <b>Apps</b>, find <b>Quantalog Notes</b> in
          the <b>Quantalog apps</b> group, press <b>Enable</b>, then{" "}
          <b>Enable Notes</b>.
        </Li>
      </Ul>
      <P>
        The change is instant for everyone in the workspace. Members who are
        not admins see a note asking them to contact an admin.
      </P>

      <H2 id="open">Opening your notes</H2>
      <Ul>
        <Li>
          Press <Code>N</Code> on any page, as long as you are not typing in a
          field.
        </Li>
        <Li>
          Open your account menu at the bottom of the sidebar and choose{" "}
          <b>Notes</b>.
        </Li>
        <Li>
          Press <Code>Ctrl K</Code> (<Code>⌘ K</Code> on a Mac) and choose{" "}
          <b>Open notes</b>, or type part of a note to jump straight to it.
        </Li>
      </Ul>
      <P>
        The panel can be dragged anywhere on screen; double-click its handle to
        put it back. Notes save as you type, and you can pin the ones that
        matter to the top.
      </P>

      <H2 id="privacy">Who can see them</H2>
      <P>
        Notes belong to you, not to the workspace. Teammates never see them,
        and the same notes are there in every workspace that has Notes turned
        on.
      </P>
      <Callout>
        Turning Notes off hides it for everyone in that workspace, but deletes
        nothing. Turn it back on and every note is where you left it.
      </Callout>
    </>
  );
}

export const quantalogNotes: Doc = {
  slug: "quantalog-notes",
  title: "Quantalog Notes",
  description: "Turn on the Notes app and keep private notes that float over any page while you work.",
  category: "Tracking",
  order: 13.4,
  Body,
};
