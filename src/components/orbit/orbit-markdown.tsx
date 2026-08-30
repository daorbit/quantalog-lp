import { Fragment, type ReactNode } from "react";

const INLINE = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
const CODE = /^`([^`]+)`$/;
const BOLD = /^\*\*([^*]+)\*\*$/;
const SAFE_HREF = /^(https?:\/\/|mailto:)/i;

function renderInline(text: string, keyBase: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;

    const link = part.match(LINK);
    if (link) {
      const [, label, href] = link;
      if (!SAFE_HREF.test(href)) return <Fragment key={key}>{label}</Fragment>;
      const external = href.startsWith("http");
      return (
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
        >
          {label}
        </a>
      );
    }

    const code = part.match(CODE);
    if (code) {
      return (
        <code
          key={key}
          className="rounded border border-black/10 bg-black/[0.04] px-1 py-0.5 font-mono text-[0.85em] dark:border-white/15 dark:bg-white/10"
        >
          {code[1]}
        </code>
      );
    }

    const bold = part.match(BOLD);
    if (bold) {
      return (
        <strong key={key} className="font-semibold">
          {bold[1]}
        </strong>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function OrbitMarkdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const numbered = lines.every((l) => /^\s*\d+\.\s+/.test(l));

        if (numbered && lines.length > 1) {
          return (
            <ol key={bi} className="list-decimal space-y-1 pl-5">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*\d+\.\s+/, ""), `${bi}-${li}`)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l, `${bi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
