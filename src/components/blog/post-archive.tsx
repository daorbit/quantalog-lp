import type { PostMeta } from "@/lib/blog";
import { groupByMonth } from "./archive-groups";
import { ArchiveRow } from "./archive-row";

export function PostArchive({ posts, limit }: { posts: PostMeta[]; limit: number }) {
  return (
    <div className="space-y-10 sm:space-y-12">
      {groupByMonth(posts).map((group) => {
        const groupHidden = group.entries.every(({ index }) => index >= limit);
        return (
          <section key={group.month} hidden={groupHidden} className="archive-group">
            <h3 className="archive-group__title">
              {group.month}
              <span className="archive-group__count">{group.entries.length}</span>
            </h3>
            <ul className="archive-group__list">
              {group.entries.map(({ post, index }) => (
                <ArchiveRow key={post.slug} post={post} hidden={index >= limit} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
