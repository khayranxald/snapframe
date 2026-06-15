"use client";
/**
 * ANIMATED BACKGROUND — Background Futuristik
 * 📍 photobooth/src/components/layout/animated-background.tsx
 *
 * Layer visual berlapis:
 * 1. Gradient base gelap
 * 2. Orb bercahaya yang bergerak lambat (Framer Motion)
 * 3. Grid blueprint halus
 * 4. Vignette sudut gelap (efek sinematik)
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  showGrid?: boolean;
  showOrbs?: boolean;
  intensity?: "low" | "medium" | "high";
}

export function AnimatedBackground({ className, showGrid = true, showOrbs = true, intensity = "medium" }: AnimatedBackgroundProps) {
  const orbAlpha = { low: 0.14, medium: 0.22, high: 0.35 }[intensity];

  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Layer 1 — Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 130% 80% at 50% -10%, #0d1a3a 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 85% 90%, #090f20 0%, transparent 55%),
            linear-gradient(180deg, #080c14 0%, #050810 60%, #080c14 100%)
          `,
        }}
      />

      {/* Layer 2 — Animated orbs */}
      {showOrbs && (
        <>
          {/* Orb biru besar — kiri atas */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "55vw",
              height: "55vw",
              maxWidth: 560,
              maxHeight: 560,
              top: "-18%",
              left: "-12%",
              background: `radial-gradient(circle, rgba(0,112,243,${orbAlpha}) 0%, transparent 70%)`,
              filter: "blur(90px)",
            }}
            animate={{ x: [0, 28, -18, 0], y: [0, -18, 26, 0], scale: [1, 1.08, 0.94, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          />

          {/* Orb cyan — kanan tengah */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "38vw",
              height: "38vw",
              maxWidth: 380,
              maxHeight: 380,
              top: "28%",
              right: "-8%",
              background: `radial-gradient(circle, rgba(0,212,255,${orbAlpha * 0.55}) 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
            animate={{ x: [0, -35, 18, 0], y: [0, 28, -18, 0], scale: [1, 0.88, 1.12, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 4 }}
          />

          {/* Orb merah kecil — bawah kiri */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "22vw",
              height: "22vw",
              maxWidth: 220,
              maxHeight: 220,
              bottom: "12%",
              left: "22%",
              background: `radial-gradient(circle, rgba(255,0,60,${orbAlpha * 0.45}) 0%, transparent 70%)`,
              filter: "blur(70px)",
            }}
            animate={{ x: [0, 18, -28, 0], y: [0, -28, 10, 0], scale: [1, 1.18, 0.88, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 8 }}
          />
        </>
      )}

      {/* Layer 3 — Grid blueprint */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,112,243,0.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,112,243,0.9) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      )}

      {/* Layer 4 — Vignette sinematik */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 38%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
