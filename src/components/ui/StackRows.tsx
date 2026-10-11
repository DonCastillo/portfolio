import { StackList } from "./StackList";

type StackRowsProps = {
  groups: readonly { label?: string; items: readonly string[] }[];
  className?: string;
};

/** One line per group: muted label, then the dot-separated list (stacked on mobile). */
export function StackRows({ groups, className = "" }: StackRowsProps) {
  return (
    <dl className={`space-y-4 ${className}`}>
      {groups.map(({ label, items }) => (
        <div
          key={label ?? items.join()}
          className="grid gap-1 md:grid-cols-[10rem_1fr] md:items-baseline md:gap-6"
        >
          <dt className="text-sm text-muted">{label}</dt>
          <dd>
            <StackList items={items} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
