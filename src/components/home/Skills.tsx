import { StackList } from "@/components/ui/StackList";
import { skills } from "@/data/skills";

/** One line per group: muted label, then the dot-separated list (stacked on mobile). */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-20">
      <h2
        id="skills-heading"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Skills
      </h2>
      <dl className="mt-6 space-y-4">
        {skills.map(({ label, skills }) => (
          <div
            key={label}
            className="grid gap-1 md:grid-cols-[10rem_1fr] md:items-baseline md:gap-6"
          >
            <dt className="text-sm text-muted">{label}</dt>
            <dd>
              <StackList items={skills} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
