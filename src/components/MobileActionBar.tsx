'use client';

import { Phone, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.36C8.94 7.36 8.68 7.42 8.44 7.68C8.21 7.94 7.57 8.53 7.57 9.76C7.57 10.99 8.46 12.18 8.59 12.35C8.72 12.52 10.36 15.05 12.87 16.13C13.47 16.39 13.93 16.55 14.3 16.67C14.9 16.86 15.45 16.83 15.89 16.77C16.37 16.7 17.37 16.16 17.58 15.58C17.78 15 17.78 14.5 17.72 14.4C17.66 14.3 17.5 14.24 17.26 14.12C17.02 14 15.83 13.42 15.61 13.34C15.39 13.25 15.22 13.21 15.06 13.46C14.9 13.7 14.43 14.24 14.29 14.4C14.15 14.56 14.01 14.58 13.77 14.46C13.53 14.34 12.75 14.08 11.83 13.26C11.11 12.62 10.63 11.83 10.49 11.59C10.35 11.35 10.47 11.22 10.6 11.1C10.71 11 10.85 10.82 10.97 10.67C11.1 10.53 11.14 10.42 11.22 10.26C11.3 10.1 11.26 9.95 11.2 9.83C11.14 9.71 10.68 8.58 10.49 8.11C10.3 7.66 10.11 7.72 9.96 7.71C9.82 7.71 9.66 7.71 9.49 7.71C9.33 7.71 9.17 7.77 9.11 7.36Z" />
  </svg>
);

export default function MobileActionBar() {
  const { t } = useLanguage();

  return (
    <aside
      aria-label="Быстрые действия"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-dark-card/95 backdrop-blur-xl border-t border-gold/20 shadow-[0_-4px_24px_rgba(0,0,0,0.7)] pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] px-3"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call button */}
        <a
          href="tel:+77714953014"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-dark/60 border border-gold/20 text-cream hover:text-gold hover:border-gold/50 active:scale-95 transition-all duration-200"
          aria-label={t.mobileActions.call}
        >
          <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-1">
            <Phone size={18} />
          </div>
          <span className="text-[11px] font-medium tracking-tight text-cream/90 truncate max-w-full">
            {t.mobileActions.call}
          </span>
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/77714953014"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-cream hover:border-emerald-400 active:scale-95 transition-all duration-200"
          aria-label={t.mobileActions.whatsapp}
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium tracking-tight text-emerald-300 truncate max-w-full">
            {t.mobileActions.whatsapp}
          </span>
        </a>

        {/* Route / Map button */}
        <a
          href="https://2gis.kz/almaty/firm/70000001087489048"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-dark/60 border border-gold/20 text-cream hover:text-gold hover:border-gold/50 active:scale-95 transition-all duration-200"
          aria-label={t.mobileActions.route}
        >
          <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-1">
            <Navigation size={18} />
          </div>
          <span className="text-[11px] font-medium tracking-tight text-cream/90 truncate max-w-full">
            {t.mobileActions.route}
          </span>
        </a>
      </div>
    </aside>
  );
}
