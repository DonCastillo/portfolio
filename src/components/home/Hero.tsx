import { ButtonLink } from "@/components/ui/Button";
import { intro, site } from "@/data/site";

/** Eyebrow, name, intro and the two calls to action. */
export function Hero() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <p className="font-mono text-xs tracking-wide text-subtle uppercase md:text-[13px]">
        {site.title}
        {/* Two lines on mobile, one line with a separator from sm up. */}
        <span aria-hidden className="hidden sm:inline">
          {" · "}
        </span>
        <span className="block sm:inline">{site.location}</span>
      </p>
      <h1
        id="about-heading"
        className="mt-4 text-[2.75rem] leading-none font-semibold tracking-tight text-ink md:text-hero"
      >
        {site.name}
      </h1>
      <p className="mt-6 max-w-150 text-lg leading-relaxed md:text-xl">
        {intro}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={site.links.resume} download>
          Download resume
        </ButtonLink>
        <ButtonLink href="#contact" variant="secondary">
          Get in touch
        </ButtonLink>
      </div>
    </section>
  );
}
