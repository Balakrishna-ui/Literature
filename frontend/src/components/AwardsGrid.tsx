import Link from 'next/link';

export default function AwardsGrid() {
  const awards = [
    {
      title: 'Jnanpith Award',
      year: '2003',
      organization: 'Bharatiya Jnanpith',
      desc: 'India\'s highest literary honor, awarded for outstanding contribution to Indian literature.',
      image: '/images/aw1.jpeg'
    },
    {
      title: 'Sahitya Akademi Award',
      year: '1965',
      organization: 'Sahitya Akademi',
      desc: 'For the poetry collection Nadhi Theeram, recognized as a landmark in modern Telugu poetry.',
      image: '/images/aw2.jpeg'
    },
    {
      title: 'Padma Bhushan',
      year: '1995',
      organization: 'Government of India',
      desc: 'Third-highest civilian award of India, for distinguished service in literature and education.',
      image: '/images/aw3.jpeg'
    },
    {
      title: 'AP Sahitya Akademi Award',
      year: '1960',
      organization: 'AP Sahitya Akademi',
      desc: 'For the novel Varanasi Ghat, marking the first major recognition of his fiction.',
      image: '/images/aw1.jpeg'
    }
  ];

  return (
    <section className="bg-[#a82b2b] text-white py-10 md:py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-center mb-8">
          <span className="text-[#eab308] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
            Honors
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Awards & Recognition
          </h2>
          <p className="text-white/80 text-sm">
            Honors that celebrate a lifetime of literary excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {awards.map((award, index) => (
            <div key={index} className="border border-white/20 bg-white/5 p-4 flex gap-4 hover:bg-white/10 transition-colors">
              <div className="flex-shrink-0">
                <img 
                  src={award.image} 
                  alt={award.title} 
                  className="w-14 h-14 rounded object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-base">{award.title}</h3>
                  <span className="bg-[#eab308] text-[#a82b2b] text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {award.year}
                  </span>
                </div>
                <p className="text-white/60 text-xs font-semibold mb-1">{award.organization}</p>
                <p className="text-white/80 text-sm leading-relaxed">{award.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about" className="inline-flex items-center gap-2 bg-[#eab308] text-[#a82b2b] font-bold py-2.5 px-8 rounded text-sm hover:bg-[#facc15] transition-colors shadow-sm">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
