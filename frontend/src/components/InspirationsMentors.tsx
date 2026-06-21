import Link from 'next/link';

export default function InspirationsMentors() {
  const mentors = [
    {
      name: 'Sri Sri',
      role: 'LITERARY MENTOR',
      image: '/images/ins1.jpeg',
      objectPosition: 'object-top',
      desc: 'The revolutionary Telugu poet Sri Sri was a guiding influence on Reddy\'s early work, encouraging him to engage with social realities through poetry.'
    },
    {
      name: 'Rabindranath Tagore',
      role: 'SPIRITUAL INFLUENCE',
      image: '/images/ins2.jpeg',
      objectPosition: 'object-top',
      desc: 'Tagore\'s synthesis of the local and the universal inspired Reddy\'s own approach to literature, particularly the blending of folk traditions with modernist techniques.'
    },
    {
      name: 'Gurajada Apparao',
      role: 'LITERARY FORBEAR',
      image: '/images/ins3.jpeg',
      objectPosition: 'object-center',
      desc: 'The pioneering Telugu playwright and social reformer remained a lifelong reference point for Reddy\'s own dramatic work.'
    },
    {
      name: 'Chalam',
      role: 'PHILOSOPHICAL INFLUENCE',
      image: '/images/ins4.jpeg',
      objectPosition: 'object-center',
      desc: 'His radical ideas on freedom and human relationships provided a profound philosophical undercurrent to Reddy\'s later writings.'
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-white border-t-4 border-[#a82b2b] shadow-sm flex flex-col overflow-hidden">
              <div className="w-full h-48 bg-gray-50 relative p-2">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                <span className="text-[#eab308] font-bold text-[10px] tracking-wider uppercase mb-4 bg-[#fcfaf5] inline-block px-2 py-1 self-start border border-[#eab308]/20">
                  {mentor.role}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2" title={mentor.desc}>
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
