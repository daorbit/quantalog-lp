"use client";

import { useEffect, useState } from "react";

/**
 * The "On this page" rail.
 *
 * Reads the headings straight out of the rendered article rather than taking a
 * table of contents as a prop — the doc bodies are hand-authored JSX with
 * `<H2 id>` / `<H3 id>`, and asking every one of them to also export a TOC
 * array is a second copy to keep in sync. The DOM is the source of truth.
 *
 * Scroll position drives the active item: an IntersectionObserver marks a
 * heading active once it crosses into the top of the viewport, so the rail
 * tracks where the reader actually is.
 */

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
        text: el.textContent?.replace(/#$/, "").trim() ?? "",
        depth: el.tagName === "H2" ? (2 as const) : (3 as const),
      }))
      .filter((h) => h.id && h.text);

    setHeadings(found);
    if (found.length) setActiveId(found[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost heading currently intersecting the trigger band wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // A thin band near the top: a heading is "current" from when it reaches
      // roughly a quarter down the viewport until the next one does.
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    found.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="docs-toc" aria-label="On this page">
      <p className="docs-toc-heading">On this page</p>
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
    </nav>
  );
}
