"use client";
// 📍 src/components/pdf/pdf-progress-modal.tsx

import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, XCircle, X } from "lucide-react";
import { type PdfStatus } from "@/hooks/usePdfExport";
import { NeonButton } from "@/components/ui";

interface PdfProgressModalProps {
  status: PdfStatus;
  progress: number;
  message: string;
  error: string | null;
  color: string;
  onClose: () => void;
}

const STEPS = [
  { key: "capturing", label: "Capture", icon: "📷" },
  { key: "building", label: "Build", icon: "🏗️" },
  { key: "rendering", label: "Render", icon: "🎨" },
  { key: "saving", label: "Simpan", icon: "💾" },
];

export function PdfProgressModal({ status, progress, message, error, color, onClose }: PdfProgressModalProps) {
  const isVisible = status !== "idle";
  const isDone = status === "success";
  const isError = status === "error";
  const isWorking = !isDone && !isError;

  const curStepIdx = STEPS.findIndex((s) => s.key === status);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div className="fixed inset-0 z-50" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-sm relative overflow-hidden"
              style={{
                background: "rgba(8,12,24,0.97)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "28px 24px 24px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.38, ease: [0.34, 1.1, 0.64, 1] }}
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 inset-x-0 h-1 rounded-t-[24px]" style={{ background: `linear-gradient(90deg, transparent, ${color}90, ${color}, ${color}90, transparent)` }} />

              {/* Close */}
              {(isDone || isError) && (
                <motion.button
                  className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3.5 h-3.5 text-white/60" />
                </motion.button>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                      <CheckCircle2 className="w-16 h-16" style={{ color: "#4ade80" }} />
                    </motion.div>
                  ) : isError ? (
                    <motion.div key="err" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                      <XCircle className="w-16 h-16" style={{ color: "#ff4d6d" }} />
                    </motion.div>
                  ) : (
                    <motion.div key="loading" className="relative w-16 h-16 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border-[2.5px] border-transparent"
                        style={{ borderTopColor: color, borderRightColor: `${color}50` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-[6px] rounded-full border-[1.5px] border-transparent"
                        style={{ borderBottomColor: `${color}60` }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <FileText className="w-6 h-6" style={{ color }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={status}
                  className="text-center text-[17px] font-bold text-white mb-1.5"
                  style={{ letterSpacing: "-0.02em" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDone ? "PDF Berhasil Dibuat!" : isError ? "Gagal Membuat PDF" : "Membuat PDF..."}
                </motion.h3>
              </AnimatePresence>

              <p className="text-center text-[12px] mb-5" style={{ color: "rgba(255,255,255,0.38)" }}>
                {message}
              </p>

              {/* Progress bar */}
              {isWorking && (
                <div className="mb-5">
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${color}70, ${color})`, boxShadow: `0 0 8px ${color}60` }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Step indicators */}
              {isWorking && (
                <div className="flex items-start justify-between gap-2 mb-4">
                  {STEPS.map((step, i) => {
                    const isDoneStep = i < curStepIdx;
                    const isActiveStep = i === curStepIdx;
                    return (
                      <div key={step.key} className="flex-1 flex flex-col items-center gap-1.5">
                        {/* Connector line */}
                        <div className="relative w-full flex items-center">
                          <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-[14px]"
                            style={{
                              background: isDoneStep ? "#4ade8020" : isActiveStep ? `${color}20` : "rgba(255,255,255,0.04)",
                              border: `1.5px solid ${isDoneStep ? "#4ade80" : isActiveStep ? color : "rgba(255,255,255,0.1)"}`,
                            }}
                            animate={isActiveStep ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            {isDoneStep ? "✓" : step.icon}
                          </motion.div>
                        </div>
                        <span className="text-[9px] font-medium text-center leading-tight" style={{ color: isActiveStep ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PDF preview hint */}
              {isWorking && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    Format A4 · Portrait · Kualitas cetak tinggi
                  </p>
                </div>
              )}

              {/* Success */}
              {isDone && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] mb-4" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                    <span className="text-[13px]">📄</span>
                    <p className="text-[11px]" style={{ color: "rgba(74,222,128,0.8)" }}>
                      File PDF tersimpan di folder Downloads
                    </p>
                  </div>
                  <NeonButton variant="glass" size="sm" fullWidth onClick={onClose}>
                    Tutup
                  </NeonButton>
                </motion.div>
              )}

              {/* Error */}
              {isError && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  {error && (
                    <p className="text-[11px] px-3 py-2 rounded-[8px] mb-4" style={{ background: "rgba(255,0,60,0.08)", color: "#ff4d6d", border: "1px solid rgba(255,0,60,0.15)" }}>
                      {error}
                    </p>
                  )}
                  <NeonButton variant="accent" size="sm" fullWidth onClick={onClose}>
                    Tutup
                  </NeonButton>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
