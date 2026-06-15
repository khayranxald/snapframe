/**
 * DIVIDER — Garis Pemisah Gradient
 * 📍 src/components/ui/divider.tsx
 *
 * Garis pemisah yang memudar di ujung-ujungnya.
 * Lebih elegan dari border biasa.
 */
import { cn } from "@/lib/utils";

interface DividerProps {
  color?: "blue" | "white" | "red";
  className?: string;
}

export function Divider({ color = "white", className }: DividerProps) {
  const gradients = {
    blue: "linear-gradient(90deg, transparent, rgba(0,112,243,0.5), rgba(0,212,255,0.5), transparent)",
    white: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
    red: "linear-gradient(90deg, transparent, rgba(255,0,60,0.4), transparent)",
  };

  return <div className={cn("h-px w-full", className)} style={{ background: gradients[color] }} />;
}
