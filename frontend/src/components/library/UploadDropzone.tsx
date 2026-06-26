"use client";

import {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { useUploadStore } from "@/stores/upload.store";
import { useUploadBook } from "@/hooks/useUploadBooks";
import { formatFileSize } from "@/utils/file.utils";

export function UploadDropzone() {
  const { status } = useUploadStore();
  const { uploadFile, reset } = useUploadBook();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      void uploadFile(file);
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0]);
    },
    [handleFile],
  );

  const openFilePicker = () => inputRef.current?.click();

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* ── Idle / Dragging state ── */}
      {status.state === "idle" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={openFilePicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openFilePicker()}
          className={`
            cursor-pointer rounded-2xl border-2 border-dashed p-10
            flex flex-col items-center justify-center gap-3
            transition-colors duration-200
            ${
              isDragging
                ? "border-violet-500 bg-violet-500/5"
                : "border-gray-300 dark:border-white/15 hover:border-violet-400 dark:hover:border-violet-500/50"
            }
          `}
        >
          <UploadIcon />
          <p className="text-sm font-medium text-gray-700 dark:text-white/70">
            Drag & drop your EPUB here, or click to browse
          </p>
          <p className="text-xs text-gray-400 dark:text-white/30">
            Maximum file size: 100MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".epub"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* ── Uploading state ── */}
      {status.state === "uploading" && (
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <SpinnerIcon />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-white/80 truncate">
                {status.fileName}
              </p>
              <p className="text-xs text-gray-400 dark:text-white/40">
                Uploading… {status.progress}%
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${status.progress}%` }}
              role="progressbar"
              aria-valuenow={status.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* ── Success state ── */}
      {status.state === "success" && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 p-6 flex items-start gap-3">
          <CheckCircleIcon />
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Upload successful
            </p>
            <p className="text-sm text-gray-600 dark:text-white/60 mt-0.5">
              {status.book.title} · {formatFileSize(status.book.fileSize)}
            </p>
          </div>
          <button
            onClick={reset}
            className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
          >
            Upload another
          </button>
        </div>
      )}

      {/* ── Error state ── */}
      {status.state === "error" && (
        <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 p-6 flex items-start gap-3">
          <ErrorIcon />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Upload failed
            </p>
            <p className="text-sm text-gray-600 dark:text-white/60 mt-0.5">
              {status.message}
            </p>
          </div>
          <button
            onClick={reset}
            className="text-xs font-medium text-red-700 dark:text-red-400 hover:underline shrink-0"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────

function UploadIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-400 dark:text-white/30"
    >
      <path
        d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin text-violet-500 shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-emerald-500 shrink-0 mt-0.5"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-red-500 shrink-0 mt-0.5"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8v5M12 16h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
