import { skills } from "@/data/skills";

/** One row per group: label, then mono pills (same style as project stack tags). */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-20">
      <h2
        id="skills-heading"
        className="font-heading text-2xl font-semibold tracking-tight text-ink"
      >
        Skills
      </h2>
      <dl className="mt-6 border-b border-border">
        {skills.map(({ label, skills }) => (
          <div
            key={label}
            className="grid gap-3 border-t border-border py-5 md:grid-cols-[10rem_1fr] md:gap-6"
          >
            <dt className="font-mono text-xs text-muted uppercase md:pt-1.5 md:text-[13px] md:normal-case">
              {label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs text-ink-2 md:text-[13px]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
