import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0b0d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 12,
              height: 56,
              borderRadius: 6,
              background: "#14b8a6",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#f7f8f9" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#14b8a6",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 60 : 72,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#f7f8f9",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#9ba1ab" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
