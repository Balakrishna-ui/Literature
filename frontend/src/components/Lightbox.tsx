'use client';

import { useEffect, useCallback } from 'react';

export type LightboxImage = {
  id: string;
  src: string;
  title: string;
  description?: string;
  date?: string;
};

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image gallery">
      <div className="lightbox__backdrop" />
      <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="lightbox__content-wrapper">
        {images.length > 1 && (
          <button className="lightbox__nav lightbox__nav--prev" onClick={handlePrev} aria-label="Previous image">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox__image-container">
            <img src={currentImage.src} alt={currentImage.title} className="lightbox__image" />
          </div>
          <div className="lightbox__info">
            <h3 className="lightbox__title">{currentImage.title}</h3>
            {currentImage.date && <p className="lightbox__date">{currentImage.date}</p>}
            {currentImage.description && <p className="lightbox__description">{currentImage.description}</p>}
          </div>
        </div>

        {images.length > 1 && (
          <button className="lightbox__nav lightbox__nav--next" onClick={handleNext} aria-label="Next image">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
      <div className="lightbox__counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
