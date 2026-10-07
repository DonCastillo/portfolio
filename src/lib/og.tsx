import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Shared by app/opengraph-image.tsx and the per-project image. Colours are the
// design tokens from globals.css (ImageResponse can't read CSS variables).
// Font: Geist Regular, which next/og bundles as its default.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const color = {
  bg: "#fafaf8",
  border: "#e4e4e0",
  ink: "#18181b",
  body: "#3f3f46",
  subtle: "#5b5b63",
  accent: "#0f6e6e",
};

type OgCardProps = {
  eyebrow: string;
  title: string;
  /** Headline metric, shown large in the accent colour. */
  metric?: { value: string; label: string };
  /** Shown when there's no metric. */
  subtitle?: string;
};

/** 1200×630 card: eyebrow, title, metric or subtitle, and the name in the footer. */
export function ogImage({ eyebrow, title, metric, subtitle }: OgCardProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: color.bg,
        color: color.ink,
        borderTop: `12px solid ${color.accent}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: color.subtle,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: title.length > 24 ? 72 : 96,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {metric ? (
          <div
            style={{ display: "flex", alignItems: "baseline", marginTop: 40 }}
          >
            <span style={{ fontSize: 64, color: color.accent }}>
              {metric.value}
            </span>
            <span style={{ marginLeft: 20, fontSize: 30, color: color.body }}>
              {metric.label}
            </span>
          </div>
        ) : (
          subtitle && (
            <div
              style={{
                marginTop: 32,
                fontSize: 32,
                lineHeight: 1.4,
                color: color.body,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          )
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `2px solid ${color.border}`,
          fontSize: 26,
          color: color.subtle,
        }}
      >
        <span style={{ color: color.ink }}>{site.name}</span>
        <span>{site.title}</span>
      </div>
    </div>,
    ogSize,
  );
}
