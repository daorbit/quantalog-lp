import { siGithub, siX, type SimpleIcon } from "simple-icons";
import { site } from "@/lib/site";

const socials: { label: string; href: string; icon: SimpleIcon }[] = [
  { label: "X", href: `https://x.com/${site.twitter.replace("@", "")}`, icon: siX },
  { label: "GitHub", href: site.github, icon: siGithub },
];

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-4">
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${s.label}`}
            className="flex h-8 w-8 items-center justify-center text-fg transition-opacity hover:opacity-60"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={s.icon.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
