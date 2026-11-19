'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.36C8.94 7.36 8.68 7.42 8.44 7.68C8.21 7.94 7.57 8.53 7.57 9.76C7.57 10.99 8.46 12.18 8.59 12.35C8.72 12.52 10.36 15.05 12.87 16.13C13.47 16.39 13.93 16.55 14.3 16.67C14.9 16.86 15.45 16.83 15.89 16.77C16.37 16.7 17.37 16.16 17.58 15.58C17.78 15 17.78 14.5 17.72 14.4C17.66 14.3 17.5 14.24 17.26 14.12C17.02 14 15.83 13.42 15.61 13.34C15.39 13.25 15.22 13.21 15.06 13.46C14.9 13.7 14.43 14.24 14.29 14.4C14.15 14.56 14.01 14.58 13.77 14.46C13.53 14.34 12.75 14.08 11.83 13.26C11.11 12.62 10.63 11.83 10.49 11.59C10.35 11.35 10.47 11.22 10.6 11.1C10.71 11 10.85 10.82 10.97 10.67C11.1 10.53 11.14 10.42 11.22 10.26C11.3 10.1 11.26 9.95 11.2 9.83C11.14 9.71 10.68 8.58 10.49 8.11C10.3 7.66 10.11 7.72 9.96 7.71C9.82 7.71 9.66 7.71 9.49 7.71C9.33 7.71 9.17 7.77 9.11 7.36Z" />
  </svg>
);

