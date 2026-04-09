import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Dev-only overlay (“Static” / ISR status). Not shown in production builds.
  devIndicators: { appIsrStatus: false },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: [
    "three",
    "three-stdlib",
    "@react-three/fiber",
    "@react-three/drei",
  ],
}

export default nextConfig
