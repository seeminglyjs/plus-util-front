/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
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
}

module.exports = nextConfig