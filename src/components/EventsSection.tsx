'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Landmark, Heart, Building2, Sparkles, Crown, PartyPopper } from 'lucide-react';

const events = [
    {
        icon: Building2,
        title: 'Банкетный зал',
        capacity: '100 человек',
        description: 'Просторный зал для больших торжеств с полным банкетным обслуживанием',
        gradient: 'from-dark-brown/60 to-graphite/60',
    },
    {
        icon: Landmark,
        title: 'Юрта',
        capacity: '60 человек',
        description: 'Настоящая казахская юрта для аутентичных праздников',
        gradient: 'from-gold/20 to-dark-brown/60',
    },
    {
        icon: Heart,
        title: 'Семейные мероприятия',
        capacity: '',
        description: 'Уютная атмосфера для семейных праздников любого масштаба',
        gradient: 'from-graphite/60 to-dark-brown/40',
    },
    {
        icon: Users,
        title: 'Корпоративы',
        capacity: '',
        description: 'Организация корпоративных мероприятий и тимбилдингов',
        gradient: 'from-dark-brown/40 to-graphite/60',
    },
    {
        icon: Sparkles,
        title: 'Свадьбы',
        capacity: '',
        description: 'Незабываемый свадебный банкет с традиционным колоритом',
        gradient: 'from-gold/20 to-graphite/60',
    },
    {
        icon: Crown,
        title: 'Құдалық',
        capacity: '',
        description: 'Традиционная церемония сватовства в казахском стиле',
        gradient: 'from-dark-brown/60 to-gold/20',
    },
    {
        icon: PartyPopper,
        title: 'Той',
        capacity: '',
        description: 'Большой казахский праздник — той в лучших традициях',
        gradient: 'from-graphite/60 to-dark-brown/60',
    },
];

export default function EventsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="events" className="py-24 sm:py-32 bg-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Мероприятия</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Ваш <span className="text-gold-gradient">праздник</span> с нами
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative rounded-lg overflow-hidden cursor-pointer ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            {/* Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`} />
                            <div className="absolute inset-0 kazakh-pattern-bg opacity-20" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {/* Content */}
                            <div className="relative z-10 p-8 border border-gold/10 rounded-lg group-hover:border-gold/30 transition-all duration-500 h-full">
                                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                                    <event.icon className="w-7 h-7 text-gold" />
                                </div>
                                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-cream mb-2">
                                    {event.title}
                                </h3>
                                {event.capacity && (
                                    <span className="inline-block px-3 py-1 text-xs text-gold bg-gold/10 rounded-full mb-3">
                                        {event.capacity}
                                    </span>
                                )}
                                <p className="text-cream/50 text-sm leading-relaxed">{event.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://wa.me/77714953014?text=Здравствуйте! Хочу забронировать мероприятие в SIRNE.KZ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-4 bg-gold text-dark font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                        Забронировать мероприятие
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
