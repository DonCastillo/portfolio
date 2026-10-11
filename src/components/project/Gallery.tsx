import type { Project } from "@/lib/projects";
import { GalleryCarousel } from "./GalleryCarousel";

type GalleryProps = {
  /** Images that exist in public/ (the page filters out missing ones). */
  items: Project["gallery"];
};

/** Screenshots as a one-row carousel (phone, then tablet, then desktop), opening in a lightbox. */
export function Gallery({ items }: GalleryProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="gallery" className="mt-12">
      <GalleryCarousel items={items} />
    </section>
  );
}
