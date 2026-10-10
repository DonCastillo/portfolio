type StackTagsProps = {
  stack: string[];
};

/** "Tech stack": mono pill per technology. */
export function StackTags({ stack }: StackTagsProps) {
  return (
    <section aria-labelledby="stack" className="mt-12">
      <h2
        id="stack"
        className="font-heading text-[22px] font-semibold tracking-tight text-ink"
      >
        Tech stack
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {stack.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs text-ink-2 md:text-[13px]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
