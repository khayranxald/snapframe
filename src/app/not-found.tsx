"use client";
// 📍 src/app/not-found.tsx

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, Camera } from "lucide-react";
import { FloatingBlobs } from "@/components/layout";
import { GlassCard, NeonButton } from "@/components/ui";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-6 overflow-hidden">
      <FloatingBlobs />

      <motion.div className="relative z-10 w-full max-w-sm text-center" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.34, 1.1, 0.64, 1] }}>
        <motion.p
          className="text-[120px] font-black leading-none mb-6"
          style={{
            letterSpacing: "-0.06em",
            background: "linear-gradient(135deg, #ffffff 0%, #c8e0ff 40%, #0070f3 75%, #00d4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.p>

        <GlassCard variant="base" padding="lg" rounded="xl">
          <div className="w-14 h-14 rounded-[14px] mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(0,112,243,0.12)", border: "1px solid rgba(0,112,243,0.28)", boxShadow: "0 0 20px rgba(0,112,243,0.2)" }}>
            <Camera className="w-7 h-7" style={{ color: "#60aaff" }} />
          </div>
          <h1 className="text-[20px] font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>
          <div className="flex flex-col gap-2.5">
            <NeonButton variant="primary" size="md" fullWidth onClick={() => router.push("/")}>
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </NeonButton>
            <NeonButton variant="ghost" size="md" fullWidth onClick={() => router.push("/template")}>
              <Camera className="w-4 h-4" />
              Buka Photobooth
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
