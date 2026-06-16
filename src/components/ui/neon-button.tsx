"use client";
// 📍 src/components/ui/neon-button.tsx

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode;
  variant?: "primary" | "accent" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  glow?: boolean;
}

export function NeonButton({ variant = "primary", size = "md", fullWidth = false, loading = false, glow = true, className, children, disabled, style, onClick, ...props }: NeonButtonProps) {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #0057c2, #0070f3, #2690ff)",
      border: "1px solid rgba(0,112,243,0.4)",
      color: "white",
      boxShadow: glow ? "0 0 20px rgba(0,112,243,0.35), 0 4px 16px rgba(0,0,0,0.3)" : undefined,
    },
    accent: {
      background: "linear-gradient(135deg, #cc0030, #ff003c, #ff4d6d)",
      border: "1px solid rgba(255,0,60,0.4)",
      color: "white",
      boxShadow: glow ? "0 0 20px rgba(255,0,60,0.35), 0 4px 16px rgba(0,0,0,0.3)" : undefined,
    },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "rgba(255,255,255,0.8)",
    },
    glass: {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "white",
      backdropFilter: "blur(12px)",
    },
  };

  const sizes = {
    sm: "h-8  px-4  rounded-[10px] gap-1.5 text-[12px]",
    md: "h-11 px-6  rounded-[12px] gap-2   text-[14px]",
    lg: "h-13 px-8  rounded-[14px] gap-2.5 text-[15px]",
    xl: "h-16 px-10 rounded-[16px] gap-3   text-[17px]",
  };

  const v = variants[variant];

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        "select-none cursor-pointer font-semibold",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transition-all duration-200",
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      style={{ ...v, ...style }}
      whileHover={{
        scale: 1.025,
        y: -1.5,
        boxShadow: variant === "primary" ? "0 0 35px rgba(0,112,243,0.55), 0 8px 24px rgba(0,0,0,0.35)" : variant === "accent" ? "0 0 35px rgba(255,0,60,0.55), 0 8px 24px rgba(0,0,0,0.35)" : undefined,
      }}
      whileTap={{ scale: 0.965, y: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.14) 48%, rgba(255,255,255,0.22) 52%, transparent 75%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "-100% 0",
        }}
        whileHover={{ backgroundPosition: "200% 0" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />

      {/* Top highlight */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }} />

      {/* Loading spinner */}
      {loading && (
        <motion.svg className="mr-2 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.svg>
      )}

      <span className="relative z-10 flex items-center gap-[inherit]">{children}</span>
    </motion.button>
  );
}
