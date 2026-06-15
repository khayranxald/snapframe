// 📍 src/app/loading.tsx
// Next.js auto-tampilkan ini saat halaman sedang load

export default function Loading() {
  return (
    <div className="min-h-dvh flex items-center justify-center" style={{ background: "#080c14" }}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: "#0070f3", borderRightColor: "#0070f340" }} />
          <div className="absolute inset-[4px] rounded-full border border-transparent" style={{ borderBottomColor: "#00d4ff50", animation: "spin 1.8s linear infinite reverse" }} />
        </div>
        <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
          Memuat...
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
