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
    <section className="relative w-full bg-[#111111]">
      <div className="relative w-full h-[400px] md:h-[600px]">
        {bannerImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-[center_10%] transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          />
        ))}

        {/* Desktop & Mobile Buttons Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-16 z-10">
          <div className="flex flex-row gap-2 md:gap-4 justify-center items-center w-full px-4">
            <Link href="/about" className="bg-[#f59e0b] md:bg-[#eab308] text-[#7f1d1d] md:text-[#a82b2b] font-bold py-2.5 md:py-3 px-4 md:px-8 rounded text-xs md:text-sm hover:bg-[#d97706] md:hover:bg-[#facc15] transition-colors flex items-center gap-1 md:gap-2 shadow-md whitespace-nowrap">
              Explore His Life <span>→</span>
            </Link>
            <Link href="/books" className="bg-white/20 md:bg-transparent border-2 md:border border-white/80 md:border-white/30 text-white font-bold py-2.5 md:py-3 px-4 md:px-8 rounded text-xs md:text-sm hover:bg-white/40 md:hover:bg-white/10 transition-colors flex items-center gap-1 md:gap-2 backdrop-blur-md md:backdrop-blur-sm shadow-sm whitespace-nowrap">
              <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              View Works
            </Link>
          </div>
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
                  : 'w-1.5 h-1.5 bg-gray-300/80 md:bg-white/40 hover:bg-gray-400 md:hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
