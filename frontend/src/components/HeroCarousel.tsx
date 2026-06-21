'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  { id: 1, image: '/images/baner1.jpeg', label: 'Banner 1' },
  { id: 2, image: '/images/baner2.jpeg', label: 'Banner 2' },
  { id: 3, image: '/images/baner3.jpeg', label: 'Banner 3' },
  { id: 4, image: '/images/baner4.jpeg', label: 'Banner 4' },
  { id: 5, image: '/images/baner5.jpeg', label: 'Banner 5' },
  { id: 6, image: '/images/baner6.jpeg', label: 'Banner 6' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    // 5 second interval
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-gray-900" id="home" aria-label="Introduction">
      {/* Track */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${(index - current) * 100}%)`,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Explore Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <Link href="/#inspired-by" className="pointer-events-auto flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors mt-auto mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase">Explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Link>
      </div>

      {/* Controls */}
      <button
        type="button"
        className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors z-20"
        aria-label="Previous slide"
        onClick={prev}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors z-20"
        aria-label="Next slide"
        onClick={next}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-[#eab308] w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
