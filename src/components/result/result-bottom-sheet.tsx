"use client";
// 📍 src/components/result/result-bottom-sheet.tsx

import { motion } from "framer-motion";
import { Download, RotateCcw, LayoutTemplate, Share2, FileImage } from "lucide-react";
import { NeonButton } from "@/components/ui";
import { type PhotoboothTemplate } from "@/data/templates";

interface ResultBottomSheetProps {
  template: PhotoboothTemplate;
  onDownloadPng: () => void;
  onDownloadPdf: () => void;
  onRetake: () => void;
  onChangeTemplate: () => void;
  isDownloading?: boolean;
}

export function ResultBottomSheet({ template, onDownloadPng, onDownloadPdf, onRetake, onChangeTemplate, isDownloading = false }: ResultBottomSheetProps) {
  const { colors } = template;

  return (
    <motion.div
      className="relative rounded-t-[28px] overflow-hidden"
      style={{
        background: "rgba(10,14,28,0.92)",
        backdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "none",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
      }}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.34, 1.1, 0.64, 1] }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}60, ${colors.accentLight}80, ${colors.accent}60, transparent)` }} />

      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-9 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>

      <div className="px-5 pt-2 pb-safe-bottom" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}>
        {/* Template info */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.28)" }}>
              Template
            </p>
            <p className="text-[15px] font-bold text-white mt-0.5" style={{ letterSpacing: "-0.02em" }}>
              {template.name}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              background: `${colors.accent}15`,
              border: `1px solid ${colors.accent}30`,
              color: colors.accentLight,
            }}
          >
            {template.photoCount} foto
          </div>
        </div>

        {/* Download buttons */}
        <div className="flex gap-2.5 mb-3">
          <NeonButton
            variant="primary"
            size="md"
            fullWidth
            onClick={onDownloadPng}
            loading={isDownloading}
            style={{
              background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.accent}, ${colors.accentLight})`,
              boxShadow: `0 0 20px ${colors.cardGlow}`,
              border: "none",
            }}
          >
            <FileImage className="w-4 h-4" />
            Download PNG
          </NeonButton>

          <NeonButton variant="glass" size="md" onClick={onDownloadPdf} style={{ minWidth: 80 }}>
            <Download className="w-4 h-4" />
            PDF
          </NeonButton>
        </div>

        {/* Secondary actions */}
        <div className="flex gap-2.5 mb-2">
          <NeonButton variant="ghost" size="md" fullWidth onClick={onRetake}>
            <RotateCcw className="w-4 h-4" />
            Ambil Ulang
          </NeonButton>
          <NeonButton variant="ghost" size="md" fullWidth onClick={onChangeTemplate}>
            <LayoutTemplate className="w-4 h-4" />
            Ganti Template
          </NeonButton>
        </div>

        {/* Share hint */}
        <p className="text-center text-[10px] mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
          Foto tersimpan di browser — tidak dikirim ke server
        </p>
      </div>
    </motion.div>
  );
}
