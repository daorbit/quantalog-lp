import type { SimpleIcon } from "simple-icons";

export type Framework = { name: string; icon: SimpleIcon };

function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.18;
}

export function FrameworkMark({ framework }: { framework: Framework }) {
  const { icon } = framework;
  const branded = !isDark(icon.hex);

  return (
    <span className="logo-mark group flex shrink-0 items-center gap-3 text-fg-faint transition-colors duration-300 hover:text-fg">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="logo-mark__icon shrink-0">
        <path d={icon.path} fill="currentColor" />
        {branded && (
          <path
            d={icon.path}
            fill={`#${icon.hex}`}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </svg>
      <span className="whitespace-nowrap text-[17px] font-medium tracking-tight">{framework.name}</span>
    </span>
  );
}
