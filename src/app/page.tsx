import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import MenuSection from '@/components/MenuSection';
import EventsSection from '@/components/EventsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <MenuSection />
        <EventsSection />
        <ReviewsSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}
