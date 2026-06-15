"use client";
// 📍 src/components/particles/floating-particles.tsx

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export function FloatingParticles({ count = 35, colors = ["#0070f3", "#00d4ff", "#bf5fff", "#ff003c"], className }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.5 - 0.15,
      size: Math.random() * 2.5 + 0.8,
      alpha: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 260 + 140,
    });

    particles.current = Array.from({ length: count }, spawn);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        const half = p.maxLife / 2;
        p.alpha = p.life < half ? (p.life / half) * 0.55 : ((p.maxLife - p.life) / half) * 0.55;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.round(p.alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.round(p.alpha * 0.3 * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Respawn
        if (p.life >= p.maxLife) {
          particles.current[i] = spawn();
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, colors]);

  return <canvas ref={canvasRef} className={className ?? "fixed inset-0 pointer-events-none -z-[3]"} style={{ width: "100%", height: "100%" }} />;
}
