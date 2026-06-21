import Link from 'next/link';

export default function BooksPublications() {
  const books = [
    {
      type: 'NOVEL',
      title: 'Aaru Velu',
      subtitle: 'Six Bows',
      desc: 'A multigenerational epic set in the Godavari delta, following six generations of a farming family through war, partition, and social change.',
      publisher: 'Visalandhra Publishing House',
      year: '1978',
      image: '/images/bk1.png'
    },
    {
      type: 'POETRY COLLECTION',
      title: 'Nadhi Theeram',
      subtitle: 'Riverbank',
      desc: 'A collection of lyrical poems that weave together the landscapes of coastal Andhra with the inner landscapes of memory, loss, and longing.',
      publisher: 'Sahitya Akademi',
      year: '1965',
      image: '/images/bk2.png'
    },
    {
      type: 'STAGE PLAY',
      title: 'Raktakshi',
      subtitle: 'The Red-Eyed',
      desc: 'A searing drama about the lives of salt-pan workers on the Gujarat coast. First performed at the National School of Drama.',
      publisher: 'National Book Trust',
      year: '1972',
      image: '/images/bk1.png'
    },
    {
      type: 'SHORT STORIES',
      title: 'Prabhata Ragalu',
      subtitle: 'Morning Melodies',
      desc: 'His debut collection of poetry that introduced a fresh voice rooted in rural Telugu life, nature, and the human condition.',
      publisher: 'Visalandhra Publishing House',
      year: '1956',
      image: '/images/bk2.png'
    }
  ];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Books & Publications
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            A celebrated body of work spanning poetry, novels, plays, and short stories.
          </p>
          <div className="w-16 h-[2px] bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {books.map((book, index) => (
            <div key={index} className="bg-white border border-gray-100 shadow-md flex flex-col group overflow-hidden border-t-4 border-[#a82b2b]">
              <div className="aspect-[2/1] bg-gray-50 relative overflow-hidden flex items-center justify-center p-0">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="max-w-full max-h-full object-contain drop-shadow-md" />
                ) : (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                    Cover Image
                  </div>
                )}
              </div>
              <div className="p-2 md:p-4 flex flex-col flex-grow">
                <span className="text-[#eab308] font-bold text-[7px] md:text-[9px] tracking-wider uppercase mb-1 bg-[#fcfaf5] inline-block px-1 md:px-1.5 py-0.5 self-start border border-[#eab308]/20">
                  {book.type}
                </span>
                <h3 className="font-serif text-xs md:text-base font-bold text-gray-900 mb-0.5 leading-tight">{book.title}</h3>
                <h4 className="font-serif italic text-gray-500 text-[10px] md:text-sm mb-1 md:mb-2">{book.subtitle}</h4>
                <p className="text-gray-600 text-[9px] md:text-xs mb-2 md:mb-4 flex-grow leading-relaxed line-clamp-3" title={book.desc}>{book.desc}</p>
                <div className="flex justify-between items-center text-[8px] md:text-xs text-gray-400 font-semibold border-t border-gray-100 pt-2 md:pt-3 mt-auto">
                  <span className="truncate mr-1">{book.publisher}</span>
                  <span className="text-[#a82b2b] shrink-0">{book.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/books" className="inline-flex items-center gap-2 bg-[#eab308] text-gray-900 font-bold py-2.5 px-8 rounded text-sm hover:bg-[#facc15] transition-colors shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
