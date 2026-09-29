import { Fragment, type ReactNode } from "react";

// Line-based renderer for Orbit replies, ported from real-ana-fe's RichText:
// headings, nested bullet/numbered lists, tables, fenced code, and inline
// links / code / bold.

const FENCE = /```([a-zA-Z0-9_+-]*)\n?([\s\S]*?)```/g;
const INLINE = /(\[[^\]]+\]\([^)\s]+\))|(`[^`\n]+`)|(\*\*[^*\n]+\*\*)/g;
const SAFE_HREF = /^(https?:\/\/|mailto:)/i;

const HEADING = /^(#{1,6})\s+(.+)$/;
const BULLET = /^([ \t]*)[-*•]\s+(.+)$/;
const NUMBERED = /^([ \t]*)(\d+)[.)]\s+(.+)$/;
const TABLE_ROW = /^\s*\|(.+)\|\s*$/;
const TABLE_SEPARATOR = /^\s*\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/;

function renderInline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let cursor = 0;
  let n = 0;

  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > cursor) out.push(text.slice(cursor, at));
    const [token, link, code, bold] = match;
    const key = `${keyBase}-${n++}`;

    if (link) {
      const close = link.indexOf("](");
      const label = link.slice(1, close);
      const href = link.slice(close + 2, -1);
      if (!SAFE_HREF.test(href)) {
        out.push(<Fragment key={key}>{label}</Fragment>);
      } else {
        const external = href.startsWith("http");
        out.push(
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            {label}
          </a>,
        );
      }
    } else if (code) {
      out.push(
        <code
          key={key}
          className="rounded border border-black/10 bg-black/[0.04] px-1 py-0.5 font-mono text-[0.85em] break-all dark:border-white/15 dark:bg-white/10"
        >
          {code.slice(1, -1)}
        </code>,
      );
    } else if (bold) {
      out.push(
        <strong key={key} className="font-semibold text-fg">
          {renderInline(bold.slice(2, -2), key)}
        </strong>,
      );
    }

    cursor = at + token.length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

function listMatch(line: string) {
  const num = NUMBERED.exec(line);
  if (num) return { ordered: true, indent: num[1].length, n: Number(num[2]), text: num[3] };
  const bullet = BULLET.exec(line);
  if (bullet) return { ordered: false, indent: bullet[1].length, n: 0, text: bullet[2] };
  return null;
}

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableStart(lines: string[], i: number): boolean {
  return (
    TABLE_ROW.test(lines[i]) &&
    i + 1 < lines.length &&
    TABLE_SEPARATOR.test(lines[i + 1]) &&
    tableCells(lines[i]).length === tableCells(lines[i + 1]).length
  );
}

function renderTable(lines: string[], start: number, key: string) {
  const header = tableCells(lines[start]);
  let i = start + 2;
  const rows: string[][] = [];
  while (i < lines.length && TABLE_ROW.test(lines[i])) {
    rows.push(tableCells(lines[i]));
    i++;
  }

  const node = (
    <div key={key} className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.85em]">
        <thead>
          <tr>
            {header.map((cell, ci) => (
              <th
                key={ci}
                className="border border-black/10 bg-black/[0.03] px-2 py-1 text-left font-semibold dark:border-white/15 dark:bg-white/5"
              >
                {renderInline(cell, `${key}-h${ci}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-black/10 px-2 py-1 align-top dark:border-white/15">
                  {renderInline(cell, `${key}-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return { node, next: i };
}

function renderList(lines: string[], start: number, key: string): { node: ReactNode; next: number } {
  const first = listMatch(lines[start])!;
  const { ordered, indent } = first;
  const items: { text: string; children: ReactNode[] }[] = [];
  let i = start;

  while (i < lines.length) {
    const m = listMatch(lines[i]);
    if (!m || m.indent !== indent || m.ordered !== ordered) break;
    i++;

    const item = { text: m.text, children: [] as ReactNode[] };

    for (;;) {
      // Look past blank lines: models often space items (and their
      // sub-points) out, which must not split or restart the list.
      let j = i;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j >= lines.length) break;

      const next = listMatch(lines[j]);
      if (next && next.indent > indent) {
        const nested = renderList(lines, j, `${key}-${items.length}-${item.children.length}`);
        item.children.push(nested.node);
        i = nested.next;
        continue;
      }
      // An indented plain line directly under an item continues its text.
      if (!next && j === i && /^[ \t]+\S/.test(lines[j]) && !HEADING.test(lines[j].trim())) {
        item.text += `\n${lines[j].trim()}`;
        i = j + 1;
        continue;
      }
      if (next && next.indent === indent && next.ordered === ordered) i = j;
      break;
    }

    items.push(item);
  }

  const Tag = ordered ? "ol" : "ul";
  const node = (
    <Tag
      key={key}
      start={ordered && first.n !== 1 ? first.n : undefined}
      className={`${ordered ? "list-decimal" : "list-disc"} space-y-1 pl-5 marker:text-fg-muted`}
    >
      {items.map((item, idx) => (
        <li key={idx} className="pl-0.5">
          {item.text.split("\n").map((l, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {renderInline(l, `${key}-${idx}-${li}`)}
            </Fragment>
          ))}
          {item.children.length > 0 && <div className="mt-1 space-y-1">{item.children}</div>}
        </li>
      ))}
    </Tag>
  );

  return { node, next: i };
}

function renderBlocks(text: string, keyBase: string): ReactNode[] {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let n = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `${keyBase}-${n++}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    const heading = HEADING.exec(line.trim());
    if (heading) {
      out.push(
        <p key={key} className="pt-1 font-semibold text-fg">
          {renderInline(heading[2], key)}
        </p>,
      );
      i++;
      continue;
    }

    if (listMatch(line)) {
      const list = renderList(lines, i, key);
      out.push(list.node);
      i = list.next;
      continue;
    }

    if (isTableStart(lines, i)) {
      const table = renderTable(lines, i, key);
      out.push(table.node);
      i = table.next;
      continue;
    }

    const start = i;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !HEADING.test(lines[i].trim()) &&
      !listMatch(lines[i]) &&
      !isTableStart(lines, i)
    ) {
      i++;
    }
    out.push(
      <p key={key}>
        {lines.slice(start, i).map((l, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {renderInline(l, `${key}-${li}`)}
          </Fragment>
        ))}
      </p>,
    );
  }

  return out;
}

export function OrbitMarkdown({ text }: { text: string }) {
  const src = text.replace(/\r\n?/g, "\n").trim();
  const out: ReactNode[] = [];
  let cursor = 0;
  let n = 0;

  for (const match of src.matchAll(FENCE)) {
    const at = match.index ?? 0;
    if (at > cursor) out.push(...renderBlocks(src.slice(cursor, at), `b${n++}`));
    out.push(
      <pre
        key={`c${n++}`}
        className="overflow-x-auto rounded-lg border border-black/10 bg-black/[0.04] p-3 font-mono text-[0.85em] leading-snug dark:border-white/15 dark:bg-white/10"
      >
        <code>{match[2].replace(/\n$/, "")}</code>
      </pre>,
    );
    cursor = at + match[0].length;
  }
  if (cursor < src.length) out.push(...renderBlocks(src.slice(cursor), `b${n++}`));

  return <div className="min-w-0 space-y-2 text-sm leading-relaxed">{out}</div>;
}
