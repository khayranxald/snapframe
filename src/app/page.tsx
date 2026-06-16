"use client";
// 📍 src/app/page.tsx

import { useRouter } from "next/navigation";
import { FloatingBlobs, Navbar } from "@/components/layout";
import { HeroSection, FeaturesSection, TemplatesSection, CtaSection } from "@/components/photobooth";
import { Divider } from "@/components/ui";
import { APP_CONFIG } from "@/config/design";

export default function HomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/template");
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <FloatingBlobs />
      <Navbar onStart={handleStart} />
      <HeroSection onStart={handleStart} />
      <Divider color="blue" className="max-w-4xl mx-auto px-8" />
      <div className="pt-16 sm:pt-20">
        <FeaturesSection />
      </div>
      <Divider color="white" className="max-w-4xl mx-auto px-8" />
      <div className="pt-16 sm:pt-20">
        <TemplatesSection />
      </div>
      <CtaSection onStart={handleStart} />
      <footer className="relative z-10 text-center pb-10 px-5">
        <Divider color="white" className="mb-6 opacity-50" />
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.14)" }}>
          {APP_CONFIG.name} v{APP_CONFIG.version} · <span className="text-white font-medium">☆ Khayran Ald Afasy ☆</span> ♥ · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
