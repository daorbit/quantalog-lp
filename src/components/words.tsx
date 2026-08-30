import { Fragment } from "react";

export function Words({
  text,
  offset = 0,
  className = "",
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  const words = text.split(" ").filter(Boolean);

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={className}
            style={{ ["--i" as string]: offset + i }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
