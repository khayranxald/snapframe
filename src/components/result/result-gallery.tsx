"use client";
// 📍 src/components/result/result-gallery.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type PhotoboothTemplate } from "@/data/templates";
import { cn } from "@/lib/utils";

interface ResultGalleryProps {
  photos: string[];
  template: PhotoboothTemplate;
}

export function ResultGallery({ photos, template }: ResultGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    if (activeIndex === 0) return;
    setDirection(-1);
    setActiveIndex((i) => i - 1);
  };

  const next = () => {
    if (activeIndex === photos.length - 1) return;
    setDirection(1);
    setActiveIndex((i) => i + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Main photo viewer */}
      <div className="relative w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "4/3" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            className="absolute inset-0"
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[activeIndex]} alt={`foto ${activeIndex + 1}`} className="w-full h-full object-cover" style={{ filter: getFilterStyle(template.filter) }} />

            {/* Template color overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 0 2px ${template.colors.accent}30` }} />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {activeIndex > 0 && (
          <motion.button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
            onClick={prev}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </motion.button>
        )}
        {activeIndex < photos.length - 1 && (
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
            onClick={next}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </motion.button>
        )}

        {/* Counter badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.8)" }}>
          {activeIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center gap-2 px-2">
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            className="relative overflow-hidden flex-shrink-0"
            style={{
              width: 52,
              height: 39,
              borderRadius: "6px",
              border: `2px solid ${i === activeIndex ? template.colors.accent : "rgba(255,255,255,0.1)"}`,
              boxShadow: i === activeIndex ? `0 0 10px ${template.colors.cardGlow}` : "none",
              opacity: i === activeIndex ? 1 : 0.55,
            }}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: i === activeIndex ? 1 : 0.55, scale: i === activeIndex ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" className="w-full h-full object-cover" style={{ filter: getFilterStyle(template.filter) }} />
          </motion.button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5">
        {photos.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full cursor-pointer"
            style={{ background: i === activeIndex ? template.colors.accent : "rgba(255,255,255,0.2)" }}
            animate={{ width: i === activeIndex ? 18 : 6, height: 6 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function getFilterStyle(filter: string): string {
  switch (filter) {
    case "noir":
      return "grayscale(1) contrast(1.15) brightness(0.9)";
    case "warm":
      return "sepia(0.35) brightness(1.05) saturate(1.1)";
    case "cool":
      return "hue-rotate(15deg) saturate(1.1) brightness(1.02)";
    case "vivid":
      return "saturate(1.4) contrast(1.1)";
    case "fade":
      return "brightness(1.08) saturate(0.75) contrast(0.9)";
    case "neon-pop":
      return "saturate(1.8) contrast(1.25) brightness(1.05)";
    default:
      return "none";
  }
}
