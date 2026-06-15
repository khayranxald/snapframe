"use client";
// 📍 src/components/photobooth/cta-section.tsx
import { Camera, ArrowRight } from "lucide-react";
import { GlassCard, NeonButton } from "@/components/ui";
import { FadeUp } from "@/components/shared";

interface CtaSectionProps {
  onStart?: () => void;
}

export function CtaSection({ onStart }: CtaSectionProps) {
  return (
    <section className="relative z-10 px-5 sm:px-8 pb-24 sm:pb-32">
      <FadeUp className="max-w-lg mx-auto" delay={0.1}>
        <GlassCard variant="blue" glow="blue" padding="lg" rounded="xl" className="text-center relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,0,60,0.2),transparent 70%)", filter: "blur(20px)" }} />
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] mx-auto mb-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0057c2,#0070f3,#2690ff)", boxShadow: "0 0 28px rgba(0,112,243,0.55)" }}>
            <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5" style={{ letterSpacing: "-0.03em" }}>
            Siap Mengabadikan Momen?
          </h2>
          <p className="text-[13px] sm:text-[14px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Gratis. Tanpa akun. Langsung dari browser.
            <br />
            Mulai dalam 5 detik.
          </p>
          <NeonButton variant="primary" size="lg" fullWidth onClick={onStart} className="group">
            <Camera className="w-5 h-5" />
            Mulai Sekarang
            <ArrowRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
          </NeonButton>
          <div className="mt-5 flex items-center justify-center gap-4 flex-wrap">
            {["100% Gratis", "No Login", "Privasi Aman"].map((text) => (
              <span key={text} className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
                ✓ {text}
              </span>
            ))}
          </div>
        </GlassCard>
      </FadeUp>
    </section>
  );
}
