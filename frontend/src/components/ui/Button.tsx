import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-xl transition-all duration-200 cursor-pointer select-none
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500
    disabled:opacity-40 disabled:cursor-not-allowed
    `;

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: `
            bg-violet-600 hover:bg-violet-500 active:bg-violet-700
            text-white shadow-lg shadow-violet-600/20
        `,
    ghost: `
            bg-white/6 hover:bg-white/12 active:bg-white/8
            text-white/70 hover:text-white border border-white/10
        `,
    outline: `
        bg-transparent hover:bg-white/6
        text-white/70 hover:text-white border border-white/20 hover:border-white/30
        `,
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
