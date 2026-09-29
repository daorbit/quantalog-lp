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
  primary: "bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.99]",
  secondary:
    "border border-border bg-surface text-fg hover:border-border-strong hover:bg-bg-subtle active:scale-[0.99]",
  ghost: "text-fg-muted hover:text-fg",
} as const;

const sizes = {
  md: "h-9 px-4 text-[14px]",
  lg: "h-11 px-5 text-[14px] sm:h-12 sm:px-6 sm:text-[15px]",
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
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;
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
    <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent sm:text-[17px]">
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
        className={`mt-3 text-balance font-medium leading-[1.06] tracking-display ${
          size === "lg" ? "text-display" : "text-h2"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-5 text-pretty text-lead leading-normal text-fg-muted ${
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
  return <Tag className={`glow-card soft-card ${className}`}>{children}</Tag>;
}
