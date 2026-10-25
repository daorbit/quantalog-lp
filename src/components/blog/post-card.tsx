import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";
import { PostImage } from "@/components/post-image";

export function PostCard({ post }: { post: PostMeta }) {
  const [topic] = post.tags;

  return (
    <Link href={`/blog/${post.slug}`} className="blog-item group">
      <div className="blog-cover blog-item__cover">
        <PostImage post={post} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 8.5rem" />
      </div>

      <div className="min-w-0">
        <p className="blog-meta">
          {topic && <span className="blog-meta__topic">{topic}</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-1.5 text-balance text-[15px] font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-fg-muted sm:mt-2 sm:text-[1.1875rem]">
          {post.title}
        </h3>
        <div className="mt-2 hidden sm:block">
          <p className="line-clamp-2 text-pretty text-[14.5px] leading-relaxed text-fg-muted">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
