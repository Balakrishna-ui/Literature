'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BookOpen, Image as ImageIcon, Mail, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Books', href: '/books', icon: BookOpen },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Contact', href: '/contact', icon: Mail },
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
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] flex justify-between">
        <svg viewBox="0 0 24 24" fill="none" stroke="#a82b2b" strokeWidth="0.5" className="w-64 h-64 -ml-16 -mt-16">
          <path d="M12 22C12 22 18 16 18 10C18 6 15.3137 4 12 4C8.68629 4 6 6 6 10C6 16 12 22 12 22Z" />
          <path d="M12 22C12 22 22 18 22 12C22 9 20 7 18 7C16 7 14 9 12 12C10 9 8 7 6 7C4 7 2 9 2 12C2 18 12 22 12 22Z" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="#a82b2b" strokeWidth="0.5" className="w-64 h-64 -mr-16 -mt-16">
          <path d="M12 22C12 22 18 16 18 10C18 6 15.3137 4 12 4C8.68629 4 6 6 6 10C6 16 12 22 12 22Z" />
          <path d="M12 22C12 22 22 18 22 12C22 9 20 7 18 7C16 7 14 9 12 12C10 9 8 7 6 7C4 7 2 9 2 12C2 18 12 22 12 22Z" />
        </svg>
      </div>

      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between relative z-10">
        
        {/* Logo and Tagline */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-[#a82b2b] text-white w-[42px] h-[42px] flex items-center justify-center font-serif font-bold text-2xl rounded-sm">
            L
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-1">
              L.N. Reddy
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#b48a5a] tracking-wide">
              Explore His Life. Embrace His Wisdom.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center justify-center gap-[6px] relative group px-2 py-2"
              >
                <Icon 
                  size={20} 
                  className={`transition-colors ${isActive ? 'text-[#a82b2b]' : 'text-gray-600 group-hover:text-[#a82b2b]'}`} 
                  fill={isActive && link.name === 'Home' ? 'currentColor' : 'none'} 
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className={`text-[13px] font-bold transition-colors ${isActive ? 'text-[#a82b2b]' : 'text-[#1d1d1f] group-hover:text-[#a82b2b]'}`}>
                  {link.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <span className="w-8 h-[2px] bg-[#a82b2b]" />
                    <span className="absolute w-1.5 h-1.5 rounded-full bg-[#a82b2b]" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            href="/about"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#a82b2b] text-white text-[13px] font-semibold hover:bg-[#8a2222] transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M12 22C12 22 18 16 18 10C18 6 15.3137 4 12 4C8.68629 4 6 6 6 10C6 16 12 22 12 22Z" />
              <path d="M12 22C12 22 22 18 22 12C22 9 20 7 18 7C16 7 14 9 12 12C10 9 8 7 6 7C4 7 2 9 2 12C2 18 12 22 12 22Z" />
            </svg>
            Explore His Life <ArrowRight size={16} className="ml-1" />
          </Link>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="w-6 h-[2px] bg-current block transition-all" />
            <span className="w-6 h-[2px] bg-current block transition-all" />
            <span className="w-6 h-[2px] bg-current block transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 text-base font-semibold ${
                  isActive ? 'text-[#a82b2b]' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} className={isActive ? 'text-[#a82b2b]' : 'text-gray-500'} fill={isActive && link.name === 'Home' ? 'currentColor' : 'none'} />
                {link.name}
              </Link>
            );
          })}
          <Link 
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 w-full text-center px-6 py-3 rounded-xl bg-[#a82b2b] text-white text-base font-medium flex justify-center items-center gap-2"
          >
            Explore His Life <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
