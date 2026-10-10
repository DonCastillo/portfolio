import Link from "next/link";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getFeatured } from "@/lib/projects";

/** Three featured project cards with a link to the full list. */
export function FeaturedProjects() {
  const featured = getFeatured();
  if (featured.length === 0) return null;

  const viewAll = (
    <Link
      href="/projects"
      className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-hover"
    >
      View all projects <span aria-hidden>→</span>
    </Link>
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mt-20">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="projects-heading"
          className="text-2xl font-semibold tracking-tight text-ink"
        >
          Featured projects
        </h2>
        <div className="hidden md:block">{viewAll}</div>
      </div>
      <div className="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            showPeriod={false}
          />
        ))}
      </div>
      <div className="mt-6 md:hidden">{viewAll}</div>
    </section>
  );
}
