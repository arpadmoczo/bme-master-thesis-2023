/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    
    return config;
  },

  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    NEXT_APP_ALCHEMY_KEY_GOERLI: process.env.NEXT_APP_ALCHEMY_KEY_GOERLI,
    NEXT_APP_PINATA_KEY: process.env.NEXT_APP_PINATA_KEY,
    NEXT_APP_PINATA_SECRET: process.env.NEXT_APP_PINATA_SECRET,
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};