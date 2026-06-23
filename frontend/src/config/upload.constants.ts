export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE_BYTES: 100 * 1024 * 1024, // 100 MB
  ALLOWED_EXTENSIONS: [".epub"],
  ALLOWED_MIME_TYPES: ["application/epub+zip"],
} as const;

export const UPLOAD_ERROR_MESSAGES = {
  INVALID_EXTENSION: "Only .epub files are supported.",
  FILE_TOO_LARGE: "File is too large. Maximum size is 100MB.",
  EMPT_FILE: "The selected file appears to be empty.",
  NETWORK_ERROR: "Upload failed. Please check your connection and try again.",
  SERVER_ERROR: "Something went wrong on our end. Please try again.",
} as const;
