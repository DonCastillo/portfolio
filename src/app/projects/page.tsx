import type { Metadata } from "next";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getProjects, groupByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Mobile, web and platform work by Don Castillo: what I built and what it achieved.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const groups = groupByCategory(projects);

  return (
    <>
      <header>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
        <h1 className="mt-4 text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
          Projects
        </h1>
        <p className="mt-5 max-w-150 text-lg leading-relaxed">
          Mobile, web and platform work. Some source is private client or
          research work; each page says what I built and what it achieved.
        </p>
      </header>

      {groups.map(({ category, label, projects: list }, groupIndex) => (
        <section
          key={category}
          aria-labelledby={`group-${category}`}
          className="mt-14"
        >
          <h2
            id={`group-${category}`}
            className="flex items-baseline gap-3 text-[22px] font-semibold tracking-tight text-ink"
          >
            {label}
            <span className="font-mono text-xs font-normal text-subtle">
              <span className="sr-only"> (</span>
              {list.length}
              <span className="sr-only">
                {list.length === 1 ? " project)" : " projects)"}
              </span>
            </span>
          </h2>
          <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-12">
            {list.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={groupIndex === 0 && i < 2}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
