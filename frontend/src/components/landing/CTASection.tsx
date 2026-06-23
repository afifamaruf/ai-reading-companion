import Link from "next/link";
import { Button } from "@/components/ui/Button";

const TRUST_SIGNALS = [
  "Open source",
  "Self-hostable",
  "No tracking",
  "Works offline after upload",
] as const;
const FOOTER_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Issues", href: "#" },
] as const;

export function CTASection() {
  return (
    <section
      className="py-24 px-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,111,245,0.12), rgba(99,102,241,0.08), transparent)",
            border: "1px solid rgba(124,111,245,0.2)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,111,245,0.1), transparent)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative">
            <h2
              className="font-extrabold text-white tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                lineHeight: "1.1",
              }}
            >
              Start reading smarter.
              <br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                No setup required.
              </span>
            </h2>

            <p
              className="mt-5 text-base leading-relaxed max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Upload any EPUB and the AI is ready in under 30 seconds. Your
              first book is free, forever.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" href="/library">
                Upload your first book
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button variant="ghost" size="lg" href="https://github.com">
                View source on GitHub
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TRUST_SIGNALS.map((signal) => (
                <span
                  key={signal}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 5l3 3 5-6"
                      stroke="#7c6ff5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className="py-10 px-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] text-white"
            style={{ background: "rgba(124,111,245,0.8)" }}
            aria-hidden
          >
            ✦
          </span>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            arc<span className="text-violet-400">.</span>reader
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs transition-colors duration-150 hover:text-white/55"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Portfolio project · MIT License
        </p>
      </div>
    </footer>
  );
}
