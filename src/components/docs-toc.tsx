"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { openOrbit, SUMMARISE_PROMPT } from "./orbit/orbit-open";

type Heading = { id: string; text: string; depth: 2 | 3 };

export function DocsToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

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
    if (found.length) setActiveId(found[0].id);

    const observer = new IntersectionObserver(
      (entries) => {

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },

      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    found.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
        <button
          type="button"
          className="docs-toc-action"
          onClick={() => openOrbit({ ask: SUMMARISE_PROMPT })}
        >
          <Sparkles aria-hidden="true" />
          Summarize with Orbit AI
        </button>
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
