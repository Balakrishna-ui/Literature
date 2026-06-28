'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Category = string;

interface ApiGalleryImage {
  id: number;
  imagePath: string;
  title?: string;
  category: { id: number; name: string };
  featured: boolean;
}

const API_BASE = '';

const staticGalleryImages = [
  { src: '/images/pro.jpeg', category: 'Personal Photos', alt: 'Dr. Reddy Portrait', isLarge: false },
  { src: '/images/baner2.jpeg', category: 'Literary Events', alt: 'Literary Event 1', isLarge: true },
  { src: '/images/aw1.jpeg', category: 'Award Ceremonies', alt: 'Award Ceremony 1', isLarge: true },
  { src: '/images/ins4.jpeg', category: 'Book Launches', alt: 'Book Launch Event', isLarge: false },
  { src: '/images/baner1.jpeg', category: 'Natakalu Images', alt: 'Natakalu Scene', isLarge: true },
  { src: '/images/ins2.jpeg', category: 'Historical Moments', alt: 'Historical Scene', isLarge: false },
  { src: '/images/baner3.jpeg', category: 'Personal Photos', alt: 'Personal Memory', isLarge: true },
  { src: '/images/aw2.jpeg', category: 'Award Ceremonies', alt: 'Award Ceremony 2', isLarge: true },
  { src: '/images/baner6.jpeg', category: 'Natakalu Images', alt: 'Natakalu Performance', isLarge: true },
  { src: '/images/aw3.jpeg', category: 'Award Ceremonies', alt: 'Award Ceremony 3', isLarge: true },
  { src: '/images/ins3.jpeg', category: 'Literary Events', alt: 'Literary Event 2', isLarge: false },
  { src: '/images/baner4.jpeg', category: 'Award Ceremonies', alt: 'Award Ceremony 4', isLarge: true },
  { src: '/images/baner5.jpeg', category: 'Historical Moments', alt: 'Historical Gathering', isLarge: true },
  { src: '/images/ins1.jpeg', category: 'Personal Photos', alt: 'Inspiration Moment', isLarge: false },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Photos');
  const [galleryImages, setGalleryImages] = useState<any[]>(staticGalleryImages);
  const [categories, setCategories] = useState<Category[]>(['All Photos']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imgsRes, catsRes] = await Promise.all([
          fetch(`${API_BASE}/api/gallery/images`),
          fetch(`${API_BASE}/api/gallery/categories`),
        ]);
        const imgs: ApiGalleryImage[] = await imgsRes.json();
        const cats: { id: number; name: string }[] = await catsRes.json();

        setCategories(['All Photos', ...cats.map(c => c.name)]);
        
        const mappedImages = imgs.map((img, idx) => ({
          src: `${API_BASE}${img.imagePath}`,
          category: img.category.name,
          alt: img.title || 'Gallery image',
          isLarge: img.featured || idx % 3 === 0,
        }));
        
        setGalleryImages([...staticGalleryImages, ...mappedImages]);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredImages = galleryImages.filter(img => 
    activeCategory === 'All Photos' || img.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#a82b2b] text-white pt-16 pb-8 md:pt-24 md:pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-2 block">
            VISUAL ARCHIVE
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Gallery
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            A visual journey through the life, works, and legacy of Dr. Lakshmi Narayan Reddy.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-[#e5dfce] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[12px] md:text-[13px] font-semibold border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#a82b2b] text-white border-[#a82b2b]'
                    : 'bg-transparent text-gray-700 border-[#d8d3c5] hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-20">
              Loading images...
            </div>
          ) : (
            <>
              {/* Mobile Layout */}
              <div className="md:hidden">
                {filteredImages.length === 0 ? (
                  <div className="text-center text-gray-500 py-20">
                    No images available in this category yet.
                  </div>
                ) : (
                  <>
                    {/* Large (landscape) images — full width */}
                    {filteredImages.filter(img => img.isLarge).length > 0 && (
                      <div className="flex flex-col gap-3 mb-3">
                        {filteredImages.filter(img => img.isLarge).map((img, idx) => (
                          <div key={idx} className="relative aspect-[4/3] group overflow-hidden bg-gray-200 border border-[#d8d3c5]">
                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                              <div className="text-[#eab308] text-[10px] font-bold tracking-wider uppercase mb-1">{img.category}</div>
                              <div className="text-white text-sm">{img.alt}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Small (portrait/square) images — 2 per row */}
                    {filteredImages.filter(img => !img.isLarge).length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {filteredImages.filter(img => !img.isLarge).map((img, idx) => (
                          <div key={idx} className="relative aspect-[3/4] group overflow-hidden bg-gray-200 border border-[#d8d3c5]">
                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                              <div className="text-[#eab308] text-[9px] font-bold tracking-wider uppercase mb-0.5">{img.category}</div>
                              <div className="text-white text-xs">{img.alt}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Desktop Layout — 3-col grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] group overflow-hidden bg-gray-200 border border-[#d8d3c5]">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="text-[#eab308] text-[10px] font-bold tracking-wider uppercase mb-1">{img.category}</div>
                      <div className="text-white text-sm">{img.alt}</div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="hidden md:block text-center text-gray-500 py-20">
                  No images available in this category yet.
                </div>
              )}
            </>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}

