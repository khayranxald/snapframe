"use client";
// 📍 src/components/photobooth/hero-section.tsx

import { motion } from "framer-motion";
import { Camera, Film, ChevronRight, Sparkles, Zap } from "lucide-react";
import { Badge, NeonButton, GlassCard } from "@/components/ui";
import { TextReveal, PulseRing, MagneticButton } from "@/components/animations";
import { MOTION } from "@/config/design";

interface HeroSectionProps {
  onStart?: () => void;
}

const heroContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: MOTION.ease.ios } },
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-5 sm:px-8 pt-24 pb-16">
      <motion.div className="flex flex-col items-center text-center max-w-3xl mx-auto w-full" variants={heroContainer} initial="hidden" animate="visible">
        {/* Badge */}
        <motion.div variants={heroItem} className="mb-6">
          <Badge variant="blue" dot>
            ✦ Premium Photobooth Experience
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={heroItem} className="text-[38px] sm:text-[54px] md:text-[66px] lg:text-[78px] font-extrabold mb-5 leading-[1.05]" style={{ letterSpacing: "-0.04em" }}>
          <span className="gradient-text block">Abadikan Momen</span>
          <span className="text-white block">dengan Gaya Futuristik</span>
        </motion.h1>

        {/* Sub */}
        <motion.p variants={heroItem} className="text-[15px] sm:text-[16px] leading-relaxed max-w-[380px] mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
          Photobooth premium langsung dari browser. Pilih template, ambil foto, dan download — tanpa aplikasi, tanpa akun.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
          {/* Primary CTA dengan PulseRing */}
          <div className="relative flex items-center justify-center">
            <PulseRing color="#0070f3" size={52} className="absolute" />
            <MagneticButton onClick={onStart}>
              <NeonButton variant="primary" size="lg" glow>
                <Camera className="w-5 h-5 transition-transform group-hover:scale-110" />
                Buka Photobooth
                <ChevronRight className="w-4 h-4 opacity-60" />
              </NeonButton>
            </MagneticButton>
          </div>

          <NeonButton variant="glass" size="lg">
            <Film className="w-5 h-5" />
            Lihat Template
          </NeonButton>
        </motion.div>

        {/* Social proof */}
        <motion.div variants={heroItem} className="flex items-center gap-4 flex-wrap justify-center">
          {["Gratis selamanya", "Tidak perlu login", "Langsung pakai"].map((text, i) => (
            <span key={text} className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              {i > 0 && <span className="w-0.5 h-0.5 rounded-full bg-white/20" />}
              <Zap className="w-2.5 h-2.5 text-brand-500/60" />
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero preview card floating */}
      <motion.div className="mt-14 sm:mt-16 w-full max-w-sm mx-auto" initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: MOTION.ease.spring }}>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <GlassCard variant="blue" padding="md" rounded="xl" glow="blue" shimmer gradientBorder>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0057c2,#0070f3)", boxShadow: "0 0 10px rgba(0,112,243,0.5)" }}>
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[13px] font-semibold text-white">Classic Strip</span>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(0,112,243,0.15)", color: "#60aaff", border: "1px solid rgba(0,112,243,0.25)" }}>
                4 foto
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/2] rounded-[8px] flex items-center justify-center"
                  style={{
                    background: [
                      "linear-gradient(135deg,rgba(0,112,243,0.2),rgba(0,212,255,0.1))",
                      "linear-gradient(135deg,rgba(255,0,60,0.15),rgba(191,95,255,0.1))",
                      "linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,112,243,0.1))",
                      "linear-gradient(135deg,rgba(191,95,255,0.15),rgba(0,212,255,0.1))",
                    ][i],
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Sparkles className="w-4 h-4 opacity-30" style={{ color: ["#60aaff", "#ff4d6d", "#00d4ff", "#d08eff"][i] }} />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-8 rounded-[8px] flex items-center justify-center text-[11px] font-medium text-white" style={{ background: "linear-gradient(135deg,#0057c2,#0070f3)", boxShadow: "0 0 10px rgba(0,112,243,0.3)" }}>
                Download PNG
              </div>
              <div className="h-8 px-3 rounded-[8px] flex items-center justify-center text-[11px] font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                PDF
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(0,112,243,0.5), transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
