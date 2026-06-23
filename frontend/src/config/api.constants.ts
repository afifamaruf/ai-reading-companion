// Semua endpoint string di definisikan di satu tempat
// Perubahan URL backend cukup edit file ini

export const API_ROUTES = {
  // Books
  BOOKS: {
    LIST: "/books",
    UPLOAD: "/books/upload",
    DETAIL: (id: string) => `/books/${id}`,
    DELETE: (id: string) => `/books/${id}`,
    PROGRESS: (id: string) => `/books/${id}/progress`,
  },
  HIGHLIGHTS: {
    LIST: (bookId: string) => `/books/${bookId}/highlights`,
    CREATE: (bookId: string) => `/books/${bookId}/highlights`,
    DELETE: (bookId: string, id: string) => `/books/${bookId}/highlights/${id}`,
  },
  AI: {
    EXPLAIN: "/ai/explian",
    CHAT: "/ai/chat",
    CHAT_STREAM: "/ai/chat/stream",
    CHARACTERS: (bookId: string) => `/ai/books/${bookId}/characters`,
  },
  ANALYTICS: {
    SUMMARY: (bookId: string) => `/analytics/${bookId}/summary`,
    SESSIONS: (bookId: string) => `/analytics/${bookId}/sessions`,
    LOG_SESSIONS: "/analytics/session",
  },
} as const;
