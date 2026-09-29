import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";
import { PostImage } from "@/components/post-image";

export function FeaturedPost({ post }: { post: PostMeta }) {
  const [topic] = post.tags;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-featured tile group grid overflow-hidden lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
    >
      <div className="blog-card__media blog-featured__media">
        <PostImage
          post={post}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="blog-card__img"
        />
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <p className="blog-kicker">
          <span className="blog-pill">Latest</span>
          {topic && <span>{topic}</span>}
        </p>
        <h2 className="mt-4 text-balance text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.1] tracking-display">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-pretty text-[15.5px] leading-relaxed text-fg-muted sm:text-base">
          {post.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <time dateTime={post.date} className="text-[13px] text-fg-faint">
            {formatDate(post.date)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
