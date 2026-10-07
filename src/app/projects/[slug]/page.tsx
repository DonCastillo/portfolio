import { notFound } from "next/navigation";
import { DemoVideo } from "@/components/project/DemoVideo";
import { Gallery } from "@/components/project/Gallery";
import { Highlights } from "@/components/project/Highlights";
import { Metrics } from "@/components/project/Metrics";
import { NextProject } from "@/components/project/NextProject";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectLinks } from "@/components/project/ProjectLinks";
import { StackTags } from "@/components/project/StackTags";
import { getNext, getProject } from "@/lib/projects";

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
      {project.metrics && <Metrics metrics={project.metrics} />}
      <Highlights highlights={project.highlights} />
      <StackTags stack={project.stack} />
      <Gallery gallery={project.gallery} />
      <NextProject next={getNext(project.slug)} />
    </article>
  );
}
