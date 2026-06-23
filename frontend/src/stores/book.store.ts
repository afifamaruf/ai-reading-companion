import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Book } from "@/types/book.types";

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  selectBook: (book: Book | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBookStore = create<BookState>()(
  devtools(
    persist(
      (set) => ({
        books: [],
        selectedBook: null,
        isLoading: false,
        error: null,

        setBooks: (books) => set({ books }),
        addBook: (book) => set((s) => ({ books: [book, ...s.books] })),
        removeBook: (id) =>
          set((s) => ({ books: s.books.filter((b) => b.id !== id) })),
        selectBook: (book) => set({ selectedBook: book }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "arc-books",
        // Hanya persist daftar buku, bukan loading/error state
        partialize: (s) => ({ books: s.books }),
      },
    ),
    { name: "BookStore" },
  ),
);
