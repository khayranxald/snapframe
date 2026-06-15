"use client";
// 📍 src/hooks/useSoundEffect.ts

import { useCallback, useRef } from "react";

type SoundType = "beep" | "shutter" | "complete";

export function useSoundEffect() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      const ctx = getCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "beep") {
        // Countdown beep — nada pendek tinggi
        osc.frequency.setValueAtTime(880, now);
        osc.type = "sine";
        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }

      if (type === "shutter") {
        // Shutter click — nada klik kamera
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        osc.type = "sine";
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }

      if (type === "complete") {
        // Sequence selesai — nada naik menyenangkan
        const freqs = [523, 659, 784, 1047];
        freqs.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          const t = now + i * 0.1;
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, t);
          o.type = "sine";
          g.gain.setValueAtTime(0.15, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          o.start(t);
          o.stop(t + 0.15);
        });
      }
    },
    [getCtx],
  );

  return { play };
}
