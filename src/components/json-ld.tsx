/**
 * Emits a JSON-LD block.
 *
 * The serialised JSON is injected rather than rendered as a child because a
 * React text child would HTML-escape the quotes and produce a script body no
 * crawler can parse. `<` is escaped so a string value inside the data can never
 * close the script tag early.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
