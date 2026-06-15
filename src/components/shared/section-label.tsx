/**
 * SECTION LABEL — Label Kecil di Atas Heading
 * 📍 src/components/shared/section-label.tsx
 *
 * Pola umum di UI modern: ada teks kecil uppercase
 * di atas heading besar. Ini membantu hierarchy visual.
 */
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionLabel({ children, className, align = "center" }: SectionLabelProps) {
  return (
    <p className={cn("text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]", align === "center" ? "text-center" : "text-left", className)} style={{ color: "rgba(255,255,255,0.28)" }}>
      {children}
    </p>
  );
}
