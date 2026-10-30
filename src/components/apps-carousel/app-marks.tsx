export type AppMarkSpec =
  | { kind: "quantalog"; id: string; file?: string }
  | { kind: "logo"; file: string; wide?: boolean };

const SIZES = {
  md: { box: "h-14 w-14", px: 56 },
  sm: { box: "h-10 w-10", px: 40 },
  xs: { box: "h-8 w-8", px: 32 },
} as const;

export function AppMark({ mark, name, size = "md" }: { mark: AppMarkSpec; name: string; size?: keyof typeof SIZES }) {
  const { box, px } = SIZES[size];

  if (mark.kind === "quantalog") {
    const src = `/apps/${mark.file ?? `quantalog-${mark.id}.svg`}?v=9`;
    return <img src={src} alt={name} width={px} height={px} className={box} />;
  }

  return (
    <span className={`grid ${box} shrink-0 place-items-center rounded-[22%] bg-white ring-1 ring-inset ring-black/[0.07]`}>
      <img src={`/brands/${mark.file}.svg`} alt={name} className={`object-contain ${mark.wide ? "h-3/4 w-3/4" : "h-1/2 w-1/2"}`} />
    </span>
  );
}
