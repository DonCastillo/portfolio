import { imageExists } from "@/lib/images";
import type { Project } from "@/lib/projects";
import { GalleryCarousel } from "./GalleryCarousel";

type GalleryProps = {
  gallery: Project["gallery"];
};

/** Screenshots as a one-row carousel (phone, then tablet, then desktop), opening in a lightbox. */
export function Gallery({ gallery }: GalleryProps) {
  // Skip images not in public/ yet, so missing screenshots don't render as broken images.
  const items = gallery.filter((image) => imageExists(image.src));
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="gallery" className="mt-12">
      <GalleryCarousel items={items} />
    </section>
  );
}
