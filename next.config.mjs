/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jovlvpvjcgaqfqbqycmd.supabase.co",
      },
    ],
  },
};

export default nextConfig;