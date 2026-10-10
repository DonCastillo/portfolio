type StackListProps = {
  items: readonly string[];
  /** Screen-reader prefix where the list has no visible label, e.g. "Stack: ". */
  label?: string;
  className?: string;
};

/** The one way tech names are shown: mono text, separated by dots. */
export function StackList({ items, label, className = "" }: StackListProps) {
  return (
    <p
      className={`font-mono text-[13px] leading-relaxed text-body ${className}`}
    >
      {label && <span className="sr-only">{label}</span>}
      {items.join(" · ")}
    </p>
  );
}
