'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Search, UtensilsCrossed } from 'lucide-react';
import { categories, menuItems, MenuItem } from '@/data/menu';

export default function MenuSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeCategory, setActiveCategory] = useState('breakfasts');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        let items: MenuItem[];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            items = menuItems.filter(
                (item) =>
                    item.nameRu.toLowerCase().includes(q) ||
                    item.nameKz.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q)
            );
        } else {
            items = menuItems.filter((item) => item.category === activeCategory);
        }
        return items;
    }, [activeCategory, searchQuery]);

    const activeCategoryData = categories.find((c) => c.id === activeCategory);

    return (
        <section id="menu" className="py-24 sm:py-32 relative kazakh-pattern-bg">
            <div className="absolute inset-0 bg-dark/95" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Меню</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
                        Наш <span className="text-gold-gradient">дастархан</span>
                    </h2>
                    <div className="ornament-divider max-w-xs mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
                        </svg>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto mb-10"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" size={20} />
                        <input
                            type="text"
                            placeholder="Поиск по меню..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-dark-card border border-dark-border rounded-lg text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                {!searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-gold text-dark'
                                    : 'border border-dark-border text-cream/50 hover:border-gold/50 hover:text-cream'
                                    }`}
                            >
                                <span>{cat.nameRu}</span>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Category Title */}
                {!searchQuery && activeCategoryData && (
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-cream">
                            {activeCategoryData.nameRu}
                        </h3>
                        <p className="text-cream/40 text-sm mt-1">{activeCategoryData.nameKz}</p>
                    </div>
                )}

                {searchQuery && (
                    <p className="text-cream/40 text-sm mb-6">
                        Найдено: {filteredItems.length} блюд
                    </p>
                )}

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group glass-card rounded-lg overflow-hidden hover:border-gold/30 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="h-44 bg-gradient-to-br from-dark-brown/40 to-graphite/40 relative overflow-hidden">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.nameRu}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500">
                                        <UtensilsCrossed className="w-16 h-16 text-gold/30" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 px-3 py-1 bg-gold/90 text-dark text-sm font-bold rounded-full">
                                    {item.price.toLocaleString()} ₸
                                </div>
                            </div>
                            <div className="p-5">
                                <h4 className="text-lg font-semibold text-cream font-[family-name:var(--font-heading)]">
                                    {item.nameRu}
                                </h4>
                                <p className="text-gold/60 text-xs mt-0.5 italic">{item.nameKz}</p>
                                <p className="text-cream/40 text-sm mt-2 leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-cream/30 text-lg">Ничего не найдено</p>
                    </div>
                )}
            </div>
        </section>
    );
}
