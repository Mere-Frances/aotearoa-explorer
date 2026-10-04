import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // hide nextjs badge
  devIndicators: false,

  // allow image load and resize
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
