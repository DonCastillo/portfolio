import { StackRows } from "@/components/ui/StackRows";
import { skills } from "@/data/skills";

/** Grouped skills, in the same rows as grouped project stacks. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-20">
      <h2
        id="skills-heading"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Skills
      </h2>
      <StackRows groups={skills} className="mt-6" />
    </section>
  );
}
