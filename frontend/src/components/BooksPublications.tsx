"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const BookCarousel = ({ book }: { book: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = book.images || [];
  
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
      {book.featured && (
        <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 bg-[#a82b2b] text-white text-[8px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 z-20 flex items-center gap-1 shadow-sm pointer-events-none">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Featured
        </div>
      )}
      
      <div className="relative w-full h-full drop-shadow-md overflow-hidden bg-white">
        {images.length > 0 ? (
          <>
            {/* Images Track */}
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

            {/* Arrows (Desktop Only) */}
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

            {/* Pagination Dots */}
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

const BookCard = ({ book }: { book: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling when modal is open
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
            {book.type}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-0.5 leading-tight">{book.title}</h3>
          {book.subtitle && <h4 className="font-serif italic text-gray-500 text-xs md:text-sm mb-1.5">{book.subtitle}</h4>}
          
          <p className="text-gray-600 text-xs leading-snug line-clamp-3 mb-1.5" title={book.desc}>
            {book.desc}
          </p>
        
        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {book.year}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              {book.pages}
            </span>
          </div>

          <div className="flex gap-2">
            <Link href="#" className="flex-1 bg-[#a82b2b] hover:bg-[#8a2323] text-white py-1.5 rounded text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm">
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

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Header */}
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
            
            {/* Body */}
            <div className="p-5 md:p-6 overflow-y-auto bg-white">
              <p className="italic text-center text-gray-500 mb-5 font-serif text-sm md:text-base">
                Showing first {book.images ? book.images.length : 5} pages of {book.title}
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {book.desc}
              </p>
            </div>
            
            {/* Footer */}
            <div className="p-4 md:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 md:gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
              >
                Close
              </button>
              <Link 
                href="#" 
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

export default function BooksPublications() {
  const books = [
    {
      type: 'NOVEL',
      title: 'Natya Vedana',
      subtitle: 'Bharatiya Nritya Kala Vaibhavam',
      desc: 'Natya Vedana is a thought-provoking book in which Duppalli Sri Ramulu shares his deep concern for the declining values of Telugu theatre. He reflects on how dramas, once a powerful medium for inspiring ethics, responsibility, and noble living, have gradually become mere sources of entertainment. According to him, a true play should educate, inspire, and reflect the realities of society, encouraging audiences toward moral and meaningful lives. Through this book, he expresses his heartfelt pain over the changing nature of Telugu drama and calls for the revival of its artistic and social purpose.',
      year: '2018',
      pages: '128p',
      images: ['/images/nataya0.png', '/images/nataya1.jpeg', '/images/nataya2.jpeg', '/images/nataya3.jpeg', '/images/nataya4.jpeg'],
      featured: true,
    },
    {
      type: 'SHORT PLAYS',
      title: 'Bala Natikalu',
      subtitle: '',
      desc: 'Bala Natikalu* is a collection of short plays written by Duppalli Sri Ramulu to nurture moral values and character among children. Drawing inspiration from the Puranas, Itihasas, and social themes, these plays encourage ethical conduct, responsibility, discipline, and compassion. Each play, ranging from 5 to 30 minutes only, is designed to be engaging, educational, and easy to perform, making the book an excellent resource for schools, cultural programs, and young theatre enthusiasts.',
      year: '----',
      pages: '142p',
      images: ['/images/balanatakalu0.jpeg', '/images/balanatakalu.jpeg', '/images/balanatakalu1.jpeg', '/images/balanatakalu2.jpeg'],
      featured: true,
    },
    {
      type: 'THEATRE HISTORY',
      title: 'Palamuru Jilla Nataka Kala Vaibhavam',
      subtitle: '',
      desc: 'Palamuru Jilla Nataka Kala Vaibhavam is a tribute to the rich theatrical heritage of the Palamuru region. Through this book, Duppalli Sri Ramulu introduces and documents the lives and contributions of eminent Telugu theatre artists from the district, preserving their legacy for future generations. Inspired by Palamuru Jilla Devalayalu, authored by Kapilavai Lingamurthy, this work serves as a valuable record of Palamuru\'s vibrant contribution to Telugu theatre and its cultural history.',
      year: '2005',
      pages: '128p',
      images: ['/images/pala0.jpeg', '/images/pala1.jpeg', '/images/pala2.jpeg', '/images/pala3.jpeg'],
      featured: true,
    },
    {
      type: 'CULTURAL HERITAGE',
      title: 'Vishwakarma Kula Deepakulu',
      subtitle: '',
      desc: 'Vishwakarma Kula Deepakulu celebrates the rich heritage and outstanding contributions of the five traditional communities of the Vishwakarma lineage — Manu (Blacksmiths), Maya (Carpenters), Tvastar (Bronzesmiths), Shilpi (Stonemasons), and Visvajna (Goldsmiths). The book highlights distinguished artisans and skilled professionals from the Palamuru region, recognizing their craftsmanship, dedication, and lifelong service to their respective fields. It also documents numerous temples dedicated to Sri Veerabrahmendra Swamy across the Palamuru district, describing their history, construction, and the collective efforts of temple committees and local communities in establishing and preserving these sacred places. This work serves as both a tribute to the Vishwakarma community and a valuable record of Palamuru\'s cultural, spiritual, and architectural heritage.',
      year: '2016',
      pages: '112p',
      images: ['/images/vis00.jpeg', '/images/vis0.jpeg'],
      featured: true,
    }
  ];

  return (
    <section className="bg-[#f8f6f0] py-6 md:py-8">
      <div className="w-[95%] md:w-[92%] max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
            Books & Publications
          </h2>
          <p className="text-gray-600 mb-2.5 text-xs md:text-sm">
            A celebrated body of work spanning poetry, novels, plays, and short stories.
          </p>
          <div className="w-12 h-[2px] bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>

        <div className="text-center mt-4">
          <Link href="/books" className="inline-flex items-center gap-1.5 bg-[#eab308] text-gray-900 font-bold py-2 px-6 rounded text-xs md:text-sm hover:bg-[#facc15] transition-colors shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
