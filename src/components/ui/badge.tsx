"use client";
/**
 * BADGE — Pill Label Kecil
 * 📍 src/components/ui/badge.tsx
 *
 * Dipakai untuk label seperti "NEW", "PRO", atau tagline pendek.
 * Punya dot animasi (pulse) dan efek glass ringan.
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "red" | "cyan" | "white";
  dot?: boolean; // Tampilkan dot animasi di kiri
  className?: string;
}

export function Badge({ children, variant = "blue", dot = true, className }: BadgeProps) {
  const variantStyles = {
    blue: { wrap: "bg-brand-500/10 border-brand-500/30 text-brand-300", dot: "#00d4ff" },
    red: { wrap: "bg-neon-red/10  border-neon-red/30  text-red-300", dot: "#ff003c" },
    cyan: { wrap: "bg-neon-blue/10 border-neon-blue/30 text-cyan-300", dot: "#00d4ff" },
    white: { wrap: "bg-white/8      border-white/20      text-white/70", dot: "#ffffff" },
  };

  const v = variantStyles[variant];

  return (
    <motion.div
      className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full", "border text-[11px] font-medium tracking-wide", v.wrap, className)}
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {/* Outer ping — lingkaran yang melebar dan menghilang */}
          <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75" style={{ backgroundColor: v.dot }} />
          {/* Inner solid dot */}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: v.dot }} />
        </span>
      )}
      {children}
    </motion.div>
  );
}
