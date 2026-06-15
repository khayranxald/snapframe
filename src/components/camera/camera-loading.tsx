"use client";
/**
 * CAMERA LOADING — Animasi Loading Kamera
 * 📍 src/components/camera/camera-loading.tsx
 *
 * Ditampilkan saat status = "requesting" atau "loading".
 * Animasi pulse agar user tahu sistem sedang bekerja.
 */
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export function CameraLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
      {/* Lingkaran loading bersusun */}
      <div className="relative flex items-center justify-center">
        {/* Ring terluar — berputar lambat */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border border-brand-500/30"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
        />
        {/* Ring tengah — berputar berlawanan */}
        <motion.div className="absolute w-16 h-16 rounded-full border border-brand-400/40" animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
        {/* Dot accent — berputar cepat */}
        <motion.div className="absolute w-20 h-20" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <div className="w-2.5 h-2.5 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2" style={{ background: "#0070f3", boxShadow: "0 0 8px rgba(0,112,243,0.8)" }} />
        </motion.div>
        {/* Icon kamera di tengah */}
        <motion.div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{ background: "rgba(0,112,243,0.12)", border: "1px solid rgba(0,112,243,0.25)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Camera className="w-5 h-5" style={{ color: "#60aaff" }} />
        </motion.div>
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-[15px] font-medium text-white mb-1.5">Memuat Kamera...</p>
        <motion.p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }} animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}>
          Izinkan akses kamera jika muncul popup
        </motion.p>
      </div>
    </div>
  );
}
