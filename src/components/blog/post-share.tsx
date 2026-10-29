"use client";

import { Check, Link2 } from "lucide-react";
import { siX } from "simple-icons";
import { track } from "@/lib/track";
import { LinkedInMark } from "../auth-marks";
import { BrandGlyph } from "../compare/brand-badge";
import { useCopyText } from "../use-copy-text";

const COPIED_MS = 2000;

export function PostShare({ url, title }: { url: string; title: string }) {
  const { copied, copy } = useCopyText(COPIED_MS);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const onCopy = async () => {
    if (await copy(url)) track("blog_share", { channel: "copy" });
  };

  return (
    <div className="post-share" role="group" aria-label="Share this article">
      <button type="button" onClick={onCopy} className="post-share__btn" aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("blog_share", { channel: "x" })}
        className="post-share__btn"
        aria-label="Share on X"
      >
        <BrandGlyph icon={siX} size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("blog_share", { channel: "linkedin" })}
        className="post-share__btn"
        aria-label="Share on LinkedIn"
      >
        <LinkedInMark size={15} />
      </a>
    </div>
  );
}
