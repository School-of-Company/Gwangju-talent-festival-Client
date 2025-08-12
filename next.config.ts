import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      '@tanstack/react-query',
      'framer-motion',
      'react-icons',
    ],
  },

  async headers() {
    return [
      {
        source: "/files/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment",
          },
          {
            key: "Content-Type",
            value: "application/octet-stream",
          },
        ],
      },
    ];
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        port: '',
        pathname: '/gwangju-talent-festival-bucket/**',
      },
    ],
  },

  compress: true,
};

export default nextConfig;
