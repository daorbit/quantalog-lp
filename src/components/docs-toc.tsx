"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SummariseWith } from "./orbit/summarise-with";
import { useActiveHeading } from "./use-active-heading";

type Heading = { id: string; text: string; depth: 2 | 3 };

export function DocsToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useActiveHeading(headings.map((h) => h.id));

  useEffect(() => {
    const article = document.querySelector("article .prose-q");
    if (!article) return;

    const found: Heading[] = Array.from(article.querySelectorAll("h2[id], h3[id]"))
      .map((el) => ({
        id: el.id,
        text: el.textContent?.replace(/^#\s*|\s*#$/g, "").trim() ?? "",
        depth: el.tagName === "H2" ? (2 as const) : (3 as const),
      }))
      .filter((h) => h.id && h.text);

    setHeadings(found);
  }, []);

  return (
    <nav className="docs-toc" aria-label="On this page">
      {headings.length >= 2 && (
        <>
          <p className="docs-toc-heading">On this page</p>
          <div className="docs-toc-list">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                data-depth={h.depth}
                className={h.id === activeId ? "is-active" : undefined}
                onClick={() => setActiveId(h.id)}
              >
                {h.text}
              </a>
            ))}
          </div>
        </>
      )}

      <div className="docs-toc-actions">
        <SummariseWith variant="stacked" />
        <button
          type="button"
          className="docs-toc-action"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp aria-hidden="true" />
          Back to top
        </button>
      </div>
    </nav>
  );
}
