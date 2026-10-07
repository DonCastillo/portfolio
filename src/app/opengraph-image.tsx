import { intro, site } from "@/data/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

// Site-wide default; project pages override it with their own.
export const alt = `${site.name}, ${site.title}`;
export const size = ogSize;
export const contentType = ogContentType;
// Rendered once at build for the static export.
export const dynamic = "force-static";

export default function Image() {
  return ogImage({
    eyebrow: `${site.title} · ${site.location}`,
    title: site.name,
    subtitle: intro,
  });
}
