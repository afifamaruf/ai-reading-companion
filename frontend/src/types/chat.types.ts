export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: RagSource[];
  isLoading?: boolean; // true saat streaming belum selesai
  createdAt: string;
}

export interface RagSource {
  chunkId: string;
  text: string;
  chapter: string;
  similarity: number;
}

export interface ChatSession {
  id: string;
  bookId: string;
  messages: Message[];
  createdAt: string;
}

export interface SendMessagePayload {
  bookId: string;
  sessionId: string;
  message: string;
}
