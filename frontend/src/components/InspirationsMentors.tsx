import Link from 'next/link';

export default function InspirationsMentors() {
  const mentors = [
    {
      name: 'Ballari Raghava',
      role: 'LITERARY MENTOR',
      image: '/images/ins2.jpeg',
      objectPosition: 'object-top',
      desc: 'Ballari Raghava (1880–1946) was a pioneering Telugu theatre legend who introduced realism to stage acting and promoted women\'s participation. Honored with the Kala Prapoorna and Rao Bahadur titles, he remains an enduring inspiration to theatre artists.'
    },
    {
      name: 'Gadiyaram Ramakrishna Sarma',
      role: 'SPIRITUAL INFLUENCE',
      image: '/images/inns2.jpeg',
      objectPosition: 'object-center',
      desc: 'Gadiyaram Ramakrishna Sarma (1919–2006) was a Telugu writer, historian, freedom fighter, and Sanskrit scholar. He led the preservation of the Alampur temples, authored Satapatramu, and dedicated his life to historical research and social reform.'
    },
    {
      name: 'Peesapati Narasimha Murthy',
      role: 'LITERARY FORBEAR',
      image: '/images/ins3.jpeg',
      objectPosition: 'object-center',
      desc: 'Peesapati Narasimha Murthy (1920–2007) was a celebrated Telugu theatre artist known for portraying Sri Krishna, exceptional dialogue delivery, and mastery of padyam. He received the Sangeet Natak Akademi Award and Kala Prapoorna honors.'
    },
    {
      name: 'Kapilavai Lingamurthy',
      role: 'PHILOSOPHICAL INFLUENCE',
      image: '/images/ins5.jpeg',
      objectPosition: 'object-center',
      desc: 'Kapilavai Lingamurthy (1928–2018) was a renowned Telugu poet, scholar, and researcher. Honored with titles including Kavi Kesari and Kavita Kalanidhi, he became the first recipient of an Honorary Doctorate from Potti Sreeramulu Telugu University.'
    },
    {
      name: 'Burra Subrahmanya Sastry',
      role: 'LITERARY INFLUENCE',
      image: '/images/ins4.jpeg',
      objectPosition: 'object-center',
      desc: 'Burra Subrahmanya Sastry (1929–2010) was an acclaimed Telugu theatre artist celebrated for his remarkable female-role portrayals, expressive abhinaya, and stage presence. He received the NTR National Award and continues to inspire theatre performers.'
    }
  ];

  return (
    <section className="bg-[#fcfaf5] py-10 md:py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Inspirations & Mentors
          </h2>
          <p className="text-gray-600">
            The guiding lights who shaped a literary vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mb-12">
          {mentors.map((mentor, index) => (
            <div 
              key={index} 
              className="group bg-white border-t-4 border-[#a82b2b] shadow-sm flex flex-col overflow-hidden relative cursor-pointer"
              tabIndex={0}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/85 z-10 p-5 md:p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 ease-in-out overflow-y-auto text-center backdrop-blur-[2px]">
                <h3 className="text-white font-serif text-lg md:text-xl font-bold mb-2 leading-tight">{mentor.name}</h3>
                <span className="text-[#eab308] font-bold text-[9px] md:text-[10px] tracking-wider uppercase mb-4 border border-[#eab308]/50 px-2 py-1 bg-black/20">
                  {mentor.role}
                </span>
                <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                  {mentor.desc}
                </p>
              </div>

              <div className="w-full h-64 md:h-48 lg:h-48 bg-gray-100 relative">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className={`w-full h-full object-cover ${mentor.objectPosition || 'object-center'}`}
                />
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 leading-tight">{mentor.name}</h3>
                <span className="text-[#eab308] font-bold text-[8px] md:text-[10px] tracking-wider uppercase mb-2 md:mb-4 bg-[#fcfaf5] inline-block px-1 md:px-2 py-0.5 md:py-1 self-start border border-[#eab308]/20">
                  {mentor.role}
                </span>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3" title={mentor.desc}>
                  {mentor.desc}
                </p>
              </div>
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
