import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import EventsSection from '@/components/EventsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import MobileActionBar from '@/components/MobileActionBar';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <EventsSection />
        <ReviewsSection />
        <ContactsSection />
      </main>
      <Cart />
      <Footer />
      <MobileActionBar />
    </>
  );
}
