/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  async redirects() {
    return [{ source: '/cases/premium-grey-zone', destination: '/cases', permanent: true }]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
