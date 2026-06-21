import Link from 'next/link';

export default function LegacyContributions() {
  return (
    <section className="bg-[#a82b2b] text-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[#eab308] font-bold tracking-[0.2em] text-xs uppercase mb-3 block flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-[#eab308]"></span>
          Enduring Impact
          <span className="w-8 h-[1px] bg-[#eab308]"></span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
          Legacy & Contributions
        </h2>
        <p className="text-white/80 mb-12">
          An enduring impact on literature and society.
        </p>
        
        <div className="w-16 h-16 bg-white/10 mx-auto flex items-center justify-center rounded mb-10 border border-white/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
        </div>

        <div className="space-y-6 text-white/90 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          <p>
            Dr. Lakshmi Narayan Reddy's influence on Indian literature extends far beyond his published works. 
            Through his teaching, mentorship, and institutional leadership, he shaped two generations of Telugu writers.
          </p>
          <p>
            His novels have been translated into more than twelve languages, including English, Hindi, Bengali, 
            Tamil, and German. Aaru Velu remains a staple of university literature courses across India.
          </p>
        </div>

        <Link href="/about" className="inline-flex items-center gap-2 bg-[#eab308] text-[#a82b2b] font-bold py-3 px-8 rounded text-sm hover:bg-[#facc15] transition-colors shadow-sm">
          Read More <span>→</span>
        </Link>
      </div>
    </section>
  );
}
