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
    <section className="relative flex flex-col justify-start md:justify-end items-center text-center pb-10 md:pb-24 min-h-0 md:min-h-[600px] w-full bg-[#fcfaf5]">
      {/* Background Images Carousel */}
      <div className="relative w-full h-[280px] md:absolute md:inset-0 md:h-full flex flex-col justify-end items-center pb-4 md:pb-0 z-0">
        {bannerImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
            style={{
              backgroundImage: `url(${src})`,
            }}
          />
        ))}

        {/* Mobile Buttons (Side by Side Inside the image banner) */}
        <div className="relative z-10 flex flex-row md:hidden gap-2 justify-center items-center w-full px-2">
          <Link href="/about" className="bg-[#f59e0b] text-[#7f1d1d] font-bold py-2.5 px-4 rounded text-xs hover:bg-[#d97706] transition-colors flex items-center gap-1 shadow-md whitespace-nowrap">
            Explore His Life <span>→</span>
          </Link>
          <Link href="/books" className="bg-white/20 border-2 border-white text-white font-bold py-2.5 px-4 rounded text-xs hover:bg-white/40 transition-colors flex items-center gap-1 backdrop-blur-md shadow-sm whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            View Works
          </Link>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex max-w-4xl mx-auto px-6 relative z-10 flex-row gap-4 justify-center items-center w-full">
        <Link href="/about" className="bg-[#eab308] text-[#a82b2b] font-bold py-3 px-8 rounded text-sm hover:bg-[#facc15] transition-colors flex items-center gap-2 shadow-md">
          Explore His Life <span>→</span>
        </Link>
        <Link href="/books" className="border border-white/30 text-white font-bold py-3 px-8 rounded text-sm hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
          View Works
        </Link>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentImageIndex 
                ? 'w-8 h-1.5 bg-[#eab308]' 
                : 'w-1.5 h-1.5 bg-gray-300 md:bg-white/40 hover:bg-gray-400 md:hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
