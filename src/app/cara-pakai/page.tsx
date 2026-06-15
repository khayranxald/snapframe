"use client";
// 📍 src/app/cara-pakai/page.tsx

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Palette, Timer, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { FloatingBlobs, Navbar } from "@/components/layout";
import { GlassCard, NeonButton } from "@/components/ui";
import { MOTION } from "@/config/design";

const STEPS = [
  {
    number: "01",
    icon: Palette,
    color: "#0070f3",
    glow: "rgba(0,112,243,0.4)",
    title: "Pilih Template",
    desc: "Klik tombol 'Mulai Gratis' atau 'Buka Photobooth'. Kamu akan diarahkan ke halaman pemilihan template. Swipe atau klik untuk melihat 5 template yang tersedia — Blue Neon, Midnight Black, Retro Film, Ice White, dan Red Pulse.",
    tips: ["Gunakan tab Strip untuk melihat preview akhir", "Template PRO bisa dipakai tapi butuh login (segera hadir)", "Hover di atas template untuk melihat detail warna dan layout"],
  },
  {
    number: "02",
    icon: Camera,
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.4)",
    title: "Buka Kamera",
    desc: "Setelah memilih template, klik 'Gunakan Template Ini'. Browser akan meminta izin akses kamera — klik 'Allow' atau 'Izinkan'. Kamera akan langsung aktif dan siap digunakan.",
    tips: ["Pastikan pencahayaan cukup untuk hasil terbaik", "Gunakan tombol flip untuk switch kamera depan/belakang", "Tombol mirror untuk membalik orientasi preview"],
  },
  {
    number: "03",
    icon: Timer,
    color: "#bf5fff",
    glow: "rgba(191,95,255,0.4)",
    title: "Ambil Foto",
    desc: "Klik tombol shutter putih besar di bawah. Countdown 3-2-1 akan muncul, lalu foto diambil otomatis. Proses ini berulang sesuai jumlah foto di template yang dipilih (3 atau 4 foto).",
    tips: ["Berpose sebelum countdown selesai", "Ada jeda ~1 detik antar foto — siapkan pose berikutnya", "Thumbnail foto yang sudah diambil muncul di pojok bawah"],
  },
  {
    number: "04",
    icon: Download,
    color: "#ff003c",
    glow: "rgba(255,0,60,0.4)",
    title: "Download Hasil",
    desc: "Setelah semua foto selesai, kamu otomatis diarahkan ke halaman hasil. Pilih tab Strip untuk melihat frame lengkap atau Galeri untuk lihat per foto. Download sebagai PNG atau PDF siap cetak.",
    tips: ["PNG High quality cocok untuk media sosial", "PDF A4 cocok untuk dicetak di print shop", "Klik 'Ambil Ulang' untuk foto ulang dengan template yang sama"],
  },
];

const REQUIREMENTS = [
  { label: "Browser modern", desc: "Chrome, Firefox, Safari, Edge versi terbaru" },
  { label: "Izin kamera", desc: "Browser perlu akses kamera perangkat kamu" },
  { label: "Pencahayaan cukup", desc: "Ruangan terang untuk hasil foto terbaik" },
  { label: "Koneksi internet", desc: "Untuk load halaman pertama kali" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: MOTION.ease.ios } },
};

export default function CaraPakaiPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <FloatingBlobs />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <motion.button
            className="flex items-center gap-1.5 mb-8 group"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            <span className="text-[13px] group-hover:text-white/70 transition-colors">Kembali</span>
          </motion.button>

          {/* Header */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
              Panduan Penggunaan
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
              Cara Pakai SnapFrame
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              4 langkah mudah untuk mengabadikan momen terbaikmu.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div className="flex flex-col gap-4 mb-12" variants={container} initial="hidden" animate="visible">
            {STEPS.map((step, i) => (
              <motion.div key={step.number} variants={item}>
                <GlassCard variant="base" padding="md" rounded="lg" className="relative overflow-visible">
                  <div className="flex gap-4">
                    {/* Number + icon */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div
                        className="w-11 h-11 rounded-[12px] flex items-center justify-center"
                        style={{
                          background: `${step.color}18`,
                          border: `1px solid ${step.color}35`,
                          boxShadow: `0 0 16px ${step.glow}`,
                        }}
                      >
                        <step.icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      {/* Connector line */}
                      {i < STEPS.length - 1 && <div className="w-px flex-1 min-h-[24px]" style={{ background: `linear-gradient(to bottom, ${step.color}40, transparent)` }} />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[10px] font-bold tabular-nums" style={{ color: step.color }}>
                          {step.number}
                        </span>
                        <h2 className="text-[16px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                          {step.title}
                        </h2>
                      </div>

                      <p className="text-[13px] leading-relaxed mb-3.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {step.desc}
                      </p>

                      {/* Tips */}
                      <div className="flex flex-col gap-1.5">
                        {step.tips.map((tip) => (
                          <div key={tip} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Requirements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mb-10">
            <h2 className="text-[16px] font-bold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
              Yang Kamu Butuhkan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REQUIREMENTS.map((req) => (
                <GlassCard key={req.label} variant="base" padding="sm" rounded="lg">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0070f3" }} />
                    <div>
                      <p className="text-[13px] font-semibold text-white">{req.label}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                        {req.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center">
            <NeonButton variant="primary" size="lg" onClick={() => router.push("/template")}>
              <Camera className="w-5 h-5" />
              Mulai Photobooth Sekarang
            </NeonButton>
            <p className="mt-3 text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              Gratis · Tanpa login · Langsung pakai
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
