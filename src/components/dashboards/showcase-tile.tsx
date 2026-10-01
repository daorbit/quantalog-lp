export function ShowcaseTile({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tile tile--static flex h-full flex-col p-6 sm:p-9">
      <span className="text-[14px] font-semibold text-accent">{label}</span>
      <span className="mt-2 block text-balance text-[1.375rem] font-semibold leading-[1.18] tracking-tight text-fg sm:text-[2rem]">
        {title}
      </span>
      <span className="mt-3 block max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">{body}</span>
      <span className="mt-auto block pt-8">{children}</span>
    </div>
  );
}
