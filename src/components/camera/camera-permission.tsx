"use client";
/**
 * CAMERA PERMISSION — UI Izin Kamera
 * 📍 src/components/camera/camera-permission.tsx
 *
 * Ditampilkan saat status = "idle" atau "denied".
 * Berisi penjelasan kenapa kamera dibutuhkan
 * dan tombol untuk mengizinkan.
 */
import { motion } from "framer-motion";
import { Camera, Shield, AlertCircle, RefreshCw } from "lucide-react";
import { GlassCard, NeonButton } from "@/components/ui";
import type { CameraStatus } from "@/hooks/useCamera";

interface CameraPermissionProps {
  status: CameraStatus;
  onRequest: () => void;
  errorMessage?: string | null;
}

export function CameraPermission({ status, onRequest, errorMessage }: CameraPermissionProps) {
  const isDenied = status === "denied";
  const isError = status === "error";

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div className="w-full max-w-sm" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}>
        <GlassCard variant={isDenied || isError ? "dark" : "blue"} padding="lg" rounded="xl" className="text-center">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-[18px] mx-auto mb-5 flex items-center justify-center"
            style={{
              background: isDenied || isError ? "rgba(255,0,60,0.12)" : "linear-gradient(135deg, #0057c2, #0070f3)",
              border: isDenied || isError ? "1px solid rgba(255,0,60,0.25)" : "none",
              boxShadow: isDenied || isError ? "0 0 24px rgba(255,0,60,0.25)" : "0 0 28px rgba(0,112,243,0.55)",
            }}
            animate={isDenied || isError ? {} : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isDenied || isError ? <AlertCircle className="w-7 h-7" style={{ color: "#ff4d6d" }} /> : <Camera className="w-7 h-7 text-white" />}
          </motion.div>

          {/* Title */}
          <h2 className="text-[20px] font-bold mb-2 text-white" style={{ letterSpacing: "-0.02em" }}>
            {isDenied ? "Akses Ditolak" : isError ? "Kamera Error" : "Izinkan Kamera"}
          </h2>

          {/* Description */}
          <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            {isDenied
              ? (errorMessage ?? "Izin kamera ditolak. Klik ikon kunci di address bar browser dan aktifkan izin kamera.")
              : isError
                ? (errorMessage ?? "Terjadi kesalahan. Pastikan kamera tidak digunakan aplikasi lain.")
                : "SnapFrame butuh akses kamera untuk mengambil foto. Foto tidak dikirim ke server manapun."}
          </p>

          {/* Privacy note (hanya di state idle) */}
          {!isDenied && !isError && (
            <div className="flex items-center gap-2 p-3 rounded-[10px] mb-5 text-left" style={{ background: "rgba(0,112,243,0.08)", border: "1px solid rgba(0,112,243,0.2)" }}>
              <Shield className="w-4 h-4 flex-shrink-0" style={{ color: "#60aaff" }} />
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Foto diproses 100% di browser kamu. Tidak ada data yang dikirim ke server.
              </p>
            </div>
          )}

          {/* CTA Button */}
          {isDenied ? (
            /* Denied: instruksi buka settings */
            <div className="flex flex-col gap-2">
              <p className="text-[11px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                Cara mengaktifkan:
              </p>
              <div className="text-left space-y-1.5">
                {["Klik ikon 🔒 di address bar", 'Cari "Camera" atau "Kamera"', 'Ubah dari "Block" ke "Allow"', "Refresh halaman ini"].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold mt-0.5" style={{ background: "rgba(255,0,60,0.15)", color: "#ff4d6d" }}>
                      {i + 1}
                    </span>
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <NeonButton variant="ghost" size="md" fullWidth className="mt-3" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4" />
                Refresh Halaman
              </NeonButton>
            </div>
          ) : (
            <NeonButton variant="primary" size="lg" fullWidth onClick={onRequest}>
              <Camera className="w-5 h-5" />
              {isError ? "Coba Lagi" : "Izinkan Akses Kamera"}
            </NeonButton>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
