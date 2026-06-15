"use client";
// 📍 src/components/animations/animated-counter.tsx

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── AnimatedCounter — angka roll-up ───────────────── */
interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ from = 0, to, duration = 1.2, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const diff = to - from;

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(Math.round(from + diff * eased));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* ── TextReveal — teks muncul kata per kata ─────────── */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({ text, className, delay = 0, once = true }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-30px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.06,
            ease: [0.34, 1.1, 0.64, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

/* ── PulseRing — ring berdenyut (untuk CTA) ─────────── */
interface PulseRingProps {
  color?: string;
  size?: number;
  className?: string;
}

export function PulseRing({ color = "#0070f3", size = 60, className }: PulseRingProps) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`} style={{ width: size, height: size }}>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px solid ${color}` }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
