/**
 * DESIGN CONFIG — Token & Animasi
 * 📍 photobooth/src/config/design.ts
 *
 * Berisi konstanta desain yang dipakai di JavaScript/TypeScript.
 * Terutama untuk konfigurasi Framer Motion yang butuh nilai angka.
 */

export const COLORS = {
  brand: "#0070f3",
  brandLight: "#2690ff",
  brandDark: "#0057c2",
  neonRed: "#ff003c",
  neonBlue: "#00d4ff",
  neonPurple: "#bf5fff",
  surface: "#080c14",
  surface1: "#0d1220",
  surface2: "#111827",
  surface3: "#1a2236",
} as const;

export const APP_CONFIG = {
  name: "SnapFrame",
  tagline: "Premium Photobooth Experience",
  description: "Capture moments. Create memories. Share beauty.",
  version: "1.0.0",
} as const;

/**
 * FRAMER MOTION CONFIGS
 *
 * Kenapa di sini, bukan inline di komponen?
 * Supaya animasi konsisten di seluruh app.
 * Ganti satu tempat → berubah semua.
 */
export const MOTION = {
  /* Spring — gerakan natural dengan bounce */
  spring: {
    gentle: { type: "spring", stiffness: 300, damping: 30 } as const,
    bouncy: { type: "spring", stiffness: 400, damping: 20 } as const,
    stiff: { type: "spring", stiffness: 500, damping: 40 } as const,
  },

  /* Easing curves */
  ease: {
    ios: [0.4, 0, 0.2, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
    smooth: [0.25, 0.1, 0.25, 1] as const,
  },

  /* Durasi transisi (ms) */
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
    slower: 0.6,
  },

  /* Variants reusable — pakai di motion.div */
  variants: {
    /* Fade + naik dari bawah */
    fadeUp: {
      hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -16, filter: "blur(4px)" },
    },
    /* Scale dari kecil */
    scaleIn: {
      hidden: { opacity: 0, scale: 0.88 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    /* Slide dari kanan */
    slideRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
    },
    /* Blur masuk */
    blurIn: {
      hidden: { opacity: 0, filter: "blur(16px)", scale: 0.97 },
      visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
      exit: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
    },
  },

  /* Container stagger — untuk animasi list item satu per satu */
  stagger: {
    fast: { staggerChildren: 0.06, delayChildren: 0.1 },
    base: { staggerChildren: 0.1, delayChildren: 0.2 },
    slow: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
} as const;
