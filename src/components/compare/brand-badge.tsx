import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import { isDarkHex } from "@/lib/brand-color";
import { site } from "@/lib/site";

const SIZES = {
  sm: { box: "h-11 w-11", glyph: 22 },
  lg: { box: "h-16 w-16 sm:h-20 sm:w-20", glyph: 34 },
} as const;

const BOX =
  "flex shrink-0 items-center justify-center rounded-full bg-surface text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle";

export function BrandGlyph({
  icon,
  size = 16,
  label,
}: {
  icon: Pick<SimpleIcon, "path" | "hex">;
  size?: number;
  label?: string;
}) {
  const fill = isDarkHex(icon.hex) ? "currentColor" : `#${icon.hex}`;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <path d={icon.path} fill={fill} />
    </svg>
  );
}

export function BrandBadge({ icon, size = "sm" }: { icon: SimpleIcon; size?: keyof typeof SIZES }) {
  const { box, glyph } = SIZES[size];
  return (
    <span className={`${BOX} ${box}`}>
      <BrandGlyph icon={icon} size={glyph} label={icon.title} />
    </span>
  );
}

export function QuantalogBadge({ size = "sm" }: { size?: keyof typeof SIZES }) {
  const { box, glyph } = SIZES[size];
  return (
    <span className={`${BOX} ${box}`}>
      <Image src="/favicon.png" alt={site.name} width={glyph} height={glyph} />
    </span>
  );
}
