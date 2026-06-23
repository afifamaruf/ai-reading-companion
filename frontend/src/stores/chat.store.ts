import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Message, ChatSession } from "@/types/chat.types";

interface ChatState {
  sessions: Record<string, ChatSession>;
  isStreaming: boolean;
  streamingContent: string;
  streamingMsgId: string | null;

  // Actions
  initSession: (bookId: string) => void;
  addMessage: (bookId: string, message: Message) => void;
  startStream: (bookId: string, msgId: string) => void;
  appendChunk: (chunk: string) => void;
  finalizeStream: (bookId: string) => void;
  clearSession: (bookId: string) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      sessions: {},
      isStreaming: false,
      streamingContent: "",
      streamingMsgId: null,

      initSession: (bookId) =>
        set((s) => ({
          sessions: {
            ...s.sessions,
            [bookId]: s.sessions[bookId] ?? {
              id: bookId,
              bookId,
              messages: [],
              createdAt: new Date().toISOString(),
            },
          },
        })),

      addMessage: (bookId, message) =>
        set((s) => {
          const session = s.sessions[bookId] ?? {
            id: bookId,
            bookId,
            messages: [],
            createdAt: new Date().toISOString(),
          };

          return {
            sessions: {
              ...s.sessions,
              [bookId]: {
                ...session,
                messages: [...session.messages, message],
              },
            },
          };
        }),

      startStream: (_, msgId) =>
        set({ isStreaming: true, streamingContent: "", streamingMsgId: msgId }),

      appendChunk: (chunk) =>
        set((s) => ({ streamingContent: s.streamingContent + chunk })),

      // Saat stream selesai: commit content ke messages, reset stream state
      finalizeStream: (bookId) => {
        const { streamingContent, streamingMsgId, sessions } = get();
        if (!streamingMsgId) return;

        const session = sessions[bookId];
        if (!session) return;

        const updatedMessages = session.messages.map((m) =>
          m.id === streamingMsgId ? { ...m, content: streamingContent } : m,
        );

        set((s) => ({
          isStreaming: false,
          streamingContent: "",
          streamingMsgId: null,
          sessions: {
            ...s.sessions,
            [bookId]: { ...session, messages: updatedMessages },
          },
        }));
      },

      clearSession: (bookId) =>
        set((s) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [bookId]: _, ...rest } = s.sessions;
          return { sessions: rest };
        }),
    }),
    { name: "ChatStore" },
  ),
);
