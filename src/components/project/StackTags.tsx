import { StackList } from "@/components/ui/StackList";

type StackTagsProps = {
  stack: string[];
};

/** "Tech stack": the full list, dot-separated like cards and Skills. */
export function StackTags({ stack }: StackTagsProps) {
  return (
    <section aria-labelledby="stack" className="mt-12">
      <h2
        id="stack"
        className="text-[22px] font-semibold tracking-tight text-ink"
      >
        Tech stack
      </h2>
      <StackList items={stack} className="mt-4" />
    </section>
  );
}
