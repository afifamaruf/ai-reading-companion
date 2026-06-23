import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "violet" | "ghost";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-white/8 text-white/60 border border-white/10",
    violet: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    ghost: "bg-transparent text-white/40 border border-white/8",
  };
  return (
    <span
      className={`
            inline-flex items-center gap-1.5 px-3 py-1
            text-xs font-medium tracking-wide rounded-full
            ${variants[variant]} ${className}
            `}
    >
      {children}
    </span>
  );
}
