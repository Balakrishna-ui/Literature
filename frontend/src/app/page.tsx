import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import InspiredBy from '@/components/InspiredBy';
import AuthorBio from '@/components/AuthorBio';
import AwardsGrid from '@/components/AwardsGrid';
import LiteratureGallery from '@/components/LiteratureGallery';
import Testimonials from '@/components/Testimonials';
import QuoteBanner from '@/components/QuoteBanner';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroCarousel />
        <InspiredBy />
        <AuthorBio />
        <AwardsGrid />
        <LiteratureGallery />
        <Testimonials />
        <QuoteBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
