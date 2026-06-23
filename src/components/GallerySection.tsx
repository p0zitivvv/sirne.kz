'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const galleryCategories = ['Все', 'Блюда', 'Интерьер'];

const galleryItems = [
    { id: 1, category: 'Блюда', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: 'Бешбармак', height: 'tall' },
    { id: 2, category: 'Интерьер', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Интерьер ресторана', height: 'normal' },
    { id: 4, category: 'Блюда', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', alt: 'Мясо на мангале', height: 'tall' },
    { id: 7, category: 'Блюда', src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80', alt: 'Выпечка', height: 'normal' },
    { id: 8, category: 'Интерьер', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&q=80', alt: 'Кабинка', height: 'normal' },
    { id: 10, category: 'Блюда', src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', alt: 'Десерт', height: 'normal' },
];

export default function GallerySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeCategory, setActiveCategory] = useState('Все');
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const filtered = activeCategory === 'Все'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <section id="gallery" className="py-24 sm:py-32 bg-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Галерея</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Наша <span className="text-gold-gradient">атмосфера</span>
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {galleryCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat
                                ? 'bg-gold text-dark'
                                : 'border border-gold/30 text-cream/60 hover:border-gold hover:text-gold'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {filtered.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="break-inside-avoid group relative rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setLightboxImage(item.src)}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.height === 'tall' ? 'h-80 sm:h-96' : 'h-56 sm:h-64'
                                    }`}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-xs text-gold tracking-wider uppercase">{item.category}</span>
                                <p className="text-cream text-sm font-medium mt-1">{item.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setLightboxImage(null)}
                >
                    <motion.img
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        src={lightboxImage}
                        alt="Gallery"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    />
                    <button className="absolute top-6 right-6 text-cream/60 hover:text-gold text-3xl transition-colors">✕</button>
                </motion.div>
            )}
        </section>
    );
}
