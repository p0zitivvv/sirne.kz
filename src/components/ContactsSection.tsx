'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Navigation } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

export default function ContactsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const quickActions = [
        {
            icon: Phone,
            label: 'Позвонить',
            href: 'tel:+77714953014',
            color: 'bg-green-600 hover:bg-green-500',
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            href: 'https://wa.me/77714953014?text=Здравствуйте! Хочу забронировать столик в SIRNE.KZ',
            color: 'bg-green-700 hover:bg-green-600',
        },
        {
            icon: InstagramIcon,
            label: 'Instagram',
            href: 'https://instagram.com/sirne.kz_',
            color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400',
        },
        {
            icon: Navigation,
            label: 'Маршрут в 2GIS',
            href: 'https://2gis.kz/almaty/search/nomad/firm/70000001087489048/78.390873%2C45.018558?m=78.390852%2C45.018309%2F20%2Fp%2F45%2Fr%2F0.25',
            color: 'bg-blue-600 hover:bg-blue-500',
        },
    ];

    return (
        <section id="contacts" className="py-24 sm:py-32 bg-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Контакты</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Как нас <span className="text-gold-gradient">найти</span>
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="space-y-4">
                            <div className="glass-card rounded-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-cream font-semibold mb-1">Адрес</h3>
                                    <p className="text-cream/50 text-sm">Балпық Би 61, Талдықорған</p>
                                </div>
                            </div>

                            <div className="glass-card rounded-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-cream font-semibold mb-1">Телефон</h3>
                                    <a href="tel:+77714953014" className="text-cream/50 text-sm hover:text-gold transition-colors">
                                        +7 771 495 3014
                                    </a>
                                </div>
                            </div>

                            <div className="glass-card rounded-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-cream font-semibold mb-1">Время работы</h3>
                                    <p className="text-cream/50 text-sm">Ежедневно 10:00 – 00:00</p>
                                </div>
                            </div>

                            <div className="glass-card rounded-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <InstagramIcon className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-cream font-semibold mb-1">Instagram</h3>
                                    <a
                                        href="https://instagram.com/sirne.kz_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cream/50 text-sm hover:text-gold transition-colors"
                                    >
                                        @sirne.kz_
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map((action) => (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    target={action.href.startsWith('http') ? '_blank' : undefined}
                                    rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`flex items-center justify-center gap-2 px-4 py-4 sm:py-3 rounded-lg text-white font-medium text-sm transition-all duration-300 ${action.color}`}
                                >
                                    <action.icon size={18} />
                                    <span>{action.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="rounded-lg overflow-hidden border border-dark-border h-[400px] lg:h-full min-h-[400px]">
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
                            href="https://2gis.kz/almaty/search/nomad/firm/70000001087489048/78.390873%2C45.018558?m=78.390852%2C45.018309%2F20%2Fp%2F45%2Fr%2F0.25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all duration-300 font-medium text-sm"
                        >
                            <ExternalLink size={16} />
                            Открыть в 2GIS
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
