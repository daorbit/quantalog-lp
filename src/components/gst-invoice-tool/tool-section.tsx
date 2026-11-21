export function ToolSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 id={id} className="text-[19px] font-semibold tracking-tight text-fg">
        {title}
      </h2>
      {description && <p className="mt-1 text-pretty text-[14px] leading-relaxed text-fg-muted">{description}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}
