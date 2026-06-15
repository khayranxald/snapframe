"use client";
// 📍 src/hooks/usePdfExport.ts

import { useState, useCallback } from "react";
import { type PhotoboothTemplate } from "@/data/templates";
import { generateId } from "@/lib/utils";

export type PdfStatus = "idle" | "capturing" | "building" | "rendering" | "saving" | "success" | "error";

export interface PdfState {
  status: PdfStatus;
  progress: number;
  message: string;
  error: string | null;
}

const INITIAL: PdfState = { status: "idle", progress: 0, message: "", error: null };

export function usePdfExport() {
  const [state, setState] = useState<PdfState>(INITIAL);

  const set = (partial: Partial<PdfState>) => setState((prev) => ({ ...prev, ...partial }));

  const reset = useCallback(() => setState(INITIAL), []);

  const exportPdf = useCallback(async (frameElement: HTMLElement, photos: string[], template: PhotoboothTemplate) => {
    set({ status: "capturing", progress: 10, message: "Mengambil gambar strip...", error: null });

    try {
      const [html2canvasModule, jsPDFModule] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      set({ progress: 25, message: "Merender photo strip..." });

      const canvas = await html2canvas(frameElement, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: template.colors.bg,
        logging: false,
      });

      set({ status: "building", progress: 50, message: "Membangun layout PDF..." });
      await new Promise((r) => setTimeout(r, 60));

      const stripImgData = canvas.toDataURL("image/png", 1);
      const stripWidth = canvas.width;
      const stripHeight = canvas.height;
      const aspectRatio = stripHeight / stripWidth;

      const PDF_W = 210;
      const PDF_H = 297;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const { colors, name: templateName, frame } = template;

      set({ status: "rendering", progress: 65, message: "Menggambar elemen PDF..." });

      // ─── Background ─────────────────────────────────────
      const bgHex = colors.bg;
      pdf.setFillColor(...hexToRgb(bgHex));
      pdf.rect(0, 0, PDF_W, PDF_H, "F");

      // ─── Header gradient bar ─────────────────────────────
      const accentRgb = hexToRgb(colors.accent);
      const lightRgb = hexToRgb(colors.accentLight);

      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const r = Math.round(accentRgb[0] * (1 - t) + lightRgb[0] * t);
        const g = Math.round(accentRgb[1] * (1 - t) + lightRgb[1] * t);
        const b = Math.round(accentRgb[2] * (1 - t) + lightRgb[2] * t);
        pdf.setFillColor(r, g, b);
        pdf.rect((PDF_W / 7) * i, 0, PDF_W / 7 + 1, 4, "F");
      }

      // ─── App name (header) ───────────────────────────────
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(...hexToRgb(colors.accentLight));
      pdf.text("SnapFrame", PDF_W / 2, 16, { align: "center" });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...hexToRgb(colors.accent), 0.7 as unknown as number);
      pdf.text("Premium Photobooth Experience", PDF_W / 2, 21, { align: "center" });

      // ─── Divider ─────────────────────────────────────────
      pdf.setDrawColor(...hexToRgb(colors.accent));
      pdf.setLineWidth(0.3);
      pdf.setLineDashPattern([2, 2], 0);
      pdf.line(20, 25, PDF_W - 20, 25);
      pdf.setLineDashPattern([], 0);

      // ─── Photo strip image ───────────────────────────────
      const maxStripW = PDF_W - 40;
      const stripW_mm = Math.min(maxStripW, 80);
      const stripH_mm = stripW_mm * aspectRatio;
      const stripX = (PDF_W - stripW_mm) / 2;
      const stripY = 30;

      pdf.addImage(stripImgData, "PNG", stripX, stripY, stripW_mm, stripH_mm);

      const contentBottom = stripY + stripH_mm + 8;

      // ─── Template info card ──────────────────────────────
      const cardX = 20;
      const cardW = PDF_W - 40;
      const cardH = 22;

      pdf.setFillColor(...hexToRgb(colors.bg));
      pdf.setDrawColor(...hexToRgb(colors.accent));
      pdf.setLineWidth(0.4);
      pdf.roundedRect(cardX, contentBottom, cardW, cardH, 3, 3, "FD");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...hexToRgb(colors.accentLight));
      pdf.text(templateName, cardX + 6, contentBottom + 7);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...hexToRgb(colors.accent));
      pdf.text(`${photos.length} foto · Filter: ${template.filter} · Frame: ${template.frame.style}`, cardX + 6, contentBottom + 13);

      pdf.setFontSize(7);
      pdf.setTextColor(180, 180, 200);
      pdf.text(new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), cardX + 6, contentBottom + 18.5);

      // ─── QR placeholder section ──────────────────────────
      const qrY = contentBottom + cardH + 8;
      const qrSz = 24;
      const qrX = (PDF_W - qrSz) / 2;

      pdf.setFillColor(...hexToRgb(colors.bg));
      pdf.setDrawColor(...hexToRgb(colors.accent));
      pdf.setLineWidth(0.4);
      pdf.roundedRect(qrX, qrY, qrSz, qrSz, 2, 2, "FD");

      // QR finder patterns (pojok-pojok)
      const qrInner = [
        [qrX + 2, qrY + 2],
        [qrX + qrSz - 9, qrY + 2],
        [qrX + 2, qrY + qrSz - 9],
      ] as [number, number][];
      qrInner.forEach(([x, y]) => {
        pdf.setFillColor(...hexToRgb(colors.accent));
        pdf.roundedRect(x, y, 7, 7, 1, 1, "F");
        pdf.setFillColor(...hexToRgb(colors.bg));
        pdf.roundedRect(x + 1.5, y + 1.5, 4, 4, 0.5, 0.5, "F");
        pdf.setFillColor(...hexToRgb(colors.accent));
        pdf.roundedRect(x + 2.5, y + 2.5, 2, 2, 0.3, 0.3, "F");
      });

      // QR dot grid
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (Math.random() > 0.45) {
            pdf.setFillColor(...hexToRgb(colors.accent));
            pdf.circle(qrX + 10 + col * 2, qrY + 10 + row * 2, 0.6, "F");
          }
        }
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7);
      pdf.setTextColor(...hexToRgb(colors.accent));
      pdf.text("Scan untuk lihat online", PDF_W / 2, qrY + qrSz + 5, { align: "center" });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);
      pdf.setTextColor(130, 130, 160);
      pdf.text("snapframe.app", PDF_W / 2, qrY + qrSz + 9, { align: "center" });

      // ─── Footer ──────────────────────────────────────────
      pdf.setDrawColor(...hexToRgb(colors.accent));
      pdf.setLineWidth(0.2);
      pdf.setLineDashPattern([1, 2], 0);
      pdf.line(20, PDF_H - 14, PDF_W - 20, PDF_H - 14);
      pdf.setLineDashPattern([], 0);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 100, 130);
      pdf.text("Dibuat dengan SnapFrame · snapframe.app", PDF_W / 2, PDF_H - 9, { align: "center" });
      pdf.text(`ID: ${generateId("snap")}`, PDF_W / 2, PDF_H - 5, { align: "center" });

      // ─── Corner accents ──────────────────────────────────
      const corners: [number, number, number, number][] = [
        [0, 0, 8, 8],
        [PDF_W - 8, 0, 8, 8],
        [0, PDF_H - 8, 8, 8],
        [PDF_W - 8, PDF_H - 8, 8, 8],
      ];
      corners.forEach(([x, y]) => {
        pdf.setDrawColor(...hexToRgb(colors.accent));
        pdf.setLineWidth(0.6);
        if (x === 0 && y === 0) {
          pdf.line(x, y + 5, x, y);
          pdf.line(x, y, x + 5, y);
        } else if (x > 100 && y === 0) {
          pdf.line(x + 8, y + 5, x + 8, y);
          pdf.line(x + 8, y, x + 3, y);
        } else if (x === 0) {
          pdf.line(x, y + 3, x, y + 8);
          pdf.line(x, y + 8, x + 5, y + 8);
        } else {
          pdf.line(x + 8, y + 3, x + 8, y + 8);
          pdf.line(x + 8, y + 8, x + 3, y + 8);
        }
      });

      set({ status: "saving", progress: 88, message: "Menyimpan PDF..." });
      await new Promise((r) => setTimeout(r, 60));

      pdf.save(`snapframe-${template.id}-${generateId()}.pdf`);

      set({ status: "success", progress: 100, message: "PDF berhasil disimpan!" });
      setTimeout(() => setState(INITIAL), 3500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      set({ status: "error", progress: 0, message: "Gagal membuat PDF", error: msg });
    }
  }, []);

  return { ...state, exportPdf, reset };
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
