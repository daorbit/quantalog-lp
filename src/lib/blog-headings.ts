export type PostHeading = { id: string; text: string; level: 2 | 3 };

const HEADING = /<h([23])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi;

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "section"
  );
}

export function withHeadingIds(html: string): { html: string; headings: PostHeading[] } {
  const headings: PostHeading[] = [];
  const used = new Map<string, number>();

  const next = html.replace(HEADING, (match, level: string, attrs: string, inner: string) => {
    const text = plainText(inner);
    if (!text) return match;

    const existing = /\sid="([^"]+)"/i.exec(attrs)?.[1];
    let id = existing ?? slugify(text);
    if (!existing) {
      const count = used.get(id) ?? 0;
      used.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;
    }

    headings.push({ id, text, level: level === "2" ? 2 : 3 });
    return existing ? match : `<h${level} id="${id}"${attrs}>${inner}</h${level}>`;
  });

  return { html: next, headings };
}
