import { StackList } from "@/components/ui/StackList";
import { StackRows } from "@/components/ui/StackRows";
import type { Project } from "@/lib/projects";

type StackTagsProps = {
  stack: Project["stack"];
};

/** "Tech stack": grouped rows like Skills, or one dot-separated line for an ungrouped list. */
export function StackTags({ stack }: StackTagsProps) {
  const grouped = stack.some((group) => group.label);

  return (
    <section aria-labelledby="stack" className="mt-12">
      <h2
        id="stack"
        className="text-[22px] font-semibold tracking-tight text-ink"
      >
        Tech stack
      </h2>
      {grouped ? (
        <StackRows groups={stack} className="mt-4" />
      ) : (
        <StackList
          items={stack.flatMap((group) => group.items)}
          className="mt-4"
        />
      )}
    </section>
  );
}
