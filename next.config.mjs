/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
  redirects: async () => {
    return [];
  },
  env: {
    PRIVATE_AWS_ACCESS_KEY_ID: process.env.PRIVATE_AWS_ACCESS_KEY_ID,
    PRIVATE_AWS_SECRET_ACCESS_KEY: process.env.PRIVATE_AWS_SECRET_ACCESS_KEY,
    PRIVATE_AWS_REGION: process.env.PRIVATE_AWS_REGION,
  },
};

export default nextConfig;
