import Link from 'next/link';
import { BOOKS } from '@/lib/books';

function BookCategoryIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function LiteratureGallery() {
  return (
    <section className="works page-section page-section--light" id="works" data-section="works">
      <div className="works__header">
        <h2 className="works__title">Literary Works</h2>
        <p className="works__subtitle">
          Explore a collection of novels, poetry, and essays that have touched hearts worldwide
        </p>
        <button type="button" className="btn btn--translate">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn__icon"
            aria-hidden="true"
          >
            <path d="M5 8l6 6" />
            <path d="M4 14l6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="M22 22l-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
          Translate to Telugu
        </button>
      </div>

      <div className="works__grid">
        {BOOKS.map((book) => (
          <article key={book.id} className="work-card">
            <div
              className={`work-card__image-container${book.imageContainerClass ? ` ${book.imageContainerClass}` : ''}`}
            >
              <img src={book.image} alt={book.title} className="work-card__image" loading="lazy" />
              <span className="work-card__year-badge">{book.year}</span>
            </div>
            <div className="work-card__content">
              <div className="work-card__category">
                <BookCategoryIcon />
                {book.category}
              </div>
              <h3 className="work-card__title">{book.title}</h3>
              <p className="work-card__desc">{book.shortDesc}</p>
              <div className="work-card__meta">
                <span>{book.pages} pages</span>
                <span>{book.language}</span>
              </div>
              <Link href={`/books?book=${book.id}`} className="btn btn--read-more">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="works__actions">
        <Link href="/books" className="btn btn--solid-brand">
          Explore Complete Library
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn__icon"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
