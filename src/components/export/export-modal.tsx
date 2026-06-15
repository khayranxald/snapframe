"use client";
// 📍 src/components/export/export-modal.tsx

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X, ImageDown } from "lucide-react";
import { type ExportStatus } from "@/hooks/useExport";
import { NeonButton } from "@/components/ui";

interface ExportModalProps {
  status: ExportStatus;
  progress: number;
  message: string;
  error: string | null;
  color: string;
  onClose: () => void;
}

export function ExportModal({ status, progress, message, error, color, onClose }: ExportModalProps) {
  const isVisible = status !== "idle";

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 z-50" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />

          {/* Modal */}
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-sm relative"
              style={{
                background: "rgba(10,14,28,0.95)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "28px 24px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.34, 1.1, 0.64, 1] }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-[20%] right-[20%] h-px rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

              {/* Close button — hanya muncul saat success/error */}
              {(status === "success" || status === "error") && (
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

              {/* Icon area */}
              <div className="flex justify-center mb-5">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                      <CheckCircle2 className="w-16 h-16" style={{ color: "#4ade80" }} />
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div key="error" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                      <XCircle className="w-16 h-16" style={{ color: "#ff4d6d" }} />
                    </motion.div>
                  ) : (
                    <motion.div key="loading" className="relative w-16 h-16 flex items-center justify-center">
                      {/* Rotating ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{ borderTopColor: color, borderRightColor: `${color}40` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                      <ImageDown className="w-7 h-7" style={{ color }} />
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
                  {status === "success" ? "Foto Berhasil Disimpan!" : status === "error" ? "Ekspor Gagal" : "Mengekspor Foto..."}
                </motion.h3>
              </AnimatePresence>

              {/* Message */}
              <motion.p
                className="text-center text-[13px] mb-5"
                style={{ color: "rgba(255,255,255,0.4)" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: status === "success" || status === "error" ? 0 : Infinity }}
              >
                {message}
              </motion.p>

              {/* Progress bar */}
              {status !== "success" && status !== "error" && (
                <div className="mb-5">
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.07)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        boxShadow: `0 0 10px ${color}60`,
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-right text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {progress}%
                  </p>
                </div>
              )}

              {/* Steps indicator */}
              {status !== "success" && status !== "error" && (
                <div className="flex items-center justify-center gap-3">
                  {[
                    { key: "preparing", label: "Siapkan" },
                    { key: "rendering", label: "Render" },
                    { key: "processing", label: "Proses" },
                    { key: "saving", label: "Simpan" },
                  ].map((step, i) => {
                    const steps = ["preparing", "rendering", "processing", "saving"];
                    const curIndex = steps.indexOf(status);
                    const isDone = i < curIndex;
                    const isActive = i === curIndex;
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-1">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isDone ? "#4ade80" : isActive ? color : "rgba(255,255,255,0.15)",
                          }}
                          animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <span className="text-[8px]" style={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Success state */}
              {status === "success" && (
                <motion.div className="text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="text-[12px] mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    File PNG tersimpan di folder Downloads kamu
                  </p>
                  <NeonButton variant="glass" size="sm" fullWidth onClick={onClose}>
                    Tutup
                  </NeonButton>
                </motion.div>
              )}

              {/* Error state */}
              {status === "error" && (
                <motion.div className="text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {error && (
                    <p className="text-[11px] mb-4 px-2 py-2 rounded-[8px]" style={{ background: "rgba(255,0,60,0.08)", color: "#ff4d6d", border: "1px solid rgba(255,0,60,0.15)" }}>
                      {error}
                    </p>
                  )}
                  <NeonButton variant="accent" size="sm" fullWidth onClick={onClose}>
                    Coba Lagi
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
