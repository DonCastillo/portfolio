// Placeholder until M2/M3: slugs and content will come from content/projects/*.mdx.
const slugs = ["gac-paq"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  return (
    <h1 className="text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
      {slug}
    </h1>
  );
}
