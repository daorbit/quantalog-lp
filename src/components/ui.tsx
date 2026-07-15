"use client";

import Link from "next/link";
import { track } from "@/lib/track";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  /** Fire a custom Quantalog event on click, e.g. "cta_start_free". */
  track?: string;
  /** Optional properties sent with the tracked event. */
  trackProps?: Record<string, unknown>;
};

const variants = {
  primary:
    "bg-accent text-accent-fg shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,var(--shadow-md)] hover:brightness-110 active:brightness-95",
  secondary:
    "border border-border bg-surface text-fg shadow-soft hover:border-border-strong hover:bg-surface-raised",
  ghost: "text-fg-muted hover:text-fg",
} as const;

const sizes = {
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  track: event,
  trackProps,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`;
  const internal = href.startsWith("/") || href.startsWith("#");

  const onClick = event
    ? () => track(event, trackProps)
    : undefined;

  return internal ? (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} onClick={onClick}>
      {children}
    </a>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
      <span className="h-px w-6 bg-accent/40" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={centered ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="mt-4 text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem]">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{body}</p>
      )}
    </div>
  );
}
