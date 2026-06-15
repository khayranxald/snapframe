"use client";
/**
 * useCamera — Hook Logika Kamera
 * 📍 src/hooks/useCamera.ts
 *
 * ═══════════════════════════════════════════════════════
 * KENAPA LOGIKA KAMERA DI HOOK TERPISAH?
 * ═══════════════════════════════════════════════════════
 *
 * Komponen kamera akan rumit: ada state permission,
 * loading, error, mirroring, switch kamera, dll.
 *
 * Kalau semua di dalam komponen → komponen jadi 300+ baris
 * dan susah dibaca/di-maintain.
 *
 * Dengan hook terpisah:
 * → Komponen hanya fokus ke UI
 * → Hook fokus ke logika kamera
 * → Bisa di-reuse di komponen lain
 *
 * ═══════════════════════════════════════════════════════
 * CARA KERJA PERMISSION KAMERA:
 * ═══════════════════════════════════════════════════════
 *
 * Browser modern punya Permissions API:
 *
 * navigator.permissions.query({ name: "camera" })
 * → "granted"  : user sudah izinkan sebelumnya
 * → "denied"   : user sudah tolak sebelumnya
 * → "prompt"   : belum pernah ditanya, akan muncul popup
 *
 * Kita juga bisa langsung request:
 * navigator.mediaDevices.getUserMedia({ video: true })
 * → Kalau granted → stream langsung diterima
 * → Kalau denied  → throw error dengan name "NotAllowedError"
 *
 * ═══════════════════════════════════════════════════════
 * REACT-WEBCAM CONSTRAINTS:
 * ═══════════════════════════════════════════════════════
 *
 * Kita bisa atur kualitas kamera via "constraints":
 * {
 *   video: {
 *     facingMode: "user"       → kamera depan
 *     facingMode: "environment" → kamera belakang
 *     width:  { ideal: 1920 }  → resolusi ideal
 *     height: { ideal: 1080 }
 *   }
 * }
 *
 * "ideal" artinya: pakai kalau tersedia, kalau tidak pakai yang ada.
 * Tidak error kalau tidak tercapai.
 */

import { useState, useCallback, useRef } from "react";
import type { RefObject } from "react";
import Webcam from "react-webcam";

/* ── Status kamera ──────────────────────────────────── */
export type CameraStatus =
  | "idle" // Belum dimulai
  | "requesting" // Sedang minta izin
  | "active" // Kamera aktif, stream jalan
  | "denied" // User menolak izin
  | "error" // Error lain (kamera tidak ada, dll)
  | "loading"; // Kamera ada, stream sedang load

/* ── Facing mode ────────────────────────────────────── */
export type FacingMode = "user" | "environment";

/* ── Return type hook ───────────────────────────────── */
export interface UseCameraReturn {
  /* State */
  status: CameraStatus;
  facingMode: FacingMode;
  isMirrored: boolean;
  errorMessage: string | null;
  isReady: boolean; // true saat stream aktif dan siap capture

  /* Ref — harus diteruskan ke komponen <Webcam> */
  webcamRef: RefObject<Webcam | null>;

  /* Actions */
  requestCamera: () => void;
  stopCamera: () => void;
  switchCamera: () => void;
  toggleMirror: () => void;
  capturePhoto: () => string | null;
  handleUserMedia: () => void; // Callback saat stream berhasil
  handleError: (err: string | DOMException) => void; // Callback error
}

