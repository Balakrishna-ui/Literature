import Link from 'next/link';

export default function BooksPublications() {
  const books = [
    {
      type: 'NOVEL',
      title: 'Aaru Velu',
      subtitle: 'Six Bows',
      desc: 'A multigenerational epic set in the Godavari delta, following six generations of a farming family through war, partition, and social change.',
      year: '1978',
      pages: '624p',
      image: '/images/bk1.png',
      featured: true,
    },
    {
      type: 'POETRY COLLECTION',
      title: 'Nadhi Theeram',
      subtitle: 'Riverbank',
      desc: 'A collection of lyrical poems that weave together the landscapes of coastal Andhra with the inner landscapes of memory, loss, and longing.',
      year: '1965',
      pages: '142p',
      image: '/images/bk2.png',
      featured: true,
    },
    {
      type: 'STAGE PLAY',
      title: 'Raktakshi',
      subtitle: 'The Red-Eyed',
      desc: 'A searing drama about the lives of salt-pan workers on the Gujarat coast. First performed at the National School of Drama.',
      year: '1972',
      pages: '128p',
      image: '/images/bk1.png',
      featured: true,
    },
    {
      type: 'POETRY COLLECTION',
      title: 'Sapta Sagaralu',
      subtitle: 'Seven Oceans',
      desc: 'The final major work, a profound meditation on time, mortality, and the endurance of art. Written in the classical style.',
      year: '2010',
      pages: '112p',
      image: '/images/bk2.png',
      featured: true,
    }
  ];

  return (
    <section className="bg-[#f8f6f0] py-6 md:py-8">
      <div className="w-[90%] md:w-[80%] max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
            Books & Publications
          </h2>
          <p className="text-gray-600 mb-2.5 text-xs md:text-sm">
            A celebrated body of work spanning poetry, novels, plays, and short stories.
          </p>
          <div className="w-12 h-[2px] bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white shadow-lg flex flex-col group overflow-hidden rounded-sm">
              <div className="aspect-[1.5/1] bg-white border-b border-gray-50 relative flex items-center justify-center p-3 md:p-4">
                <div className="relative w-full h-full drop-shadow-md">
                  {book.featured && (
                    <div className="absolute top-0 left-0 bg-[#a82b2b] text-white text-[8px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 z-10 flex items-center gap-1 shadow-sm">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      Featured
                    </div>
                  )}
                  {book.image ? (
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                      Cover Image
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 flex flex-col flex-grow min-h-[220px]">
                <span className="text-[#eab308] font-bold text-[8px] md:text-[9px] tracking-wider uppercase mb-1.5 bg-[#fcfaf5] inline-block px-1.5 py-0.5 self-start border border-[#eab308]/20">
                  {book.type}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-0.5 leading-tight">{book.title}</h3>
                <h4 className="font-serif italic text-gray-500 text-xs md:text-sm mb-1.5">{book.subtitle}</h4>
                <p className="text-gray-600 text-xs mb-2.5 leading-snug line-clamp-2" title={book.desc}>{book.desc}</p>
                
                <div className="mt-auto flex flex-col gap-2.5 pt-4">
                  <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {book.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                      {book.pages}
                    </span>
                  </div>

                  <div className="flex gap-2">
                  <Link href="#" className="flex-1 bg-[#a82b2b] hover:bg-[#8a2323] text-white py-1.5 rounded text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download
                  </Link>
                  <Link href="#" className="flex-1 bg-[#eab308] hover:bg-[#dca506] text-gray-900 py-1.5 rounded text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    Read Sample
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link href="/books" className="inline-flex items-center gap-1.5 bg-[#eab308] text-gray-900 font-bold py-2 px-6 rounded text-xs md:text-sm hover:bg-[#facc15] transition-colors shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
