"use client";

import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children?: React.ReactNode;
};

export function ContactButton({ children = "Contato", className, href, ...rest }: Props) {
  if (href) {
    return (
      <a href={href} className={cn("btn-primary", className)}>
        {children} →
      </a>
    );
  }
  return (
    <button {...rest} className={cn("btn-primary", className)}>
      {children} →
    </button>
  );
}

export function LiveProjectButton({
  children = "Live",
  className,
  href,
  ...rest
}: Props) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("btn-secondary", className)}
      >
        {children} ↗
      </a>
    );
  }
  return (
    <button {...rest} className={cn("btn-secondary", className)}>
      {children} ↗
    </button>
  );
}
