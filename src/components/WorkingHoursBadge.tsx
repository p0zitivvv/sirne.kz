'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface WorkingHoursBadgeProps {
  className?: string;
  showHours?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function WorkingHoursBadge({
  className = '',
  showHours = false,
  size = 'md',
}: WorkingHoursBadgeProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const checkStatus = () => {
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Almaty',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }).formatToParts(new Date());

        const hourPart = parts.find((p) => p.type === 'hour')?.value || '12';
        let hour = parseInt(hourPart, 10);
        // Note: some environments format 24 as 24 or 0
        if (hour === 24) hour = 0;

        // Open daily from 10:00 to 00:00 (closes at midnight)
        const open = hour >= 10 && hour < 24;
        setIsOpen(open);
      } catch {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const kz = new Date(utc + 3600000 * 5);
        const hour = kz.getHours();
        setIsOpen(hour >= 10 && hour < 24);
      }
    };

    checkStatus();
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{t.status.openNow}</span>
      </span>
    );
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
    lg: 'text-sm px-4 py-1.5 gap-2.5',
  }[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span
        className={`inline-flex items-center rounded-full font-medium transition-colors ${sizeClasses} ${
          isOpen
            ? 'border border-emerald-500/40 bg-emerald-950/50 text-emerald-400 shadow-sm shadow-emerald-900/30'
            : 'border border-rose-500/40 bg-rose-950/40 text-rose-300'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOpen
              ? 'bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse'
              : 'bg-rose-400 ring-2 ring-rose-400/20'
          }`}
        />
        <span>{isOpen ? t.status.openNow : t.status.closed}</span>
        {showHours && (
          <span className="text-cream/50 text-[11px] ml-1 pl-1.5 border-l border-white/10">
            10:00 – 00:00
          </span>
        )}
      </span>
    </div>
  );
}
