"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { GitHubMark, GoogleMark, LinkedInMark } from "./auth-marks";

const PROVIDERS = [
  { id: "google", label: "Google", Mark: GoogleMark },
  { id: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { id: "github", label: "GitHub", Mark: GitHubMark },
] as const;

const ALIGN = {
  center: "justify-center",
  start: "justify-start",
  responsive: "justify-center xl:justify-start",
  responsiveLg: "justify-center lg:justify-start",
} as const;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ProviderSignup({
  location,
  align = "center",
  variant = "icons",
  className = "",
}: {
  location: string;
  align?: keyof typeof ALIGN;
  variant?: "icons" | "buttons";
  className?: string;
}) {
  const href = (id: string) => `${site.app}/signup?provider=${id}`;
  const onClick = (id: string) => () => track("provider_signup", { provider: id, location });

  if (variant === "buttons") {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.08em] text-fg-faint">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          or continue with
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {PROVIDERS.map(({ id, label, Mark }) => (
            <a
              key={id}
              href={href(id)}
              onClick={onClick(id)}
              aria-label={`Sign up with ${label}`}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface text-[14px] font-medium text-fg transition-colors duration-200 hover:border-border-strong hover:bg-bg-subtle ${FOCUS}`}
            >
              <Mark size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${ALIGN[align]} ${className}`}>
      <span className="mr-1.5 text-[13px] text-fg-faint">Or continue with</span>
      {PROVIDERS.map(({ id, label, Mark }) => (
        <a
          key={id}
          href={href(id)}
          onClick={onClick(id)}
          aria-label={`Sign up with ${label}`}
          title={label}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-fg transition-colors duration-200 hover:border-border-strong hover:bg-bg-subtle ${FOCUS}`}
        >
          <Mark size={14} />
        </a>
      ))}
    </div>
  );
}
