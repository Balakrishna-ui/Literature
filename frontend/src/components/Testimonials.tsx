'use client';

import { useState, useCallback } from 'react';

const testimonials = [
  {
    text: '"Rajesh Varma\'s writing possesses a rare quality—it speaks directly to the heart while engaging the mind. His narratives are both timeless and urgently contemporary."',
    name: 'Arundhati Roy',
    title: 'Author & Booker Prize Winner',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  },
  {
    text: '"A masterclass in emotional storytelling. Every page is a testament to his profound understanding of the human condition."',
    name: 'Vikram Seth',
    title: 'Novelist & Poet',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
  {
    text: '"His words flow like a gentle river, carrying the reader through landscapes of complex emotions and beautiful prose."',
    name: 'Amitav Ghosh',
    title: 'Acclaimed Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, []);

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <section className="testimonials page-section page-section--dark" id="testimonials" data-section="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">What Readers Say</h2>
        <p className="testimonials__subtitle">Voices from the literary world sharing their thoughts and reflections</p>
      </div>

      <div className="testimonials__carousel-wrapper">
        <button type="button" className="testimonials__nav-btn testimonials__nav-btn--prev" aria-label="Previous Testimonial" onClick={prev}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="testimonials__carousel">
          <ul className="testimonials__track">
            {testimonials.map((item, index) => (
              <li key={item.name} className={`testimonials__slide${index === current ? ' current-slide' : ''}`}>
                <div className="testimonial-card">
                  <div className="testimonial-card__quote-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    </svg>
                  </div>
                  <p className="testimonial-card__text">{item.text}</p>
                  <div className="testimonial-card__author-info">
                    <img src={item.avatar} alt={item.name} className="testimonial-card__avatar" loading="lazy" />
                    <h4 className="testimonial-card__author-name">{item.name}</h4>
                    <span className="testimonial-card__author-title">{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="testimonials__nav-btn testimonials__nav-btn--next" aria-label="Next Testimonial" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="testimonials__pagination">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`testimonials__dot${index === current ? ' current-dot' : ''}`}
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
