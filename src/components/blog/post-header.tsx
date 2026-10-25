import Image from "next/image";
import { formatDate, type Post } from "@/lib/blog";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import { SummariseButton } from "@/components/orbit/summarise-button";

export function PostHeader({ post }: { post: Post }) {
  const [topic] = post.tags;

  return (
    <header className="rise mx-auto max-w-3xl pt-8 text-center sm:pt-14">
      <DocsBreadcrumb
        root={{ label: "Blog", href: "/blog" }}
        trail={[post.title]}
        className="blog-breadcrumb"
      />

      {topic && (
        <p className="blog-meta mt-8 justify-center sm:mt-10">
          <span className="blog-meta__topic">{topic}</span>
        </p>
      )}

      <h1 className={`${topic ? "mt-4" : "mt-8 sm:mt-10"} text-balance text-[2.25rem] font-semibold leading-[1.06] tracking-display sm:text-[3.25rem]`}>
        {post.title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">
        {post.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-3 text-left">
          <Image
            src="/favicon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full ring-1 ring-hairline"
            aria-hidden="true"
          />
          <div className="text-[13px] leading-tight">
            <p className="font-semibold text-fg">{post.author.name}</p>
            <p className="blog-meta mt-1">
              {post.author.role && <span>{post.author.role}</span>}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
            </p>
          </div>
        </div>
        <div className="xl:hidden">
          <SummariseButton />
        </div>
      </div>
    </header>
  );
}
