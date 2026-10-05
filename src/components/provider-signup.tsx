"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { GitHubMark, GoogleMark, LinkedInMark } from "./auth-marks";

const PROVIDERS = [
  { id: "google", label: "Google", Mark: GoogleMark },
  { id: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { id: "github", label: "GitHub", Mark: GitHubMark },
] as const;

export function ProviderSignup({ location, className = "" }: { location: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className="mr-1 text-[13px] text-fg-faint">or sign up with</span>
      {PROVIDERS.map(({ id, label, Mark }) => (
        <a
          key={id}
          href={`${site.app}/signup?provider=${id}`}
          onClick={() => track("provider_signup", { provider: id, location })}
          aria-label={`Sign up with ${label}`}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-[13px] font-medium text-fg transition-colors duration-200 hover:border-border-strong hover:bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Mark size={14} />
          {label}
        </a>
      ))}
    </div>
  );
}
