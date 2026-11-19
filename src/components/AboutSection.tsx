'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, UtensilsCrossed, Users, Landmark, Baby, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const featureIcons = [
  ShieldCheck,
  UtensilsCrossed,
  Users,
  Landmark,
  Baby,
  Heart,
];

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 sm:py-32 relative kazakh-pattern-bg">
      <div className="absolute inset-0 bg-dark/95 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">
            {t.about.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
            {t.about.titlePrefix}{' '}
            <span className="text-gold-gradient">{t.about.titleHighlight}</span>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
            </svg>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.about.features.map((feature, index) => {
            const Icon = featureIcons[index] || Heart;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative glass-card rounded-2xl p-6 sm:p-8 hover:border-gold/40 transition-all duration-300 card-shine overflow-hidden bg-dark-card/85 shadow-lg border border-gold/15"
              >
                {/* Gold glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300 text-gold">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-cream mb-3 group-hover:text-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-cream/60 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
