/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/',
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/',
}

module.exports = nextConfig
