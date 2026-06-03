import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__main">
        <div className="site-footer__grid">
          <div className="site-footer__col site-footer__col--profile">
            <h2 className="site-footer__name">Dr. Rajesh Varma</h2>
            <p className="site-footer__bio">
              Acclaimed novelist, poet, and literary scholar dedicated to crafting stories that touch hearts and inspire
              minds across generations.
            </p>
            <p className="site-footer__quote">&ldquo;Weaving stories that touch the soul&rdquo;</p>
          </div>

          <nav className="site-footer__col" aria-label="Quick links">
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul className="site-footer__links">
              <li><Link href="/#home" className="site-footer__link">Home</Link></li>
              <li><Link href="/about" className="site-footer__link">About</Link></li>
              <li><Link href="/#awards" className="site-footer__link">Awards</Link></li>
              <li><Link href="/books" className="site-footer__link">Literature</Link></li>
              <li><Link href="/#contact" className="site-footer__link">Contact</Link></li>
            </ul>
          </nav>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Contact</h3>
            <ul className="site-footer__contact">
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <a href="mailto:contact@rajeshvarma.com" className="site-footer__link">contact@rajeshvarma.com</a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href="tel:+919876543210" className="site-footer__link">+91 98765 43210</a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="site-footer__text">Literary House, Banjara Hills, Hyderabad, Telangana 500034, India</span>
              </li>
            </ul>
          </div>

          <div className="site-footer__col site-footer__col--connect">
            <h3 className="site-footer__heading">Connect</h3>
            <p className="site-footer__connect-text">Follow the literary journey on social media</p>
            <div className="site-footer__social" aria-label="Social media">
              <a href="#" className="site-footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="site-footer__social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="site-footer__social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="site-footer__social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__copyright">&copy; {new Date().getFullYear()} Dr. Rajesh Varma. All rights reserved.</p>
          <p className="site-footer__motto">Crafted with passion for literature and storytelling</p>
        </div>
      </div>
    </footer>
  );
}
