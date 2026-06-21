'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const bannerImages = [
  '/images/baner1.jpeg',
  '/images/baner2.jpeg',
  '/images/baner3.jpeg',
  '/images/baner4.jpeg',
  '/images/baner5.jpeg',
  '/images/baner6.jpeg',
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col justify-end items-center text-center py-12 md:py-16 pb-20 md:pb-24 min-h-[350px] md:min-h-[600px] w-full bg-[#fcfaf5]">
      {/* Background Images Carousel */}
      {bannerImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="bg-[#eab308] text-[#a82b2b] font-bold py-2.5 px-6 rounded text-sm hover:bg-[#facc15] transition-colors flex items-center gap-2">
            Explore His Life <span>→</span>
          </Link>
          <Link href="/books" className="border border-white/30 text-white font-bold py-2.5 px-6 rounded text-sm hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            View Works
          </Link>
        </div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentImageIndex 
                ? 'w-8 h-1.5 bg-[#eab308]' 
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
