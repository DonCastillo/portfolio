import { imageExists } from "@/lib/images";
import type { Project } from "@/lib/projects";
import { GalleryGrid } from "./GalleryGrid";

type GalleryProps = {
  gallery: Project["gallery"];
};

/** Phone screenshots as portrait tiles, then desktop images full width, opening in a lightbox. */
export function Gallery({ gallery }: GalleryProps) {
  // Skip images not in public/ yet, so missing screenshots don't render as broken images.
  const items = gallery.filter((image) => imageExists(image.src));
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="gallery" className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="gallery"
          className="font-heading text-[22px] font-semibold tracking-tight text-ink"
        >
          Gallery
        </h2>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {items.length} {items.length === 1 ? "screen" : "screens"} · Click to
          enlarge
        </p>
      </div>
      <GalleryGrid items={items} />
    </section>
  );
}
