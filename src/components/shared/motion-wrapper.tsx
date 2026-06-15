"use client";
/**
 * MOTION WRAPPER — Wrapper Animasi Reusable
 * 📍 src/components/shared/motion-wrapper.tsx
 *
 * Masalah yang dipecahkan:
 * Tanpa ini, setiap komponen harus tulis ulang:
 *   initial={{ opacity: 0, y: 24 }}
 *   animate={{ opacity: 1, y: 0 }}
 *   transition={{ duration: 0.55, ease: [...] }}
 *
 * Dengan FadeUp, cukup:
 *   <FadeUp delay={0.2}>konten</FadeUp>
 *
 * Lebih bersih, konsisten, mudah diubah global.
 */
import { motion, type HTMLMotionProps } from "framer-motion";
import { MOTION } from "@/config/design";

/* ── FadeUp ─────────────────────────────────────────────
   Animasi paling umum: muncul dari bawah + fade in
────────────────────────────────────────────────────── */
interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  once?: boolean; // Hanya animasi sekali saat masuk viewport
}

export function FadeUp({ delay = 0, duration = 0.55, once = true, children, ...props }: FadeUpProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once, margin: "-40px" }} transition={{ duration, delay, ease: MOTION.ease.ios }} {...props}>
      {children}
    </motion.div>
  );
}

/* ── StaggerContainer ───────────────────────────────────
   Container yang membuat child-nya animasi satu per satu.

   Cara kerja:
   - Container punya staggerChildren
   - Setiap child dengan variants.item akan delay otomatis
   - Tidak perlu set delay manual per item
────────────────────────────────────────────────────── */
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delay?: number;
  once?: boolean;
}

export function StaggerContainer({ stagger = 0.1, delay = 0.15, once = true, children, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerItem ────────────────────────────────────────
   Harus jadi child dari StaggerContainer.
   Variants "hidden" dan "visible" akan diambil dari parent.
────────────────────────────────────────────────────── */
interface StaggerItemProps extends HTMLMotionProps<"div"> {}

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: MOTION.ease.ios } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── ScaleIn ────────────────────────────────────────────
   Muncul dengan scale dari kecil ke normal
────────────────────────────────────────────────────── */
interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  once?: boolean;
}

export function ScaleIn({ delay = 0, once = true, children, ...props }: ScaleInProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once, margin: "-40px" }} transition={{ duration: 0.5, delay, ease: MOTION.ease.spring }} {...props}>
      {children}
    </motion.div>
  );
}
