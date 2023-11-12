/** @type {import('next').NextConfig} */




const securityHeaders = 
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }

  //클릭재킹 방지
  const xFrameOption =
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  }

  //mine 타입 일치 설정
  const xContentTypeOption =
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  }

  //웹 api 제한 () 공백이면 해당 api는 모두 제한
  const permissionsPolicy=
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  }


// Before defining your Security Headers
// add Content Security Policy directives using a template string.
 
const ContentSecurityPolicy = `
  script-src 'self';
  style-src 'self'
`;

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    AES_256_KEY: process.env.AES_256_KEY,
    AES_256_IV: process.env.AES_256_IV,
  },


  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          securityHeaders,
          xFrameOption,
          xContentTypeOption,
          permissionsPolicy
          // {
          //   key: 'Content-Security-Policy',
          //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          // }
        ]
      },
    ]
  },
}

module.exports = nextConfig