type ProjectSummaryProps = {
  title: string;
  id: string;
  text?: string;
};

/** A titled paragraph ("Problem", "Solution"). Renders nothing when empty. */
export function ProjectSummary({ title, id, text }: ProjectSummaryProps) {
  if (!text?.trim()) return null;

  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-[22px] font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-2 md:text-base">
        {text}
      </p>
    </section>
  );
}
