export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  filePath: string;
  fileSize: number;
  language: string;
  totalLocations: number;
  isProcessed: boolean;
  createdAt: string;
  metadata: EpubMetadata;
}

export interface EpubMetadata {
  publisher?: string;
  description?: string;
  publishedDate?: string;
  subjects: string[];
  identifier?: string;
}

export interface UploadBookPayload {
  file: File;
}

export interface UpdateProgressPayload {
  cfi: string;
  progress: number;
  chapter: string;
}

export type UploadStatus =
  | { state: "idle" }
  | { state: "uploading"; progress: number; fileName: string }
  | { state: "success"; book: Book }
  | { state: "error"; message: string };

export interface UploadBookResponse {
  data: Book;
  message: string;
  success: boolean;
}

export interface UploadValidationError {
  code: "INVALID_EXTENSION" | "FILE_TOO_LARGE" | "EMPTY_FILE";
  message: string;
}
