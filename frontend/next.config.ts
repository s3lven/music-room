import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_URL: "https://music-room-0fu1.onrender.com/api/v1",
    WS_URL: "https://music-room-0fu1.onrender.com"
  }
};

export default nextConfig;
