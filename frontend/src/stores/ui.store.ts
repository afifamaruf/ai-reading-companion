import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface UIState {
  isSidebarOpen: boolean;
  toasts: Toast[];

  // Actions
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isSidebarOpen: true,
      toasts: [],

      toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
      setSidebar: (open) => set({ isSidebarOpen: open }),

      addToast: (message, type = "info") =>
        set((s) => ({
          toasts: [...s.toasts, { id: crypto.randomUUID(), type, message }],
        })),

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    { name: "UIStore" },
  ),
);
