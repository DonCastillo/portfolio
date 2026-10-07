import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary: "border border-border-strong text-ink hover:bg-surface",
};

const sizes = {
  md: "px-5 text-[15px]",
  sm: "px-4 text-sm",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Opens in a new tab with ↗. */
  external?: boolean;
  /** Downloads the file with ↓. */
  download?: boolean;
  className?: string;
};

/** A link styled as a button (44px tall). Internal paths use next/link. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md font-medium ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span aria-hidden>↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  if (download) {
    return (
      <a href={href} download className={classes}>
        {children}
        <span aria-hidden>↓</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
