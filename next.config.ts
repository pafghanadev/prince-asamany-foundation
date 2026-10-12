import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // 75 = default for most <Image>, 82 = standard, 88 = hero background slides, 90 = high-detail cards.
    qualities: [75, 82, 88, 90],
  },
};

export default nextConfig;
