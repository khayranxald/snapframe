"use client";
// 📍 src/components/camera/photo-strip-preview.tsx

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { type PhotoboothTemplate } from "@/data/templates";

interface PhotoStripPreviewProps {
  photos: string[];
  totalPhotos: number;
  template: PhotoboothTemplate;
  isCapturing: boolean;
}

export function PhotoStripPreview({ photos, totalPhotos, template, isCapturing }: PhotoStripPreviewProps) {
  const { colors } = template;

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPhotos }).map((_, i) => {
        const photo = photos[i];
        const isCurrent = i === photos.length && isCapturing;
        const isDone = i < photos.length;

        return (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-[6px] flex-shrink-0"
            style={{
              width: 44,
              height: 33,
              border: `1.5px solid ${isDone ? colors.accent : isCurrent ? colors.accentLight + "80" : "rgba(255,255,255,0.12)"}`,
              background: isDone ? "transparent" : "rgba(255,255,255,0.04)",
              boxShadow: isDone ? `0 0 10px ${colors.accent}50` : "none",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isDone && photo ? (
                <motion.img key="photo" src={photo} alt={`foto ${i + 1}`} className="w-full h-full object-cover" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} />
              ) : isCurrent ? (
                <motion.div key="current" className="absolute inset-0 flex items-center justify-center" style={{ background: `${colors.accent}15` }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: colors.accentLight }} />
                </motion.div>
              ) : (
                <motion.div key="empty" className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {i + 1}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkmark overlay */}
            {isDone && (
              <motion.div
                className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: colors.accent }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
