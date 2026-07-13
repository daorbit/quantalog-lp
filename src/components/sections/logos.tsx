// Wordmark-only social proof. No fake brand logos — just the frameworks the
// tracker is verified against, which is a claim we can actually stand behind.
const frameworks = [
  "Next.js",
  "React",
  "Vue",
  "SvelteKit",
  "Astro",
  "Remix",
  "Nuxt",
  "WordPress",
  "Shopify",
  "Webflow",
];

export function Logos() {
  const track = [...frameworks, ...frameworks];

  return (
    <section className="border-y border-border bg-bg-subtle py-10">
      <p className="text-center text-xs uppercase tracking-[0.14em] text-fg-faint">
        Verified against
      </p>
      <div className="marquee-mask mt-6 overflow-hidden">
        <ul className="marquee-track flex items-center gap-12" aria-label="Supported frameworks">
          {track.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= frameworks.length}
              className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-fg-faint transition-colors hover:text-fg-muted"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
