'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WorkingHoursBadge from '@/components/WorkingHoursBadge';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwoGisIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#00B956" />
    <path
      d="M7.2 17.5V16.1C7.2 14.8 8.1 13.9 9.3 12.9L10.5 11.9C11.5 11.1 12.1 10.4 12.1 9.4C12.1 8.3 11.2 7.5 10 7.5C8.9 7.5 8.1 8.2 7.9 9.3H6.1C6.3 7.3 7.8 5.8 10 5.8C12.3 5.8 13.9 7.3 13.9 9.3C13.9 10.9 12.9 12 11.7 13L10.3 14.2C9.4 15 9.1 15.6 9 16.1H14V17.5H7.2ZM16.3 17.5C15.6 17.5 15.1 17 15.1 16.3C15.1 15.6 15.6 15.1 16.3 15.1C17 15.1 17.5 15.6 17.5 16.3C17.5 17 17 17.5 16.3 17.5Z"
      fill="white"
    />
  </svg>
);

export default function ContactsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contacts" className="py-20 sm:py-32 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">
            {t.contacts.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
            {t.contacts.titlePrefix}{' '}
            <span className="text-gold-gradient">{t.contacts.titleHighlight}</span>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
            </svg>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between space-y-4"
          >
            {/* Address */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-gold/15 bg-dark-card/90 shadow-lg hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-cream font-bold text-base mb-1 font-[family-name:var(--font-heading)]">
                  {t.contacts.addressTitle}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {t.contacts.addressValue}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-gold/15 bg-dark-card/90 shadow-lg hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-cream font-bold text-base mb-1 font-[family-name:var(--font-heading)]">
                  {t.contacts.phoneTitle}
                </h3>
                <a
                  href="tel:+77714953014"
                  className="text-gold hover:text-gold-light text-base font-semibold transition-colors block mt-0.5"
                >
                  +7 771 495 3014
                </a>
              </div>
            </div>

            {/* Hours with Dynamic Operating Badge */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-gold/15 bg-dark-card/90 shadow-lg hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-cream font-bold text-base font-[family-name:var(--font-heading)]">
                    {t.contacts.hoursTitle}
                  </h3>
                  {/* Dynamic Status Indicator */}
                  <WorkingHoursBadge size="sm" />
                </div>
                <p className="text-cream/70 text-sm">{t.contacts.hoursValue}</p>
                <p className="text-cream/35 text-xs mt-1">UTC+5 (Қазақстан)</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-gold/15 bg-dark-card/90 shadow-lg hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-cream font-bold text-base mb-1 font-[family-name:var(--font-heading)]">
                  Instagram
                </h3>
                <a
                  href="https://instagram.com/sirne.kz_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/90 hover:text-gold text-sm font-medium transition-colors"
                >
                  @sirne.kz_
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-4"
          >
            <div className="rounded-2xl overflow-hidden border border-gold/20 h-[360px] lg:h-full min-h-[340px] shadow-2xl relative bg-dark-card">
              <iframe
                src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A45.018558%2C%22lon%22%3A78.390873%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22taldykorgan%22%7D%2C%22org%22%3A%2270000001087489048%22%7D"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="SIRNE.KZ на карте 2GIS"
              />
            </div>
            <a
              href="https://2gis.kz/almaty/firm/70000001087489048"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 border border-emerald-500/40 bg-dark-card hover:bg-emerald-950/30 rounded-xl text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-md active:scale-98"
            >
              <TwoGisIcon className="w-5 h-5" />
              <span>{t.contacts.openIn2gis}</span>
              <ExternalLink size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
