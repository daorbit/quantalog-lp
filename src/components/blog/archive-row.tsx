import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDay, type PostMeta } from "@/lib/blog";

export function ArchiveRow({ post, hidden }: { post: PostMeta; hidden: boolean }) {
  const [topic] = post.tags;

  return (
    <li hidden={hidden}>
      <Link href={`/blog/${post.slug}`} tabIndex={hidden ? -1 : undefined} className="archive-row group">
        <time dateTime={post.date} className="archive-row__date">
          {formatDay(post.date)}
        </time>

        <div className="min-w-0">
          <p className="text-pretty text-[15px] font-semibold leading-snug tracking-tight text-fg sm:text-[16px]">
            {post.title}
          </p>
          {post.description && (
            <p className="mt-1 line-clamp-1 text-[14px] text-fg-muted">{post.description}</p>
          )}
          {topic && <p className="archive-row__topic">{topic}</p>}
        </div>

        <ArrowUpRight className="archive-row__arrow" aria-hidden="true" />
      </Link>
    </li>
  );
}
