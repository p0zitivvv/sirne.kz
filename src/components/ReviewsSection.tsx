'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote, PenSquare } from 'lucide-react';
import { reviews } from '@/data/reviews';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/context/LanguageContext';

const TWO_GIS_REVIEWS_URL =
  'https://2gis.kz/almaty/firm/70000001087489048/tab/reviews?immersive=on';

const TwoGisLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#00B956" />
    <path
      d="M7.2 17.5V16.1C7.2 14.8 8.1 13.9 9.3 12.9L10.5 11.9C11.5 11.1 12.1 10.4 12.1 9.4C12.1 8.3 11.2 7.5 10 7.5C8.9 7.5 8.1 8.2 7.9 9.3H6.1C6.3 7.3 7.8 5.8 10 5.8C12.3 5.8 13.9 7.3 13.9 9.3C13.9 10.9 12.9 12 11.7 13L10.3 14.2C9.4 15 9.1 15.6 9 16.1H14V17.5H7.2ZM16.3 17.5C15.6 17.5 15.1 17 15.1 16.3C15.1 15.6 15.6 15.1 16.3 15.1C17 15.1 17.5 15.6 17.5 16.3C17.5 17 17 17.5 16.3 17.5Z"
      fill="white"
    />
  </svg>
);

// Formatting names safely: "Имя И."
const formatDisplayName = (name: string): string => {
  const clean = name.replace(/[^\p{L}\s]/gu, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
  }
  if (parts.length === 1 && parts[0].length > 0) {
    return `${parts[0].charAt(0).toUpperCase()}${parts[0].slice(1)}`;
  }
  return name;
};

export default function ReviewsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5500, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="reviews" className="py-20 sm:py-32 relative kazakh-pattern-bg">
      <div className="absolute inset-0 bg-dark/95 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">
            {t.reviews.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
            {t.reviews.titlePrefix}{' '}
            <span className="text-gold-gradient">{t.reviews.titleHighlight}</span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <TwoGisLogo className="w-4 h-4" />
              <span>{t.reviews.verifiedSource}</span>
            </span>
          </div>

          <div className="ornament-divider max-w-xs mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
            </svg>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review) => {
                const displayName = formatDisplayName(review.name);
                const initial = displayName.charAt(0);

                return (
                  <div
                    key={review.id}
                    className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                  >
                    <div className="glass-card rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between border border-gold/15 bg-dark-card/85 shadow-lg">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Quote className="w-7 h-7 text-gold/30" />
                          <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-gold text-gold"
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-cream/80 text-sm sm:text-base leading-relaxed mb-6 italic">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                        <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm flex-shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-cream text-sm font-semibold truncate">
                            {displayName}
                          </p>
                          <p className="text-cream/40 text-xs">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/15 transition-colors active:scale-95"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? 'bg-gold w-6' : 'bg-cream/20 w-2'
                  }`}
                  aria-label={`Перейти к слайду ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/15 transition-colors active:scale-95"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* 2GIS Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          {/* Button 1: Все отзывы в 2ГИС */}
          <a
            href={TWO_GIS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-card border border-emerald-500/40 hover:border-emerald-400 text-cream hover:text-emerald-300 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-95"
          >
            <TwoGisLogo className="w-5 h-5 flex-shrink-0" />
            <MessageSquareQuote size={18} className="text-emerald-400" />
            <span>{t.reviews.allReviewsBtn}</span>
          </a>

          {/* Button 2: Оставить отзыв */}
          <a
            href={TWO_GIS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-dark font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-gold/20 active:scale-95"
          >
            <PenSquare size={18} />
            <span>{t.reviews.leaveReviewBtn}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
