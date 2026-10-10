import type { ComponentProps, ComponentType, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";

type MdxComponents = Record<string, ComponentType<never>>;
type MdxContent = (props: { components?: MdxComponents }) => ReactNode;

/** Velite compiles MDX to a function body; run it with the JSX runtime to get the content function. Build time only. */
function mdxContent(code: string): MdxContent {
  return new Function(code)({ ...runtime }).default;
}

// Site styles for the elements a write-up uses (no typography plugin).
const components = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-10 text-[22px] font-semibold tracking-tight text-ink first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 text-lg font-semibold text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4" {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-accent underline underline-offset-4 hover:text-accent-hover"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
};

type ProjectBodyProps = {
  code: string;
};

/** The optional long-form MDX write-up below the gallery. */
export function ProjectBody({ code }: ProjectBodyProps) {
  // Called as a function, not rendered as <Content />: MDX output has no state or hooks,
  // and this avoids creating a component type during render.
  const content = mdxContent(code);
  return (
    <div className="mt-12 max-w-170 text-[15px] leading-relaxed text-ink-2 md:text-base">
      {content({ components })}
    </div>
  );
}
