export type ImageKind = "cover" | "mobile" | "desktop";

/** Box shape and the size `pnpm images` outputs for each kind; width/height are aspect hints that prevent layout shift. */
const shapes = {
  cover: { aspect: "aspect-[16/10]", width: 1600, height: 1000 },
  mobile: { aspect: "aspect-[9/19]", width: 800, height: 1689 },
  desktop: { aspect: "aspect-video", width: 1200, height: 675 },
} as const;

type ProjectImageProps = {
  src: string;
  alt: string;
  kind: ImageKind;
  priority?: boolean;
};

/** The one place project images are rendered. */
export function ProjectImage({
  src,
  alt,
  kind,
  priority = false,
}: ProjectImageProps) {
  const { aspect, width, height } = shapes[kind];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; images are pre-optimized by `pnpm images`
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`${aspect} w-full rounded-lg bg-placeholder object-cover`}
    />
  );
}
