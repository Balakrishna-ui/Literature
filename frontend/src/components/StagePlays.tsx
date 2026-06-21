'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function StagePlays() {
  const plays = [
    {
      year: '1972',
      title: 'Raktakshi',
      desc: 'A powerful drama about salt-pan workers, performed at the National School of Drama. It broke new ground in Indian theater with its unflinching portrayal of labor exploitation.',
      venue: 'National School of Drama, New Delhi',
      image: ''
    },
    {
      year: '1976',
      title: 'Matti Manishi',
      desc: 'A tragicomedy set in a drought-stricken village, exploring the resilience and humor of rural communities facing environmental catastrophe.',
      venue: 'Ravindra Bharathi, Hyderabad',
      image: ''
    },
    {
      year: '1980',
      title: 'Kanyasulkam',
      desc: 'A satirical play tackling the practice of bride price in rural Andhra, blending sharp social commentary with folk humor and vibrant characters.',
      venue: 'Kalabhavan, Vijayawada',
      image: ''
    },
    {
      year: '1985',
      title: 'Sita Agnipariksha',
      desc: 'A reimagining of the Ramayana from Sita\'s perspective, challenging patriarchal narratives and exploring themes of justice and feminine strength.',
      venue: 'Tagore Theatre, Chandigarh',
      image: ''
    },
    {
      year: '1990',
      title: 'Naa Desam',
      desc: 'An epic play celebrating the spirit of Telugu-speaking people through independence, exploring identity, sacrifice, and the dream of self-governance.',
      venue: 'Ravindra Bharathi, Hyderabad',
      image: ''
    }
  ];

  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(3);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, plays.length - cardsToShow);

  // Ensure currentIndex is valid if window is resized
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="bg-white py-10 md:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Stage Plays (Natakalu)
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Dramatic works that brought powerful social narratives to the stage.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#a82b2b] transition-colors"
            aria-label="Previous plays"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#a82b2b] transition-colors"
            aria-label="Next plays"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mb-8 px-2 py-2">
            <div 
              className="flex transition-transform duration-700 ease-in-out w-full"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {plays.map((play, index) => (
                <div key={index} className="w-full min-w-full md:min-w-[calc(33.333333%-16px)] md:w-[calc(33.333333%-16px)] mx-2 border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-shrink-0 group">
                  {/* Image Placeholder */}
                  <div className="h-40 bg-[#1c2331] relative overflow-hidden">
                    {play.image ? (
                      <img src={play.image} alt={play.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-[#1c2331] flex items-center justify-center text-gray-500 text-sm transition-transform duration-500 group-hover:scale-105">
                        Play Image
                      </div>
                    )}
                  </div>
                  {/* Card Content */}
                  <div className="border-l-4 border-[#eab308] pl-6 pr-4 py-4 flex-grow bg-white">
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-6 h-6 border border-[#eab308] bg-[#fcfaf5] text-[#eab308] flex items-center justify-center rounded-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </span>
                      {play.year}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{play.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                      {play.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {play.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-1.5 bg-[#eab308]'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/books" className="inline-flex items-center gap-2 bg-[#a82b2b] text-white font-bold py-2.5 px-8 rounded text-sm hover:bg-[#8b2424] transition-colors shadow-sm">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
