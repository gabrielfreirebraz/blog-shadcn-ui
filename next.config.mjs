/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: 'https',
        hostname: 'hcinvestimentos.com',
      },
      {
        protocol: "https",
        hostname: "lh7-rt.googleusercontent.com", 
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // if there are others images from Google
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com", // extra security
      },
    ],
  },
  redirects: async () => {
    return [];
  },
  // remove cache from cloudflare for user session
  async headers() {
    return [
      {
        source: '/api/auth/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // force reload aws vars to build on production
  env: {
    PRIVATE_AWS_ACCESS_KEY_ID: process.env.PRIVATE_AWS_ACCESS_KEY_ID,
    PRIVATE_AWS_SECRET_ACCESS_KEY: process.env.PRIVATE_AWS_SECRET_ACCESS_KEY,
    PRIVATE_AWS_REGION: process.env.PRIVATE_AWS_REGION,
    PRIVATE_GOOGLE_CLIENT_ID: process.env.PRIVATE_GOOGLE_CLIENT_ID,
    PRIVATE_GOOGLE_CLIENT_SECRET: process.env.PRIVATE_GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
