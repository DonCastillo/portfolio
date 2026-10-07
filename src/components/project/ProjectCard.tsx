import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { imageExists } from "@/lib/images";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  /** Load the cover eagerly (cards above the fold). */
  priority?: boolean;
  /** Hide the period where cards are narrow (home page, three across). */
  showPeriod?: boolean;
};

const STACK_LIMIT = 3;

/** Cover (or a plain box until it exists), title + badge + period, event line (hackathon/academic), summary and top stack. The whole card links to the project. */
export function ProjectCard({
  project,
  priority = false,
  showPeriod = true,
}: ProjectCardProps) {
  const { slug, title, period, summary, stack, cover, event, duration, team } =
    project;

  // Professional cards don't repeat the client; for academic work it's the institution.
  const context = [
    event,
    project.category !== "professional" && project.client,
    duration,
    team && (team.size === 1 ? "Solo" : `Team of ${team.size}`),
  ].filter((item) => !!item);

  return (
    <article className="group relative">
      <div className="mb-4">
        {imageExists(cover.src) ? (
          <ProjectImage
            src={cover.src}
            alt={cover.alt}
            kind="cover"
            priority={priority}
          />
        ) : (
          // Cover not in public/ yet: a plain box keeps cards in a row the same shape.
          <div aria-hidden className="aspect-16/10 rounded-lg bg-placeholder" />
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            {/* Stretched link: the ::after covers the card, so the card is clickable but only the title is announced. */}
            <Link
              href={`/projects/${slug}`}
              className="group-hover:text-accent after:absolute after:inset-0 after:rounded-lg"
            >
              {title}
            </Link>
          </h3>
          {project.status === "in-progress" && <Badge>In progress</Badge>}
          {project.award && <Badge tone="accent">{project.award}</Badge>}
        </div>
        {showPeriod && (
          <p className="shrink-0 font-mono text-xs text-muted">{period}</p>
        )}
      </div>

      {context.length > 0 && (
        <p className="mt-2 font-mono text-[11px] tracking-wide text-muted uppercase">
          {context.join(" · ")}
        </p>
      )}

      <p className="mt-2 text-[15px] leading-relaxed text-body">{summary}</p>

      <p className="mt-3 font-mono text-xs text-muted">
        <span className="sr-only">Stack: </span>
        {stack.slice(0, STACK_LIMIT).join(" · ")}
      </p>
    </article>
  );
}
