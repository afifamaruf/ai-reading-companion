import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Highlight, ReaderTheme } from "@/types/reader.types";

interface ReaderState {
  // ── Posisi & navigasi (di-update oleh useEpubReader saat event 'relocated') ──
  currentBookId: string | null;
  currentCfi: string | null; // lokasi presisi di dalam EPUB
  currentHref: string | null; // path file chapter aktif, dipakai ReaderSidebar untuk highlight item aktif
  currentChapter: string | null; // label chapter aktif, dipakai ReaderToolbar
  readingProgress: number; // 0-100, dipakai ReaderToolbar

  // ── Highlights (dipakai fitur highlight, belum diimplementasi) ──
  highlights: Highlight[];

  // ── Preferensi tampilan — di-persist ke localStorage ──
  fontSize: number;
  theme: ReaderTheme;

  // ── Actions — dipanggil dari useEpubReader ──
  initReader: (bookId: string) => void;
  updatePosition: (cfi: string, progress: number) => void;
  setChapter: (chapter: string, href: string) => void;

  // ── Actions — preferensi ──
  setFontSize: (size: number) => void;
  setTheme: (theme: ReaderTheme) => void;

  // ── Actions — highlights ──
  addHighlight: (highlight: Highlight) => void;
  removeHighlight: (id: string) => void;
}

export const useReaderStore = create<ReaderState>()(
  devtools(
    persist(
      (set) => ({
        currentBookId: null,
        currentCfi: null,
        currentHref: null,
        currentChapter: null,
        readingProgress: 0,
        highlights: [],
        fontSize: 18,
        theme: "light",

        initReader: (bookId) =>
          set({
            currentBookId: bookId,
            currentCfi: null,
            currentHref: null,
            currentChapter: null,
            readingProgress: 0,
          }),

        updatePosition: (cfi, progress) =>
          set({ currentCfi: cfi, readingProgress: progress }),

        setChapter: (chapter, href) =>
          set({ currentChapter: chapter, currentHref: href }),

        setFontSize: (fontSize) => set({ fontSize }),
        setTheme: (theme) => set({ theme }),

        addHighlight: (highlight) =>
          set((s) => ({ highlights: [...s.highlights, highlight] })),

        removeHighlight: (id) =>
          set((s) => ({
            highlights: s.highlights.filter((h) => h.id !== id),
          })),
      }),
      {
        name: "arc-reader",
        // Hanya persist preferensi & highlights — BUKAN posisi baca saat ini,
        // karena posisi baca per-buku idealnya disimpan ke backend (reading progress API),
        // bukan localStorage yang bisa tertimpa saat ganti buku.
        partialize: (s) => ({
          fontSize: s.fontSize,
          theme: s.theme,
          highlights: s.highlights,
        }),
      },
    ),
    { name: "ReaderStore" },
  ),
);
