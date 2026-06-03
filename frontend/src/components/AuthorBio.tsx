import Link from 'next/link';

export default function AuthorBio() {
  return (
    <section className="about page-section page-section--light" id="about" data-section="about">
      <div className="about__container">
        <div className="about__image-wrapper">
          <img src="/images/pro.jpeg" alt="Dr. Rajesh Varma Portrait" className="about__image" loading="lazy" />
        </div>

        <div className="about__content">
          <h2 className="about__title">Dr. Rajesh Varma</h2>
          <p className="about__subtitle">Acclaimed Novelist, Poet & Literary Scholar</p>
          <p className="about__quote">&ldquo;Weaving stories that touch the soul&rdquo;</p>

          <hr className="about__divider" />

          <p className="about__description">
            Dr. Rajesh Varma is an internationally acclaimed novelist, poet, and literary scholar whose works have
            touched millions of hearts across the globe. With over 30 years of literary excellence, his narratives blend
            timeless human emotions with contemporary social themes. His profound understanding of human nature and
            masterful storytelling have earned him numerous prestigious awards and a devoted readership worldwide.
          </p>

          <div className="about__meta">
            <div className="about__meta-item">
              <span className="about__meta-label">Born</span>
              <span className="about__meta-value">1965</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">Birthplace</span>
              <span className="about__meta-value">Hyderabad, Telangana, India</span>
            </div>
          </div>

          <Link href="/about" className="btn btn--solid-brand">
            Know More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn__icon">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
