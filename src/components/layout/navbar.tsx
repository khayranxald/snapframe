"use client";
// 📍 src/components/layout/navbar.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { NeonButton } from "@/components/ui";
import { APP_CONFIG } from "@/config/design";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onStart?: () => void;
}

const NAV_ITEMS = [
  { label: "Template", href: "/template" },
  { label: "Cara Pakai", href: "/cara-pakai" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar({ onStart }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  const handleStart = () => {
    setMobileMenuOpen(false);
    if (onStart) onStart();
    else router.push("/template");
  };

  return (
    <>
      <motion.header
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-3 border-b border-white/[0.07]" : "py-5 border-b border-transparent")}
        style={scrolled ? { background: "rgba(8,12,20,0.78)", backdropFilter: "blur(24px) saturate(180%)" } : {}}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => router.push("/")} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0057c2,#0070f3,#2690ff)", boxShadow: "0 0 14px rgba(0,112,243,0.55)" }}>
              <Camera className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[16px] sm:text-[17px] font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
              {APP_CONFIG.name}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className={cn("text-[13px] transition-colors duration-200 cursor-pointer relative pb-0.5", isActive ? "text-white font-medium" : "text-white/50 hover:text-white/90")}
                >
                  {item.label}
                  {isActive && <motion.div className="absolute -bottom-1 left-0 right-0 h-px rounded-full" style={{ background: "#0070f3" }} layoutId="nav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </button>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <NeonButton variant="primary" size="sm" className="hidden sm:flex" onClick={handleStart}>
              <Camera className="w-3.5 h-3.5" />
              Mulai Gratis
            </NeonButton>
            <button className="sm:hidden w-8 h-8 flex items-center justify-center rounded-[8px] text-white/60 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 z-40 flex flex-col pt-20 px-6 pb-8"
            style={{ background: "rgba(8,12,20,0.97)", backdropFilter: "blur(40px)" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-2 mb-6">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.button
                    key={item.label}
                    className={cn("text-left px-4 py-3.5 rounded-[12px] text-[15px] transition-all", isActive ? "text-white bg-white/8 font-medium" : "text-white/70 hover:text-white hover:bg-white/6")}
                    onClick={() => handleNav(item.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
            <NeonButton variant="primary" size="lg" fullWidth onClick={handleStart}>
              <Camera className="w-5 h-5" />
              Buka Photobooth
            </NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
