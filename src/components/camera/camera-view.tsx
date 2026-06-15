"use client";
// 📍 src/components/camera/camera-view.tsx

import { useEffect } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import { useCaptureSequence, CaptureOverlay } from "./capture-sequence";
import { CameraPermission } from "./camera-permission";
import { CameraLoading } from "./camera-loading";
import { CameraControls } from "./camera-controls";
import { type PhotoboothTemplate } from "@/data/templates";

interface CameraViewProps {
  template: PhotoboothTemplate;
  onComplete: (photos: string[]) => void;
  onBack: () => void;
}

export function CameraView({ template, onComplete, onBack }: CameraViewProps) {
  const camera = useCamera();

  const capture = useCaptureSequence({
    template,
    onCapture: camera.capturePhoto,
    onComplete,
  });

  const videoConstraints = {
    facingMode: camera.facingMode,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    aspectRatio: { ideal: 16 / 9 },
  };

  useEffect(() => {
    return () => {
      camera.stopCamera();
      capture.reset();
    };
  }, []); // eslint-disable-line

  return (
    <div className="relative flex flex-col min-h-dvh overflow-hidden bg-black">
      {/* Top bar */}
      <AnimatePresence>
        {camera.isReady && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4"
            style={{ paddingTop: "max(env(safe-area-inset-top), 14px)", paddingBottom: "14px", background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }} onClick={onBack} whileTap={{ scale: 0.9 }}>
              <ArrowLeft className="w-4 h-4 text-white" />
            </motion.button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
              <Zap className="w-3 h-3" style={{ color: template.colors.accentLight }} />
              <span className="text-[12px] font-semibold text-white">{template.name}</span>
            </div>

            {/* Recording dot */}
            <div className="w-9 h-9 flex items-center justify-center">
              <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ boxShadow: "0 0 6px rgba(255,0,0,0.8)" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera area */}
      <div className="flex-1 flex flex-col">
        {(camera.status === "idle" || camera.status === "denied" || camera.status === "error") && (
          <div className="flex-1 flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg,#080c14,#0d1220)" }}>
            <CameraPermission status={camera.status} onRequest={camera.requestCamera} errorMessage={camera.errorMessage} />
          </div>
        )}

        {(camera.status === "requesting" || camera.status === "loading") && (
          <div className="flex-1 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#080c14,#0d1220)" }}>
            <CameraLoading />
          </div>
        )}

        <div className="relative flex-1" style={{ display: camera.status === "idle" || camera.status === "denied" || camera.status === "error" ? "none" : "flex", flexDirection: "column" }}>
          <Webcam
            ref={camera.webcamRef}
            className="absolute inset-0 w-full h-full object-cover"
            mirrored={camera.isMirrored}
            videoConstraints={videoConstraints}
            onUserMedia={camera.handleUserMedia}
            onUserMediaError={camera.handleError}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.92}
            audio={false}
            forceScreenshotSourceSize
          />

          {/* Capture overlays */}
          <CaptureOverlay
            countdownCount={capture.countdownCount}
            countdownIsRunning={capture.countdownIsRunning}
            showFlash={capture.showFlash}
            photos={capture.photos}
            totalPhotos={template.photoCount}
            template={template}
            isCapturing={capture.isCapturing}
            isSequence={capture.isSequence}
          />

          {/* Template frame border */}
          {camera.isReady && <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: `inset 0 0 0 2px ${template.colors.accent}35` }} />}

          {/* Captured thumbnails bottom left */}
          {capture.photos.length > 0 && !capture.isSequence && camera.isReady && (
            <div className="absolute bottom-28 left-4 z-20 flex gap-1.5">
              {capture.photos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-[6px] overflow-hidden border"
                  style={{ borderColor: template.colors.accent + "60" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <AnimatePresence>
        {camera.isReady && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 px-6"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 28px)", paddingTop: "28px", background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            <CameraControls
              onCapture={capture.runSequence}
              onSwitch={camera.switchCamera}
              onMirror={camera.toggleMirror}
              isMirrored={camera.isMirrored}
              isCountdown={capture.isSequence}
              canSwitch={true}
              photoCount={capture.photos.length}
              totalPhotos={template.photoCount}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
