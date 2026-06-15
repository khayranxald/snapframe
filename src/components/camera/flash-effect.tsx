"use client";
// 📍 src/components/camera/flash-effect.tsx

import { motion, AnimatePresence } from "framer-motion";

interface FlashEffectProps {
  trigger: boolean;
  color?: string;
}

export function FlashEffect({ trigger, color = "#ffffff" }: FlashEffectProps) {
  return (
    <AnimatePresence>
      {trigger && (
        <>
          {/* White flash fullscreen */}
          <motion.div className="absolute inset-0 z-50 pointer-events-none" style={{ background: color }} initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} />

          {/* Glow ring burst */}
          <motion.div className="absolute inset-0 z-49 pointer-events-none flex items-center justify-center" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.div
              className="rounded-full"
              style={{
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
                filter: "blur(20px)",
              }}
              initial={{ scale: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
