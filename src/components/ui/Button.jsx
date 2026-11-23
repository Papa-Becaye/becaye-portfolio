"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap select-none transition-colors duration-200 focus-visible:outline-offset-4";

const variants = {
  primary: "bg-accent text-bg hover:bg-accent-hover",
  secondary: "border border-line text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg hover:text-accent",
};
const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

/**
 * Bouton / lien unifié.
 * - href interne ("/…") → next/link ; externe → <a target=_blank>
 * - icon : "arrow" (flèche directionnelle, inversée en RTL) | "up-right" | null
 */
export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = "arrow",
  external,
  download,
  className = "",
  children,
  ...rest
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const Icon =
    icon === "arrow" ? (
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
      />
    ) : icon === "up-right" ? (
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
      />
    ) : null;

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !download) {
      return (
        <Link href={href} className={cls} onClick={onClick} {...rest}>
          {children}
          {Icon}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        download={download ? "" : undefined}
        {...(external || !isInternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
        {Icon}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {children}
      {Icon}
    </button>
  );
}
