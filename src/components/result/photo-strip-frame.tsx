"use client";
// 📍 src/components/result/photo-strip-frame.tsx

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { type PhotoboothTemplate } from "@/data/templates";
import { cn } from "@/lib/utils";

interface PhotoStripFrameProps {
  photos: string[];
  template: PhotoboothTemplate;
  scale?: number;
}

export const PhotoStripFrame = forwardRef<HTMLDivElement, PhotoStripFrameProps>(function PhotoStripFrame({ photos, template, scale = 1 }, ref) {
  const { colors, frame, layout } = template;

  const isStrip = layout === "strip-1x4";
  const isGrid = layout === "strip-2x2";
  const isCinema = layout === "cinematic-3";

  return (
    <div
      ref={ref}
      className="relative overflow-hidden select-none"
      style={{
        background: colors.bg,
        padding: `${frame.padding * scale}px`,
        borderRadius: `${frame.cornerRadius * scale + 8}px`,
        border: `${frame.borderWidth * scale}px solid ${colors.accent}50`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${colors.accent}20, 0 0 60px ${colors.cardGlow}`,
        width: isStrip ? `${220 * scale}px` : isGrid ? `${280 * scale}px` : isCinema ? `${340 * scale}px` : `${260 * scale}px`,
      }}
    >
      {/* Gradient header bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${colors.accentDark}, ${colors.accent}, ${colors.accentLight}, ${colors.accent}, ${colors.accentDark})` }} />

      {/* Photo grid */}
      <div className={cn(isStrip && "flex flex-col", isGrid && "grid grid-cols-2", isCinema && "flex flex-row")} style={{ gap: `${6 * scale}px` }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              borderRadius: `${frame.cornerRadius * scale}px`,
              aspectRatio: isCinema ? "4/3" : isGrid ? "1/1" : "4/3",
              border: `${1 * scale}px solid ${colors.accent}20`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={`foto ${i + 1}`}
              className="w-full h-full object-cover"
              style={{
                filter: getFilterStyle(template.filter),
              }}
            />

            {/* Vignette per foto */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.25) 100%)" }} />

            {/* Frame number badge */}
            <div className="absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}30`, backdropFilter: "blur(4px)" }}>
              <span className="text-[7px] font-bold" style={{ color: colors.accentLight }}>
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer: date + logo */}
      {(frame.showDate || frame.showLogo) && (
        <div className="flex items-center justify-between mt-2 px-0.5" style={{ paddingTop: `${4 * scale}px` }}>
          {frame.showDate && (
            <span className="font-mono" style={{ fontSize: `${8 * scale}px`, color: colors.accentLight, opacity: 0.6 }}>
              {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          )}
          {frame.showLogo && (
            <span className="font-bold tracking-widest uppercase" style={{ fontSize: `${7 * scale}px`, color: colors.accentLight, opacity: 0.5 }}>
              SnapFrame
            </span>
          )}
        </div>
      )}

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
});

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
