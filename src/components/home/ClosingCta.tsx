import { ButtonLink } from "@/components/ui/Button";

/** Closing callout pointing to the contact page. */
export function ClosingCta() {
  return (
    <section
      aria-label="Get in touch"
      className="mt-20 flex flex-col gap-6 rounded-lg bg-surface px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8"
    >
      <p className="max-w-110 text-lg leading-snug font-medium text-ink md:text-xl">
        Open to full stack and frontend roles in Calgary or remote.
      </p>
      <ButtonLink href="/contact" className="shrink-0 self-start md:self-auto">
        Contact me <span aria-hidden>→</span>
      </ButtonLink>
    </section>
  );
}
