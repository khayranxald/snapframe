"use client";
/**
 * TEMPLATE PREVIEW — Panel Detail Template Terpilih
 * 📍 src/components/photobooth/template-preview.tsx
 *
 * Modern iOS-style design with glassmorphism, smooth animations,
 * and premium visual effects
 */
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Layers, Tag, CheckCircle2, Crown, Sparkles, ArrowRight, Download, Clock, Grid3x3 } from "lucide-react";
import { type PhotoboothTemplate, LAYOUT_LABELS, FILTER_LABELS } from "@/data/templates";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  template: PhotoboothTemplate;
  onConfirm: () => void;
}

export function TemplatePreview({ template, onConfirm }: TemplatePreviewProps) {
  const { colors } = template;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full max-w-6xl mx-auto">
      {/* ── Left: Mock Photo Strip with 3D effect ─────── */}
      <div className="w-full lg:w-auto flex justify-center lg:justify-start flex-shrink-0 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={template.id}
            initial={{ opacity: 0, rotateY: -15, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotateY: 15, scale: 0.92, y: -20 }}
            transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <MockPhotoStrip template={template} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: Info Panel with glass effect ───────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${template.id}`}
          className="flex-1 flex flex-col gap-5 w-full backdrop-blur-xl rounded-3xl p-6 lg:p-7"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header with gradient name */}
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <motion.h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${colors.accentLight}, ${colors.accent})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {template.name}
              </motion.h2>

              {template.isPremium && (
                <motion.div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                    border: "1px solid rgba(201,168,76,0.4)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  <Crown className="w-3.5 h-3.5" style={{ color: "#f0d080" }} />
                  <span className="text-[11px] font-bold tracking-wide" style={{ color: "#f0d080" }}>
                    PRO
                  </span>
                </motion.div>
              )}

              {template.isNew && !template.isPremium && (
                <motion.div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))",
                    border: "1px solid rgba(0,212,255,0.4)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "#00d4ff" }} />
                  <span className="text-[11px] font-bold tracking-wide" style={{ color: "#00d4ff" }}>
                    NEW
                  </span>
                </motion.div>
              )}
            </div>

            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              {template.tagline}
            </p>
          </div>

          {/* Specs grid with modern cards */}
          <div className="grid grid-cols-2 gap-3">
            <SpecItem icon={Grid3x3} label="Layout" value={LAYOUT_LABELS[template.layout]} color={colors.accent} />
            <SpecItem icon={Camera} label="Photo Count" value={`${template.photoCount} photos`} color={colors.accent} />
            <SpecItem icon={Film} label="Filter" value={FILTER_LABELS[template.filter]} color={colors.accent} />
            <SpecItem icon={Layers} label="Frame Style" value={capitalize(template.frame.style)} color={colors.accent} />
          </div>

          {/* Tags with spring animations */}
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium capitalize backdrop-blur-sm"
                style={{
                  background: `${colors.accent}12`,
                  color: colors.accentLight,
                  border: `1px solid ${colors.accent}25`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -1 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>

          {/* Features list with icons */}
          <div className="flex flex-col gap-2 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
              What's Included
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getTemplateFeatures(template).map((feat, idx) => (
                <motion.div key={feat} className="flex items-center gap-2.5" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.05 }}>
                  <motion.div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${colors.accent}20` }} whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.3 }}>
                    <CheckCircle2 className="w-3 h-3" style={{ color: colors.accent }} />
                  </motion.div>
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {feat}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button with modern effects */}
          <div className="pt-2 mt-1">
            <motion.button
              className="w-full relative overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.accent}, ${colors.accentLight})`,
                boxShadow: `0 8px 32px ${colors.cardGlow}`,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              <div className="px-6 py-4 flex items-center justify-center gap-3 relative z-10">
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[16px] font-semibold text-white tracking-wide">Use This Template</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </div>
            </motion.button>

            <motion.p className="text-center text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.25)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {template.isPremium ? "✨ Premium feature · Login to access" : "🎉 Free to use · No login required"}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MODERN MOCK PHOTO STRIP with 3D and glass effects
   ═══════════════════════════════════════════════════════ */
