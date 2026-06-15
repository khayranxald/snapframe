"use client";
// 📍 src/components/animations/glow-card.tsx

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlowCard({ children, className, glowColor = "#0070f3", intensity = "medium" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const intensityMap = { low: 0.12, medium: 0.2, high: 0.32 };
  const alpha = intensityMap[intensity];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Cursor spotlight glow */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          width: 300,
          height: 300,
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor}${Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
