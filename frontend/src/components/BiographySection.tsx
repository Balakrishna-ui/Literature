import Link from 'next/link';

export default function BiographySection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Image Column */}
        <div className="relative group">
          <div className="absolute -inset-4 border-l-2 border-t-2 border-[#eab308]/50 z-0"></div>
          <div className="absolute -inset-4 border-r-2 border-b-2 border-transparent z-0"></div>
          <div className="relative z-10 w-full aspect-[4/5] overflow-hidden bg-gray-100 shadow-xl">
            <img 
              src="/images/pro.jpeg" 
              alt="Dr. Lakshmi Narayan Reddy" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="flex flex-col">
          <span className="text-[#eab308] font-bold tracking-[0.2em] text-xs uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#eab308] block"></span>
            Life Story
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Biography
          </h2>
          <p className="text-gray-600 text-lg mb-8 italic border-b border-gray-200 pb-6">
            A life devoted to the written word and the preservation of cultural heritage.
          </p>
          
          <div className="space-y-6 text-gray-600 mb-8 leading-relaxed">
            <p>
              Dr. Lakshmi Narayan Reddy was a towering figure in Indian literature whose works
              spanned poetry, novels, and stage plays. Born into a family of scholars in coastal Andhra
              Pradesh, he devoted his life to preserving and elevating the Telugu literary tradition while
              fearlessly addressing social issues through his art.
            </p>
            <div className="pl-4 border-l-2 border-[#eab308] py-1 text-sm text-gray-500">
              Lakshmi Narayan Reddy was born on March 15, 1932, in the village of Amalapuram, East Godavari
              district. His early years were spent in a household where learning was prized above all else.
            </div>
          </div>

          <Link href="/about" className="bg-[#a82b2b] text-white font-semibold py-3 px-6 rounded text-sm hover:bg-[#8b2424] transition-colors self-start flex items-center gap-2">
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
