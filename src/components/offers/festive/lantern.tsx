export function Lantern({
  tone,
  size = "md",
  className = "",
}: {
  tone: "marigold" | "rose";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 60"
      className={`offer-lantern offer-lantern--${tone} offer-lantern--${size} ${className}`}
      aria-hidden="true"
    >
      <path className="offer-lantern__cord" d="M14 0v12" />
      <path className="offer-lantern__metal" d="M9 12h10l-1.5 4h-7z" />
      <path className="offer-lantern__body" d="M14 16 25 27v10L14 48 3 37V27z" />
      <path className="offer-lantern__window" d="M14 21 20 27v10l-6 6-6-6V27z" />
      <path className="offer-lantern__lines" d="M3 27h22M3 37h22M14 16v32" />
      <path className="offer-lantern__metal" d="M10.5 48h7l1.5 3h-10z" />
      <path className="offer-lantern__cord" d="M12 51v8M14 51v9M16 51v8" />
    </svg>
  );
}
