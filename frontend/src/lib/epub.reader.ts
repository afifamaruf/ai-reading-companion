import ePub, {
  type Book as EpubBook,
  type Rendition,
  type NavItem,
} from "epubjs";
import type { TocItem } from "@/types/reader.types";

export interface CreateRenditionOptions {
  fontSize: number;
  theme: "light" | "dark" | "sepia";
}

const THEME_STYLES: Record<
  CreateRenditionOptions["theme"],
  Record<string, string>
> = {
  light: { background: "#ffffff", color: "#1a1814" },
  dark: { background: "#0f1117", color: "#f1f5f9" },
  sepia: { background: "#f4efe6", color: "#3b2e1a" },
};

//   Membuat instance Book dari epubjs berdasarkan URL file EPUB.

export function createEpubBook(fileUrl: string): EpubBook {
  return ePub(fileUrl);
}

//  Merender Book ke dalam DOM element tertentu, dengan konfigurasi awal.

export function createRendition(
  book: EpubBook,
  container: HTMLElement,
  options: CreateRenditionOptions,
): Rendition {
  const rendition = book.renderTo(container, {
    width: "100%",
    height: "100%",
    flow: "paginated",
    spread: "auto",
  });

  applyTheme(rendition, options.theme);
  applyFontSize(rendition, options.fontSize);

  return rendition;
}

export function applyTheme(
  rendition: Rendition,
  theme: CreateRenditionOptions["theme"],
): void {
  const styles = THEME_STYLES[theme];
  rendition.themes.register(theme, {
    body: { background: styles.background, color: styles.color },
  });
  rendition.themes.select(theme);
}

export function applyFontSize(rendition: Rendition, fontSize: number): void {
  rendition.themes.fontSize(`${fontSize}px`);
}

//   Mengubah struktur navigation.toc milik epubjs (NavItem[])
//   menjadi TocItem[] yang sudah kita ketik secara eksplisit.
//   Dilakukan secara rekursif karena TOC bisa bersarang (nested chapters).

export function mapNavItemsToTocItems(items: NavItem[]): TocItem[] {
  return items.map((item) => ({
    id: item.id ?? item.href,
    label: item.label.trim(),
    href: item.href,
    subitems: item.subitems ? mapNavItemsToTocItems(item.subitems) : [],
  }));
}
