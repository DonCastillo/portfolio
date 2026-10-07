import { getProject, getProjects } from "@/lib/projects";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Project overview";
export const size = ogSize;
export const contentType = ogContentType;
// Rendered once at build for the static export.
export const dynamic = "force-static";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

/** Title and headline metric (first in the list), or the summary if there are no metrics. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) throw new Error(`No project for OG image: ${slug}`);

  return ogImage({
    eyebrow: project.event ?? project.client ?? "Project",
    title: project.title,
    metric: project.metrics?.[0],
    subtitle: project.summary,
  });
}
