"use client";
// 📍 src/components/export/export-button.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileImage, ChevronDown, Zap, Star, Crown } from "lucide-react";
import { type PhotoboothTemplate } from "@/data/templates";

type Quality = "standard" | "high" | "ultra";

interface ExportButtonProps {
  template: PhotoboothTemplate;
  onExport: (quality: Quality) => void;
  isLoading: boolean;
}

const QUALITIES: { key: Quality; label: string; desc: string; icon: typeof Zap }[] = [
  { key: "standard", label: "Standard", desc: "1080px · Cepat", icon: Zap },
  { key: "high", label: "High", desc: "1440px · Disarankan", icon: Star },
  { key: "ultra", label: "Ultra HD", desc: "2160px · Paling tajam", icon: Crown },
];

export function ExportButton({ template, onExport, isLoading }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [quality, setQuality] = useState<Quality>("high");

  const selected = QUALITIES.find((q) => q.key === quality)!;
  const { colors } = template;

  return (
    <div className="relative">
      {/* Main button + dropdown toggle */}
      <div className="flex items-stretch gap-px">
        {/* Export button */}
        <motion.button
          className="flex-1 h-12 flex items-center justify-center gap-2 text-[14px] font-semibold text-white rounded-l-[14px] relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.accent})`,
            boxShadow: `0 0 24px ${colors.cardGlow}`,
          }}
          onClick={() => !isLoading && onExport(quality)}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : <FileImage className="w-4.5 h-4.5" />}
          <span>Download PNG</span>
          <span className="text-[10px] opacity-60 font-normal ml-0.5">· {selected.label}</span>
        </motion.button>

        {/* Quality toggle */}
        <motion.button
          className="w-10 h-12 flex items-center justify-center rounded-r-[14px]"
          style={{ background: `${colors.accent}`, borderLeft: `1px solid ${colors.accentLight}30` }}
          onClick={() => setOpen((o) => !o)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </motion.div>
        </motion.button>
      </div>

      {/* Quality dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-2 rounded-[14px] overflow-hidden z-20"
            style={{
              background: "rgba(10,14,28,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 -12px 40px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top label */}
            <div className="px-4 pt-3 pb-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                Kualitas Ekspor
              </p>
            </div>

            {QUALITIES.map((q) => {
              const isSelected = q.key === quality;
              return (
                <motion.button
                  key={q.key}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                  style={{ background: isSelected ? `${colors.accent}12` : "transparent" }}
                  onClick={() => {
                    setQuality(q.key);
                    setOpen(false);
                  }}
                  whileTap={{ scale: 0.99 }}
                  whileHover={{ background: `${colors.accent}10` }}
                >
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isSelected ? `${colors.accent}20` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isSelected ? colors.accent + "40" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <q.icon className="w-3.5 h-3.5" style={{ color: isSelected ? colors.accentLight : "rgba(255,255,255,0.4)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold" style={{ color: isSelected ? "white" : "rgba(255,255,255,0.7)" }}>
                      {q.label}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {q.desc}
                    </p>
                  </div>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors.accent, boxShadow: `0 0 6px ${colors.accent}` }} />}
                </motion.button>
              );
            })}

            <div className="px-4 py-2.5 border-t border-white/[0.05]">
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                Semua kualitas menggunakan format PNG lossless
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
