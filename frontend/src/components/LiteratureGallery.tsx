import Link from 'next/link';

export default function LiteratureGallery() {
  return (
    <section className="bg-[#fcfaf5] py-10 md:py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-gray-600">
            Moments captured across a lifetime of literary achievement.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mb-12">
          {/* Full width large image */}
          <div className="bg-gray-200 w-full aspect-[4/3] relative overflow-hidden group mb-3">
            <img src="/images/baner1.jpeg" alt="Gallery Image 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-bold border border-white px-4 py-2">View</span>
            </div>
          </div>
          {/* 2-column grid for smaller images */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { src: '/images/baner2.jpeg', alt: 'Gallery Image 2' },
              { src: '/images/aw1.jpeg', alt: 'Gallery Image 3' },
              { src: '/images/baner3.jpeg', alt: 'Gallery Image 4' },
              { src: '/images/aw2.jpeg', alt: 'Gallery Image 5' },
              { src: '/images/aw3.jpeg', alt: 'Gallery Image 6' },
            ].map((img, i) => (
              <div key={i} className="bg-gray-200 aspect-video relative overflow-hidden group">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 bg-gray-200 aspect-[4/3] md:aspect-auto relative overflow-hidden group">
            <img src="/images/baner1.jpeg" alt="Gallery Image 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-4 py-2">View</span>
             </div>
          </div>
          <div className="bg-gray-200 aspect-video md:aspect-[4/3] relative overflow-hidden group">
            <img src="/images/baner2.jpeg" alt="Gallery Image 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
            </div>
          </div>
          <div className="bg-gray-200 aspect-video md:aspect-[4/3] relative overflow-hidden group">
            <img src="/images/aw1.jpeg" alt="Gallery Image 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
            </div>
          </div>
          <div className="bg-gray-200 aspect-video md:aspect-[4/3] relative overflow-hidden group">
            <img src="/images/baner3.jpeg" alt="Gallery Image 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
            </div>
          </div>
          <div className="bg-gray-200 aspect-video md:aspect-[4/3] relative overflow-hidden group">
            <img src="/images/aw2.jpeg" alt="Gallery Image 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
            </div>
          </div>
          <div className="bg-gray-200 aspect-video md:aspect-[4/3] relative overflow-hidden group">
            <img src="/images/aw3.jpeg" alt="Gallery Image 6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-bold border border-white px-3 py-1 text-sm">View</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/gallery" className="inline-flex items-center gap-2 bg-[#a82b2b] text-white font-bold py-3 px-8 rounded text-sm hover:bg-[#8b2424] transition-colors shadow-sm">
            View Full Gallery <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
