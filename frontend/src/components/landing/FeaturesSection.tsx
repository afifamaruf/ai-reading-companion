import { type ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  demo?: string;
}

const FEATURES: Feature[] = [
  {
    label: "Core",
    icon: <HighlightIcon />,
    title: "Context-aware explanations",
    description:
      "Highlight any word or phrase. The AI explains its meaning relative to the book's plot, themes, and the specific paragraph — not a dictionary.",
    demo: '"somnambulant" → Gatsby\'s dreamlike detachment from reality, signaling his pursuit of an unreachable past.',
  },
  {
    label: "RAG",
    icon: <ChatIcon />,
    title: "Chat with your book",
    description:
      "Ask anything about the story. The RAG pipeline retrieves the most relevant passages and answers with citations — grounded in the actual text.",
  },
  {
    label: "Intelligence",
    icon: <CharacterIcon />,
    title: "Character intelligence",
    description:
      "Automatically maps characters, their relationships, and how they evolve across chapters. Never lose track of who's who.",
  },
  {
    label: "Analytics",
    icon: <ChartIcon />,
    title: "Reading analytics",
    description:
      "See your reading pace, session history, vocabulary growth, and comprehension patterns over time.",
  },
  {
    label: "Reader",
    icon: <EpubIcon />,
    title: "Native EPUB reader",
    description:
      "Full EPUB.js rendering in-browser — chapter navigation, bookmarks, font size, and light/dark/sepia themes.",
  },
  {
    label: "Privacy",
    icon: <LockIcon />,
    title: "Your books, your data",
    description:
      "Files are stored on your own FastAPI backend. Nothing is sent to third parties except the text you explicitly ask about.",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <article
      className="group relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        padding: index === 0 ? "28px" : "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,111,245,0.04), transparent)",
        }}
      />

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(124,111,245,0.12)",
          border: "1px solid rgba(124,111,245,0.15)",
          color: "#a78bfa",
        }}
      >
        {feature.icon}
      </div>

      <span
        className="text-[10px] font-bold tracking-widest uppercase"
        style={{ color: "rgba(167,139,250,0.7)" }}
      >
        {feature.label}
      </span>

      <h3
        className={`mt-1.5 font-bold text-white tracking-tight ${index === 0 ? "text-xl" : "text-lg"}`}
      >
        {feature.title}
      </h3>

      <p
        className="mt-2.5 text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {feature.description}
      </p>

      {feature.demo && (
        <div
          className="mt-4 px-3 py-2.5 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-xs font-mono leading-relaxed"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {feature.demo}
          </p>
        </div>
      )}
    </article>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(167,139,250,0.7)" }}
          >
            Features
          </span>
          <h2
            className="mt-2 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Everything a serious reader needs.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Built for non-native English readers who want to read challenging
            literature without losing the thread.
          </p>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 14h12M9 3v8m0 0-3-3m3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 4h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6l-4 2V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CharacterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 15c0-3.314 2.686-5 6-5s6 1.686 6 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 14V8M7 14V5M11 14v-3M15 14V7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function EpubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="3"
        y="2"
        width="9"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 4h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="4"
        y="8"
        width="10"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
