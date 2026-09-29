const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function RollingNumber({ value, className = "" }: { value: number; className?: string }) {
  const chars = String(value).split("");

  return (
    <span className={`roll ${className}`} aria-label={String(value)} role="img">
      {chars.map((c, i) => {
        const key = chars.length - i;
        if (!/\d/.test(c)) {
          return (
            <span key={`s${key}`} aria-hidden="true">
              {c}
            </span>
          );
        }
        return (
          <span key={key} className="roll-digit" aria-hidden="true">
            <span className="roll-strip" data-d={c}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
