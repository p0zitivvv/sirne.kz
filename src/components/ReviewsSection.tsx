'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '@/data/reviews';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function ReviewsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center' },
        [Autoplay({ delay: 5000, stopOnInteraction: true })]
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    return (
        <section id="reviews" className="py-24 sm:py-32 relative kazakh-pattern-bg">
            <div className="absolute inset-0 bg-dark/95" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Отзывы</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Что говорят <span className="text-gold-gradient">наши гости</span>
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                >
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                                >
                                    <div className="glass-card rounded-lg p-8 h-full flex flex-col">
                                        <Quote className="w-8 h-8 text-gold/30 mb-4" />
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                            ))}
                                        </div>
                                        <p className="text-cream/70 text-sm leading-relaxed flex-grow mb-6">
                                            &ldquo;{review.text}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                                            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold text-sm">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-cream text-sm font-medium">{review.name}</p>
                                                <p className="text-cream/30 text-xs">{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex gap-2">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => emblaApi?.scrollTo(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? 'bg-gold w-6' : 'bg-cream/20'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
