'use client';

export default function Newsletter() {
  return (
    <section className="newsletter page-section page-section--conversion" id="contact" data-section="contact">
      <div className="newsletter__container">
        <div className="newsletter__card">
          <div className="newsletter__icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h2 className="newsletter__title">Join the Literary Journey</h2>
          <p className="newsletter__desc">
            Subscribe to receive updates on new publications, upcoming events, and exclusive literary insights.
          </p>
          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="newsletter__input"
              placeholder="Enter your email address"
              required
              aria-label="Email address"
            />
            <button type="submit" className="newsletter__btn">
              Subscribe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
          <p className="newsletter__privacy">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
