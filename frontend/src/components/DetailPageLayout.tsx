import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type DetailPageLayoutProps = {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  backHref: string;
  backLabel: string;
};

export default function DetailPageLayout({
  title,
  subtitle,
  paragraphs,
  backHref,
  backLabel,
}: DetailPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-amber-200 selection:text-amber-900 font-sans">
      <Navbar />

      <article className="detail-page">
        <h1 className="detail-page__title">{title}</h1>
        {subtitle && <p className="detail-page__subtitle">{subtitle}</p>}
        <div className="detail-page__body">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="detail-page__desc">
              {paragraph}
            </p>
          ))}
        </div>
        <Link href={backHref} className="detail-page__back">
          {backLabel}
        </Link>
      </article>

      <Footer />
    </main>
  );
}
