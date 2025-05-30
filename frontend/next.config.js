/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Use a custom port for the Next.js development server
  // to avoid conflicts with the Flask backend
  devServer: {
    port: 3001,
  },
};

module.exports = nextConfig;