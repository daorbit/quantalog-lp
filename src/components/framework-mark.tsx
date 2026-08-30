import type { SimpleIcon } from "simple-icons";

const MONOCHROME = new Set(["Next.js", "Remix", "Express", "Flask"]);

export type Framework = { name: string; icon: SimpleIcon };

export function FrameworkMark({ framework }: { framework: Framework }) {
  return (
    <span className="group flex shrink-0 items-center gap-2.5 text-fg-faint transition-colors duration-300 hover:text-fg">
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        aria-hidden="true"
        className="shrink-0 opacity-55 transition-opacity duration-300 group-hover:opacity-100"
        fill={MONOCHROME.has(framework.name) ? "currentColor" : `#${framework.icon.hex}`}
      >
        <path d={framework.icon.path} />
      </svg>
      <span className="whitespace-nowrap text-sm font-medium tracking-tight">
        {framework.name}
      </span>
    </span>
  );
}
