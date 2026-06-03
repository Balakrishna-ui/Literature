'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BOOKS, getBookById } from '@/lib/books';

type BooksPageContentProps = {
  initialBookId?: string;
};

export default function BooksPageContent({ initialBookId }: BooksPageContentProps) {
  const searchParams = useSearchParams();
  const bookFromQuery = searchParams.get('book') ?? initialBookId ?? BOOKS[0].id;
  const [selectedId, setSelectedId] = useState(bookFromQuery);

  useEffect(() => {
    const resolvedId = searchParams.get('book') ?? initialBookId;
    if (resolvedId && BOOKS.some((book) => book.id === resolvedId)) {
      setSelectedId(resolvedId);
    }
  }, [searchParams, initialBookId]);

  const selectedBook = getBookById(selectedId);

  const handleSelectBook = (bookId: string) => {
    setSelectedId(bookId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/books?book=${bookId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-amber-200 selection:text-amber-900 font-sans">
      <Navbar />

      <div className="books-page">
        <div className="books-page__main">
          <section className="book-feature" id="book-feature">
            <div className="book-feature__image-wrap">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="book-feature__image"
                loading="lazy"
              />
              <span className="book-feature__year">{selectedBook.year}</span>
            </div>
            <div className="book-feature__content">
              <p className="book-feature__category">{selectedBook.category}</p>
              <h1 className="book-feature__title">{selectedBook.title}</h1>
              <p className="book-feature__desc">{selectedBook.desc}</p>
              <div className="book-feature__meta">
                <div className="book-feature__meta-item">
                  Published<strong>{selectedBook.year}</strong>
                </div>
                <div className="book-feature__meta-item">
                  Pages<strong>{selectedBook.pages}</strong>
                </div>
                <div className="book-feature__meta-item">
                  Language<strong>{selectedBook.language}</strong>
                </div>
                <div className="book-feature__meta-item">
                  Genre<strong>{selectedBook.genre}</strong>
                </div>
              </div>
              <div className="book-feature__actions">
                <a href="#" className="book-feature__btn book-feature__btn--sample">
                  Read Sample
                </a>
                <a href="#" className="book-feature__btn book-feature__btn--buy">
                  Purchase Book
                </a>
              </div>
            </div>
          </section>

          <section className="book-catalog">
            <h2 className="book-catalog__title">Explore More Books</h2>
            <p className="book-catalog__count">{BOOKS.length} books found</p>
            <div className="book-catalog__grid">
              {BOOKS.map((book) => (
                <article
                  key={book.id}
                  className={`catalog-card${book.id === selectedId ? ' catalog-card--active' : ''}`}
                >
                  <div className="catalog-card__image-wrap">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="catalog-card__image"
                      loading="lazy"
                    />
                    {book.id === selectedId && (
                      <span className="catalog-card__badge">Currently Viewing</span>
                    )}
                    <span className="catalog-card__year">{book.year}</span>
                  </div>
                  <div className="catalog-card__content">
                    <p className="catalog-card__category">{book.category}</p>
                    <h3 className="catalog-card__title">{book.title}</h3>
                    <p className="catalog-card__desc">{book.desc}</p>
                    <div className="catalog-card__meta">
                      <span>{book.pages} pages</span>
                      <span>{book.language}</span>
                    </div>
                    <button
                      type="button"
                      className="catalog-card__link"
                      onClick={() => handleSelectBook(book.id)}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
