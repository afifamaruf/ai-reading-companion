import {
  UPLOAD_CONFIG,
  UPLOAD_ERROR_MESSAGES,
} from "@/config/upload.constants";
import type { UploadValidationError } from "@/types/book.types";

// Validasi file di client (browser) sebelum dikirim ke server.

export function validateEpubFile(file: File): UploadValidationError | null {
  if (file.size === 0) {
    return { code: "EMPTY_FILE", message: UPLOAD_ERROR_MESSAGES.EMPT_FILE };
  }

  if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE_BYTES) {
    return {
      code: "FILE_TOO_LARGE",
      message: UPLOAD_ERROR_MESSAGES.FILE_TOO_LARGE,
    };
  }

  const hasValidExtension = UPLOAD_CONFIG.ALLOWED_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext),
  );

  if (!hasValidExtension) {
    return {
      code: "INVALID_EXTENSION",
      message: UPLOAD_ERROR_MESSAGES.INVALID_EXTENSION,
    };
  }

  return null;
}

// Format ukuran file menjadi string yang mudah dibaca (KB/MB).
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
