"use client";

import { useState } from "react";

type TabId = "explain" | "chat" | "analytics";

// ── Explain panel ──────────────────────────────────────────────────────────

function ExplainPanel() {
  return (
    <div className="space-y-3">
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          className="text-xs font-medium mb-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Selected text
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "Georgia, serif",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          ...the{" "}
          <mark
            className="rounded px-0.5"
            style={{ background: "rgba(124,111,245,0.4)", color: "#c4b5fd" }}
          >
            green light at the end of Daisy&apos;s dock
          </mark>{" "}
          that he had come so far to reach...
        </p>
      </div>

      <div
        className="rounded-xl p-4 space-y-2"
        style={{
          background: "rgba(46,16,101,0.5)",
          border: "1px solid rgba(124,111,245,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded flex items-center justify-center text-[9px] text-white"
            style={{ background: "rgba(124,111,245,0.8)" }}
            aria-hidden
          >
            ✦
          </span>
          <span className="text-[11px] font-semibold text-violet-300">
            Explanation
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          The green light is Fitzgerald&apos;s central symbol of the American
          Dream — specifically Gatsby&apos;s obsessive hope to recapture Daisy
          and the idealized past she represents. Its distance across the bay
          mirrors the unreachability of his dream.
        </p>
        <div
          className="pt-2 flex gap-2 flex-wrap"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {["Symbol · hope", "Motif · green", "Ch. 1, 5, 9"].map((chip) => (
            <span
              key={chip}
              className="text-[10px] px-2 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Chat panel ─────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    role: "user",
    text: "Why does Gatsby throw those parties if Daisy never comes?",
  },
  {
    role: "assistant",
    text: "The parties are Gatsby's strategy, not his pleasure. He throws them hoping Daisy will wander in — Nick confirms this in Chapter 4. The parties are a performance of the wealth he believes will win her back.",
    sources: ["Ch. 4, p. 78", "Ch. 3, p. 43"],
  },
  {
    role: "user",
    text: "Is there textual evidence he never actually enjoys them?",
  },
  {
    role: "assistant",
    text: "Yes — Nick observes that Gatsby stands apart from his own parties, watching the crowd without participating. He is the host but never a guest.",
    sources: ["Ch. 3, p. 56"],
  },
];

function ChatPanel() {
  return (
    <div className="space-y-3 max-h-85 overflow-y-auto pr-1">
      {CHAT_MESSAGES.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
            style={
              msg.role === "user"
                ? {
                    background: "rgba(124,111,245,0.25)",
                    color: "rgba(255,255,255,0.8)",
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
            }
          >
            <p>{msg.text}</p>
            {msg.sources && (
              <div className="mt-2 flex gap-1.5 flex-wrap">
                {msg.sources.map((src) => (
                  <span
                    key={src}
                    className="text-[10px] px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {src}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Analytics panel ────────────────────────────────────────────────────────

const STATS = [
  { label: "Reading streak", value: "12 days" },
  { label: "Words looked up", value: "247" },
  { label: "Avg session", value: "34 min" },
];
const BAR_DAYS = [
  { label: "Mon", pct: 73 },
  { label: "Tue", pct: 27 },
  { label: "Wed", pct: 100 },
  { label: "Thu", pct: 50 },
  { label: "Fri", pct: 60 },
  { label: "Sat", pct: 93 },
  { label: "Sun", pct: 17 },
];

function AnalyticsPanel() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {s.value}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          className="text-[11px] font-medium mb-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Pages read per day
        </p>
        <div className="flex items-end gap-2" style={{ height: "80px" }}>
          {BAR_DAYS.map((day) => (
            <div
              key={day.label}
              className="flex-1 flex flex-col items-center gap-1.5"
            >
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${day.pct}%`,
                  background:
                    day.pct === 100
                      ? "rgba(124,111,245,0.7)"
                      : "rgba(124,111,245,0.5)",
                }}
              />
              <span
                className="text-[9px]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Demo section ───────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "explain", label: "AI Explain" },
  { id: "chat", label: "Book Chat" },
  { id: "analytics", label: "Analytics" },
];

const PANELS: Record<TabId, React.ReactNode> = {
  explain: <ExplainPanel />,
  chat: <ChatPanel />,
  analytics: <AnalyticsPanel />,
};

export function DemoSection() {
  const [activeTab, setActiveTab] = useState<TabId>("explain");

  return (
    <section
      id="demo"
      className="py-24 px-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(167,139,250,0.7)" }}
          >
            Demo Preview
          </span>
          <h2
            className="mt-2 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            See it before you try it.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Interactive mockups of the three core AI features.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#0e0e16",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Titlebar */}
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex gap-1.5" aria-hidden>
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "rgba(239,68,68,0.6)" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "rgba(234,179,8,0.6)" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "rgba(34,197,94,0.6)" }}
              />
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-1 px-3 py-1 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="text-[10px]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  arc.reader / library / gatsby /
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  reader
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex px-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            role="tablist"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-3 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px"
                  style={{
                    color: isActive ? "white" : "rgba(255,255,255,0.35)",
                    borderColor: isActive ? "#8b5cf6" : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            key={activeTab}
            role="tabpanel"
            className="p-5 sm:p-7 min-h-95 animate-fade-in"
          >
            {PANELS[activeTab]}
          </div>
        </div>
      </div>
    </section>
  );
}
