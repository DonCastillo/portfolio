import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/project/Gallery";
import { Highlights } from "@/components/project/Highlights";
import { Metrics } from "@/components/project/Metrics";
import { NextProject } from "@/components/project/NextProject";
import { ProjectBody } from "@/components/project/ProjectBody";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectLinks } from "@/components/project/ProjectLinks";
import { ProjectSummary } from "@/components/project/ProjectSummary";
import { ProjectToc, type TocItem } from "@/components/project/ProjectToc";
import { StackTags } from "@/components/project/StackTags";
import { imageExists } from "@/lib/images";
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

  // Skip images not in public/ yet, so missing screenshots don't render as broken images.
  const gallery = project.gallery.filter((image) => imageExists(image.src));

  // One entry per section that renders, in page order.
  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    gallery.length > 0 && { id: "gallery", label: "Gallery" },
    project.problem?.trim() && { id: "problem", label: "Problem" },
    project.solution?.trim() && { id: "solution", label: "Solution" },
    { id: "highlights", label: "What I did" },
    { id: "stack", label: "Tech stack" },
    project.results && { id: "results", label: "Results" },
  ].filter((item): item is TocItem => !!item);

  return (
    <article className="relative">
      <ProjectHeader project={project} />
      <ProjectLinks links={project.links} sourceNote={project.sourceNote} />
      <ProjectHero project={project} />
      <Gallery items={gallery} />
      {project.metrics && <Metrics metrics={project.metrics} />}
      <ProjectSummary title="Problem" id="problem" text={project.problem} />
      <ProjectSummary title="Solution" id="solution" text={project.solution} />
      <Highlights highlights={project.highlights} />
      <StackTags stack={project.stack} />
      {project.results && (
        <Highlights highlights={project.results} title="Results" id="results" />
      )}
      {project.body && <ProjectBody code={project.body} />}
      <NextProject next={getNext(project.slug)} />

      {/* Only from 1440px, where it fits in the margin right of the 760px column. */}
      {toc.length >= 3 && (
        <aside className="absolute top-0 left-full ml-8 hidden h-full w-40 min-[1440px]:block">
          <div className="sticky top-22">
            <ProjectToc items={toc} />
          </div>
        </aside>
      )}
    </article>
  );
}
