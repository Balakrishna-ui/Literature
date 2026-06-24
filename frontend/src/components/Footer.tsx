import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white pt-20 pb-8 border-t-[8px] border-[#a82b2b]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-4">
          <h2 className="font-serif text-2xl font-bold mb-2 text-white">Dr. Lakshmi Narayan Reddy</h2>
          <p className="text-gray-400 text-sm mb-4">Poet, Novelist & Playwright — 1932 — 2018</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            A digital tribute to a life devoted to literature, truth, and the enduring power of words.
          </p>
        </div>

        {/* Links Column */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-400 hover:text-[#eab308] transition-colors text-sm">Home</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-[#eab308] transition-colors text-sm">About</Link></li>
            <li><Link href="/books" className="text-gray-400 hover:text-[#eab308] transition-colors text-sm">Books</Link></li>
            <li><Link href="/gallery" className="text-gray-400 hover:text-[#eab308] transition-colors text-sm">Gallery</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-[#eab308] transition-colors text-sm">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-lg mb-6 text-white">Contact Info</h3>
          <div className="text-gray-400 text-xs space-y-4 leading-relaxed">
            <div>
              <p className="text-[#eab308] font-semibold mb-1">Palem Office:</p>
              <p>8-40, Sri Venkateswara Swamy Temple, Palem, Bijinapally, Nagarkurnool. 509215</p>
            </div>
            <div>
              <p className="text-[#eab308] font-semibold mb-1">Jadcherla Office:</p>
              <p>7-150/3B, Pochamma Temple, Kaverammapet Road, Jadcherla, Mahbubnagar. 509301</p>
            </div>
            <div>
              <p className="text-[#eab308] font-semibold mb-1">Phone:</p>
              <p>9866180084, 9618065671, 7207264240</p>
            </div>
          </div>
        </div>

        {/* Quote Column */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-lg mb-6 text-white">Words to Remember</h3>
          <blockquote className="border-l-2 border-[#eab308] pl-4 italic text-gray-400 text-sm leading-relaxed">
            "Literature is not an ornament. It is a lamp that must be kept burning through the darkest nights of human experience."
          </blockquote>
          <p className="text-[#eab308] text-xs mt-3">— Dr. L.N. Reddy</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Lakshmi Narayan Reddy Foundation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
