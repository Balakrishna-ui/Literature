import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BiographySection from '@/components/BiographySection';
import LiteraryJourney from '@/components/LiteraryJourney';
import BooksPublications from '@/components/BooksPublications';
import AwardsGrid from '@/components/AwardsGrid';
import StagePlays from '@/components/StagePlays';
import LiteratureGallery from '@/components/LiteratureGallery';
import InspirationsMentors from '@/components/InspirationsMentors';
import ValuesQualities from '@/components/ValuesQualities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a className="skip-link sr-only focus:not-sr-only" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <InspirationsMentors />
        <BiographySection />
        <LiteraryJourney />
        <BooksPublications />
        <StagePlays />
        <LiteratureGallery />
        <ValuesQualities />
      </main>
      <Footer />
    </>
  );
}
