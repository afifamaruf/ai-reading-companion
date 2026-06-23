"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Architectures", href: "#architectures" },
  { label: "Demo", href: "#demo" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
  }, []);

  return (
    <header
      className={`
            fixed top-0 inset-x-0 z-50 transition-all duration-300
            ${scrolled ? "bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/6 shadow-2xl shadow-black/40" : "bg-transparent"}
            `}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 bg-violet-600 flex items-center shadow-lg shadow-violet-600/40">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 2h7ai 1 0 0 1 1 1v9ai 1 0 0 1-1 1H3V2Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M10 4h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2V4Z"
                fill="white"
                fillOpacity="0.4"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold text-white tracking-tight">
            arc<span className="text-violet-400">.</span>reader
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/50 hover:text-white/90 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button variant="primary" size="sm" href="/library">
            Start reading
          </Button>
        </div>
      </nav>
    </header>
  );
}
