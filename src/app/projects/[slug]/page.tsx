import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoVideo } from "@/components/project/DemoVideo";
import { Gallery } from "@/components/project/Gallery";
import { Highlights } from "@/components/project/Highlights";
import { Metrics } from "@/components/project/Metrics";
import { NextProject } from "@/components/project/NextProject";
import { ProjectBody } from "@/components/project/ProjectBody";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectLinks } from "@/components/project/ProjectLinks";
import { StackTags } from "@/components/project/StackTags";
import { getNext, getProject, getProjects } from "@/lib/projects";

// Only slugs from content/projects/ exist; anything else is a 404 (static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
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
      {project.body && <ProjectBody code={project.body} />}
      <NextProject next={getNext(project.slug)} />
    </article>
  );
}
