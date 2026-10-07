import { notFound } from "next/navigation";
import { DemoVideo } from "@/components/project/DemoVideo";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectLinks } from "@/components/project/ProjectLinks";
import { getProject } from "@/lib/projects";

// Placeholder until the generateStaticParams task in M3: slugs will come from getProjects().
const slugs = ["gac-paq"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <ProjectHeader project={project} />
      <ProjectLinks links={project.links} sourceNote={project.sourceNote} />
      {project.links.demo && (
        <DemoVideo url={project.links.demo} title={project.title} />
      )}
    </article>
  );
}
