'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Books', href: '/books' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-[#fdfbf7] transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-[#a82b2b] text-white w-8 h-8 flex items-center justify-center font-serif font-bold text-xl rounded-sm">
            L
          </div>
          <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">
            L.N. Reddy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors py-2 relative ${
                  isActive ? 'text-[#a82b2b]' : 'text-gray-600 hover:text-[#a82b2b]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#a82b2b]" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="w-6 h-[2px] bg-gray-900 block transition-all" />
          <span className="w-6 h-[2px] bg-gray-900 block transition-all" />
          <span className="w-6 h-[2px] bg-gray-900 block transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-semibold ${
                  isActive ? 'text-[#a82b2b]' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
