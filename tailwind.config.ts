import type { Config } from "tailwindcss";

/**
 * TAILWIND CONFIG — Photobooth App
 *
 * Di Tailwind v4, konfigurasi jauh lebih ringkas.
 * Design token (warna, animasi, spacing custom) sekarang
 * lebih baik didefinisikan langsung di CSS menggunakan
 * @theme directive — bukan di sini.
 *
 * File ini hanya mengatur:
 * 1. darkMode → paksa selalu dark
 * 2. content  → file mana yang di-scan untuk class names
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
