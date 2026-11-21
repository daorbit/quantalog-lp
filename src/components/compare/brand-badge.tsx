import Image from "next/image";
import { ChartLine, ClipboardList, FileChartColumn, ReceiptText, type LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { isDarkHex } from "@/lib/brand-color";
import type { Comparison, ComparisonCategory } from "@/lib/comparison-data/types";
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

type Rival = Pick<Comparison, "rival" | "logo" | "mark" | "category">;

const CATEGORY_ICONS: Record<ComparisonCategory, LucideIcon> = {
  analytics: ChartLine,
  forms: ClipboardList,
  invoicing: ReceiptText,
  reporting: FileChartColumn,
};

export function RivalGlyph({ rival, size = 16, label }: { rival: Rival; size?: number; label?: string }) {
  if (rival.logo) return <BrandGlyph icon={rival.logo} size={size} label={label} />;
  if (rival.mark) {
    return (
      <img
        src={rival.mark.src}
        alt={label ?? ""}
        width={size}
        height={size}
        className={`shrink-0 object-contain ${rival.mark.invertInDark ? "dark:invert" : ""}`}
      />
    );
  }
  const Icon = CATEGORY_ICONS[rival.category];
  return (
    <Icon
      size={size}
      strokeWidth={1.6}
      className="shrink-0 text-fg-muted"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}

export function RivalBadge({ rival, size = "sm" }: { rival: Rival; size?: keyof typeof SIZES }) {
  const { box, glyph } = SIZES[size];
  return (
    <span className={`${BOX} ${box}`}>
      <RivalGlyph rival={rival} size={glyph} label={rival.rival} />
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
