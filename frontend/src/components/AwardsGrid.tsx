'use client';

import Link from 'next/link';
import { AWARDS } from '@/lib/awards';
import AwardIcon from '@/components/AwardIcon';

export default function AwardsGrid() {
  return (
    <section className="awards page-section page-section--light" id="awards" data-section="awards">
      <div className="awards__header">
        <h2 className="awards__title">Awards & Recognition</h2>
        <p className="awards__subtitle">
          Honoring decades of literary excellence and contribution to world literature
        </p>
      </div>

      <div className="awards__grid">
        {AWARDS.map((award) => (
          <Link
            key={award.id}
            href={`/awards/${award.id}`}
            className="award-card"
            style={{ display: 'block', textDecoration: 'none' }}
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

      <div className="awards__actions">
        <Link href="/#awards" className="btn btn--solid-brand">
          View All Awards & Achievements
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn__icon"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
