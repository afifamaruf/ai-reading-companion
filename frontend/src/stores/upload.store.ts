import { create } from "zustand";
import type { UploadStatus } from "@/types/book.types";

interface UploadState {
  status: UploadStatus;

  // Actions
  startUpload: (fileName: string) => void;
  setProgress: (progress: number) => void;
  setSuccess: (
    book: UploadStatus extends { state: "success"; book: infer B } ? B : never,
  ) => void;
  setError: (message: string) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>()((set) => ({
  status: { state: "idle" },

  startUpload: (fileName) =>
    set({ status: { state: "uploading", progress: 0, fileName } }),

  setProgress: (progress) =>
    set((s) => {
      // Hanya update jika masih dalam state 'uploading'
      if (s.status.state !== "uploading") return s;
      return { status: { ...s.status, progress } };
    }),

  setSuccess: (book) => set({ status: { state: "success", book } }),

  setError: (message) => set({ status: { state: "error", message } }),

  reset: () => set({ status: { state: "idle" } }),
}));
