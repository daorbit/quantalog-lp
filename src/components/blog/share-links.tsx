"use client";

import { useState } from "react";
import { Check, Link2, Linkedin } from "lucide-react";
import { siX } from "simple-icons";

export function ShareLinks({
  url,
  title,
  vertical = false,
}: {
  url: string;
  title: string;
  vertical?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const encoded = encodeURIComponent(url);

  return (
    <div className={`blog-share ${vertical ? "blog-share--vertical" : ""}`}>
      <a
        href={`https://x.com/intent/post?url=${encoded}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="blog-share__btn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={siX.path} fill="currentColor" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="blog-share__btn"
      >
        <Linkedin aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        data-copied={copied}
        className="blog-share__btn"
      >
        {copied ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
      </button>
    </div>
  );
}
