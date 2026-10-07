import type { Metadata } from "next";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  // Flat list for now; grouping by category is the next M4 task.
  const projects = getProjects();

  return (
    <>
      <h1 className="text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
        Projects
      </h1>
      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>
    </>
  );
}
