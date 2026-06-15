"use client";
// 📍 src/components/photobooth/features-section.tsx
import { Camera, Download, Sparkles, Zap, Shield, Smartphone } from "lucide-react";
import { GlassCard, IconBox } from "@/components/ui";
import { SectionLabel, StaggerContainer, StaggerItem } from "@/components/shared";

const FEATURES = [
  { icon: Camera, color: "blue" as const, title: "Instant Camera", desc: "Akses kamera langsung. Tidak perlu install apapun — langsung dari browser." },
  { icon: Sparkles, color: "cyan" as const, title: "Premium Templates", desc: "Classic strip, grid 2×2, cinematic — semua tersedia gratis." },
  { icon: Download, color: "red" as const, title: "Download Instan", desc: "Simpan sebagai PNG atau PDF siap cetak dalam sekali klik." },
  { icon: Zap, color: "purple" as const, title: "Super Cepat", desc: "Dioptimasi untuk performa. Proses foto dalam hitungan detik." },
  { icon: Shield, color: "blue" as const, title: "Privasi Terjaga", desc: "Foto tidak pernah dikirim ke server. Semua diproses di browser kamu." },
  { icon: Smartphone, color: "cyan" as const, title: "Mobile Ready", desc: "Dioptimasi penuh untuk iPhone, Android, dan tablet." },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 px-5 sm:px-8 pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel className="mb-3">Kenapa SnapFrame?</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
            Semua yang Kamu Butuhkan
          </h2>
        </div>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" stagger={0.08} delay={0.1}>
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <GlassCard variant="base" padding="md" rounded="lg" hover className="group h-full">
                <IconBox icon={f.icon} color={f.color} size="md" className="mb-4" />
                <h3 className="text-white font-semibold text-[14px] mb-1.5" style={{ letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {f.desc}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
