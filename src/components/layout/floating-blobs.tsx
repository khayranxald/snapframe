"use client";
// 📍 src/components/layout/floating-blobs.tsx

import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/particles/floating-particles";

const BLOBS = [
  { id: 1, color: "#0070f3", size: 60, maxSize: 600, top: "-15%", left: "-10%", blur: 100, opacity: 0.22, duration: 22, delay: 0, moveX: [0, 28, -18, 0] as number[], moveY: [0, -18, 26, 0] as number[] },
  { id: 2, color: "#00d4ff", size: 40, maxSize: 400, top: "25%", right: "-8%", blur: 110, opacity: 0.14, duration: 26, delay: 4, moveX: [0, -35, 15, 0] as number[], moveY: [0, 25, -20, 0] as number[] },
  { id: 3, color: "#ff003c", size: 25, maxSize: 250, bottom: "10%", left: "20%", blur: 80, opacity: 0.12, duration: 18, delay: 8, moveX: [0, 18, -25, 0] as number[], moveY: [0, -28, 12, 0] as number[] },
  { id: 4, color: "#0070f3", size: 20, maxSize: 200, bottom: "5%", right: "25%", blur: 70, opacity: 0.1, duration: 14, delay: 12, moveX: [0, -15, 20, 0] as number[], moveY: [0, 20, -15, 0] as number[] },
  { id: 5, color: "#bf5fff", size: 18, maxSize: 180, top: "55%", left: "40%", blur: 90, opacity: 0.08, duration: 20, delay: 6, moveX: [0, 25, -10, 0] as number[], moveY: [0, -20, 25, 0] as number[] },
];

export function FloatingBlobs() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 140% 80% at 50% -5%, #0d1a3a 0%, transparent 50%),
              linear-gradient(180deg, #080c14 0%, #050810 100%)
            `,
          }}
        />

        {/* Animated orbs */}
        {BLOBS.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              width: `min(${blob.size}vw, ${blob.maxSize}px)`,
              height: `min(${blob.size}vw, ${blob.maxSize}px)`,
              top: blob.top,
              left: blob.left,
              right: (blob as any).right,
              bottom: (blob as any).bottom,
              background: blob.color,
              filter: `blur(${blob.blur}px)`,
              opacity: blob.opacity,
            }}
            animate={{ x: blob.moveX, y: blob.moveY, scale: [1, 1.08, 0.94, 1] }}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: blob.delay }}
          />
        ))}

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,112,243,0.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,112,243,0.9) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 38%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      {/* Floating particles layer */}
      <FloatingParticles count={28} colors={["#0070f3", "#00d4ff", "#bf5fff", "#ff003c"]} className="fixed inset-0 pointer-events-none -z-[3]" />
    </>
  );
}
