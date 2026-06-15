"use client";
// 📍 src/components/photobooth/template-card.tsx

import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, Sparkles, Eye } from "lucide-react";
import { type PhotoboothTemplate, LAYOUT_LABELS } from "@/data/templates";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: PhotoboothTemplate;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (id: string | null) => void;
  index: number;
}

export function TemplateCard({ template, isSelected, isHovered, onClick, onHover, index }: TemplateCardProps) {
  const { colors, frame, layout } = template;

  return (
    <motion.button
      className="relative flex-shrink-0 cursor-pointer group"
      style={{ width: 180 }}
      onClick={onClick}
      onHoverStart={() => onHover(template.id)}
      onHoverEnd={() => onHover(null)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={cn("relative rounded-3xl overflow-hidden transition-all duration-500", "backdrop-blur-xl bg-white/5", isSelected && "bg-white/10", isHovered && "bg-white/8")}
        style={{
          border: `1px solid ${isSelected ? colors.accent : isHovered ? `${colors.accent}40` : "rgba(255,255,255,0.1)"}`,
          boxShadow: isSelected
            ? `0 20px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px ${colors.accent}40, 0 0 0 3px ${colors.accent}20`
            : isHovered
              ? `0 20px 35px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15)`
              : `0 8px 20px -8px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] pointer-events-none" />

        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${colors.accent}30, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Top highlight line */}
        <motion.div
          className="absolute top-0 inset-x-4 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent}, ${colors.accentLight}, transparent)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isSelected ? 0.8 : isHovered ? 0.5 : 0,
            scaleX: isSelected || isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Photo slots preview with depth effect */}
        <div className="p-3 pb-2">
          <PhotoSlotsPreview template={template} isSelected={isSelected} isHovered={isHovered} />
        </div>

        {/* Info section */}
        <div className="px-4 pb-4 pt-1">
          {/* Title with gradient on selection */}
          <div className="flex items-center justify-between mb-1">
            <p
              className={cn("text-sm font-semibold tracking-tight transition-colors duration-200", isSelected && "bg-gradient-to-r bg-clip-text text-transparent")}
              style={
                isSelected
                  ? {
                      backgroundImage: `linear-gradient(135deg, ${colors.accentLight}, ${colors.accent})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: colors.accentLight,
                    }
                  : {
                      color: "rgba(255,255,255,0.92)",
                    }
              }
            >
              {template.name}
            </p>

            {/* Interactive indicator */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.accent }}
              animate={{
                scale: isSelected ? [1, 1.3, 1] : 1,
                opacity: isSelected ? 1 : 0.3,
              }}
              transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0, repeatDelay: 1 }}
            />
          </div>

          <p className="text-[11px] leading-tight mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            {template.tagline}
          </p>

          {/* Metadata badges */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm transition-all duration-200"
              style={{
                background: `${colors.accent}14`,
                color: colors.accentLight,
                border: `1px solid ${colors.accent}25`,
              }}
            >
              {LAYOUT_LABELS[layout]}
            </span>
            <span className="text-[10px] px-2 py-1 rounded-full backdrop-blur-sm" style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {template.photoCount} foto
            </span>
          </div>
        </div>

        {/* Selected checkmark with spring animation */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
                boxShadow: `0 4px 12px ${colors.accent}40`,
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRO badge with shimmer effect */}
        {template.isPremium && (
          <motion.div
            className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full z-20 backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))",
              border: "1px solid rgba(201,168,76,0.5)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Crown className="w-3 h-3" style={{ color: "#f0d080" }} />
            </motion.div>
            <span className="text-[9px] font-bold tracking-wide" style={{ color: "#f0d080" }}>
              PRO
            </span>
          </motion.div>
        )}

        {/* NEW badge with pulse animation */}
        {template.isNew && !template.isPremium && (
          <motion.div
            className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full z-20 backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.1))",
              border: "1px solid rgba(0,212,255,0.5)",
            }}
            animate={{
              boxShadow: ["0 0 0 0 rgba(0,212,255,0.4)", "0 0 0 6px rgba(0,212,255,0)"],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3" style={{ color: "#00d4ff" }} />
            <span className="text-[9px] font-bold tracking-wide" style={{ color: "#00d4ff" }}>
              NEW
            </span>
          </motion.div>
        )}

        {/* Hover overlay with quick preview text */}
        <AnimatePresence>
          {isHovered && !isSelected && (
            <motion.div className="absolute inset-0 rounded-3xl flex items-center justify-center backdrop-blur-sm bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Eye className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs font-medium text-white/90">Quick Preview</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function PhotoSlotsPreview({ template, isSelected, isHovered }: { template: PhotoboothTemplate; isSelected: boolean; isHovered: boolean }) {
  const { colors, layout, photoCount } = template;
  const intensity = isSelected ? 0.85 : isHovered ? 0.65 : 0.4;

  const slotStyle = {
    background: `linear-gradient(135deg, ${colors.accent}1A, ${colors.accentDark}12)`,
    border: `1px solid ${colors.accent}20`,
    borderRadius: "8px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const slotVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  /* Strip 1×4 — vertical */
  if (layout === "strip-1x4") {
    return (
      <motion.div
        className="w-full rounded-2xl overflow-hidden p-2 flex flex-col gap-1.5"
        style={{
          background: colors.bg,
          aspectRatio: "3/4",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: photoCount }).map((_, i) => (
          <motion.div key={i} className="flex-1" style={{ ...slotStyle, opacity: intensity }} variants={slotVariants} whileHover={{ scale: 1.02, opacity: 0.9 }} transition={{ duration: 0.2 }} />
        ))}
      </motion.div>
    );
  }

  /* Grid 2×2 */
  if (layout === "strip-2x2") {
    return (
      <motion.div
        className="w-full rounded-2xl overflow-hidden p-2 grid grid-cols-2 gap-1.5"
        style={{
          background: colors.bg,
          aspectRatio: "1/1",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: photoCount }).map((_, i) => (
          <motion.div key={i} className="aspect-square" style={{ ...slotStyle, opacity: intensity }} variants={slotVariants} whileHover={{ scale: 1.03, opacity: 0.9 }} transition={{ duration: 0.2 }} />
        ))}
      </motion.div>
    );
  }

  /* Cinematic 3 — horizontal */
  if (layout === "cinematic-3") {
    return (
      <motion.div
        className="w-full rounded-2xl overflow-hidden p-2 flex flex-row gap-1.5"
        style={{
          background: colors.bg,
          aspectRatio: "4/3",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: photoCount }).map((_, i) => (
          <motion.div key={i} className="flex-1" style={{ ...slotStyle, opacity: intensity }} variants={slotVariants} whileHover={{ scale: 1.02, opacity: 0.9 }} transition={{ duration: 0.2 }} />
        ))}
      </motion.div>
    );
  }

  /* Single */
  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden p-2"
      style={{
        background: colors.bg,
        aspectRatio: "1/1",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div className="w-full h-full" style={{ ...slotStyle, opacity: intensity }} variants={slotVariants} whileHover={{ scale: 1.02, opacity: 0.9 }} transition={{ duration: 0.2 }} />
    </motion.div>
  );
}
