import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        The Media Library is the one place files enter Quantalog — every
        image, video, and document you upload lives here, whether you add it
        directly or pick it from inside another screen, like choosing a logo
        in Branding.
      </P>

      <H2 id="uploading">Uploading files</H2>
      <P>
        Drag a file anywhere onto the page, or use the <b>Upload</b> button.
        Uploads appear in a floating tray showing each file as uploading,
        done, or errored. Files are capped at 25MB.
      </P>

      <H2 id="browsing">Browsing and filtering</H2>
      <Ul>
        <Li>Search by file name.</Li>
        <Li>Filter by kind — All, Images, Video, or Files.</Li>
        <Li>Click a tile to preview it, rename it, or delete it.</Li>
      </Ul>

      <H2 id="bulk">Selecting and deleting multiple files</H2>
      <P>
        Switch into selection mode to check multiple tiles at once, then use
        the bulk delete action that appears in the bar above the grid.
      </P>

      <Callout>
        Deleting a file breaks any place that still links to it — a form
        field, a branding logo, an email template. Quantalog does not scan
        for those references before you delete.
      </Callout>
    </>
  );
}

export const mediaLibrary: Doc = {
  slug: "media-library",
  title: "Media library",
  description:
    "Upload, browse, and manage the images, videos, and files used across your workspace.",
  category: "Workspace",
  order: 3,
  Body,
};
