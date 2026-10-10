type HighlightsProps = {
  highlights: string[];
};

/** "What I did": one bullet per highlight. */
export function Highlights({ highlights }: HighlightsProps) {
  return (
    <section aria-labelledby="highlights" className="mt-12">
      <h2
        id="highlights"
        className="text-[22px] font-semibold tracking-tight text-ink"
      >
        What I did
      </h2>
      <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-ink md:text-base">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </section>
  );
}
