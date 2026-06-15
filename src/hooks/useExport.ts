"use client";
// 📍 src/hooks/useExport.ts

import { useState, useCallback } from "react";
import { type PhotoboothTemplate } from "@/data/templates";
import { generateId } from "@/lib/utils";

export type ExportStatus = "idle" | "preparing" | "rendering" | "processing" | "saving" | "success" | "error";

export interface ExportState {
  status: ExportStatus;
  progress: number;
  message: string;
  error: string | null;
}

const INITIAL_STATE: ExportState = {
  status: "idle",
  progress: 0,
  message: "",
  error: null,
};

export function useExport() {
  const [state, setState] = useState<ExportState>(INITIAL_STATE);

  const set = (partial: Partial<ExportState>) => setState((prev) => ({ ...prev, ...partial }));

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  const exportPng = useCallback(async (element: HTMLElement, template: PhotoboothTemplate, quality: "standard" | "high" | "ultra" = "high") => {
    set({ status: "preparing", progress: 5, message: "Mempersiapkan ekspor...", error: null });

    try {
      const html2canvas = (await import("html2canvas")).default;

      set({ status: "rendering", progress: 25, message: "Merender elemen..." });

      const scaleMap = { standard: 2, high: 3, ultra: 4 };
      const scale = scaleMap[quality];

      await new Promise((r) => setTimeout(r, 80));
      set({ progress: 40, message: "Menggambar ke canvas..." });

      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: template.colors.bg,
        logging: false,
        imageTimeout: 8000,
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.body.querySelector("[data-export-frame]") as HTMLElement;
          if (clonedEl) {
            clonedEl.style.boxShadow = "none";
            clonedEl.style.transform = "none";
          }
        },
      });

      set({ status: "processing", progress: 70, message: "Memproses gambar..." });
      await new Promise((r) => setTimeout(r, 60));

      set({ progress: 85, message: "Mengoptimasi PNG..." });

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Gagal membuat blob"));
              return;
            }

            set({ status: "saving", progress: 92, message: "Menyimpan file..." });

            const url = URL.createObjectURL(blob);
            const filename = `snapframe-${template.id}-${generateId()}.png`;
            const link = document.createElement("a");

            link.href = url;
            link.download = filename;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => URL.revokeObjectURL(url), 1000);
            resolve();
          },
          "image/png",
          1,
        );
      });

      set({ status: "success", progress: 100, message: "Berhasil disimpan!" });
      setTimeout(() => setState(INITIAL_STATE), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      set({ status: "error", progress: 0, message: "Ekspor gagal", error: msg });
    }
  }, []);

  return { ...state, exportPng, reset };
}
