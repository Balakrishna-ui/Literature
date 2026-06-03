'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/#home', section: 'home' },
  { name: 'Inspired', href: '/#inspired-by', section: 'inspired-by' },
  { name: 'About', href: '/about', section: null },
  { name: 'Works', href: '/books', section: null },
  { name: 'Contact', href: '/#contact', section: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main [data-section]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.section;
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`} id="navbar">
      <Link href="/" className="navbar__brand">
        Dr. Rajesh Varma
      </Link>

      <nav
        className={`navbar__nav${isMobileMenuOpen ? ' navbar__nav--open' : ''}`}
        id="main-nav"
        aria-label="Primary"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`navbar__link${link.section && activeSection === link.section ? ' navbar__link--active' : ''}`}
            data-section={link.section ?? undefined}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="navbar__toggle"
        id="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
