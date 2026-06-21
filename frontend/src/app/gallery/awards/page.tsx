'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Lightbox, { LightboxImage } from '@/components/Lightbox';

const AWARDS: LightboxImage[] = [
  {
    id: 'award-1',
    src: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=1200',
    title: 'Sahitya Akademi Award',
    date: '1995',
    description: 'Awarded for outstanding contribution to Indian literature and his seminal work "Echoes of the Forgotten".',
  },
  {
    id: 'award-2',
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200',
    title: 'International Booker Prize',
    date: '2008',
    description: 'Recognized globally for the translated version of "The Final Chapter" bridging cultures through narrative.',
  },
  {
    id: 'award-3',
    src: 'https://images.unsplash.com/photo-1610444585141-8eb139fba0e0?auto=format&fit=crop&q=80&w=1200',
    title: 'Jnanpith Award',
    date: '2015',
    description: 'The highest Indian literary award, presented for a lifetime of devotion to poetry and fiction.',
  },
  {
    id: 'award-4',
    src: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200',
    title: 'Padma Shri',
    date: '2020',
    description: 'Honored with the fourth-highest civilian award in India for distinguished service in literature and education.',
  },
];

export default function AwardsGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="gallery-page page-section page-section--light" id="awards-gallery">
        <div className="section-head section-head--minimal">
          <span className="section-head__eyebrow">Visual Journey</span>
          <h1 className="section-head__title">Awards Gallery</h1>
          <p className="section-head__desc">
            A visual retrospective of the accolades and honors received by Dr. Rajesh Varma throughout his literary career.
          </p>
        </div>

        <div className="gallery-grid">
          {AWARDS.map((award, index) => (
            <div 
              key={award.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${award.title}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <img src={award.src} alt={award.title} className="gallery-item__image" loading="lazy" />
              <div className="gallery-item__overlay">
                <h3 className="gallery-item__title">{award.title}</h3>
                <span className="gallery-item__meta">{award.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Lightbox 
        images={AWARDS}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
      <Footer />
    </>
  );
}
