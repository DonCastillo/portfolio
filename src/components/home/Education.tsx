import { certifications, education } from "@/data/education";

/** Degrees side by side, then one line about certifications linking to Credly. */
export function Education() {
  return (
    <section aria-labelledby="education" className="mt-20">
      <h2
        id="education"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Education &amp; certifications
      </h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {education.map(({ degree, school, honours, year }) => (
          <li key={degree}>
            <h3 className="text-base font-semibold text-ink">{degree}</h3>
            <p className="mt-1 text-sm text-body">
              {school} · {honours}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{year}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[15px] text-ink-2">
        {certifications.summary}{" "}
        <a
          href={certifications.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          View on Credly <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
