// 📍 next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan StrictMode untuk mencegah double-invoke di development
  // StrictMode menyebabkan useEffect dan beberapa callback dipanggil 2x
  // Ini yang bikin foto selalu double di semua template
  reactStrictMode: false,

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
