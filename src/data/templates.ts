/**
 * TEMPLATE DATA — Konfigurasi Semua Template
 * 📍 src/data/templates.ts
 */

export type TemplateLayout = "strip-1x4" | "strip-2x2" | "cinematic-3" | "single" | "collage-5";

export type PhotoFilter = "none" | "noir" | "warm" | "cool" | "vivid" | "fade" | "neon-pop";

export interface TemplateColors {
  bg: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  text: string;
  cardGlow: string;
  gradient: { from: string; via: string; to: string };
}

export interface TemplateFrame {
  style: "clean" | "classic" | "rounded" | "polaroid";
  borderWidth: number;
  cornerRadius: number;
  padding: number;
  showDate: boolean;
  showLogo: boolean;
}

export interface PhotoboothTemplate {
  id: string;
  name: string;
  tagline: string;
  layout: TemplateLayout;
  photoCount: number;
  colors: TemplateColors;
  frame: TemplateFrame;
  filter: PhotoFilter;
  isPremium: boolean;
  isNew?: boolean;
  tags: string[];
}

export const TEMPLATES: PhotoboothTemplate[] = [
  {
    id: "blue-neon",
    name: "Blue Neon",
    tagline: "Futuristik & Elektrik",
    layout: "strip-1x4",
    photoCount: 4,
    colors: {
      bg: "#060d1f",
      accent: "#0070f3",
      accentLight: "#60aaff",
      accentDark: "#0041a8",
      text: "#ffffff",
      cardGlow: "rgba(0,112,243,0.5)",
      gradient: { from: "#0057c2", via: "#0070f3", to: "#00d4ff" },
    },
    frame: { style: "clean", borderWidth: 2, cornerRadius: 8, padding: 12, showDate: true, showLogo: true },
    filter: "cool",
    isPremium: false,
    tags: ["futuristik", "party", "neon"],
  },
  {
    id: "midnight-black",
    name: "Midnight Black",
    tagline: "Elegan & Dramatis",
    layout: "strip-2x2",
    photoCount: 4,
    colors: {
      bg: "#0a0a0a",
      accent: "#c9a84c",
      accentLight: "#f0d080",
      accentDark: "#8a6a20",
      text: "#f5f5f5",
      cardGlow: "rgba(201,168,76,0.45)",
      gradient: { from: "#2a2a2a", via: "#c9a84c", to: "#f0d080" },
    },
    frame: { style: "classic", borderWidth: 3, cornerRadius: 4, padding: 16, showDate: true, showLogo: true },
    filter: "noir",
    isPremium: false,
    tags: ["elegan", "fashion", "hitam"],
  },
  {
    id: "retro-film",
    name: "Retro Film",
    tagline: "Nostalgia & Hangat",
    layout: "cinematic-3",
    photoCount: 3,
    colors: {
      bg: "#1a0f00",
      accent: "#e8832a",
      accentLight: "#ffb366",
      accentDark: "#a05010",
      text: "#fff8e7",
      cardGlow: "rgba(232,131,42,0.45)",
      gradient: { from: "#a05010", via: "#e8832a", to: "#ffb366" },
    },
    frame: { style: "polaroid", borderWidth: 4, cornerRadius: 2, padding: 20, showDate: true, showLogo: false },
    filter: "warm",
    isPremium: false,
    isNew: true,
    tags: ["retro", "nostalgia", "film"],
  },
  {
    id: "ice-white",
    name: "Ice White",
    tagline: "Bersih & Minimalis",
    layout: "strip-1x4",
    photoCount: 4,
    colors: {
      bg: "#f0f6ff",
      accent: "#4a90d9",
      accentLight: "#a8d4ff",
      accentDark: "#2060a0",
      text: "#1a2a3a",
      cardGlow: "rgba(74,144,217,0.4)",
      gradient: { from: "#2060a0", via: "#4a90d9", to: "#a8d4ff" },
    },
    frame: { style: "rounded", borderWidth: 2, cornerRadius: 16, padding: 14, showDate: true, showLogo: true },
    filter: "fade",
    isPremium: true,
    tags: ["minimalis", "wedding", "putih"],
  },
  {
    id: "red-pulse",
    name: "Red Pulse",
    tagline: "Bold & Berenergi",
    layout: "strip-2x2",
    photoCount: 4,
    colors: {
      bg: "#120008",
      accent: "#ff003c",
      accentLight: "#ff6b8a",
      accentDark: "#aa0028",
      text: "#ffffff",
      cardGlow: "rgba(255,0,60,0.5)",
      gradient: { from: "#aa0028", via: "#ff003c", to: "#ff6b8a" },
    },
    frame: { style: "clean", borderWidth: 2, cornerRadius: 6, padding: 10, showDate: false, showLogo: true },
    filter: "vivid",
    isPremium: true,
    isNew: true,
    tags: ["bold", "concert", "merah"],
  },
];

export function getTemplateById(id: string): PhotoboothTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getFreeTemplates(): PhotoboothTemplate[] {
  return TEMPLATES.filter((t) => !t.isPremium);
}
export function getPremiumTemplates(): PhotoboothTemplate[] {
  return TEMPLATES.filter((t) => t.isPremium);
}

export const LAYOUT_LABELS: Record<TemplateLayout, string> = {
  "strip-1x4": "Strip 1×4",
  "strip-2x2": "Grid 2×2",
  "cinematic-3": "Sinematik",
  single: "Single",
  "collage-5": "Kolase",
};

export const FILTER_LABELS: Record<PhotoFilter, string> = {
  none: "Asli",
  noir: "Hitam Putih",
  warm: "Hangat",
  cool: "Dingin",
  vivid: "Vivid",
  fade: "Fade",
  "neon-pop": "Neon Pop",
};

export const DEFAULT_TEMPLATE = TEMPLATES[0];
