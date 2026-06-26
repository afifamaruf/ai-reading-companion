"use client";

import { useCallback } from "react";
import { useUploadStore } from "@/stores/upload.store";
import { useBookStore } from "@/stores/book.store";
import { bookService } from "@/services/book.service";
import { validateEpubFile } from "@/utils/file.utils";
import { UPLOAD_ERROR_MESSAGES } from "@/config/upload.constants";

interface UseUploadBookReturn {
  uploadFile: (file: File) => Promise<void>;
  reset: () => void;
}

/**
 * Hook yang mengorkestrasikan flow upload:
 * validasi → service call → update store → side effect (tambah ke book list).
 *
 * Komponen tidak perlu tahu detail Axios atau Zustand — cukup panggil uploadFile().
 */
export function useUploadBook(): UseUploadBookReturn {
  const { startUpload, setProgress, setSuccess, setError, reset } =
    useUploadStore();
  const addBook = useBookStore((s) => s.addBook);

  const uploadFile = useCallback(
    async (file: File) => {
      // 1. Validasi client-side dulu — gagal cepat tanpa network call
      const validationError = validateEpubFile(file);
      if (validationError) {
        setError(validationError.message);
        return;
      }

      // 2. Mulai proses upload
      startUpload(file.name);

      try {
        const book = await bookService.uploadBook(file, (percent) => {
          setProgress(percent);
        });

        // 3. Sukses — update upload store DAN book store
        setSuccess(book as Parameters<typeof setSuccess>[0]);
        addBook(book);
      } catch (err) {
        // 4. Gagal — normalisasi error message
        const message = isNetworkError(err)
          ? UPLOAD_ERROR_MESSAGES.NETWORK_ERROR
          : UPLOAD_ERROR_MESSAGES.SERVER_ERROR;

        setError(message);
      }
    },
    [startUpload, setProgress, setSuccess, setError, addBook],
  );

  return { uploadFile, reset };
}

function isNetworkError(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.message === "Network Error" || err.message.includes("timeout"))
  );
}
