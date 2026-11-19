'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Users,
  Landmark,
  Heart,
  Building2,
  Sparkles,
  Crown,
  PartyPopper,
  CalendarCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

const eventIcons: Record<string, React.ElementType> = {
  hall: Building2,
  yurt: Landmark,
  family: Heart,
  corporate: Users,
  wedding: Sparkles,
  kudalik: Crown,
  toi: PartyPopper,
};

const eventGradients: Record<string, string> = {
  hall: 'from-dark-brown/60 to-graphite/60',
  yurt: 'from-gold/20 to-dark-brown/60',
  family: 'from-graphite/60 to-dark-brown/40',
  corporate: 'from-dark-brown/40 to-graphite/60',
  wedding: 'from-gold/20 to-graphite/60',
  kudalik: 'from-dark-brown/60 to-gold/20',
  toi: 'from-graphite/60 to-dark-brown/60',
};

export default function EventsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('hall');

  const openBookingFor = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsBookingOpen(true);
  };

  return (
    <section id="events" className="py-20 sm:py-32 bg-dark relative">
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
            {t.events.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
            {t.events.titlePrefix}{' '}
            <span className="text-gold-gradient">{t.events.titleHighlight}</span>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
            </svg>
          </div>
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.events.items.map((event, index) => {
            const IconComponent = eventIcons[event.id] || Sparkles;
            const gradient = eventGradients[event.id] || 'from-dark-brown/60 to-graphite/60';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-2xl overflow-hidden flex flex-col ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                <div className="absolute inset-0 kazakh-pattern-bg opacity-20 pointer-events-none" />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* Content Box */}
                <div className="relative z-10 p-6 sm:p-7 border border-gold/15 rounded-2xl group-hover:border-gold/40 transition-all duration-300 flex-1 flex flex-col justify-between h-full bg-dark/40 backdrop-blur-sm">
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-13 h-13 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-gold" />
                      </div>
                      {event.capacity && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-gold bg-gold/10 border border-gold/25 rounded-full">
                          {event.capacity}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-cream mb-2 group-hover:text-gold transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>
                  </div>

                  {/* Card Booking Button */}
                  <div className="pt-4 border-t border-gold/10 mt-auto">
                    <button
                      type="button"
                      onClick={() => openBookingFor(event.id)}
                      className="w-full py-3 px-4 bg-dark-card hover:bg-gold text-gold hover:text-dark border border-gold/30 hover:border-gold font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md active:scale-[0.98]"
                    >
                      <CalendarCheck size={16} className="group-hover/btn:scale-110 transition-transform" />
                      <span>{t.events.bookBtn}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <button
            type="button"
            onClick={() => openBookingFor(selectedEventId)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-dark font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 active:scale-95"
          >
            <CalendarCheck size={18} />
            <span>{t.events.mainCta}</span>
          </button>
        </motion.div>
      </div>

      {/* Booking Calendar Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedEventId={selectedEventId}
        events={t.events.items}
        onSelectEventId={(id) => setSelectedEventId(id)}
      />
    </section>
  );
}
