"use client";
// 📍 src/app/faq/page.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Camera, MessageCircle } from "lucide-react";
import { FloatingBlobs, Navbar } from "@/components/layout";
import { GlassCard, NeonButton } from "@/components/ui";
import { MOTION } from "@/config/design";

const FAQ_GROUPS = [
  {
    category: "Umum",
    color: "#0070f3",
    items: [
      {
        q: "Apakah SnapFrame gratis?",
        a: "Ya, SnapFrame sepenuhnya gratis. Semua template dasar (Blue Neon, Midnight Black, Retro Film) bisa digunakan tanpa biaya dan tanpa perlu login. Template PRO (Ice White, Red Pulse) akan membutuhkan akun premium yang segera hadir.",
      },
      {
        q: "Apakah saya perlu membuat akun?",
        a: "Tidak! Kamu langsung bisa menggunakan SnapFrame tanpa registrasi atau login. Cukup buka website, pilih template, dan mulai foto.",
      },
      {
        q: "Browser apa yang didukung?",
        a: "SnapFrame berjalan di semua browser modern: Chrome, Firefox, Safari, dan Edge. Untuk pengalaman terbaik, gunakan Chrome atau Edge versi terbaru.",
      },
      {
        q: "Apakah bisa digunakan di HP?",
        a: "Ya! SnapFrame didesain mobile-first dan sudah dioptimasi untuk iPhone dan Android. Tampilan dan fungsinya bekerja sempurna di layar mobile.",
      },
    ],
  },
  {
    category: "Kamera & Foto",
    color: "#00d4ff",
    items: [
      {
        q: "Kenapa kamera tidak bisa aktif?",
        a: "Pastikan kamu sudah mengizinkan akses kamera di browser. Klik ikon kunci 🔒 di address bar → cari 'Camera' → ubah ke 'Allow' → refresh halaman. Jika masih tidak bisa, pastikan tidak ada aplikasi lain yang sedang menggunakan kamera.",
      },
      {
        q: "Foto saya terbalik/mirror, apakah normal?",
        a: "Ya, ini normal! Kamera depan secara default menampilkan preview seperti cermin (mirror). Ini membuat pose terasa lebih natural. Hasil foto akhir yang didownload tidak di-mirror — orientasinya sudah benar. Kamu juga bisa mematikan mirror dengan tombol flip di layar kamera.",
      },
      {
        q: "Berapa resolusi foto yang dihasilkan?",
        a: "Foto diambil pada resolusi 1280×960 piksel. Kualitas ini sudah sangat baik untuk ditampilkan di media sosial, dan cukup untuk dicetak di ukuran 4R.",
      },
      {
        q: "Apakah foto saya tersimpan di server?",
        a: "Tidak sama sekali. Foto kamu diproses sepenuhnya di browser (device kamu sendiri). Tidak ada data foto yang dikirim ke server manapun. Foto disimpan sementara di sessionStorage browser dan hilang saat tab ditutup.",
      },
      {
        q: "Kenapa foto saya gelap/buram?",
        a: "Kualitas foto sangat dipengaruhi oleh pencahayaan ruangan. Pastikan kamu berada di ruangan yang cukup terang, idealnya menghadap sumber cahaya (bukan membelakanginya). Hindari background yang terlalu terang karena bisa membuat wajah jadi gelap.",
      },
    ],
  },
  {
    category: "Template & Download",
    color: "#bf5fff",
    items: [
      {
        q: "Apa perbedaan antar template?",
        a: "Setiap template punya layout foto yang berbeda (Strip 1×4, Grid 2×2, atau Sinematik), warna frame berbeda, dan filter foto yang berbeda. Blue Neon punya nuansa futuristik biru, Midnight Black elegan dengan emas, Retro Film hangat seperti foto analog, Ice White bersih dan minimalis, Red Pulse energik dengan merah neon.",
      },
      {
        q: "Berapa foto yang diambil per sesi?",
        a: "Tergantung template yang dipilih. Template Strip 1×4 dan Grid 2×2 mengambil 4 foto, sedangkan Retro Film (Sinematik) mengambil 3 foto. Semua foto diambil secara otomatis berurutan setelah kamu klik shutter.",
      },
      {
        q: "Apa perbedaan Download PNG dan PDF?",
        a: "PNG adalah gambar digital berkualitas tinggi — cocok untuk dikirim via WhatsApp, diposting di Instagram, atau disimpan di galeri. PDF adalah dokumen format A4 yang siap dicetak — cocok dibawa ke print shop untuk dicetak fisik.",
      },
      {
        q: "Kualitas PNG mana yang harus saya pilih?",
        a: "Standard (1080px) cukup untuk WhatsApp dan Instagram. High (1440px) untuk kualitas lebih baik di layar retina. Ultra HD (2160px) untuk kualitas maksimal atau cetak ukuran besar. Semakin tinggi kualitas, semakin besar ukuran file dan semakin lama proses download.",
      },
      {
        q: "Foto saya hilang setelah tab ditutup, bagaimana?",
        a: "Ini by design — foto disimpan di sessionStorage yang otomatis bersih saat tab ditutup. Pastikan kamu sudah download PNG atau PDF sebelum menutup tab. Kalau sudah terlanjur tutup, kamu perlu foto ulang.",
      },
    ],
  },
];

interface AccordionItemProps {
  q: string;
  a: string;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ q, a, color, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      className="rounded-[14px] overflow-hidden transition-all duration-200"
      style={{
        background: isOpen ? `${color}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${isOpen ? `${color}30` : "rgba(255,255,255,0.07)"}`,
      }}
    >
      <button className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left" onClick={onToggle}>
        <span className="text-[14px] font-medium leading-snug" style={{ color: isOpen ? "white" : "rgba(255,255,255,0.75)" }}>
          {q}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4" style={{ color: isOpen ? color : "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
            <div className="px-4 pb-4">
              <div className="h-px mb-3" style={{ background: `${color}20` }} />
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>("0-0");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

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
          <motion.div className="mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
              Pertanyaan Umum
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
              FAQ
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Jawaban untuk pertanyaan yang sering ditanyakan tentang SnapFrame.
            </p>
          </motion.div>

          {/* FAQ Groups */}
          <div className="flex flex-col gap-8">
            {FAQ_GROUPS.map((group, gi) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 + 0.2, duration: 0.5, ease: MOTION.ease.ios }}>
                {/* Category label */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: group.color }}>
                    {group.category}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {group.items.map((item, ii) => {
                    const id = `${gi}-${ii}`;
                    return <AccordionItem key={id} q={item.q} a={item.a} color={group.color} isOpen={openId === id} onToggle={() => toggle(id)} />;
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <GlassCard variant="blue" glow="blue" padding="md" rounded="lg" className="text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "#60aaff" }} />
              <h3 className="text-[15px] font-bold text-white mb-1.5" style={{ letterSpacing: "-0.02em" }}>
                Masih ada pertanyaan?
              </h3>
              <p className="text-[12px] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Coba langsung dan rasakan sendiri — SnapFrame gratis dan tanpa login.
              </p>
              <NeonButton variant="primary" size="md" fullWidth onClick={() => router.push("/template")}>
                <Camera className="w-4 h-4" />
                Coba Sekarang
              </NeonButton>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
