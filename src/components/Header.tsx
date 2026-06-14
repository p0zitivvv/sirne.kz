'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
    { href: '#about', label: 'О нас' },
    { href: '#gallery', label: 'Галерея' },
    { href: '#menu', label: 'Меню' },
    { href: '#events', label: 'Мероприятия' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-dark/95 backdrop-blur-xl shadow-lg shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div className="relative">
                            <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-gold-gradient">
                                SIRNE
                            </span>
                            <span className="text-xs text-gold/70 tracking-[0.3em] block -mt-1">.KZ</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-cream/70 hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:+77714953014"
                            className="hidden sm:flex items-center gap-2 text-gold/80 hover:text-gold transition-colors"
                        >
                            <Phone size={16} />
                            <span className="text-sm">+7 771 495 3014</span>
                        </a>
                        <a
                            href="#contacts"
                            className="hidden md:inline-flex px-6 py-2.5 bg-gold text-dark font-semibold text-sm rounded-sm hover:bg-gold-light transition-all duration-300 tracking-wide uppercase"
                        >
                            Забронировать
                        </a>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-cream hover:text-gold transition-colors p-2"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-dark/98 backdrop-blur-xl border-t border-gold/10"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-cream/70 hover:text-gold transition-colors text-lg py-2 border-b border-dark-border"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="tel:+77714953014"
                                className="flex items-center gap-2 text-gold py-2"
                            >
                                <Phone size={18} />
                                <span>+7 771 495 3014</span>
                            </a>
                            <a
                                href="#contacts"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-center px-6 py-3 bg-gold text-dark font-semibold rounded-sm tracking-wide uppercase"
                            >
                                Забронировать стол
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
