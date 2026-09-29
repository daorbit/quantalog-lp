import type { Review } from "./reviews";

function initials(name: string) {
  const parts = name.split(" ");
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function ReviewAuthor({ review }: { review: Review }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[14px] font-semibold text-accent"
        aria-hidden="true"
      >
        {initials(review.name)}
      </span>
      <span className="min-w-0 text-left">
        <span className="block truncate text-[15px] font-semibold text-fg">{review.name}</span>
        <span className="block truncate text-[13px] text-fg-muted">{review.role}</span>
      </span>
    </figcaption>
  );
}
