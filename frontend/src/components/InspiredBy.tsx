'use client';

import { useEffect, useRef } from 'react';

const cards = [
  { id: 'card-classic-literature', title: 'Classic Literature', image: '/images/ins1.jpeg', alt: 'Classic Literature' },
  { id: 'card-libraries', title: 'Libraries & Archives', image: '/images/ins2.jpeg', alt: 'Libraries & Archives' },
  { id: 'card-writers', title: 'Writers & Thinkers', image: '/images/ins3.jpeg', alt: 'Writers & Thinkers' },
  { id: 'card-cultural', title: 'Cultural Heritage', image: '/images/ins4.jpeg', alt: 'Cultural Heritage' },
];

export default function InspiredBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll('.card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${i * 120}ms`;
            el.classList.add('card--visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardEls.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero page-section page-section--light"
      id="inspired-by"
      data-section="inspired-by"
      aria-labelledby="inspired-by-label"
    >
      <div className="page-section__inner">
        <header className="section-head section-head--minimal">
          <p className="section-head__eyebrow" id="inspired-by-label">
            Inspired By
          </p>
        </header>
        <div className="cards" id="cards-grid">
          {cards.map((card) => (
            <article key={card.id} className="card" id={card.id}>
              <div className="card__image-wrap">
                <img src={card.image} alt={card.alt} className="card__image" loading="lazy" />
                <div className="card__overlay" />
              </div>
              <h2 className="card__title">{card.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
