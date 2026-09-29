import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";
import { PostImage } from "@/components/post-image";

export function PostCard({
  post,
  hidden = false,
}: {
  post: PostMeta;
  hidden?: boolean;
}) {
  const [topic] = post.tags;

  return (
    <Link
      href={`/blog/${post.slug}`}
      hidden={hidden}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`blog-card tile group ${hidden ? "hidden" : "flex"}`}
    >
      <div className="blog-card__media">
        <PostImage
          post={post}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="blog-card__img"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {topic && <p className="blog-kicker">{topic}</p>}
        <h3 className="mt-2 text-balance text-[1.1875rem] font-semibold leading-snug tracking-tight">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-pretty text-[14.5px] leading-relaxed text-fg-muted">
          {post.description}
        </p>
        <time
          dateTime={post.date}
          className="mt-auto pt-6 text-[13px] text-fg-faint"
        >
          {formatDate(post.date)}
        </time>
      </div>
    </Link>
  );
}
