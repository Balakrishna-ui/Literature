import type { NextConfig } from 'next';

const nextConfig: any = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/books.html', destination: '/books', permanent: true },
      { source: '/award-sahitya.html', destination: '/awards/sahitya', permanent: true },
      { source: '/award-booker.html', destination: '/awards/booker', permanent: true },
      { source: '/award-jnanpith.html', destination: '/awards/jnanpith', permanent: true },
      { source: '/award-padma.html', destination: '/awards/padma', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
