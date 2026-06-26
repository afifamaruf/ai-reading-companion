import { apiClient } from "./api.client";
import type { Book, UploadBookResponse } from "@/types/book.types";

export const bookService = {
  uploadBook: async (
    file: File,
    onProgress: (percent: number) => void,
  ): Promise<Book> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<UploadBookResponse>(
      "/api/books/upload",
      formData,
      {
        timeout: 60_000, // override default 30s — file besar butuh waktu lebih
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded / event.total) * 100);
            onProgress(percent);
          }
        },
      },
    );

    return response.data.data;
  },
};
