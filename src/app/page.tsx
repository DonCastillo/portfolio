export default function Home() {
  return (
    <main className="mx-auto max-w-220 px-5 py-12 md:px-16 md:py-22">
      <p className="font-mono text-xs tracking-wide text-subtle uppercase">
        Full Stack Software Engineer · Calgary, AB (relocating)
      </p>
      <h1 className="mt-4 text-[2.75rem] leading-none font-semibold tracking-tight text-ink md:text-hero">
        Don Castillo
      </h1>
      <p className="mt-6 max-w-150 text-lg leading-relaxed">
        Portfolio coming soon.{" "}
        <a
          href="https://github.com/DonCastillo"
          className="text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          GitHub
        </a>
      </p>
    </main>
  );
}
