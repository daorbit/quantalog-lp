"use client";

import Link from "next/link";
import { track } from "@/lib/track";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;

  track?: string;

  trackProps?: Record<string, unknown>;
};

const variants = {
  primary:
    "bg-accent text-accent-fg shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,var(--shadow-md)] hover:brightness-110 hover:-translate-y-px active:translate-y-0 active:brightness-95",
  secondary:
    "glass text-fg hover:-translate-y-px active:translate-y-0",
  ghost: "text-fg-muted hover:text-fg",
} as const;

const sizes = {
  md: "px-3.5 py-1.5 text-[13px] sm:px-4 sm:py-2 sm:text-sm",

  lg: "px-4 py-2.5 text-[13.5px] sm:px-6 sm:py-3.5 sm:text-[0.9375rem]",
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
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;
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

export function Eyebrow({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <p className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-fg-muted">
      {dot && (
        <span
          className="live-dot h-1.5 w-1.5 rounded-full bg-accent"
          aria-hidden="true"
        />
      )}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
  align,
  size = "md",
  dot = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;

  centered?: boolean;
  align?: "left" | "center";
  size?: "md" | "lg";
  dot?: boolean;
  className?: string;
}) {
  const isCentered = align ? align === "center" : centered;

  return (
    <div
      className={`${
        isCentered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      } ${className}`}
    >
      {eyebrow && (
        <div className={isCentered ? "flex justify-center" : ""}>
          <Eyebrow dot={dot}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`mt-5 text-balance leading-[1.08] tracking-[-0.03em] ${
          size === "lg" ? "text-display font-medium" : "text-h2 font-medium"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-5 text-pretty text-lead leading-relaxed text-fg-muted ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function GlowCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      onMouseMove={onMouseMove}
      className={`glow-card edge-lit glass spring-hover rounded-2xl ${className}`}
    >
      <span className="glow-layer" aria-hidden="true" />
      {children}
    </Tag>
  );
}
