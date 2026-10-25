import type { PostMeta } from "@/lib/blog";

export function PostImage({
  post,
  className = "",
  sizes,
  priority = false,
}: {
  post: Pick<PostMeta, "slug" | "title" | "image">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (post.image?.url) {
    return (
      <img
        src={post.image.url}
        alt={post.image.alt || post.title}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`post-cover-fallback ${className}`}>
      <img src="/favicon.png" alt="" width={40} height={40} className="post-cover-fallback__mark" />
    </div>
  );
}
