"use client";
// 📍 src/components/result/photo-strip-frame.tsx

import { forwardRef } from "react";
import { type PhotoboothTemplate } from "@/data/templates";

interface PhotoStripFrameProps {
  photos: string[];
  template: PhotoboothTemplate;
  scale?: number;
}

export const PhotoStripFrame = forwardRef<HTMLDivElement, PhotoStripFrameProps>(function PhotoStripFrame(props, ref) {
  const { photos, template, scale = 1, ...rest } = props;
  const test: PhotoboothTemplate = template;

  const { colors, frame, layout } = template;

  const isStrip = layout === "strip-1x4";
  const isGrid = layout === "strip-2x2";
  const isCinema = layout === "cinematic-3";

  // Ukuran frame keseluruhan
  const frameWidth = isStrip ? 200 * scale : isGrid ? 280 * scale : isCinema ? 360 * scale : 240 * scale;

  return (
    <div
      ref={ref}
      style={{
        width: frameWidth,
        background: colors.bg,
        padding: frame.padding * scale,
        borderRadius: (frame.cornerRadius + 8) * scale,
        border: `${frame.borderWidth * scale}px solid ${colors.accent}50`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${colors.accent}20, 0 0 60px ${colors.cardGlow}`,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
      {...rest}
    >
      {/* Header gradient bar */}
      <div
        style={{
          height: 3 * scale,
          borderRadius: `${frame.cornerRadius * scale}px ${frame.cornerRadius * scale}px 0 0`,
          background: `linear-gradient(90deg, ${colors.accentDark}, ${colors.accent}, ${colors.accentLight})`,
          marginBottom: 6 * scale,
          flexShrink: 0,
        }}
      />

      {/* Photo container */}
      {isStrip && (
        // Strip 1x4: foto berjejer vertikal, setiap foto 4:3 landscape
        <div style={{ display: "flex", flexDirection: "column", gap: 6 * scale }}>
          {photos.map((photo, i) => (
            <PhotoSlot key={i} photo={photo} index={i} filter={template.filter} cornerRadius={frame.cornerRadius * scale} accentColor={colors.accent} aspectRatio="4/3" />
          ))}
        </div>
      )}

      {isGrid && (
        // Grid 2x2: foto dalam 2 kolom, setiap foto 1:1 square
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 * scale }}>
          {photos.map((photo, i) => (
            <PhotoSlot key={i} photo={photo} index={i} filter={template.filter} cornerRadius={frame.cornerRadius * scale} accentColor={colors.accent} aspectRatio="1/1" />
          ))}
        </div>
      )}

      {isCinema && (
        // Cinematic: foto berjejer horizontal, setiap foto 3:4 portrait
        // Ini yang paling penting — portrait bukan landscape!
        <div style={{ display: "flex", flexDirection: "row", gap: 6 * scale }}>
          {photos.map((photo, i) => (
            <div key={i} style={{ flex: 1 }}>
              <PhotoSlot photo={photo} index={i} filter={template.filter} cornerRadius={frame.cornerRadius * scale} accentColor={colors.accent} aspectRatio="3/4" />
            </div>
          ))}
        </div>
      )}

      {/* Fallback: single */}
      {!isStrip && !isGrid && !isCinema && <PhotoSlot photo={photos[0]} index={0} filter={template.filter} cornerRadius={frame.cornerRadius * scale} accentColor={colors.accent} aspectRatio="4/3" />}

      {/* Footer */}
      {(frame.showDate || frame.showLogo) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 6 * scale,
            paddingInline: 2 * scale,
          }}
        >
          {frame.showDate && (
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 8 * scale,
                color: colors.accentLight,
                opacity: 0.65,
              }}
            >
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
          {frame.showLogo && (
            <span
              style={{
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: 7 * scale,
                color: colors.accentLight,
                opacity: 0.5,
              }}
            >
              SnapFrame
            </span>
          )}
        </div>
      )}
    </div>
  );
});

/* ── PhotoSlot ─────────────────────────────────────────
   Satu slot foto.
   Kunci utama: object-fit "cover" + aspect-ratio yang benar.
   "cover" = foto mengisi area tanpa distorsi, crop jika perlu.
   Ini yang mencegah foto gepeng.
─────────────────────────────────────────────────────── */
function PhotoSlot({ photo, index, filter, cornerRadius, accentColor, aspectRatio }: { photo: string; index: number; filter: string; cornerRadius: number; accentColor: string; aspectRatio: string }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio,
        borderRadius: cornerRadius,
        overflow: "hidden",
        border: `1px solid ${accentColor}20`,
        background: "rgba(0,0,0,0.2)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={`foto ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          // object-fit: cover = foto tidak gepeng, crop dari tengah
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          filter: getFilterStyle(filter),
        }}
      />

      {/* Vignette halus */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Nomor foto */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: `${accentColor}35`,
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 7, fontWeight: 700, color: "white", opacity: 0.85 }}>{index + 1}</span>
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
