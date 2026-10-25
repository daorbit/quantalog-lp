import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";
import { PostImage } from "@/components/post-image";

export function FeaturedPost({ post }: { post: PostMeta }) {
  const [topic] = post.tags;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-14"
    >
      <div className="blog-cover aspect-video">
        <PostImage post={post} priority sizes="(min-width: 1024px) 40rem, 100vw" />
      </div>

      <div>
        <p className="blog-meta">
          <span className="blog-meta__topic">Latest</span>
          {topic && <span>{topic}</span>}
        </p>
        <h2 className="mt-3 text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-fg transition-colors group-hover:text-fg-muted sm:text-[2.5rem]">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-pretty text-[15px] leading-relaxed text-fg-muted sm:text-[17px]">
          {post.description}
        </p>
        <p className="blog-meta mt-6">
          <span className="font-medium text-fg">{post.author.name}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <span className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent group-hover:underline group-hover:underline-offset-4">
          Read article
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
