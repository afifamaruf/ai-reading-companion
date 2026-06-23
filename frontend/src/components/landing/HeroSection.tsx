"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const AI_EXPLANATION =
  'In this context, "ghostly" describes Gatsby\'s heart as a repository ' +
  "for intangible, unreachable dreams — Fitzgerald signals that what drives " +
  "him is not real memory but an idealized fiction of the past he's constructed.";

const BOOK_PARAGRAPH =
  "He had thrown himself into it with a creative passion, adding to it all the " +
  "time, decking it out with every bright feather that drifted his way. No amount " +
  "of fire or freshness can challenge what a man will store up in his ghostly heart.";

function AiTypingBubble() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(AI_EXPLANATION.slice(0, i));
        if (i >= AI_EXPLANATION.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, 16);
    }, 900);

    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(46,16,101,0.6)",
        border: "1px solid rgba(124,111,245,0.2)",
        boxShadow: "0 8px 24px rgba(76,29,149,0.2)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "rgba(124,111,245,0.8)" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 1L6.5 4H9L7 6l1 3-3-2-3 2 1-3-2-2h2.5L5 1Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </span>
        <span className="text-[11px] font-semibold text-violet-300">
          arc AI explanation
        </span>
      </div>

      <p className="text-sm text-white/75 leading-relaxed min-h-16">
        {displayed}
        {!done && (
          <span className="inline-block w-0.5 h-3.5 bg-violet-400 ml-0.5 animate-pulse rounded-full align-middle" />
        )}
      </p>

      {done && (
        <div
          className="mt-3 pt-3 flex flex-wrap gap-2 animate-fade-in"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[10px] text-white/30 self-center">from</span>
          <span
            className="text-[10px] px-2 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Ch. 5, para. 3
          </span>
          <span
            className="text-[10px] px-2 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Fitzgerald&apos;s letters
          </span>
        </div>
      )}
    </div>
  );
}

function ReadingCardMock() {
  const [before, after] = BOOK_PARAGRAPH.split("ghostly");

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: "rgba(124,111,245,0.08)", filter: "blur(32px)" }}
      />
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          background: "#111118",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/30 font-medium">
              The Great Gatsby
            </span>
            <span className="text-white/15">·</span>
            <span className="text-[11px] text-white/20">Chapter 5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/25">47%</span>
            <div
              className="w-16 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: "47%", background: "rgba(124,111,245,0.7)" }}
              />
            </div>
          </div>
        </div>

        {/* Book text */}
        <div className="px-6 py-5">
          <p
            className="text-sm leading-[1.9] select-none"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "Georgia, serif",
            }}
          >
            {before}
            <mark
              className="rounded px-0.5 cursor-pointer"
              style={{ background: "rgba(124,111,245,0.35)", color: "#c4b5fd" }}
            >
              ghostly
            </mark>
            {after}
          </p>
        </div>

        <div
          className="mx-6 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        />

        {/* AI panel */}
        <div className="px-4 pb-4 pt-3">
          <AiTypingBubble />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-5 overflow-hidden">
      {/* BG glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(124,111,245,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <Badge variant="violet" className="mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Powered by RAG + OpenRouter
      </Badge>

      <h1
        className="text-center font-extrabold tracking-tight text-white max-w-3xl"
        style={{ fontSize: "clamp(2.2rem, 6vw, 3.75rem)", lineHeight: "1.08" }}
      >
        Read English books
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #a78bfa, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          with AI beside you.
        </span>
      </h1>

      <p
        className="mt-5 text-center max-w-xl leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
        }}
      >
        Upload any EPUB. Highlight a word or sentence. Get instant,
        context-aware explanations — not dictionary definitions, but meaning
        inside your book.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
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
        <Button variant="ghost" size="lg" href="#demo">
          See it in action
        </Button>
      </div>

      <p className="mt-4 text-xs text-white/25 tracking-wide">
        No account needed to try · Works with any EPUB
      </p>

      <div className="mt-16 w-full max-w-lg">
        <ReadingCardMock />
      </div>
    </section>
  );
}
