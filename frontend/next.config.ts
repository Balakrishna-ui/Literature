import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
};

export default nextConfig;
