export type AppMarkSpec = { kind: "quantalog"; id: string } | { kind: "logo"; file: string; wide?: boolean };

export function AppMark({ mark, name }: { mark: AppMarkSpec; name: string }) {
  if (mark.kind === "quantalog") {
    return <img src={`/apps/quantalog-${mark.id}.svg`} alt={name} width={56} height={56} className="h-14 w-14" />;
  }

  return (
    <span className="grid h-14 w-14 place-items-center rounded-[22%] bg-white ring-1 ring-inset ring-black/[0.07]">
      <img src={`/brands/${mark.file}.svg`} alt={name} className={`object-contain ${mark.wide ? "h-3/4 w-3/4" : "h-1/2 w-1/2"}`} />
    </span>
  );
}
