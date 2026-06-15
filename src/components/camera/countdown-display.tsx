"use client";
// 📍 src/components/camera/countdown-display.tsx

import { motion, AnimatePresence } from "framer-motion";

interface CountdownDisplayProps {
  count: number;
  isRunning: boolean;
  color?: string;
}

export function CountdownDisplay({ count, isRunning, color = "#0070f3" }: CountdownDisplayProps) {
  return (
    <AnimatePresence>
      {isRunning && count > 0 && (
        <motion.div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/* Blur overlay */}
          <motion.div className="absolute inset-0" style={{ backdropFilter: "blur(2px)", background: "rgba(0,0,0,0.25)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          {/* Glow ring pulse */}
          <motion.div
            key={`ring-${count}`}
            className="absolute rounded-full"
            style={{ border: `2px solid ${color}`, width: 180, height: 180 }}
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {/* Second ring — delay */}
          <motion.div
            key={`ring2-${count}`}
            className="absolute rounded-full"
            style={{ border: `1px solid ${color}80`, width: 180, height: 180 }}
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          />

          {/* Number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              className="relative flex items-center justify-center"
              initial={{ scale: 1.6, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.4, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
            >
              {/* Background circle */}
              <motion.div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
                  boxShadow: `0 0 60px ${color}50, 0 0 120px ${color}25`,
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />

              {/* Number text */}
              <span
                className="relative text-[100px] sm:text-[140px] font-black leading-none select-none"
                style={{
                  color: "white",
                  textShadow: `0 0 40px ${color}, 0 0 80px ${color}80, 0 0 120px ${color}40`,
                  letterSpacing: "-0.05em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {count}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
