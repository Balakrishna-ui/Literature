'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Lightbox, { LightboxImage } from '@/components/Lightbox';

const LETTERS: LightboxImage[] = [
  {
    id: 'letter-1',
    src: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200',
    title: 'Letter from R.K. Narayan',
    date: 'August 12, 1984',
    description: 'A personal note discussing the themes of small-town India and congratulating Dr. Varma on his first novel.',
  },
  {
    id: 'letter-2',
    src: 'https://images.unsplash.com/photo-1600172454132-0545fb22b934?auto=format&fit=crop&q=80&w=1200',
    title: 'Manuscript Draft: Chapter 1',
    date: '1992',
    description: 'Original handwritten manuscript for the opening chapter of "Echoes of the Forgotten", showing early revisions.',
  },
  {
    id: 'letter-3',
    src: 'https://images.unsplash.com/photo-1503945438517-f65904a52ce6?auto=format&fit=crop&q=80&w=1200',
    title: 'Publisher Correspondence',
    date: 'March 3, 1994',
    description: 'The historic acceptance letter from Penguin Books that launched Dr. Varma into the international spotlight.',
  },
  {
    id: 'letter-4',
    src: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1200',
    title: 'Fan Mail Archive',
    date: '1998 - 2005',
    description: 'A compilation of heartfelt letters from readers around the world, deeply touched by his narratives.',
  },
];

export default function LettersGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="gallery-page page-section page-section--light" id="letters-gallery">
        <div className="section-head section-head--minimal">
          <span className="section-head__eyebrow">Visual Journey</span>
          <h1 className="section-head__title">Letters Gallery</h1>
          <p className="section-head__desc">
            An intimate look into handwritten manuscripts, personal correspondences, and publisher letters that shaped Dr. Varma's legacy.
          </p>
        </div>

        <div className="gallery-grid">
          {LETTERS.map((letter, index) => (
            <div 
              key={letter.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`Read ${letter.title}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <img src={letter.src} alt={letter.title} className="gallery-item__image" loading="lazy" />
              <div className="gallery-item__overlay">
                <h3 className="gallery-item__title">{letter.title}</h3>
                <span className="gallery-item__meta">{letter.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Lightbox 
        images={LETTERS}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
      <Footer />
    </>
  );
}
