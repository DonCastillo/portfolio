type HighlightsProps = {
  highlights: string[];
  /** Heading and its id; "Results" reuses this section. */
  title?: string;
  id?: string;
};

/** "What I did" (or "Results"): one bullet per item. */
export function Highlights({
  highlights,
  title = "What I did",
  id = "highlights",
}: HighlightsProps) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-[22px] font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-ink md:text-base">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </section>
  );
}
