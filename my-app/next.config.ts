import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.100"], // Match your dev port (e.g., 3000)
};

export default nextConfig;
