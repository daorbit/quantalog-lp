function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PageDate({ published, modified }: { published: string; modified?: string }) {
  const updated = modified && modified !== published;

  return (
    <p className="mx-auto max-w-7xl px-4 pb-6 text-center text-[12px] text-fg-faint">
      Published <time dateTime={published}>{formatDate(published)}</time>
      {updated && (
        <>
          {" "}
          · Last updated <time dateTime={modified}>{formatDate(modified!)}</time>
        </>
      )}
    </p>
  );
}
