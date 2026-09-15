import { readFile } from "node:fs/promises";
import path from "node:path";
import { getDoc, getDocSlugs } from "./docs";


const CODE_TAGS = new Set(["Pre", "Code"]);

function stripExpressions(jsx: string): string {
  let out = "";
  let depth = 0;

  for (let i = 0; i < jsx.length; i += 1) {
    const ch = jsx[i];

    if (ch === "{") {
      // `{"…"}` and `{" "}` are the common literal escapes and carry real text
      // — a dropped `{" "}` welds two words together.
      const literal = /^\{\s*(['"])([\s\S]*?)\1\s*\}/.exec(jsx.slice(i));
      if (literal && depth === 0) {
        out += literal[2];
        i += literal[0].length - 1;
        continue;
      }
      depth += 1;
      continue;
    }

    if (ch === "}") {
      depth = Math.max(0, depth - 1);
      continue;
    }

    if (depth === 0) out += ch;
  }

  return out;
}

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

/**
 * Reduce one page's JSX body to markdown.
 *
 * Ordered replacements rather than a parser: the input is not arbitrary JSX but
 * the output of a known, small component vocabulary, and the alternative is a
 * parser dependency in the site's bundle to read files it already owns.
 */
function jsxToMarkdown(source: string): string {
  // The body is everything the `Body()` component returns, between its
  // fragment markers.
  const fragment = /return\s*\(\s*<>([\s\S]*?)<\/>\s*\)\s*;?\s*\}/.exec(source);
  let out = fragment ? fragment[1] : source;

  // Fenced blocks first, before their contents meet the inline rules below.
  out = out.replace(
    /<Pre(?:\s+label=\{?["']([^"']*)["']\}?)?[^>]*>\{?`([\s\S]*?)`\}?<\/Pre>/g,
    (_m, label: string | undefined, code: string) =>
      `\n\n${label ? `${label}:\n` : ""}\`\`\`\n${code.trim()}\n\`\`\`\n\n`,
  );
  out = out.replace(
    /<Pre[^>]*>([\s\S]*?)<\/Pre>/g,
    (_m, code: string) => `\n\n\`\`\`\n${stripExpressions(code).trim()}\n\`\`\`\n\n`,
  );

  out = out
    .replace(/<H2[^>]*>([\s\S]*?)<\/H2>/g, "\n\n### $1\n\n")
    .replace(/<H3[^>]*>([\s\S]*?)<\/H3>/g, "\n\n#### $1\n\n")
    .replace(/<Li[^>]*>([\s\S]*?)<\/Li>/g, "\n- $1")
    .replace(/<Code[^>]*>([\s\S]*?)<\/Code>/g, "`$1`")
    .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, "\n\nNote: $1\n\n")
    .replace(/<\/(P|Ul|Ol|Table|Tr)>/g, "\n\n");

  out = stripExpressions(out);

  // Whatever tags remain are structural; their text is the content.
  out = out.replace(/<\/?[A-Za-z][^>]*>/g, "");

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

async function readDocSource(slug: string): Promise<string> {
  const file = path.join(process.cwd(), "src", "content", "docs", `${slug}.tsx`);
  return readFile(file, "utf8");
}

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
}): Promise<DocSection> {
  const body = jsxToMarkdown(await readDocSource(doc.slug));

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

/** Every documentation page, in the order the docs nav presents them. */
export async function renderCorpus(): Promise<string> {
  const docs = getDocSlugs()
    .map((slug) => getDoc(slug))
    .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));

  const sections = await Promise.all(docs.map(renderDocMarkdown));

  return sections.map((section) => section.body).join("\n\n");
}

export { CODE_TAGS };
