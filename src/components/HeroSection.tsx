'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image & gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1780984558668-39f6dd619076?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/85 via-dark/70 to-dark" />
        {/* Kazakh Ornament Overlay */}
        <div className="absolute inset-0 kazakh-pattern-bg opacity-25 pointer-events-none" />
      </div>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Decorative Kazakh ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto" fill="none" aria-hidden="true">
            <path d="M60 0L75 15L60 30L45 15Z" fill="#C9A84C" opacity="0.6" />
            <path d="M60 5L70 15L60 25L50 15Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
            <line x1="80" y1="20" x2="120" y2="20" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
            <circle cx="15" cy="20" r="2" fill="#C9A84C" opacity="0.5" />
            <circle cx="105" cy="20" r="2" fill="#C9A84C" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.3em] uppercase text-gold border border-gold/30 rounded-full mb-6 sm:mb-8 bg-dark/40 backdrop-blur-sm">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-6"
        >
          <span className="text-cream">{t.hero.welcome}</span>
          <br />
          <span className="text-gold-gradient tracking-wide">SIRNE.KZ</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-cream/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-dark font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl shadow-gold/20 active:scale-95 text-center"
          >
            {t.hero.viewMenu}
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto px-8 py-4 border border-gold/40 text-gold hover:bg-gold/15 font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 text-center bg-dark/40 backdrop-blur-sm"
          >
            {t.hero.bookTable}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gold/50"
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