function MockPhotoStrip({ template }: { template: PhotoboothTemplate }) {
  const { colors, layout, photoCount, frame } = template;

  const isStrip = layout === "strip-1x4";
  const isGrid = layout === "strip-2x2";
  const isCinema = layout === "cinematic-3";

  const mockPhotoColors = [
    [`${colors.accent}30`, `${colors.accentDark}20`],
    [`${colors.accentLight}25`, `${colors.accent}15`],
    [`${colors.accentDark}28`, `${colors.accentLight}18`],
    [`${colors.accent}32`, `${colors.accentDark}22`],
  ];

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: colors.bg,
        padding: `${frame.padding}px`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px ${colors.accent}30, 0 0 0 3px ${colors.accent}10`,
        width: isStrip ? "clamp(120px, 28vw, 160px)" : isGrid ? "clamp(180px, 38vw, 220px)" : isCinema ? "clamp(240px, 48vw, 300px)" : "clamp(160px, 32vw, 200px)",
      }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] pointer-events-none" />

      {/* Inner glow border */}
      <div
        className="absolute inset-[1px] rounded-xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${colors.accent}20`,
        }}
      />

      {/* Photo slots container */}
      <div className={cn("gap-2", isStrip && "flex flex-col", isGrid && "grid grid-cols-2 gap-1.5", isCinema && "flex flex-row gap-1.5")}>
        {Array.from({ length: photoCount }).map((_, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden group/slot"
            style={{
              borderRadius: `${frame.cornerRadius}px`,
              aspectRatio: isCinema ? "4/3" : isGrid ? "1/1" : "4/3",
              background: `linear-gradient(135deg, ${mockPhotoColors[i % 4][0]}, ${mockPhotoColors[i % 4][1]})`,
              border: `1px solid ${colors.accent}25`,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover/slot:opacity-100"
              style={{
                background: `linear-gradient(105deg, transparent 30%, ${colors.accent}20 50%, transparent 70%)`,
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />

            {/* Camera icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Camera
                  className="opacity-20"
                  style={{
                    color: colors.accentLight,
                    width: isGrid ? "18px" : "22px",
                    height: isGrid ? "18px" : "22px",
                  }}
                />
              </motion.div>
            </div>

            {/* Grain texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer with date and logo */}
      {(frame.showDate || frame.showLogo) && (
        <motion.div className="flex items-center justify-between mt-2.5 px-1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {frame.showDate && (
            <span className="text-[8px] font-mono tracking-wide" style={{ color: `${colors.accentLight}80` }}>
              {new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
            </span>
          )}
          {frame.showLogo && (
            <span className="text-[8px] font-bold tracking-[0.2em]" style={{ color: `${colors.accentLight}60` }}>
              SNAPFRAME
            </span>
          )}
        </motion.div>
      )}

      {/* Decorative corner accents */}
      <div
        className="absolute top-2 left-2 w-6 h-6 rounded-tl-xl pointer-events-none"
        style={{
          borderTop: `2px solid ${colors.accent}40`,
          borderLeft: `2px solid ${colors.accent}40`,
        }}
      />
      <div
        className="absolute top-2 right-2 w-6 h-6 rounded-tr-xl pointer-events-none"
        style={{
          borderTop: `2px solid ${colors.accent}40`,
          borderRight: `2px solid ${colors.accent}40`,
        }}
      />
      <div
        className="absolute bottom-2 left-2 w-6 h-6 rounded-bl-xl pointer-events-none"
        style={{
          borderBottom: `2px solid ${colors.accent}40`,
          borderLeft: `2px solid ${colors.accent}40`,
        }}
      />
      <div
        className="absolute bottom-2 right-2 w-6 h-6 rounded-br-xl pointer-events-none"
        style={{
          borderBottom: `2px solid ${colors.accent}40`,
          borderRight: `2px solid ${colors.accent}40`,
        }}
      />

      {/* Bottom glow effect */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-12 rounded-full pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle, ${colors.accent}50, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/* ── Modern Spec Item Component ─────────────────────────────── */
function SpecItem({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      whileHover={{ scale: 1.02, y: -1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
          {label}
        </p>
        <p className="text-[13px] font-semibold truncate" style={{ color: "rgba(255,255,255,0.85)" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTemplateFeatures(template: PhotoboothTemplate): string[] {
  const features = [`${template.photoCount} automated photos with countdown`, `${FILTER_LABELS[template.filter]} filter applied in real-time`, "High-res PNG & PDF download"];
  if (template.frame.showDate) features.push("Auto-printed date stamp");
  if (template.frame.showLogo) features.push("SnapFrame watermark branding");
  return features;
}
