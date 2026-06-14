'use client';

import { Phone, MapPin, Clock } from 'lucide-react';

const InstagramIcon = ({ size, className }: { size?: number; className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size || 24} height={size || 24} className={className}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const footerLinks = [
    { href: '#about', label: 'О нас' },
    { href: '#gallery', label: 'Галерея' },
    { href: '#menu', label: 'Меню' },
    { href: '#events', label: 'Мероприятия' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
];

export default function Footer() {
    return (
        <footer className="bg-dark-card border-t border-dark-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <div>
                            <span className="text-3xl font-bold font-[family-name:var(--font-heading)] text-gold-gradient">
                                SIRNE
                            </span>
                            <span className="text-sm text-gold/70 tracking-[0.3em] block">.KZ</span>
                        </div>
                        <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
                            Halal этно-ресторан в Талдыкоргане. Настоящий вкус казахских традиций в современном исполнении.
                        </p>
                        {/* Ornament */}
                        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="mt-4">
                            <path d="M40 0L50 10L40 20L30 10Z" fill="#C9A84C" opacity="0.3" />
                            <line x1="0" y1="10" x2="25" y2="10" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
                            <line x1="55" y1="10" x2="80" y2="10" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
                        </svg>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-gold text-sm font-semibold tracking-wider uppercase mb-6">Навигация</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-cream/40 hover:text-gold transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h3 className="text-gold text-sm font-semibold tracking-wider uppercase mb-6">Контакты</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-cream/40 text-sm">
                                <MapPin size={16} className="text-gold flex-shrink-0" />
                                <span>Балпық Би 61, Талдықорған</span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/40 text-sm">
                                <Phone size={16} className="text-gold flex-shrink-0" />
                                <a href="tel:+77714953014" className="hover:text-gold transition-colors">
                                    +7 771 495 3014
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-cream/40 text-sm">
                                <Clock size={16} className="text-gold flex-shrink-0" />
                                <span>Ежедневно 10:00 – 00:00</span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/40 text-sm">
                                <InstagramIcon size={16} className="text-gold flex-shrink-0" />
                                <a
                                    href="https://instagram.com/sirne.kz_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gold transition-colors"
                                >
                                    @sirne.kz_
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-cream/20 text-xs">
                        © 2026 SIRNE.KZ — Halal этно-ресторан. Все права защищены.
                    </p>
                    <p className="text-cream/20 text-xs">
                        Талдықорған, Қазақстан
                    </p>
                </div>
            </div>
        </footer>
    );
}