export function useCamera(): UseCameraReturn {
  const webcamRef = useRef<Webcam>(null);

  const [status, setStatus] = useState<CameraStatus>("idle");
  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [isMirrored, setIsMirrored] = useState(true); // Default mirror untuk kamera depan
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ── requestCamera ──────────────────────────────────
     Dipanggil saat user klik "Izinkan Kamera".
     Set status ke "requesting" → komponen tampilkan loading.
     Sebenarnya permission di-handle oleh react-webcam
     via onUserMedia dan onUserMediaError callbacks.
  ────────────────────────────────────────────────────── */
  const requestCamera = useCallback(() => {
    setStatus("requesting");
    setErrorMessage(null);
  }, []);

  /* ── stopCamera ─────────────────────────────────────
     Hentikan semua track di stream.
     PENTING: Kalau tidak dihentikan, lampu kamera tetap
     menyala meski halaman sudah ditinggalkan!
  ────────────────────────────────────────────────────── */
  const stopCamera = useCallback(() => {
    /* Akses stream via ref webcam */
    const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
    if (stream) {
      /* getTracks() → ambil semua track (video, audio)
         stop() → hentikan track tersebut */
      stream.getTracks().forEach((track) => track.stop());
    }
    setStatus("idle");
  }, []);

  /* ── switchCamera ───────────────────────────────────
     Toggle antara kamera depan (user) dan belakang (environment).
     Saat switch: mirror otomatis menyesuaikan.
     Kamera depan → mirror ON (seperti selfie)
     Kamera belakang → mirror OFF (seperti foto biasa)
  ────────────────────────────────────────────────────── */
  const switchCamera = useCallback(() => {
    setFacingMode((prev) => {
      const next = prev === "user" ? "environment" : "user";
      setIsMirrored(next === "user"); // Mirror hanya untuk kamera depan
      return next;
    });
  }, []);

  /* ── toggleMirror ───────────────────────────────────
     User bisa manual toggle mirror jika mau.
  ────────────────────────────────────────────────────── */
  const toggleMirror = useCallback(() => {
    setIsMirrored((prev) => !prev);
  }, []);

  /* ── capturePhoto ───────────────────────────────────
     Ambil screenshot dari video stream saat ini.
     
     react-webcam punya method getScreenshot() yang:
     1. Ambil frame saat ini dari <video>
     2. Gambar ke <canvas> internal
     3. Return sebagai data URL (base64 string)
     
     Data URL format: "data:image/jpeg;base64,/9j/4AAQ..."
     Bisa langsung dipakai di <img src={dataUrl} />
     
     screenshotFormat: "image/png" untuk kualitas lebih baik
     (jpeg lebih kecil tapi ada kompresi lossy)
  ────────────────────────────────────────────────────── */
  const capturePhoto = useCallback((): string | null => {
    if (!webcamRef.current) return null;

    const imageSrc = webcamRef.current.getScreenshot({
      width: 1280,
      height: 960,
    });

    return imageSrc;
  }, []);

  /* ── handleUserMedia ────────────────────────────────
     Callback dari react-webcam saat stream berhasil.
     Dipanggil otomatis setelah user grant permission.
  ────────────────────────────────────────────────────── */
  const handleUserMedia = useCallback(() => {
    setStatus("active");
    setErrorMessage(null);
  }, []);

  /* ── handleError ────────────────────────────────────
     Callback dari react-webcam saat ada error.
     
     Error yang mungkin terjadi:
     - NotAllowedError   → user menolak izin
     - NotFoundError     → tidak ada kamera
     - NotReadableError  → kamera sedang dipakai app lain
     - OverconstrainedError → constraint tidak bisa dipenuhi
  ────────────────────────────────────────────────────── */
  const handleError = useCallback((err: string | DOMException) => {
    const errorName = typeof err === "string" ? err : err.name;
    const errorMsg = typeof err === "string" ? err : err.message;

    if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
      setStatus("denied");
      setErrorMessage("Izin kamera ditolak. Aktifkan di pengaturan browser.");
    } else if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") {
      setStatus("error");
      setErrorMessage("Kamera tidak ditemukan di perangkat ini.");
    } else if (errorName === "NotReadableError" || errorName === "TrackStartError") {
      setStatus("error");
      setErrorMessage("Kamera sedang digunakan oleh aplikasi lain.");
    } else {
      setStatus("error");
      setErrorMessage(errorMsg || "Terjadi kesalahan pada kamera.");
    }
  }, []);

  return {
    status,
    facingMode,
    isMirrored,
    errorMessage,
    isReady: status === "active",
    webcamRef,
    requestCamera,
    stopCamera,
    switchCamera,
    toggleMirror,
    capturePhoto,
    handleUserMedia,
    handleError,
  };
}
