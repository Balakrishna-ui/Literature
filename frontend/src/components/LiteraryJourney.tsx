import Link from 'next/link';

export default function LiteraryJourney() {
  const milestones = [
    {
      year: '1956',
      title: 'First Poetry Collection',
      desc: 'Published Prabhata Ragalu (Morning Melodies), his debut collection of poems that immediately established him as a major new voice in Telugu poetry.',
      image: '/images/aw1.jpeg'
    },
    {
      year: '1965',
      title: 'National Recognition',
      desc: 'Awarded the Sahitya Akademi Award for his poetry collection Nadhi Theeram (Riverbank), marking his arrival on the national literary stage.',
      image: '/images/aw2.jpeg'
    },
    {
      year: '1978',
      title: 'Landmark Novel',
      desc: 'Published Aaru Velu (Six Bows), considered his magnum opus, a multigenerational saga that redefined the Telugu novel.',
      image: '/images/aw3.jpeg'
    },
    {
      year: '1992',
      title: 'Literary Institution',
      desc: 'Elected President of the Telugu Academy, where he spearheaded initiatives to digitize classical Telugu manuscripts.',
      image: '/images/aw1.jpeg'
    }
  ];

  return (
    <section className="bg-[#fcfaf5] py-10 md:py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Literary Journey
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Key milestones that defined a remarkable six-decade career.
          </p>
          <div className="w-16 h-[2px] bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {milestones.map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-sm border-t-4 border-[#a82b2b] relative pt-8 flex flex-col">
              <div className="absolute -top-4 left-4 bg-[#a82b2b] text-white text-xs font-bold px-3 py-1.5 flex items-center gap-2">
                <span className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-[10px]">L</span>
                {item.year}
              </div>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-36 rounded object-cover mb-4"
              />
              <div className="flex-grow">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about" className="inline-flex items-center gap-2 bg-[#a82b2b] text-white font-semibold py-2.5 px-6 rounded text-sm hover:bg-[#8b2424] transition-colors">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
