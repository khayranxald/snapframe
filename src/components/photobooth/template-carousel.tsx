"use client";
// 📍 src/components/photobooth/template-carousel.tsx

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TemplateCard } from "./template-card";
import { type PhotoboothTemplate } from "@/data/templates";

interface TemplateCarouselProps {
  templates: PhotoboothTemplate[];
  selectedId: string;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function TemplateCarousel({ templates, selectedId, hoveredId, onSelect, onHover }: TemplateCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto scroll ke card terpilih */
  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-template-id="${selectedId}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedId]);

  const scrollBy = useCallback((dir: "left" | "right") => {
    // Dinaikkan menjadi 240 agar scroll-nya terasa pas seukuran lebar card
    scrollRef.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full px-4 sm:px-8">
      {/* Tambah padding horizontal di container utama supaya tombol arrow punya ruang aman */}

      {/* Fade edges */}
      <div className="absolute left-4 top-0 bottom-6 w-12 z-10 pointer-events-none bg-gradient-to-r from-[#080c14]/90 to-transparent" />
      <div className="absolute right-4 top-0 bottom-6 w-12 z-10 pointer-events-none bg-gradient-to-l from-[#080c14]/90 to-transparent" />

      {/* Arrow buttons */}
      {[
        { dir: "left" as const, pos: "left-0 translate-x-2" },
        { dir: "right" as const, pos: "right-0 -translate-x-2" },
      ].map(({ dir, pos }) => (
        <button
          key={dir}
          onClick={() => scrollBy(dir)}
          className={`hidden sm:flex absolute ${pos} top-[42%] -translate-y-1/2 z-20
            w-10 h-10 rounded-full items-center justify-center backdrop-blur-md
            transition-all duration-200 hover:scale-110 active:scale-95`}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          }}
        >
          {dir === "left" ? <ChevronLeft className="w-5 h-5 text-white/80" /> : <ChevronRight className="w-5 h-5 text-white/80" />}
        </button>
      ))}

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto py-4 scroll-smooth" // Ubah pb-3 jadi py-4 agar memberikan ruang atas-bawah card supaya tidak terpotong
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/* Cards row */}
        <div className="flex gap-4 px-4 justify-start sm:justify-center min-w-full w-max">
          {/* Menggunakan justify-center jika isi card sedikit, dan memberikan gap-4 yang lebih lega */}
          {templates.map((tmpl, i) => (
            <div
              key={tmpl.id}
              data-template-id={tmpl.id}
              style={{ scrollSnapAlign: "center" }}
              className="flex-shrink-0" // Memastikan ukuran card tidak menyusut/gepeng
            >
              <TemplateCard template={tmpl} isSelected={selectedId === tmpl.id} isHovered={hoveredId === tmpl.id} onClick={() => onSelect(tmpl.id)} onHover={onHover} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {templates.map((tmpl) => {
          const isActive = tmpl.id === selectedId;
          const accent = templates.find((t) => t.id === selectedId)?.colors.accent ?? "#0070f3";
          return (
            <motion.button
              key={tmpl.id}
              onClick={() => onSelect(tmpl.id)}
              className="rounded-full cursor-pointer"
              style={{ background: isActive ? accent : "rgba(255,255,255,0.15)" }}
              animate={{ width: isActive ? 20 : 6, height: 6 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            />
          );
        })}
      </div>
    </div>
  );
}
