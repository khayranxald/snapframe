"use client";
// 📍 src/components/pdf/pdf-preview-modal.tsx

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download } from "lucide-react";
import { NeonButton } from "@/components/ui";
import { type PhotoboothTemplate } from "@/data/templates";
import { PhotoStripFrame } from "@/components/result/photo-strip-frame";

interface PdfPreviewModalProps {
  isOpen: boolean;
  photos: string[];
  template: PhotoboothTemplate;
  onClose: () => void;
  onExport: () => void;
  isLoading: boolean;
}

export function PdfPreviewModal({ isOpen, photos, template, onClose, onExport, isLoading }: PdfPreviewModalProps) {
  const { colors } = template;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 z-50" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

          {/* Modal */}
          <motion.div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full sm:max-w-sm relative overflow-hidden"
              style={{
                background: "rgba(8,12,24,0.97)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.05, 0.64, 1] }}
            >
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}80, transparent)` }} />

              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-9 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              <div className="px-5 pt-4 pb-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: `${colors.accent}18`, border: `1px solid ${colors.accent}30` }}>
                      <FileText className="w-4 h-4" style={{ color: colors.accentLight }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                        Preview PDF
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Format A4 · Portrait
                      </p>
                    </div>
                  </div>
                  <motion.button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }} onClick={onClose} whileTap={{ scale: 0.9 }}>
                    <X className="w-4 h-4 text-white/60" />
                  </motion.button>
                </div>

                {/* PDF page preview */}
                <div className="flex justify-center mb-5">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: "200px",
                      aspectRatio: "210/297",
                      background: colors.bg,
                      borderRadius: "8px",
                      border: `1px solid ${colors.accent}30`,
                      boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px ${colors.accent}15`,
                    }}
                  >
                    {/* Header gradient bar */}
                    <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colors.accentDark}, ${colors.accent}, ${colors.accentLight})` }} />

                    {/* App name */}
                    <div className="pt-3 pb-1.5 text-center border-b" style={{ borderColor: `${colors.accent}20` }}>
                      <p className="text-[9px] font-bold" style={{ color: colors.accentLight }}>
                        SnapFrame
                      </p>
                      <p className="text-[6px]" style={{ color: `${colors.accent}80` }}>
                        Premium Photobooth
                      </p>
                    </div>

                    {/* Strip preview (mini) */}
                    <div className="flex justify-center py-2.5">
                      <PhotoStripFrame photos={photos} template={template} scale={0.28} />
                    </div>

                    {/* Info card */}
                    <div className="mx-2 p-1.5 rounded-[4px]" style={{ background: `${colors.accent}10`, border: `1px solid ${colors.accent}25` }}>
                      <p className="text-[6px] font-bold" style={{ color: colors.accentLight }}>
                        {template.name}
                      </p>
                      <p className="text-[5px] mt-0.5" style={{ color: `${colors.accent}80` }}>
                        {photos.length} foto · {new Date().toLocaleDateString("id-ID")}
                      </p>
                    </div>

                    {/* QR placeholder */}
                    <div className="flex justify-center mt-2">
                      <div className="w-8 h-8 rounded-[3px]" style={{ background: `${colors.accent}12`, border: `1px solid ${colors.accent}30` }}>
                        <div className="grid grid-cols-3 gap-px p-0.5 h-full">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="rounded-[1px]" style={{ background: [0, 2, 6, 8].includes(i) ? colors.accent : Math.random() > 0.5 ? colors.accent : "transparent", opacity: 0.7 }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 inset-x-0 pb-1 text-center border-t" style={{ borderColor: `${colors.accent}15` }}>
                      <p className="text-[5px] pt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                        snapframe.app
                      </p>
                    </div>

                    {/* Corner accents */}
                    {[
                      [0, 0],
                      [1, 0],
                      [0, 1],
                      [1, 1],
                    ].map(([cx, cy], i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2"
                        style={{
                          top: cy === 0 ? 1 : undefined,
                          bottom: cy === 1 ? 1 : undefined,
                          left: cx === 0 ? 1 : undefined,
                          right: cx === 1 ? 1 : undefined,
                          borderTop: cy === 0 ? `1.5px solid ${colors.accent}` : undefined,
                          borderBottom: cy === 1 ? `1.5px solid ${colors.accent}` : undefined,
                          borderLeft: cx === 0 ? `1.5px solid ${colors.accent}` : undefined,
                          borderRight: cx === 1 ? `1.5px solid ${colors.accent}` : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* PDF specs */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: "Format", value: "A4 PDF" },
                    { label: "Orientasi", value: "Portrait" },
                    { label: "Kualitas", value: "Cetak" },
                  ].map((spec) => (
                    <div key={spec.label} className="text-center py-2 rounded-[10px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="text-[10px] font-semibold text-white">{spec.value}</p>
                      <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {spec.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Export button */}
                <NeonButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={onExport}
                  loading={isLoading}
                  style={{
                    background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.accent})`,
                    boxShadow: `0 0 24px ${colors.cardGlow}`,
                    border: "none",
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
