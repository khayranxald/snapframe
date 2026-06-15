/**
 * TYPES — Definisi Tipe Data Global
 * 📍 photobooth/src/types/index.ts
 *
 * TypeScript butuh kita mendefinisikan "bentuk" data.
 * Analoginya: kalau data adalah air, tipe adalah gelas —
 * menentukan bentuk dan batasannya.
 */

/* ─── PHOTOBOOTH ──────────────────────────────────────── */

export type PhotoboothLayout = "strip-2x4" | "grid-2x2" | "single" | "triptych" | "cinematic";

export type PhotoboothStatus = "idle" | "preview" | "countdown" | "capturing" | "processing" | "result";

export type PhotoFilter = "none" | "noir" | "vivid" | "cool" | "warm" | "fade" | "neon";

export interface PhotoCapture {
  id: string;
  dataUrl: string;
  timestamp: number;
  filter?: PhotoFilter;
}

export interface PhotoboothTemplate {
  id: string;
  name: string;
  description: string;
  layout: PhotoboothLayout;
  photoCount: number;
  frameColor: string;
  bgColor: string;
  accent: string;
  isPremium: boolean;
  preview?: string;
}

export interface PhotoboothSession {
  id: string;
  template: PhotoboothTemplate;
  photos: PhotoCapture[];
  status: PhotoboothStatus;
  createdAt: number;
  completedAt?: number;
}

/* ─── UI ──────────────────────────────────────────────── */

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type ColorVariant = "primary" | "secondary" | "accent" | "ghost" | "danger";
export type DownloadFormat = "png" | "pdf";

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/* ─── APP ─────────────────────────────────────────────── */

export type AppPage = "landing" | "template-select" | "photobooth" | "result";

export const PHOTOBOOTH_TEMPLATES: PhotoboothTemplate[] = [
  {
    id: "classic-strip",
    name: "Classic Strip",
    description: "4 foto berjejer vertikal — gaya photobooth klasik",
    layout: "strip-2x4",
    photoCount: 4,
    frameColor: "#ffffff",
    bgColor: "#000000",
    accent: "#0070f3",
    isPremium: false,
  },
  {
    id: "grid-2x2",
    name: "2×2 Grid",
    description: "4 foto dalam susunan kotak 2x2",
    layout: "grid-2x2",
    photoCount: 4,
    frameColor: "#ffffff",
    bgColor: "#111827",
    accent: "#00d4ff",
    isPremium: false,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "3 foto landscape — nuansa film",
    layout: "cinematic",
    photoCount: 3,
    frameColor: "#ffffff",
    bgColor: "#080c14",
    accent: "#ff003c",
    isPremium: true,
  },
  {
    id: "single",
    name: "Single Shot",
    description: "1 foto besar berkualitas tinggi",
    layout: "single",
    photoCount: 1,
    frameColor: "#ffffff",
    bgColor: "#0d1220",
    accent: "#bf5fff",
    isPremium: false,
  },
];
