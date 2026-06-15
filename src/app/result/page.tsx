"use client";
// 📍 src/app/result/page.tsx

import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FloatingBlobs } from "@/components/layout";
import { PhotoStripFrame } from "@/components/result/photo-strip-frame";
import { ResultGallery } from "@/components/result/result-gallery";
import { ResultBottomSheet } from "@/components/result/result-bottom-sheet";
import { ExportModal } from "@/components/export/export-modal";
import { ExportButton } from "@/components/export/export-button";
import { PdfProgressModal } from "@/components/pdf/pdf-progress-modal";
import { PdfPreviewModal } from "@/components/pdf/pdf-preview-modal";
import { useExport } from "@/hooks/useExport";
import { usePdfExport } from "@/hooks/usePdfExport";
import { getTemplateById, DEFAULT_TEMPLATE } from "@/data/templates";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const frameRef = useRef<HTMLDivElement>(null);
  const exporter = useExport();
  const pdfExporter = usePdfExport();

  const [tab, setTab] = useState<"strip" | "gallery">("strip");
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const templateId = searchParams.get("template") ?? DEFAULT_TEMPLATE.id;
  const template = getTemplateById(templateId) ?? DEFAULT_TEMPLATE;

  // Baca foto dari sessionStorage saat halaman mount
  // useEffect hanya jalan di browser (bukan server)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("snapframe_photos");
      if (stored) {
        const parsed = JSON.parse(stored);
        setPhotos(parsed);
      }
    } catch {
      console.error("Gagal membaca sessionStorage");
    }
    setIsLoaded(true);
  }, []);

  const handleExportPng = async (quality: "standard" | "high" | "ultra") => {
    if (!frameRef.current) return;
    await exporter.exportPng(frameRef.current, template, quality);
  };

  const handleExportPdf = async () => {
    if (!frameRef.current) return;
    setPdfPreviewOpen(false);
    await pdfExporter.exportPdf(frameRef.current, photos, template);
  };

  const handleRetake = () => {
    sessionStorage.removeItem("snapframe_photos");
    router.push(`/photobooth?template=${templateId}`);
  };

  const handleChangeTemplate = () => {
    sessionStorage.removeItem("snapframe_photos");
    router.push("/template");
  };

  const isPngLoading = exporter.status !== "idle" && exporter.status !== "success" && exporter.status !== "error";
  const isPdfLoading = pdfExporter.status !== "idle" && pdfExporter.status !== "success" && pdfExporter.status !== "error";

  // Loading state saat baca sessionStorage
  if (!isLoaded) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: "#070b18" }}>
        <motion.div className="w-8 h-8 rounded-full border-2 border-transparent" style={{ borderTopColor: template.colors.accent }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      </div>
    );
  }

  // Tidak ada foto — redirect ke photobooth
  if (photos.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6" style={{ background: "#070b18" }}>
        <p className="text-white/50 text-[14px]">Tidak ada foto ditemukan.</p>
        <button className="text-[13px] font-medium px-4 py-2 rounded-[10px]" style={{ background: template.colors.accent, color: "white" }} onClick={() => router.push(`/photobooth?template=${templateId}`)}>
          Ambil Foto Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-hidden flex flex-col" style={{ background: "#070b18" }}>
      <FloatingBlobs />

      <div className="fixed inset-0 pointer-events-none -z-[4]" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${template.colors.accent}12, transparent 60%)` }} />

      <ExportModal status={exporter.status} progress={exporter.progress} message={exporter.message} error={exporter.error} color={template.colors.accent} onClose={exporter.reset} />

      <PdfProgressModal status={pdfExporter.status} progress={pdfExporter.progress} message={pdfExporter.message} error={pdfExporter.error} color={template.colors.accent} onClose={pdfExporter.reset} />

      <PdfPreviewModal isOpen={pdfPreviewOpen} photos={photos} template={template} onClose={() => setPdfPreviewOpen(false)} onExport={handleExportPdf} isLoading={isPdfLoading} />

      <div className="flex-1 overflow-y-auto pb-[320px]">
        <div className="relative z-10 pt-12 px-5 sm:px-8">
          <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
            <motion.div className="text-center w-full" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                Hasil Foto
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ letterSpacing: "-0.03em" }}>
                {photos.length} Foto Berhasil! 🎉
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {(["strip", "gallery"] as const).map((t) => (
                <motion.button
                  key={t}
                  className="px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                  style={{
                    background: tab === t ? template.colors.accent : "transparent",
                    color: tab === t ? "white" : "rgba(255,255,255,0.45)",
                    boxShadow: tab === t ? `0 0 12px ${template.colors.cardGlow}` : "none",
                  }}
                  onClick={() => setTab(t)}
                  whileTap={{ scale: 0.96 }}
                >
                  {t === "strip" ? "📸 Strip" : "🖼 Galeri"}
                </motion.button>
              ))}
            </motion.div>

            {tab === "strip" && (
              <motion.div key="strip" className="flex justify-center w-full" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <PhotoStripFrame ref={frameRef} photos={photos} template={template} scale={1} />
                </motion.div>
              </motion.div>
            )}

            {tab === "gallery" && (
              <motion.div key="gallery" className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <ResultGallery photos={photos} template={template} />
              </motion.div>
            )}

            <motion.div className="w-full" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <ExportButton template={template} onExport={handleExportPng} isLoading={isPngLoading} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30">
        <ResultBottomSheet
          template={template}
          onDownloadPng={() => handleExportPng("high")}
          onDownloadPdf={() => setPdfPreviewOpen(true)}
          onRetake={handleRetake}
          onChangeTemplate={handleChangeTemplate}
          isDownloading={isPngLoading || isPdfLoading}
        />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
