export type ReaderTheme = "light" | "dark" | "sepia";
export type HighlightColor = "yellow" | "blue" | "green" | "pink";

export interface Highlight {
  id: string;
  bookId: string;
  cfiRange: string;
  text: string;
  color: HighlightColor;
  note?: string;
  aiExplanation?: string;
  createdAt: string;
}

export interface ReadingPosition {
  bookId: string;
  cfi: string;
  progress: number;
  chapter: string;
  updatedAt: string;
}

export interface CreateHighlightPayload {
  bookId: string;
  cfiRange: string;
  text: string;
  color: HighlightColor;
}
