'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BOOKS, Book } from '@/lib/books';

const BookCarousel = ({ book }: { book: Book }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = book.images || (book.image ? [book.image] : []);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const timer = setInterval(() => {
        nextSlide();
      }, 4500);
      return () => clearInterval(timer);
    }
  }, [isHovered, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      className="aspect-[4/5] bg-white border-b border-gray-50 relative p-1.5 md:p-2 group/carousel overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {book.isFeatured && (
        <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 bg-[#a82b2b] text-white text-[8px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 z-20 flex items-center gap-1 shadow-sm pointer-events-none">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Featured
        </div>
      )}
      
      <div className="relative w-full h-full drop-shadow-md overflow-hidden bg-white">
        {images.length > 0 ? (
          <>
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img: string, i: number) => (
                <div key={i} className="min-w-full h-full shrink-0 flex items-center justify-center p-1">
                  <img 
                    src={img} 
                    alt={`${book.title} - Image ${i + 1}`} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover/carousel:scale-[1.02]" 
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.preventDefault(); prevSlide(); }}
                  className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex items-center justify-center z-10"
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); nextSlide(); }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex items-center justify-center z-10"
                  aria-label="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10 bg-black/20 px-1.5 py-1 rounded-full backdrop-blur-sm">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); setCurrentIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
            Cover Image
          </div>
        )}
      </div>
    </div>
  );
};

const BookCard = ({ book }: { book: Book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="bg-white shadow-lg flex flex-col group overflow-hidden rounded-sm h-full">
        <BookCarousel book={book} />
        
        <div className="p-3 flex flex-col flex-grow min-h-[180px]">
          <span className="text-[#eab308] font-bold text-[8px] md:text-[9px] tracking-wider uppercase mb-1.5 bg-[#fcfaf5] inline-block px-1.5 py-0.5 self-start border border-[#eab308]/20">
            {book.category}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-0.5 leading-tight">{book.title}</h3>
          {book.subtitle && <h4 className="font-serif italic text-gray-500 text-xs md:text-sm mb-1.5">{book.subtitle}</h4>}
          
          <p className="text-gray-600 text-xs leading-snug line-clamp-3 mb-1.5" title={book.desc}>
            {book.shortDesc}
          </p>
        
        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {book.year}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              {book.pages}p
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <Link href="https://wa.me/917207264240" target="_blank" className="flex-1 bg-[#a82b2b] hover:bg-[#8a2323] text-white py-1.5 rounded text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download
            </Link>
            <button 
              onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
              className="flex-1 bg-[#eab308] hover:bg-[#dca506] text-gray-900 py-1.5 rounded text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Read Sample
            </button>
          </div>
        </div>
      </div>
    </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()} 
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900">{book.title} - Sample</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-5 md:p-6 overflow-y-auto bg-white">
              <p className="italic text-center text-gray-500 mb-5 font-serif text-sm md:text-base">
                Showing first {book.images ? book.images.length : (book.image ? 1 : 5)} pages of {book.title}
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {book.desc}
              </p>
            </div>
            
            <div className="p-4 md:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 md:gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
              >
                Close
              </button>
              <Link 
                href="https://wa.me/917207264240" 
                className="bg-[#a82b2b] hover:bg-[#8a2323] text-white py-2 px-5 rounded text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Full Book
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function BooksPageContent({ initialBookId }: { initialBookId?: string } = {}) {
  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans">
      <Navbar />

      <section className="bg-[#f4efe6] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#a82b2b] text-[10px] font-bold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-[#a82b2b]"></span>
              Complete Collection
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              All Publications
            </h2>
            <p className="text-gray-600 text-sm">
              The complete bibliography of a literary life.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {BOOKS.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
