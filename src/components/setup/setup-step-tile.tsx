export function SetupStepTile({
  n,
  title,
  body,
  children,
}: {
  n: number;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="tile tile--static flex h-full flex-col p-6 sm:p-8">
      <span className="text-[14px] font-semibold text-accent">Step {n}</span>
      <h3 className="mt-2 text-balance text-[1.375rem] font-semibold leading-[1.18] tracking-tight text-fg sm:text-[1.625rem]">
        {title}
      </h3>
      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fg-muted">{body}</p>
      {children && <div className="mt-auto pt-8">{children}</div>}
    </div>
  );
}
