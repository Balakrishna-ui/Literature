'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BOOKS, Book } from '@/lib/books';

export default function BooksPageContent({ initialBookId }: { initialBookId?: string } = {}) {
  const [filter, setFilter] = useState('All Works');
  
  const categories = ['All Works', 'Novel', 'Poetry Collection', 'Stage Play', 'Short Stories'];
  
  const featuredBooks = BOOKS.filter(book => book.isFeatured);
  
  const filteredBooks = filter === 'All Works' 
    ? BOOKS 
    : BOOKS.filter(book => book.category === filter);

  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans">
      <Navbar />

      {/* Featured Works Section */}
      <section className="bg-[#fcfaf5] py-16 md:py-20 border-b border-[#e5dfd5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#eab308] text-[10px] font-bold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-[#eab308]"></span>
              Highlights
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Works
            </h2>
            <p className="text-gray-600 text-sm">
              The most celebrated and influential publications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {featuredBooks.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      {/* All Publications Section */}
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[#e5dfd5] pb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold border transition-colors ${
                  filter === cat 
                    ? 'bg-[#a82b2b] border-[#a82b2b] text-white' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {filteredBooks.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Reusable Book Card Component
function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm flex flex-col group overflow-hidden">
      {/* Image Container */}
      <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden flex items-center justify-center p-4 border-b border-gray-100">
        {book.isFeatured && (
          <div className="absolute top-3 left-3 bg-[#a82b2b] text-white text-[10px] font-bold px-2 py-1 z-10 flex items-center gap-1 shadow-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Featured
          </div>
        )}
        <img 
          src={book.image} 
          alt={book.title} 
          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Content Container */}
      <div className="p-2 md:p-5 flex flex-col flex-grow">
        <span className="text-[#eab308] font-bold text-[7px] md:text-[9px] tracking-wider uppercase mb-1 md:mb-2 bg-[#fcfaf5] inline-block px-1 md:px-1.5 py-0.5 self-start border border-[#eab308]/20">
          {book.category}
        </span>
        <h3 className="font-serif text-xs md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1 leading-tight">{book.title}</h3>
        {book.subtitle && (
          <p className="text-gray-500 italic text-[10px] md:text-sm mb-1 md:mb-3 font-serif">{book.subtitle}</p>
        )}
        <p className="text-gray-600 text-[9px] md:text-[13px] leading-relaxed mb-2 md:mb-4 flex-grow line-clamp-2 md:line-clamp-3">
          {book.shortDesc}
        </p>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-2 md:pt-3 mt-auto flex items-center justify-between text-[9px] md:text-[11px] text-gray-400 font-medium">
          <div className="flex items-center gap-1">
            <svg width="10" height="10" className="md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {book.year}
          </div>
          <div className="flex items-center gap-1">
            <svg width="10" height="10" className="md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            {book.pages}p
          </div>
        </div>
      </div>
    </div>
  );
}
