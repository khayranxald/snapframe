"use client";
// 📍 src/components/camera/capture-sequence.tsx

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountdownDisplay } from "./countdown-display";
import { FlashEffect } from "./flash-effect";
import { PhotoStripPreview } from "./photo-strip-preview";
import { useCountdown } from "@/hooks/useCountdown";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { type PhotoboothTemplate } from "@/data/templates";
import { sleep } from "@/lib/utils";

interface UseCaptureSequenceProps {
  template: PhotoboothTemplate;
  onCapture: () => string | null;
  onComplete: (photos: string[]) => void;
}

export function useCaptureSequence({ template, onCapture, onComplete }: UseCaptureSequenceProps) {
  const countdown = useCountdown();
  const sound = useSoundEffect();

  const [photos, setPhotos] = useState<string[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSequence, setIsSequence] = useState(false);

  // isRunningRef adalah kunci utama guard.
  // Ref berbeda dengan state:
  // - State update → async → ada jeda render → bisa double trigger
  // - Ref update → sync langsung → tidak ada jeda → aman
  const isRunningRef = useRef(false);

  const totalPhotos = template.photoCount;

  const triggerFlash = useCallback(async () => {
    setShowFlash(true);
    await sleep(50);
    setShowFlash(false);
  }, []);

  const runSequence = useCallback(async () => {
    // Cek ref PERTAMA sebelum apapun — ini yang mencegah double run
    if (isRunningRef.current) return;
    isRunningRef.current = true; // Lock immediately, synchronous

    setIsSequence(true);
    setPhotos([]);

    const captured: string[] = [];

    for (let i = 0; i < totalPhotos; i++) {
      setIsCapturing(true);

      await new Promise<void>((resolve) => {
        countdown.start({
          from: 3,
          onTick: () => sound.play("beep"),
          onComplete: async () => {
            sound.play("shutter");
            await triggerFlash();

            const photo = onCapture();
            if (photo) {
              captured.push(photo);
              setPhotos([...captured]);
            }

            setIsCapturing(false);
            resolve();
          },
        });
      });

      if (i < totalPhotos - 1) {
        await sleep(900);
      }
    }

    await sleep(400);
    sound.play("complete");

    // Unlock dan reset
    setIsSequence(false);
    isRunningRef.current = false;

    onComplete(captured);
  }, [totalPhotos, countdown, sound, triggerFlash, onCapture, onComplete]);

  const reset = useCallback(() => {
    countdown.cancel();
    isRunningRef.current = false;
    setPhotos([]);
    setIsCapturing(false);
    setIsSequence(false);
    setShowFlash(false);
  }, [countdown]);

  return {
    photos,
    showFlash,
    isCapturing,
    isSequence,
    countdownCount: countdown.count,
    countdownIsRunning: countdown.isRunning,
    runSequence,
    reset,
  };
}

interface CaptureOverlayProps {
  countdownCount: number;
  countdownIsRunning: boolean;
  showFlash: boolean;
  photos: string[];
  totalPhotos: number;
  template: PhotoboothTemplate;
  isCapturing: boolean;
  isSequence: boolean;
}

export function CaptureOverlay({ countdownCount, countdownIsRunning, showFlash, photos, totalPhotos, template, isCapturing, isSequence }: CaptureOverlayProps) {
  return (
    <>
      <CountdownDisplay count={countdownCount} isRunning={countdownIsRunning} color={template.colors.accent} />

      <FlashEffect trigger={showFlash} />

      <AnimatePresence>
        {isSequence && (
          <motion.div className="absolute bottom-28 left-0 right-0 z-20 flex flex-col items-center gap-3 px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.35 }}>
            <motion.p className="text-[12px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}>
              {countdownIsRunning ? `Foto ${photos.length + 1} dari ${totalPhotos}...` : `Bersiap...`}
            </motion.p>

            <PhotoStripPreview photos={photos} totalPhotos={totalPhotos} template={template} isCapturing={isCapturing} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
