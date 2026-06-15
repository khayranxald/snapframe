/**
 * ROOT LAYOUT — Bingkai Semua Halaman
 * 📍 photobooth/src/app/layout.tsx
 *
 * Di-render SEKALI dan membungkus semua halaman.
 * Tidak refresh saat navigasi antar halaman.
 * Cocok untuk: font, metadata, provider global.
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { APP_CONFIG } from "@/config/design";

/* ── Font Loading ──────────────────────────────────────
   Next.js download & cache font otomatis.
   Geist = font resmi Vercel, mirip SF Pro Apple.
   ────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ── Metadata (SEO & browser tab) ─────────────────────── */
export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: ["photobooth", "photo", "camera", "frame", "download"],
  robots: { index: false, follow: false },
};

/* ── Viewport (Mobile) ───────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080c14", // Warna browser bar di mobile
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          min-h-dvh
          overflow-x-hidden
        `}
        style={{ backgroundColor: "#080c14", color: "white" }}
      >
        <div className="relative min-h-dvh flex flex-col">
          <main className="flex-1 relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
