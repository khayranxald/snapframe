"use client";
// 📍 src/components/photobooth/templates-section.tsx
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { GlassCard, NeonButton } from "@/components/ui";
import { SectionLabel, FadeUp } from "@/components/shared";
import { TEMPLATES } from "@/data/templates";
import { cn } from "@/lib/utils";

export function TemplatesSection() {
  return (
    <section className="relative z-10 px-5 sm:px-8 pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-10">
          <SectionLabel className="mb-3">Template Tersedia</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
            Pilih Gaya Favoritmu
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px]" style={{ color: "rgba(255,255,255,0.38)" }}>
            Semua template bisa di-preview dan disesuaikan
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {TEMPLATES.map((tmpl, i) => (
            <motion.div key={tmpl.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.07, duration: 0.5 }}>
              <GlassCard variant="base" padding="sm" rounded="lg" hover className="group cursor-pointer relative">
                {tmpl.isPremium && (
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(255,0,60,0.15)", border: "1px solid rgba(255,0,60,0.3)", color: "#ff4d6d" }}>
                    <Crown className="w-2.5 h-2.5" />
                    PRO
                  </div>
                )}
                <div
                  className={cn(
                    "w-full rounded-[8px] mb-3 overflow-hidden p-1.5",
                    tmpl.layout === "strip-1x4" && "aspect-[3/4] flex flex-col gap-1",
                    tmpl.layout === "strip-2x2" && "aspect-square flex flex-wrap gap-1",
                    tmpl.layout === "cinematic-3" && "aspect-[4/3] flex flex-row gap-1",
                    tmpl.layout === "single" && "aspect-square flex flex-col",
                  )}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {Array.from({ length: tmpl.photoCount }).map((_, j) => (
                    <div
                      key={j}
                      className={cn("rounded flex-1 transition-all duration-400 opacity-40 group-hover:opacity-75", tmpl.layout === "strip-2x2" && "basis-[calc(50%-2px)] grow-0")}
                      style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)", boxShadow: `inset 0 0 8px ${tmpl.colors.accent}20` }}
                    />
                  ))}
                </div>
                <p className="text-center text-[11px] font-medium transition-colors duration-200 group-hover:text-white/80" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {tmpl.name}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <FadeUp delay={0.3} className="text-center">
          <NeonButton variant="glass" size="md">
            Lihat Semua Template
          </NeonButton>
        </FadeUp>
      </div>
    </section>
  );
}
