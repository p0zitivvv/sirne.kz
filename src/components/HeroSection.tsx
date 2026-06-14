'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1780984558668-39f6dd619076?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" />
                {/* Kazakh Ornament Overlay */}
                <div className="absolute inset-0 kazakh-pattern-bg opacity-30" />
            </div>

            {/* Ornament top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                {/* Decorative ornament */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6"
                >
                    <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto" fill="none">
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
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.3em] uppercase text-gold border border-gold/30 rounded-full mb-8">
                        Halal Этно-Ресторан
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-6"
                >
                    <span className="text-cream">Добро пожаловать в</span>
                    <br />
                    <span className="text-gold-gradient">SIRNE.KZ</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-lg sm:text-xl text-cream/60 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Настоящий вкус казахских традиций в современном исполнении
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#menu"
                        className="px-8 py-4 bg-gold text-dark font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                        Посмотреть меню
                    </a>
                    <a
                        href="#contacts"
                        className="px-8 py-4 border border-gold/50 text-gold font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold/10 transition-all duration-300"
                    >
                        Забронировать стол
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-gold/50"
                >
                    <ChevronDown size={28} />
                </motion.div>
            </motion.div>
        </section>
    );
}
