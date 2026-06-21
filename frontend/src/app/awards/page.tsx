import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { AWARDS } from '@/lib/awards';
import AwardIcon from '@/components/AwardIcon';

export const metadata = {
  title: 'Awards & Recognition | Dr. Rajesh Varma',
  description: 'Honoring decades of literary excellence and contribution to world literature by Dr. Rajesh Varma.',
};

export default function AwardsPage() {
  return (
    <>
      <Navbar />
      <main className="awards-page-content page-section page-section--light" style={{ minHeight: '80vh', paddingTop: '120px' }}>
        <div className="section-head" style={{ marginBottom: '48px', textAlign: 'center' }}>
          <span className="section-head__eyebrow" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--clr-brand)', fontSize: '0.85rem', fontWeight: 600 }}>Honors</span>
          <h1 className="section-head__title" style={{ fontFamily: 'var(--ff-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--clr-text)', margin: '8px 0 16px' }}>Awards & Achievements</h1>
          <p className="section-head__desc" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>
            A comprehensive list of national and international recognitions, civilian honors, and literary awards received by Dr. Rajesh Varma throughout his career.
          </p>
        </div>

        <div className="awards__grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {AWARDS.map((award) => (
            <Link
              key={award.id}
              href={`/awards/${award.id}`}
              className="award-card"
              style={{ display: 'block', textDecoration: 'none' }}
              id={`award-link-${award.id}`}
            >
              <img className="award-card__bg" src={award.img} alt="" loading="lazy" />
              <div className="award-card__overlay" aria-hidden="true" />
              <span className="award-card__badge">{award.badge}</span>
              <div className="award-card__content">
                <div className="award-card__icon" aria-hidden="true">
                  <AwardIcon awardId={award.id} />
                </div>
                <h3 className="award-card__title">{award.title}</h3>
                <p className="award-card__desc">{award.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/" className="detail-page__back">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