export interface EventOption {
  id: string;
  title: string;
  capacity?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId: string;
  events: EventOption[];
  onSelectEventId?: (id: string) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedEventId,
  events,
  onSelectEventId,
}: BookingModalProps) {
  const { t } = useLanguage();

  const [activeEventId, setActiveEventId] = useState(selectedEventId);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calendar current view
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = useState<Date>(() => new Date());

  useEffect(() => {
    if (selectedEventId) {
      setActiveEventId(selectedEventId);
    }
  }, [selectedEventId]);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!selectedDate) {
        setViewDate(new Date());
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, selectedDate]);

  const currentEvent = useMemo(() => {
    return events.find((e) => e.id === activeEventId) || events[0] || { id: 'event', title: 'Мероприятие' };
  }, [events, activeEventId]);

  // Calendar calculations
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const canGoPrev = useMemo(() => {
    const currentViewStart = new Date(viewYear, viewMonth, 1);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentViewStart > todayStart;
  }, [viewYear, viewMonth, today]);

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    // In KZ/RU week starts on Monday (0 -> Sun, 1 -> Mon ... 6 -> Sat)
    // Convert so Monday = 0, Sunday = 6
    const startOffset = (firstDayIndex + 6) % 7;

    const days: { date: Date; isCurrentMonth: boolean; isPast: boolean; isToday: boolean }[] = [];

    // Prev month days
    const prevMonthDaysCount = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(viewYear, viewMonth - 1, prevMonthDaysCount - i);
      d.setHours(0, 0, 0, 0);
      days.push({
        date: d,
        isCurrentMonth: false,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(viewYear, viewMonth, i);
      d.setHours(0, 0, 0, 0);
      days.push({
        date: d,
        isCurrentMonth: true,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
      });
    }

    // Next month padding to fill complete weeks (multiples of 7)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(viewYear, viewMonth + 1, i);
        d.setHours(0, 0, 0, 0);
        days.push({
          date: d,
          isCurrentMonth: false,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
        });
      }
    }

    return days;
  }, [viewYear, viewMonth, today]);

  const formatDateDisplay = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const isSelected = (d: Date) => {
    if (!selectedDate) return false;
    return (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getDate() === selectedDate.getDate()
    );
  };

  const handleSelectDate = (d: Date) => {
    if (d < today) return;
    setSelectedDate(d);
  };

  const handleContinueWhatsApp = () => {
    if (!selectedDate) return;
    const dateFormatted = formatDateDisplay(selectedDate);
    const message = t.events.whatsappTemplate(currentEvent.title, dateFormatted);
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77714953014?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative z-10 w-full max-w-lg bg-dark-card border border-gold/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-dark-border bg-gradient-to-r from-dark to-dark-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold border border-gold/30">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] text-cream">
                    {t.events.modalTitle}
                  </h3>
                  <p className="text-xs text-gold/80">{t.events.selectDate}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-dark/60 border border-dark-border flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Event Selector / Display */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2 font-medium">
                  {t.events.chooseEvent}
                </label>
                <div className="flex flex-wrap gap-2">
                  {events.map((ev) => {
                    const isActive = ev.id === activeEventId;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => {
                          setActiveEventId(ev.id);
                          if (onSelectEventId) onSelectEventId(ev.id);
                        }}
                        className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-gold text-dark font-bold shadow-md shadow-gold/20'
                            : 'bg-dark/60 text-cream/70 border border-dark-border hover:border-gold/40 hover:text-cream'
                        }`}
                      >
                        {isActive && <Check size={14} />}
                        <span>{ev.title}</span>
                        {ev.capacity && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              isActive ? 'bg-black/20 text-dark' : 'bg-gold/10 text-gold'
                            }`}
                          >
                            {ev.capacity}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-dark/60 rounded-xl p-4 sm:p-5 border border-gold/15">
                {/* Month & Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-cream font-[family-name:var(--font-heading)]">
                    {t.events.calendarMonths[viewMonth]} {viewYear}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      disabled={!canGoPrev}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                        canGoPrev
                          ? 'border-gold/30 text-gold hover:bg-gold/10'
                          : 'border-dark-border text-cream/20 cursor-not-allowed'
                      }`}
                      aria-label="Предыдущий месяц"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
                      aria-label="Следующий месяц"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                  {t.events.calendarDaysShort.map((dayName, idx) => (
                    <div
                      key={dayName}
                      className={`text-[11px] font-semibold py-1 uppercase ${
                        idx >= 5 ? 'text-gold/70' : 'text-cream/40'
                      }`}
                    >
                      {dayName}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                  {calendarDays.map((item, index) => {
                    const isSel = isSelected(item.date);
                    const isPast = item.isPast;
                    const isCurMonth = item.isCurrentMonth;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={isPast || !isCurMonth}
                        onClick={() => handleSelectDate(item.date)}
                        className={`h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 flex flex-col items-center justify-center relative ${
                          !isCurMonth
                            ? 'text-cream/15 cursor-default'
                            : isPast
                            ? 'text-cream/20 cursor-not-allowed bg-dark/20 line-through'
                            : isSel
                            ? 'bg-gold text-dark font-bold shadow-lg shadow-gold/30 scale-105 z-10 ring-2 ring-gold/40'
                            : item.isToday
                            ? 'border border-gold/60 text-gold hover:bg-gold/15'
                            : 'text-cream hover:bg-gold/15 hover:text-gold'
                        }`}
                      >
                        <span>{item.date.getDate()}</span>
                        {item.isToday && !isSel && isCurMonth && (
                          <span className="w-1 h-1 rounded-full bg-gold absolute bottom-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend / Disallow past dates notice */}
                <div className="mt-3 pt-3 border-t border-dark-border text-[11px] text-cream/40 flex items-center justify-between">
                  <span>* {t.events.noPastDates}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-gold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Сегодня
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Date Summary & CTA */}
              <AnimatePresence>
                {selectedDate ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/30 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-cream/50 uppercase tracking-wider block font-medium">
                          {t.events.selectedDate}
                        </span>
                        <div className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-gold flex items-center gap-2 mt-0.5">
                          <span>{formatDateDisplay(selectedDate)}</span>
                          <span className="text-xs font-normal text-cream/70 bg-dark/50 px-2 py-0.5 rounded border border-gold/20">
                            {currentEvent.title}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDate(null)}
                        className="text-xs text-gold/80 hover:text-gold underline flex items-center gap-1"
                      >
                        <ArrowLeft size={12} />
                        {t.events.changeDate}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinueWhatsApp}
                      className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-800/60 active:scale-[0.98] transition-all duration-200 uppercase tracking-wider"
                    >
                      <WhatsAppIcon className="w-6 h-6 text-white" />
                      <span>{t.events.continueWhatsApp}</span>
                    </button>

                    <p className="text-[11px] text-cream/50 leading-relaxed text-center">
                      {t.events.notice}
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center p-3 text-xs text-cream/40">
                    {t.events.selectDate}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
