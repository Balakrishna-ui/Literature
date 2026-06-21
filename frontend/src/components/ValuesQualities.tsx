import Link from 'next/link';

export default function ValuesQualities() {
  const values = [
    {
      title: 'Truth in Art',
      desc: 'Believed that literature must never flinch from difficult truths. Every word must carry the weight of lived experience.'
    },
    {
      title: 'Cultural Roots',
      desc: 'Deeply committed to the Telugu language and its classical traditions, seeing regional literature as essential to India\'s cultural diversity.'
    },
    {
      title: 'Social Conscience',
      desc: 'Viewed writing as a moral responsibility. His works consistently gave voice to the marginalized and the forgotten.'
    }
  ];

  return (
    <section className="bg-[#fcfaf5] py-10 md:py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Values & Personal Qualities
          </h2>
          <p className="text-gray-600 mb-6">
            The principles that guided a life of purpose and integrity.
          </p>
          <div className="w-16 h-[2px] bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => (
            <div key={index} className="bg-white border border-gray-100 p-8 shadow-sm flex flex-col">
              <div className="w-10 h-10 bg-[#fcfaf5] border border-[#eab308]/30 flex items-center justify-center text-[#eab308] mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/about" className="inline-flex items-center gap-2 bg-[#a82b2b] text-white font-bold py-3 px-8 rounded text-sm hover:bg-[#8b2424] transition-colors shadow-sm">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
