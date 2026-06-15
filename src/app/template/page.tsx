"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { FloatingBlobs, Navbar } from "@/components/layout";
import { TemplateCarousel } from "@/components/photobooth/template-carousel";
import { TemplatePreview } from "@/components/photobooth/template-preview";
import { useTemplateSelection } from "@/hooks/useTemplateSelection";
import { SectionLabel } from "@/components/shared";

export default function TemplatePage() {
  const router = useRouter();

  const { templates, selected, selectedId, hoveredId, select, setHovered } = useTemplateSelection();

  const activeTemplate = templates.find((t) => t.id === (hoveredId ?? selectedId)) ?? selected;

  const handleConfirm = () => {
    router.push(`/photobooth?template=${selectedId}`);
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <FloatingBlobs />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTemplate.id}
          className="fixed inset-0 -z-[5] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 80% 20%, ${activeTemplate.colors.accent}18 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 20% 80%, ${activeTemplate.colors.accentDark}12 0%, transparent 60%)
            `,
          }}
        />
      </AnimatePresence>

      <Navbar />

      <main className="relative z-10 min-h-dvh pt-20 pb-12 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div className="mb-8 sm:mb-10" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => router.back()} className="flex items-center gap-1.5 mb-5 group" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
              <span className="text-[13px] group-hover:text-white/70 transition-colors">Kembali</span>
            </button>

            <SectionLabel className="mb-2 text-left">Langkah 1 dari 2</SectionLabel>
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white" style={{ letterSpacing: "-0.035em" }}>
                  Pilih Template
                </h1>
                <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Swipe untuk melihat semua template
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                <Sparkles className="w-3 h-3" style={{ color: activeTemplate.colors.accentLight }} />
                {templates.length} template tersedia
              </div>
            </div>
          </motion.div>

          <motion.div className="mb-8 sm:mb-10 -mx-5 sm:-mx-8 px-5 sm:px-8" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <TemplateCarousel templates={templates} selectedId={selectedId} hoveredId={hoveredId} onSelect={select} onHover={setHovered} />
          </motion.div>

          <motion.div
            className="h-px mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: `linear-gradient(90deg, transparent, ${activeTemplate.colors.accent}40, transparent)`,
              transformOrigin: "left",
            }}
          />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <SectionLabel className="mb-5 text-left">Preview Template</SectionLabel>
            <TemplatePreview template={selected} onConfirm={handleConfirm} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
