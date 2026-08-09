import { Fragment } from "react";

/**
 * Splits a string into per-word spans so `.word-rise` can stagger them.
 *
 * Each word carries its own index as `--i`, and the delay is computed in CSS
 * from that — so the markup is identical on the server and the client, and the
 * headline is real selectable text with normal line breaking. The `offset`
 * keeps the stagger continuous when a headline is assembled from several
 * `<Words>` calls with other elements between them.
 */
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
