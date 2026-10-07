import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** `accent` for awards; `neutral` for status. */
  tone?: "neutral" | "accent";
};

/** Small mono label next to a title: "In progress", "1st place, Best Use of AI". */
export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-sm border px-1.5 py-0.5 font-mono text-[11px] leading-tight tracking-wide uppercase ${
        tone === "accent"
          ? "border-accent text-accent"
          : "border-border-strong text-muted"
      }`}
    >
      {children}
    </span>
  );
}
