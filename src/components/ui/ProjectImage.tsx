export type ImageKind = "cover" | "mobile" | "tablet" | "desktop";

/** Box shape and the size `pnpm images` outputs for each kind; width/height are aspect hints that prevent layout shift. `ratio` is width / height, matching `aspect`. */
const shapes = {
  cover: { aspect: "aspect-16/10", ratio: 16 / 10, width: 1600, height: 1000 },
  mobile: { aspect: "aspect-9/19", ratio: 9 / 19, width: 800, height: 1689 },
  tablet: { aspect: "aspect-41/59", ratio: 41 / 59, width: 800, height: 1151 }, // portrait iPad, 1640×2360
  desktop: { aspect: "aspect-video", ratio: 16 / 9, width: 1200, height: 675 },
} as const;

/** Width / height of a kind's frame, e.g. to size a tile from a fixed height. */
export function imageRatio(kind: ImageKind): number {
  return shapes[kind].ratio;
}

type ProjectImageProps = {
  src: string;
  alt: string;
  kind: ImageKind;
  /** "contain" shows the whole image centred on the placeholder colour (phone screenshots in a 16:10 cover). */
  fit?: "cover" | "contain";
  priority?: boolean;
};

/** The one place project images are rendered. */
export function ProjectImage({
  src,
  alt,
  kind,
  fit = "cover",
  priority = false,
}: ProjectImageProps) {
  const { aspect, width, height } = shapes[kind];

  return (
    // Same frame for every project image: fixed shape, radius and 1px border.
    <span
      className={`block ${aspect} overflow-hidden rounded-lg border border-border bg-placeholder`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export; images are pre-optimized by `pnpm images` */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`size-full ${fit === "contain" ? "object-contain p-4" : "object-cover"}`}
      />
    </span>
  );
}
