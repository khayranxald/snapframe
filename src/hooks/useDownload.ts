"use client";
// 📍 src/hooks/useDownload.ts

import { useState, useCallback, useRef } from "react";
import { type PhotoboothTemplate } from "@/data/templates";
import { downloadFile, generateId } from "@/lib/utils";

interface UseDownloadReturn {
  isDownloading: boolean;
  downloadPng: (el: HTMLElement, template: PhotoboothTemplate) => Promise<void>;
  downloadPdf: (el: HTMLElement, template: PhotoboothTemplate) => Promise<void>;
}

export function useDownload(): UseDownloadReturn {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPng = useCallback(async (el: HTMLElement, template: PhotoboothTemplate) => {
    setIsDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: template.colors.bg,
        logging: false,
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          downloadFile(url, `snapframe-${template.id}-${generateId()}.png`);
        },
        "image/png",
        1,
      );
    } catch (e) {
      console.error("Download PNG failed:", e);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const downloadPdf = useCallback(async (el: HTMLElement, template: PhotoboothTemplate) => {
    setIsDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: template.colors.bg, logging: false });
      const imgData = canvas.toDataURL("image/png", 1);
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width / 2, canvas.height / 2] });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`snapframe-${template.id}-${generateId()}.pdf`);
    } catch (e) {
      console.error("Download PDF failed:", e);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { isDownloading, downloadPng, downloadPdf };
}
