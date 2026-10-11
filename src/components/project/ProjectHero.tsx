import { ProjectImage } from "@/components/ui/ProjectImage";
import { imageExists } from "@/lib/images";
import type { Project } from "@/lib/projects";
import { DemoVideo } from "./DemoVideo";

type ProjectHeroProps = {
  project: Project;
};

/**
 * The large media under the links: the demo video with the cover as its
 * poster, or just the cover when there's no video. Nothing if neither exists.
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const { cover, links, title } = project;
  const hasCover = imageExists(cover.src);
  // Phone-screenshot covers are shown whole, not cropped.
  const fit = cover.kind === "mobile" ? "contain" : "cover";

  if (links.demo) {
    return (
      <DemoVideo
        url={links.demo}
        title={title}
        poster={hasCover ? { src: cover.src, fit } : undefined}
      />
    );
  }

  if (!hasCover) return null;
  return (
    <div className="mt-12">
      <ProjectImage
        src={cover.src}
        alt={cover.alt}
        kind="cover"
        fit={fit}
        priority
      />
    </div>
  );
}
