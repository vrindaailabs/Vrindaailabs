import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },

  async rewrites() {
    return [
      {
        source: "/uploads/media/:path*",
        destination:
          "http://localhost:8080/uploads/media/:path*",
      },
    ];
  },
};

export default nextConfig;