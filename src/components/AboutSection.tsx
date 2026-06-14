'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, UtensilsCrossed, Users, Landmark, Baby, Heart } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Halal кухня',
        description: 'Только халяльные продукты и соблюдение всех стандартов.',
    },
    {
        icon: UtensilsCrossed,
        title: 'Национальные блюда',
        description: 'Традиционные казахские рецепты, передаваемые из поколения в поколение.',
    },
    {
        icon: Users,
        title: 'Банкетный зал',
        description: 'Просторный зал до 100 гостей для любого торжества.',
    },
    {
        icon: Landmark,
        title: 'Юрта',
        description: 'Настоящая юрта до 60 гостей — атмосфера казахского дастархана.',
    },
    {
        icon: Baby,
        title: 'Детские зоны',
        description: '2 игровые зоны для детей с аниматорами.',
    },
    {
        icon: Heart,
        title: 'Семейный отдых',
        description: 'Комфорт для всей семьи: тапчаны, кабинки, уютная атмосфера.',
    },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="py-24 sm:py-32 relative kazakh-pattern-bg">
            <div className="absolute inset-0 bg-dark/95" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">О ресторане</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Почему выбирают <span className="text-gold-gradient">SIRNE.KZ</span>
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative glass-card rounded-lg p-8 hover:border-gold/40 transition-all duration-500 card-shine overflow-hidden"
                        >
                            {/* Gold glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                                    <feature.icon className="w-7 h-7 text-gold" />
                                </div>
                                <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-cream mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-cream/50 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
