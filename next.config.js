/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix: process.env.NEXT_PUBLIC_IS_STATIC ? './' : '/',
}

module.exports = nextConfig
