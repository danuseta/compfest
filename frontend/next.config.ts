import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.eatingbirdfood.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sailorbailey.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'foodbyjonister.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.wearesovegan.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'thewholecook.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'plumcreekwagyubeef.com',
        port: '',
        pathname: '/cdn/shop/articles/**',
      },
      {
        protocol: 'https',
        hostname: 'www.seriouseats.com',
        port: '',
        pathname: '/thmb/**',
      },
      {
        protocol: 'https',
        hostname: 'therecipecritic.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      }
    ],
  },
};

export default nextConfig;
