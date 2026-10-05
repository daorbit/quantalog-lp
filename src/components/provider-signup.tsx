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
    <div className={`mx-auto w-full max-w-md ${className}`}>
      <div className="flex items-center gap-3 text-[12px] font-medium text-fg-faint">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        or sign up in one click
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {PROVIDERS.map(({ id, label, Mark }) => (
          <a
            key={id}
            href={`${site.app}/signup?provider=${id}`}
            onClick={() => track("provider_signup", { provider: id, location })}
            aria-label={`Sign up with ${label}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface text-[13.5px] font-semibold text-fg shadow-soft transition-colors duration-200 hover:border-border-strong hover:bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Mark size={16} />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
