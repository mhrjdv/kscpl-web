/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  // If you are NOT using "output: export" (i.e. a pure static export),
  // you can let Next.js optimize images from your S3 bucket by setting
  // unoptimized to false (or just remove it) and defining a remote pattern:
  images: {
    unoptimized: false, // Let Next optimize images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fstech-kscpl-cms.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ['fstech-kscpl-cms.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
