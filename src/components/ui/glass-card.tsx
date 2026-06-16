"use client";
// 📍 src/components/ui/glass-card.tsx

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/config/design";
import type { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: "base" | "md" | "blue" | "dark";
  glow?: "none" | "blue" | "red" | "cyan";
  hover?: boolean;
  animated?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "md" | "lg" | "xl";
  shimmer?: boolean;
  gradientBorder?: boolean;
}

export function GlassCard({ variant = "base", glow = "none", hover = false, animated = false, padding = "md", rounded = "lg", shimmer = false, gradientBorder = false, className, children, ...props }: GlassCardProps) {
  const variantStyles = {
    base: {
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
    },
    md: {
      background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(24px) saturate(200%)",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    },
    blue: {
      background: "rgba(0,112,243,0.08)",
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(0,112,243,0.28)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,112,243,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
    },
    dark: {
      background: "rgba(8,12,20,0.88)",
      backdropFilter: "blur(40px) saturate(150%)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
    },
  };

  const glowShadow = {
    none: "",
    blue: "0 0 25px rgba(0,112,243,0.45), 0 0 60px rgba(0,112,243,0.18)",
    red: "0 0 25px rgba(255,0,60,0.45),  0 0 60px rgba(255,0,60,0.18)",
    cyan: "0 0 25px rgba(0,212,255,0.4),  0 0 60px rgba(0,212,255,0.15)",
  }[glow];

  const paddingClass = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 md:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  const roundedClass = {
    md: "rounded-[12px]",
    lg: "rounded-[20px]",
    xl: "rounded-[28px]",
  }[rounded];

  const vStyle = variantStyles[variant];

  const motionProps = {
    ...(hover && {
      whileHover: { y: -4, scale: 1.01, transition: MOTION.spring.gentle },
      whileTap: { scale: 0.98, transition: { duration: 0.1 } },
    }),
    ...(animated && {
      initial: { opacity: 0, y: 24, filter: "blur(8px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0.5, ease: MOTION.ease.ios },
    }),
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", paddingClass, roundedClass, className)}
      style={{
        ...vStyle,
        boxShadow: [vStyle.boxShadow, glowShadow].filter(Boolean).join(", "),
        willChange: hover ? "transform" : undefined,
      }}
      {...motionProps}
      {...(props as any)}
    >
      {/* Inner highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 30%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.28) 70%, transparent 100%)",
        }}
      />

      {/* Gradient border overlay */}
      {gradientBorder && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: 1,
            background: "linear-gradient(135deg, rgba(0,112,243,0.5), rgba(0,212,255,0.2), rgba(255,0,60,0.2))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Shimmer */}
      {shimmer && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
