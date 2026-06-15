"use client";
/**
 * ICON BOX — Kotak Ikon Bercahaya
 * 📍 src/components/ui/icon-box.tsx
 *
 * Membungkus ikon Lucide dengan background glass + glow.
 * Size dan warna bisa dikustomisasi.
 */
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon: LucideIcon;
  color?: "blue" | "cyan" | "red" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconBox({ icon: Icon, color = "blue", size = "md", className }: IconBoxProps) {
  const colorMap = {
    blue: { bg: "rgba(0,112,243,0.12)", border: "rgba(0,112,243,0.28)", glow: "rgba(0,112,243,0.3)", icon: "#60aaff" },
    cyan: { bg: "rgba(0,212,255,0.10)", border: "rgba(0,212,255,0.25)", glow: "rgba(0,212,255,0.25)", icon: "#00d4ff" },
    red: { bg: "rgba(255,0,60,0.10)", border: "rgba(255,0,60,0.25)", glow: "rgba(255,0,60,0.25)", icon: "#ff4d6d" },
    purple: { bg: "rgba(191,95,255,0.10)", border: "rgba(191,95,255,0.25)", glow: "rgba(191,95,255,0.25)", icon: "#d08eff" },
  };

  const sizeMap = {
    sm: { box: "w-9  h-9", icon: "w-4 h-4" },
    md: { box: "w-11 h-11", icon: "w-5 h-5" },
    lg: { box: "w-14 h-14", icon: "w-6 h-6" },
  };

  const c = colorMap[color];
  const s = sizeMap[size];

  return (
    <div
      className={cn(s.box, "rounded-[10px] flex items-center justify-center flex-shrink-0", "transition-transform duration-300 group-hover:scale-110", className)}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 20px ${c.glow}`,
      }}
    >
      <Icon className={s.icon} style={{ color: c.icon }} strokeWidth={2} />
    </div>
  );
}
