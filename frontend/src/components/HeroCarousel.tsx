'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  { id: 1, image: '/images/baner1.jpeg', label: 'Banner 1' },
  { id: 2, image: '/images/baner2.jpeg', label: 'Banner 2' },
  { id: 3, image: '/images/baner3.jpeg', label: 'Banner 3' },
  { id: 4, image: '/images/baner4.jpeg', label: 'Banner 4' },
  { id: 5, image: '/images/baner5.jpeg', label: 'Banner 5' },
  { id: 6, image: '/images/baner6.jpeg', label: 'Banner 6' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="carousel-banner page-section page-section--immersive" id="home" aria-label="Introduction">
      <div className="carousel__track-container">
        <ul className="carousel__track">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className={`carousel__slide${index === current ? ' current-slide' : ''}`}
            >
              <div
                className="carousel__image"
                style={{ backgroundImage: `url('${slide.image}')` }}
                role="img"
                aria-label={slide.label}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="carousel__button carousel__button--left"
        aria-label="Previous slide"
        onClick={prev}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className="carousel__button carousel__button--right"
        aria-label="Next slide"
        onClick={next}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="carousel__nav">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`carousel__indicator${index === current ? ' current-indicator' : ''}`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      <Link href="/#inspired-by" className="carousel__explore-more" aria-label="Scroll to inspirations">
        <span className="carousel__explore-text">Explore</span>
        <svg className="carousel__explore-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
    </section>
  );
}
