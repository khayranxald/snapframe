"use client";
// 📍 src/app/photobooth/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CameraView } from "@/components/camera";
import { getTemplateById, DEFAULT_TEMPLATE } from "@/data/templates";

function PhotoboothContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") ?? DEFAULT_TEMPLATE.id;
  const template = getTemplateById(templateId) ?? DEFAULT_TEMPLATE;

  const handleComplete = (photos: string[]) => {
    try {
      // Kompres foto ke JPEG quality 0.82 sebelum simpan
      // PNG asli ~500KB per foto → JPEG ~80-120KB per foto
      compressPhotos(photos).then((compressed) => {
        sessionStorage.setItem("snapframe_photos", JSON.stringify(compressed));
        sessionStorage.setItem("snapframe_template", templateId);
        router.push(`/result?template=${templateId}`);
      });
    } catch {
      // Fallback: simpan langsung tanpa kompresi
      try {
        sessionStorage.setItem("snapframe_photos", JSON.stringify(photos));
        sessionStorage.setItem("snapframe_template", templateId);
      } catch {
        console.error("Storage penuh");
      }
      router.push(`/result?template=${templateId}`);
    }
  };

  const handleBack = () => {
    router.push("/template");
  };

  return <CameraView template={template} onComplete={handleComplete} onBack={handleBack} />;
}

// Kompres array foto base64 PNG → JPEG
async function compressPhotos(photos: string[]): Promise<string[]> {
  return Promise.all(photos.map(compressOne));
}

function compressOne(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");

      // Max resolusi 1280px — cukup untuk display dan print
      const MAX = 1280;
      let w = img.width;
      let h = img.height;

      if (w > MAX || h > MAX) {
        if (w > h) {
          h = Math.round((h * MAX) / w);
          w = MAX;
        } else {
          w = Math.round((w * MAX) / h);
          h = MAX;
        }
      }

      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      // JPEG quality 0.85 — balance antara kualitas dan ukuran
      const compressed = canvas.toDataURL("image/jpeg", 0.85);
      resolve(compressed);
    };
    img.onerror = () => resolve(dataUrl); // fallback ke original
    img.src = dataUrl;
  });
}

export default function PhotoboothPage() {
  return (
    <Suspense>
      <PhotoboothContent />
    </Suspense>
  );
}
