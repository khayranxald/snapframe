"use client";
/**
 * CAMERA CONTROLS — Kontrol Kamera Floating
 * 📍 src/components/camera/camera-controls.tsx
 *
 * Berisi semua tombol yang overlay di atas kamera:
 * - Tombol shutter (besar, di bawah tengah)
 * - Tombol switch kamera (kanan)
 * - Tombol mirror (kiri)
 *
 * iOS-inspired layout:
 * [mirror]  [    SHUTTER    ]  [switch]
 *
 * Semua tombol floating → tidak mempengaruhi layout kamera.
 */
import { motion, AnimatePresence } from "framer-motion";
import { FlipHorizontal, RotateCcw, SwitchCamera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShutterButtonProps {
  onCapture: () => void;
  isCountdown: boolean; // Disable saat countdown berjalan
  disabled?: boolean;
}

interface CameraControlsProps {
  onCapture: () => void;
  onSwitch: () => void;
  onMirror: () => void;
  isMirrored: boolean;
  isCountdown: boolean;
  canSwitch: boolean; // false jika hanya ada 1 kamera
  photoCount: number; // Foto ke berapa dari total
  totalPhotos: number;
}

/* ── Shutter Button ──────────────────────────────────── */
export function ShutterButton({ onCapture, isCountdown, disabled }: ShutterButtonProps) {
  return (
    <motion.button
      className={cn("relative w-20 h-20 rounded-full flex items-center justify-center", "transition-opacity duration-200", (disabled || isCountdown) && "opacity-50 pointer-events-none")}
      onClick={onCapture}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      disabled={disabled || isCountdown}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-[3px]" style={{ borderColor: "rgba(255,255,255,0.85)" }} />
      {/* Inner circle */}
      <motion.div className="w-[62px] h-[62px] rounded-full bg-white" whileTap={{ scale: 0.88 }} transition={{ duration: 0.1 }} />
      {/* Glow saat ready */}
      {!disabled && !isCountdown && <motion.div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />}
    </motion.button>
  );
}

/* ── Control Icon Button ─────────────────────────────── */
function ControlBtn({ onClick, icon: Icon, label, active }: { onClick: () => void; icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <motion.button className="flex flex-col items-center gap-1.5" onClick={onClick} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.08 }}>
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: active ? "rgba(0,112,243,0.25)" : "rgba(255,255,255,0.12)",
          border: active ? "1px solid rgba(0,112,243,0.4)" : "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: active ? "0 0 12px rgba(0,112,243,0.3)" : "none",
        }}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </div>
      <span className="text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
        {label}
      </span>
    </motion.button>
  );
}

/* ── Photo Progress Dots ─────────────────────────────── */
function PhotoProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            background: i < current ? "white" : "rgba(255,255,255,0.3)",
            boxShadow: i < current ? "0 0 6px rgba(255,255,255,0.6)" : "none",
          }}
          animate={{
            width: i === current - 1 ? 20 : 8,
            height: 8,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

/* ── Main Camera Controls ────────────────────────────── */
export function CameraControls({ onCapture, onSwitch, onMirror, isMirrored, isCountdown, canSwitch, photoCount, totalPhotos }: CameraControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4 pb-2">
      {/* Progress indicator */}
      <div className="flex flex-col items-center gap-2">
        <PhotoProgress current={photoCount} total={totalPhotos} />
        <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
          Foto {photoCount + 1} dari {totalPhotos}
        </p>
      </div>

      {/* Controls row: mirror — shutter — switch */}
      <div className="flex items-center justify-center gap-8">
        <ControlBtn onClick={onMirror} icon={FlipHorizontal} label="Mirror" active={isMirrored} />

        <ShutterButton onCapture={onCapture} isCountdown={isCountdown} />

        {canSwitch ? (
          <ControlBtn onClick={onSwitch} icon={SwitchCamera} label="Balik" />
        ) : (
          /* Placeholder agar layout simetris */
          <div className="w-11 h-11 opacity-0" />
        )}
      </div>
    </div>
  );
}

/* ── Countdown Overlay ───────────────────────────────── */
export function CountdownOverlay({ count }: { count: number }) {
  return (
    <AnimatePresence mode="wait">
      {count > 0 && (
        <motion.div key={count} className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Number */}
          <motion.span
            className="relative text-[120px] sm:text-[160px] font-black text-white leading-none"
            style={{
              textShadow: "0 0 60px rgba(0,112,243,0.8), 0 0 120px rgba(0,112,243,0.4)",
              letterSpacing: "-0.05em",
            }}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
          >
            {count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Flash Effect ────────────────────────────────────── */
export function FlashEffect({ trigger }: { trigger: boolean }) {
  return <AnimatePresence>{trigger && <motion.div className="absolute inset-0 z-40 pointer-events-none bg-white" initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />}</AnimatePresence>;
}
