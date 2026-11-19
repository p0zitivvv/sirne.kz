'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WorkingHoursBadge from '@/components/WorkingHoursBadge';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#menu', label: t.nav.menu },
    { href: '#events', label: t.nav.events },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-xl shadow-xl shadow-black/30 border-b border-gold/15'
          : 'bg-gradient-to-b from-dark/90 via-dark/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-gold-gradient tracking-wider">
                SIRNE
              </span>
              <span className="text-[10px] text-gold/80 tracking-[0.35em] block -mt-1 font-semibold">
                .KZ
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-gold transition-colors duration-200 text-xs tracking-widest uppercase font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Area: Language Switcher, Status, Phone, CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-full bg-dark-card border border-gold/25 shadow-inner">
              <button
                type="button"
                onClick={() => setLang('ru')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  lang === 'ru'
                    ? 'bg-gold text-dark shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
                aria-label="Русский язык"
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLang('kz')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  lang === 'kz'
                    ? 'bg-gold text-dark shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
                aria-label="Қазақ тілі"
              >
                ҚАЗ
              </button>
            </div>

            {/* Status indicator on desktop */}
            <div className="hidden xl:block">
              <WorkingHoursBadge size="sm" />
            </div>

            {/* Phone */}
            <a
              href="tel:+77714953014"
              className="hidden md:flex items-center gap-2 text-gold/90 hover:text-gold transition-colors text-xs font-semibold"
            >
              <Phone size={15} />
              <span>+7 771 495 3014</span>
            </a>

            {/* Desktop CTA */}
            <a
              href="#events"
              className="hidden sm:inline-flex px-5 py-2.5 bg-gold hover:bg-gold-light text-dark font-bold text-xs rounded-xl transition-all duration-200 tracking-wider uppercase shadow-md shadow-gold/20 active:scale-95"
            >
              {t.nav.bookTable}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-cream hover:text-gold transition-colors p-2 rounded-lg border border-dark-border"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark/98 backdrop-blur-2xl border-t border-gold/15 overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-6 space-y-4">
              {/* Status and language in mobile menu */}
              <div className="flex items-center justify-between pb-3 border-b border-dark-border">
                <WorkingHoursBadge size="sm" />
                <div className="flex items-center gap-2 text-xs text-cream/60">
                  <Globe size={14} className="text-gold" />
                  <span>Тіл / Язык:</span>
                  <div className="flex items-center rounded-full bg-dark-card border border-gold/30 p-0.5">
                    <button
                      onClick={() => setLang('ru')}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        lang === 'ru' ? 'bg-gold text-dark' : 'text-cream/50'
                      }`}
                    >
                      RU
                    </button>
                    <button
                      onClick={() => setLang('kz')}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        lang === 'kz' ? 'bg-gold text-dark' : 'text-cream/50'
                      }`}
                    >
                      ҚАЗ
                    </button>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-cream/80 hover:text-gold transition-colors text-base py-2.5 px-2 rounded-lg hover:bg-gold/10 font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Phone & CTA */}
              <div className="pt-2 space-y-3">
                <a
                  href="tel:+77714953014"
                  className="flex items-center justify-center gap-2 text-gold py-2.5 px-4 rounded-xl border border-gold/30 bg-gold/10 font-semibold text-sm"
                >
                  <Phone size={16} />
                  <span>+7 771 495 3014</span>
                </a>
                <a
                  href="#events"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-gold hover:bg-gold-light text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-gold/20"
                >
                  {t.nav.bookTableLong}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
