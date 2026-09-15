

import type { ComponentType } from "react";

/** Tags whose entire subtree is dropped: controls, not content. */
const DROP_RE = /<(button|script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi;

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // Ampersand last: decoding it first would let "&amp;lt;" become "<".
    .replace(/&amp;/g, "&");
}


function htmlToMarkdown(html: string): string {
  let out = html;

  out = out.replace(DROP_RE, "");


  out = out.replace(
    /<pre\b[^>]*>\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_m, code: string) => `\n\n\`\`\`\n${decodeEntities(code).trim()}\n\`\`\`\n\n`,
  );

  // The anchor-link "#" that every heading carries for deep linking is
  // navigation, and reads as a stray character once the markup is gone.
  out = out.replace(/<a\b[^>]*class="[^"]*anchor-link[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "");

  out = out
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n### $1\n\n")
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n### $1\n\n")
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n#### $1\n\n")
    .replace(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n#### $1\n\n");

  out = out
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    // A callout is a note in prose. Its leading icon is a glyph in its own
    // span, which has to go before the tags are stripped — afterwards it is
    // welded to the first word of the text ("iA missing key returns 401").
    .replace(
      /<aside\b[^>]*>([\s\S]*?)<\/aside>/gi,
      (_m, inner: string) =>
        `\n\nNote: ${inner.replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/i, "")}\n\n`,
    )
    .replace(/<\/(p|ul|ol|div|figure|figcaption|section|aside|table|tr)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n");

  // Links are flattened to their text. Orbit is given an explicit list of pages
  // it may link to and told to link nothing else, so carrying a relative href
  // into the reference would only invite it to repeat a URL that means nothing
  // in a chat reply.
  out = out.replace(/<[^>]+>/g, "");

  return decodeEntities(out)
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export type DocSection = {
  slug: string;
  title: string;
  description: string;
  /** The page as markdown, under a `## ` heading of its title. */
  body: string;
};

/**
 * One page as markdown.
 *
 * The heading level matters downstream: Orbit's retrieval splits its reference
 * on `## `, so one page is one selectable section, and the `H2`s within a page
 * become `###` to sit beneath it.
 */
export async function renderDocMarkdown(doc: {
  slug: string;
  title: string;
  description: string;
  Body: ComponentType;
}): Promise<DocSection> {
  // Imported here rather than at the top of the file. Next.js rejects a module
  // that pulls in `react-dom/server` at build time — the warning exists because
  // rendering a component to a string inside another component defeats
  // streaming — but this is a route handler producing a text file, not a page,
  // and the import has to stay out of the bundler's static graph to say so.
  const { renderToStaticMarkup } = await import("react-dom/server");

  const { Body } = doc;
  const body = htmlToMarkdown(renderToStaticMarkup(<Body />));

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    // The slug rides along on the heading line. Orbit is given an explicit list
    // of pages it may link to, and deriving that list from the corpus is what
    // stops the two drifting — a page it can quote is a page it can link, by
    // construction rather than by someone remembering both.
    body: `## ${doc.title} [/docs/${doc.slug}]\n\n${doc.description}\n\n${body}`,
  };
}
