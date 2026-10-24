import type { SimpleIcon } from "simple-icons";
import { isDarkHex } from "@/lib/brand-color";

export type Framework = { name: string; icon: SimpleIcon };

const symbolId = (icon: SimpleIcon) => `fw-${icon.slug}`;

export function FrameworkSprite({ frameworks }: { frameworks: Framework[] }) {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      {frameworks.map(({ icon }) => (
        <symbol key={icon.slug} id={symbolId(icon)} viewBox="0 0 24 24">
          <path d={icon.path} />
        </symbol>
      ))}
    </svg>
  );
}

export function FrameworkMark({ framework }: { framework: Framework }) {
  const { icon } = framework;
  const branded = !isDarkHex(icon.hex);
  const href = `#${symbolId(icon)}`;

  return (
    <span className="logo-mark group flex shrink-0 items-center gap-3 text-fg-faint transition-colors duration-300 hover:text-fg">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="logo-mark__icon shrink-0">
        <use href={href} fill="currentColor" />
        {branded && (
          <use
            href={href}
            fill={`#${icon.hex}`}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </svg>
      <span className="whitespace-nowrap text-[17px] font-medium tracking-tight">{framework.name}</span>
    </span>
  );
}
